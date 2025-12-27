import useFetch from "../hooks/useFetch"

export default function Navbar({ toggleSidebar }) {
  const url = import.meta.env.VITE_API + "auth/users/me/"
  const { data: user, error } = useFetch(url)

  if (error) return <p>Error...</p>
  if (!user) return null

  return (
    <div className="fixed top-0 left-0 right-0 md:ml-16 h-16
      bg-white/90 backdrop-blur-sm border-b border-gray-200
      flex items-center justify-between px-4 z-40">

      {/* Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5"
            viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
          </svg>
        </button>

        <h1 className="text-lg font-semibold text-gray-800">
          AI Legal Advisor
        </h1>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">
          {user.username}
        </span>

        <div className="w-9 h-9 rounded-full bg-gray-900 text-white 
          flex items-center justify-center font-semibold shadow-sm">
          {user.username[0].toUpperCase()}
        </div>
      </div>
    </div>
  )
}
