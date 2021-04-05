import { Provider } from 'react-redux'
import NextNprogress from 'nextjs-progressbar';
import  store from '../store'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextNprogress options={{ showSpinner: false }}/>
      <Component {...pageProps} />
    </Provider>
  )
}