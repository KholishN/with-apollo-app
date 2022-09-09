import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null)


  const getAuthHeaders = () => {
    if (!authToken) return null

    return {
      Authorization: `Bearer ${authToken}`,
    }
  }

  function createApolloClient() {
    const httplink = new HttpLink({
      uri: 'https://dev-testappynse2.microgen.id/graphql',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link: httplink,
      cache: new InMemoryCache(),
    })
  }
  

  const signOut = () => {
    setAuthToken(null)
  }

  const signIn = async ({ email, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
    mutation ($email: EmailAddress!, $password: String) {
        login(input: { email: $email, password: $password }) {
          user {
            id
            firstName
            role
            email
          }
          token
        }
      }
    
    `
    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { email, password },
    })


    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token)
    }
  }

  const isSignedIn = () => {
    if (authToken) {
      return true
    } else {
      return false
    }
  }

  return {
    createApolloClient,
    signIn,
    signOut,
    isSignedIn,
  }
}