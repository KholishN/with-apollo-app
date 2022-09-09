import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient'
import {AuthProvider} from "../lib/apolloClient"
import "../styles/index.css"

export default function App({ Component, pageProps }) {
  

  return (
    <AuthProvider >
      <Component {...pageProps} />
    </AuthProvider >
  )
}
