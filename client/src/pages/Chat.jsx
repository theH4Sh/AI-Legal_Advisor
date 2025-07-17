import useFetch from '../hooks/useFetch'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Chat () {
	const url = import.meta.env.VITE_API + 'auth/users/me/'
	const { data: user, error, loading } = useFetch(url)

	if (error) return <p>Error...</p>

	return(
		<div className="flex">
			<Sidebar />
			<div className="w-full">
				{ user && <Navbar user={user} /> }
			</div>
		</div>
	)
}