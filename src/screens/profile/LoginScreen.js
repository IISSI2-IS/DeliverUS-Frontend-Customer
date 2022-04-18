import React, { useContext, useState } from 'react'
import { StyleSheet, View, Pressable, Image } from 'react-native'
import { brandPrimary, brandPrimaryTap, brandSecondary, flashStyle, flashTextStyle } from '../../styles/GlobalStyles'
import { Formik } from 'formik'
import * as yup from 'yup'
import InputItem from '../../components/InputItem'
import { AuthorizationContext } from '../../context/AuthorizationContext'
import TextRegular from '../../components/TextRegular'
import logo from '../../../assets/logo.png'
import TextError from '../../components/TextError'
import { showMessage } from 'react-native-flash-message'

export default function LoginScreen ({ navigation }) {
  const { signIn } = useContext(AuthorizationContext)
  const [backendErrors, setBackendErrors] = useState()
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(3, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required')
  })

  const login = (values) => {
    setBackendErrors([])
    signIn(values,
      (loggedInUser) => {
        loggedInUser.userType === 'customer'
          ? showMessage({
            message: `Welcome back ${loggedInUser.firstName}.`,
            type: 'success',
            style: flashStyle,
            titleStyle: flashTextStyle
          })
          : showMessage({
            message: `Welcome back ${loggedInUser.firstName}. You are not a customer.`,
            type: 'warning',
            style: flashStyle,
            titleStyle: flashTextStyle
          })
      },
      (error) => {
        setBackendErrors(error.errors)
      })
  }

  return (

    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: '', password: '' }}
      onSubmit={login}>
      {({ handleSubmit }) => (
        <View style={{ alignItems: 'center' }}>
          <View style={styles.container}>
            <Image style={styles.image} source={logo} />
            <InputItem
              name='email'
              label='email:'
              placeholder='customer1@customer.com'
              textContentType='emailAddress'
            />
            <InputItem
              name='password'
              label='password:'
              placeholder='secret'
              textContentType='password'
              secureTextEntry={true}
            />

            {backendErrors &&
              backendErrors.map((error, index) => <TextError key={index}>{error.msg}</TextError>)
            }

            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? brandPrimaryTap
                    : brandPrimary
                },
                styles.button
              ]}>
              <TextRegular textStyle={styles.text}>
                Sign in
              </TextRegular>
            </Pressable>

            <TextRegular textStyle={{ textAlign: 'center' }}>Not a member?</TextRegular>
            <Pressable
              onPress={() => navigation.navigate('RegisterScreen')
              }
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? brandPrimaryTap
                    : brandPrimary
                },
                styles.button
              ]}>
              <TextRegular textStyle={styles.text}>
                Create account
              </TextRegular>
            </Pressable>
          </View>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '60%'
  },
  image: {
    width: 100,
    height: 100,
    borderColor: brandPrimary,
    borderWidth: 1,
    borderRadius: 50,
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
