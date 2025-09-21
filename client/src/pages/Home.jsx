import useFetch from '../hooks/useFetch'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Home () {
	const { chatId } = useParams()

	const url = import.meta.env.VITE_API + 'auth/users/me/'
	const { data: user, error, loading } = useFetch(url)

	if (error) return <p>Error...</p>

	const [isOpen, setIsOpen] = useState(false)

	return(
		<div className="flex">
			<Sidebar />
			<div className="w-full h-screen">
				{ user && <Navbar user={user} /> }
				<main>
					{chatId ? <Chat chatId={chatId} /> : <p>What's on your mind?</p>}
				</main>
			</div>
		</div>
	)
}