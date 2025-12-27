import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import { logout } from '../authSlice'

export default function Sidebar({ isOpen, setIsOpen }) {
  const token = useSelector(state => state.accessToken)
  const url = import.meta.env.VITE_API + 'chat/'
  const { data, error } = useFetch(url)
  const [chats, setChats] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem('auth')
    navigate('/')
    setIsOpen(true)
  }

  useEffect(() => {
    if (data) setChats(data)
  }, [data])

  const handleDelete = async (chatId) => {
    try {
      const res = await fetch(`${url}${chatId}/details/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        setChats(prev => prev.filter(chat => chat.id !== chatId))
      }
    } catch (err) {
      console.log(err)
    }
  }

  if (error) console.log(error)

  return (
    <>
      {/* ===== COLLAPSED MINI SIDEBAR ===== */}
      <div className="fixed hidden md:flex w-16 h-screen bg-gray-900 text-white flex-col items-center py-6 border-r border-gray-800">

        {/* Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-xl hover:bg-gray-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor"
            className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        {/* Divider */}
        <div className="w-8 h-px bg-gray-700 my-5" />

        {/* Mini Nav */}
        <div className="flex flex-col space-y-4">

          {/* New Chat */}
          <Link to="/chat" className="p-3 rounded-xl hover:bg-gray-800 transition flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor"
              className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" />
            </svg>
          </Link>

          {/* Generate Doc */}
          <Link to="/generate" className="p-3 rounded-xl hover:bg-gray-800 transition flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor"
              className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </Link>

        </div>
      </div>

      {/* ===== EXPANDED SIDEBAR ===== */}
      <div className={`
        fixed top-0 left-0 z-50 w-72 h-screen
        bg-white shadow-2xl border-r border-gray-200
        transition-transform duration-300
        ${isOpen ? "-translate-x-full" : "translate-x-0"}
      `}>

        {/* Header */}
        <div className="flex justify-between items-center px-4 py-4">
          <h2 className="font-semibold text-gray-700">Menu</h2>

          <button onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              strokeWidth={1.5} stroke="currentColor"
              className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Actions */}
        <div className="px-4 space-y-2">

          <Link to="/chat" onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition">
            <span>🗨️</span>
            <span className="font-medium">New Chat</span>
          </Link>

          <Link to="/generate"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition">
            <span>📄</span>
            <span className="font-medium">Generate Documents</span>
          </Link>

        </div>

        <div className="mt-4 border-t border-gray-200" />

        {/* Chats */}
        <div className="px-4 mt-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Recent Chats
          </h3>

          <ul className="mt-2 space-y-1 max-h-[360px] overflow-y-auto pr-1">

            {chats?.map(chat => {
              const preview = chat.messages?.[0]?.content || "Untitled Chat"

              return (
                <li key={chat.id}
                  className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">

                  <Link
                    to={`chat/${chat.id}`}
                    onClick={() => setIsOpen(true)}
                    className="text-sm text-gray-700 truncate w-[80%]"
                  >
                    {preview.slice(0, 30)}
                    {preview.length > 30 && '…'}
                  </Link>

                  <button
                    onClick={() => handleDelete(chat.id)}
                    className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition"
                  >
                    🗑️
                  </button>
                </li>
              )
            })}

          </ul>
        </div>

        {/* Logout */}
        <div className="absolute bottom-5 left-0 w-full px-5">
          <button
            onClick={handleLogout}
            className="w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition flex items-center justify-center gap-2"
          >
            ⏻ Logout
          </button>
        </div>

      </div>
    </>
  )
}
