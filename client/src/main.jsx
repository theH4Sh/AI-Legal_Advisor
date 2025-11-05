import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"
import { store } from './store.js'
import { login } from './authSlice.js'

const authData = JSON.parse(localStorage.getItem('auth'))

if (authData && authData.access && authData.refresh && authData.isAuthenticated) {
  console.log("localStorage to Redux: ", authData)
  store.dispatch(login(authData))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
