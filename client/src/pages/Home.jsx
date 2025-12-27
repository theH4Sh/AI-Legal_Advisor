import useFetch from '../hooks/useFetch'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import NewChat from '../pages/NewChat'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Home () {
	const { chatId } = useParams()

	return(
		<div className="flex">
			<div className="w-full h-screen">
				<main>
					{chatId ? <Chat chatId={chatId} /> : <p>No chats</p> }
				</main>
			</div>
		</div>
	)
}