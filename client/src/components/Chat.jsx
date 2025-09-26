import { useState, useEffect, useRef } from 'react'
import useFetch from '../hooks/useFetch'
import useSend from '../hooks/useSend'
import { toast } from 'react-hot-toast'

export default function Chat ({ chatId }) {
	const [messages, setMessages] = useState([])
	const url = import.meta.env.VITE_API + `chat/${chatId}/details/`
	const {data, loading, error} = useFetch(url)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		if (data) {
			setMessages(data.messages)
			console.log("data from API: ", data.messages)
		}
	}, [data])
	if (error) {
		console.log("Error in message: " + error)
		toast.error("Failed to load chat: " + error)
	}

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const [newPrompt, setNewPrompt] = useState("")

	const { sendMessage } = useSend(import.meta.env.VITE_API + `chat/${chatId}/message/`)

	const handleSubmit = async () => {
		const formattedNewMsg = {
			id: Date.now(),
			sender: "user",
			content: newPrompt
		}
		setMessages(prev => [...prev, formattedNewMsg])
		setNewPrompt("")

		try {
			const res = await sendMessage(newPrompt)
			if (res) {
				console.log("response:", res.bot)
				setMessages(prev => [...prev, res.bot])
			} else {
				toast.error("Failed to send message")
			}
		} catch (err) {
			toast.error("Something went wrong: " + err)
		}

		console.log("updated: ", messages)
	}

	return (
		<div className="flex flex-col place-items-center min-h-screen overflow-y-auto
			pt-25 pb-60">
			<div className="w-full max-w-3xl px-4">
				{loading && <p className="text-gray-400">Loading...</p>}
				{messages.length > 0 ? messages.map(msg => (
					<div key={msg.id} className={`flex my-2 ${ msg.sender == 'user' ? 'justify-end' : 'justify-start'}`}>
						<div className={` text-start rounded-2xl px-3 py-2 max-w-[70%] ${ msg.sender == 'user' ? 'bg-blue-400 rounded-br-none' : 'bg-slate-200 rounded-bl-none'}`}>
							{msg.content}
						</div>
					</div>
					)) : (<div>No chats found</div>)
				}
				<div ref={messagesEndRef} />
			</div>
			<div className="fixed bottom-0 my-3 w-[450px] md:w-full md:max-w-3xl bg-gray-200 rounded-4xl flex place-items-center">
				<textarea 
					rows={1}
					placeholder="Send a message"
					value={newPrompt}
					onChange={(e) => setNewPrompt(e.target.value)}
					className="flex-1 resize-none focus:outline-none w-full h-full overflow-auto p-3" 
				/>
				<button 
					onClick={handleSubmit}
					className="bg-blue-500 p-2 m-2 rounded-full cursor-pointer hover:bg-blue-400 transition transition-delay">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
					  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</button>
			</div>
		</div>
	)
}