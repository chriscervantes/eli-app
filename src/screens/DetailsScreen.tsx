// screens/DetailsScreen.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const DetailsScreen = ({ route }: any) => {
  const { itemId } = route.params
  console.log('item ->', route)
  return (
    <View style={styles.container}>
      <Text>Details for Item {itemId}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default DetailsScreen
