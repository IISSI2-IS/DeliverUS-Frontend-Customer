/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import TextSemiBold from '../../components/TextSemibold'
import TextRegular from '../../components/TextRegular'
import { brandPrimary, brandPrimaryTap, brandSecondary } from '../../styles/GlobalStyles'

export default function RestaurantsScreen ({ navigation, route }) {
  // TODO: Create a state for storing the restaurants

  useEffect(() => {
    // TODO: Fetch all restaurants and set them to state.
    //      Notice that it is not required to be logged in.

    async function fetchRestaurants () {

    }

    fetchRestaurants() // TODO: set restaurants to state
  }, [route])

  return (
    <View style={styles.container}>
     <TextSemiBold>FR1: Restaurants listing.</TextSemiBold>
      <TextRegular>List restaurants and enable customers to navigate to restaurant details so they can create and place a new order</TextRegular>
      <TextSemiBold>FR7: Show top 3 products.</TextSemiBold>
      <TextRegular>Customers will be able to query top 3 products from all restaurants. Top products are the most popular ones, in other words the best sellers.</TextRegular>

      <Pressable
                onPress={() => {
                  navigation.navigate('RestaurantDetailScreen', { id: 1 }) // TODO: Change this to the actual restaurant id as they are rendered as a FlatList
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
                <TextRegular textStyle={styles.text}>Go to Restaurant Detail Screen</TextRegular>
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
    marginTop: 12,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: brandSecondary,
    textAlign: 'center',
    marginLeft: 5
  },
  emptyList: {
    textAlign: 'center',
    padding: 50
  }
})
