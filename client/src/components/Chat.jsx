import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

export default function Chat ({ chatId }) {
	const [messages, setMessages] = useState([])
	const url = import.meta.env.VITE_API + `chat/${chatId}/details/`
	const {data, loading, error} = useFetch(url)
	useEffect(() => {
		if (data) {
			setMessages(data.messages)
			console.log("data from API: ", data.messages)
		}
	}, [data])
	if (error) {
		console.log("Error in message: " + error)
	}
	return (
		<div className="flex flex-col place-items-center min-h-screen overflow-y-auto
			pt-25 pb-60">
			<div className="w-full max-w-3xl px-4">
				{loading && <p className="text-gray-400">Loading...</p>}
				{messages.length > 0 ? messages.map(msg => (
					<div key={msg.id} className={`flex my-2 ${ msg.sender == 'user' ? 'justify-end' : 'justify-start'}`}>
						<div className={`rounded-2xl px-3 py-2 max-w-[70%] ${ msg.sender == 'user' ? 'bg-blue-400 rounded-br-none' : 'bg-slate-200 rounded-bl-none'}`}>
							{msg.content}
						</div>
					</div>
					)) : (<div>No chats found</div>)
				}
				{/*{example}*/}
			</div>
			<div className="fixed bottom-0 my-3 w-[450px] md:w-full md:max-w-3xl bg-gray-200 rounded-4xl">
				<textarea 
					rows={3}
					placeholder="Send a message"
					className="flex-1 resize-none focus:outline-none w-full h-full overflow-hidden p-3" />
			</div>
		</div>
	)
}