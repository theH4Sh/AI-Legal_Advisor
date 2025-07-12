import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import RootLayout from './layout/RootLayout'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='signup' element={<SignUp />} />
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
