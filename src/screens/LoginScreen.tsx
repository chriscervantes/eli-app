import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { Alert, StyleSheet, View, Text, TextInput, Button } from 'react-native'

const LoginScreen = ({ navigation }: any) => {
  const [username, setUserName] = useState('')

  const handleLogin = async () => {
    if (username.trim() === '') return
    try {
      await AsyncStorage.setItem('user', username)
      navigation.replace('Home')
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUserName}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
})

export default LoginScreen
