import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import RootLayout from './layout/RootLayout'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'
import Home from './pages/Home'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='chat' element={<Home />}>
          <Route path=':chatId' element={<Home />} />
        </Route>
      </Route>
    )
  )

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
