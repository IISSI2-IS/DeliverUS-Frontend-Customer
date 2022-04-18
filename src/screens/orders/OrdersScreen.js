import React from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import TextSemiBold from '../../components/TextSemibold'
import { brandPrimary, brandPrimaryTap, brandSecondary } from '../../styles/GlobalStyles'

export default function OrdersScreen ({ navigation }) {
  return (
        <View style={styles.container}>
            <TextSemiBold>FR5: Listing my confirmed orders</TextSemiBold>
            <TextRegular>A Customer will be able to check his/her confirmed orders, sorted from the most recent to the oldest.</TextRegular>
            <Pressable
                onPress={() => {
                  navigation.navigate('OrderDetailScreen', { id: Math.floor(Math.random() * 100) })
                }}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? brandPrimaryTap
                      : brandPrimary
                  },
                  styles.button
                ]}
            >
                <TextRegular textStyle={styles.text}>Go to Order Detail Screen</TextRegular>
            </Pressable>
        </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 50
  },
  button: {
    borderRadius: 8,
    height: 40,
    margin: 12,
    padding: 10,
    width: '100%'
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center'
  }
})
