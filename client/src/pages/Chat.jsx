import useFetch from '../hooks/useFetch'
import Navbar from '../components/Navbar'
export default function Chat () {
	const url = import.meta.env.VITE_API + 'auth/users/me/'
	const { data: user, error, loading } = useFetch(url)

	//if (loading) return <p>Loading</p>
	if (error) return <p>Error...</p>

	return(
		<div>
			{ user && <Navbar user={user} /> }
		</div>
	)
}