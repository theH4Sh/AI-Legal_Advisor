import useFetch from '../hooks/useFetch'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

export default function Home () {
	const url = import.meta.env.VITE_API + 'auth/users/me/'
	const { data: user, error, loading } = useFetch(url)

	if (error) return <p>Error...</p>

	return(
		<div className="flex">
			<Sidebar />
			<div className="w-full h-screen">
				{ user && <Navbar user={user} /> }
				<main>
					<Chat />
				</main>
			</div>
		</div>
	)
}