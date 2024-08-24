// screens/HomeScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native'

type Item = {
  id: string
  name: string
}

const HomeScreen = ({ navigation }: any) => {
  console.log('HomeScreen rendered', navigation)
  const [username, setUserName] = useState<string | null>(null)
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    console.log('HomeScreen useEffect', navigation)
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('user')
        if (storedUsername) {
          setUserName(storedUsername)
        } else {
          navigation.replace('Login')
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to load user data')
      }
    }

    fetchUsername()
  }, [])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user')
      navigation.replace('Login')
    } catch (error) {
      Alert.alert('Error', 'Failed to logout')
    }
  }

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: `Item ${items.length + 1}` },
    ])
  }

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {username}</Text>
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </TouchableOpacity>
            <Button
              title="View Details"
              onPress={() =>
                navigation.navigate('Details', { itemId: item.id })
              }
            />
          </View>
        )}
      />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: {
    color: 'red',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
})

export default HomeScreen
