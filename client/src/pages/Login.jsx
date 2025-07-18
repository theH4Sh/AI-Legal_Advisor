import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { login } from '../authSlice'

export default function Login() {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  
  useEffect(() => {
    console.log(formData)
  }, [formData]);
  
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch(import.meta.env.VITE_API + 'auth/jwt/create/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((data) => {
          console.log(data)
          throw new Error(data.detail)
        })
      }
      return res.json()
    })
    .then((data) => {
      console.log('login successful: ', data)
      dispatch(login(data))
      toast.success("Login successful! 🎉")
      localStorage.setItem('auth', JSON.stringify({
          username: data.username,
          access: data.access,
          refresh: data.refresh,
          isAuthenticated: true
      }))
      navigate('/chat')
    })
    .catch((err) => {
      console.log("your error: ", err)
      toast.error(`${err}`)
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-slate-50 shadow-2xl rounded-2xl max-w-sm w-full md:w-96 p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome</h2>
        <p className="text-center text-gray-500">Login to your account</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e93c3d]"
              placeholder="username or email"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e93c3d]"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#e93c3d] hover:bg-[#d13435] cursor-pointer text-white font-semibold rounded-lg transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to='/signup' className="text-[#e93c3d] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}