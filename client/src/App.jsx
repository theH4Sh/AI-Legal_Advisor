import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import RootLayout from './layout/RootLayout'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import NewChat from './pages/NewChat'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='chat' element={<NewChat />} />
        <Route path='chat/:chatId' element={<Home />} />
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
