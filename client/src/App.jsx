import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import RootLayout from './layout/RootLayout'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import NewChat from './pages/NewChat'
import GenerateDoc from './pages/GenerateDoc'
import { useSelector } from "react-redux"

function App() {

  const auth = useSelector(state => state.isAuthenticated)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={auth ? <Navigate to='/chat' /> : <Login />} />
        <Route path='signup' element={auth ? <Navigate to='/chat' /> : <SignUp />} />
        <Route path='chat' element={auth ? <NewChat /> : <Navigate to="/" />} />
        <Route path='chat/:chatId' element={auth ? <Home /> : <Navigate to="/" />} />
        <Route path='generate' element={auth ? <GenerateDoc /> : <Navigate to="/" />} />
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
