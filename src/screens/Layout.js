import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useContext, useEffect } from 'react'
import { flashStyle, flashTextStyle, navigationTheme } from '../styles/GlobalStyles'
import RestaurantsStack from './restaurants/RestaurantsStack'
import ProfileStack from './profile/ProfileStack'
import OrdersStack from './orders/OrdersStack'

// eslint-disable-next-line camelcase
import { useFonts, Montserrat_400Regular, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import FlashMessage, { showMessage } from 'react-native-flash-message'
import { AuthorizationContext } from '../context/AuthorizationContext'
import { AppContext } from '../context/AppContext'
import { ApiError } from '../api/helpers/Errors'

const Tab = createBottomTabNavigator()

export default function Layout () {
  const { getToken, signOut } = useContext(AuthorizationContext)
  const { error, setError } = useContext(AppContext)

  const init = async () => {
    await getToken(
      (recoveredUser) => showMessage({
        message: `Session recovered. You are logged in as ${recoveredUser.firstName}`,
        type: 'success',
        style: flashStyle,
        titleStyle: flashTextStyle
      }),
      (error) => showMessage({
        message: `Session could not be recovered. Please log in. ${error} `,
        type: 'warning',
        style: flashStyle,
        titleStyle: flashTextStyle
      })
    )
  }

  React.useEffect(() => {
    if (error) {
      showMessage({
        message: error.message,
        type: 'danger',
        style: flashStyle,
        titleStyle: flashTextStyle
      })
      if (error instanceof ApiError && (error.code === 403 || error.code === 401)) {
        signOut()
      }
      setError(null)
    }
  }, [error])

  useEffect(() => {
    init()
  }, [])

  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold
  })
  return (
    <>
    {fontsLoaded &&
     <NavigationContainer theme={navigationTheme}>

      <Tab.Navigator screenOptions={({ route }) => ({
        // eslint-disable-next-line react/display-name
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name === 'Restaurants') {
            iconName = 'silverware-fork-knife'
          } else if (route.name === 'My Orders') {
            iconName = 'format-list-text'
          } else if (route.name === 'Profile') {
            iconName = 'account-circle'
          }
          return <MaterialCommunityIcons name={iconName} color={color} size={size} />
        },
        headerShown: false
      })}>
        <Tab.Screen
          name='Restaurants'
          component={RestaurantsStack}
        />
        <Tab.Screen
          name='My Orders'
          component={OrdersStack} />
        <Tab.Screen
          name='Profile'
          component={ProfileStack} />
      </Tab.Navigator>
      <FlashMessage position="top" />

    </NavigationContainer>
    }
    </>
  )
}
