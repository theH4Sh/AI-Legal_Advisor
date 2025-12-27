import { useState } from 'react'
import useSend from '../hooks/useSend'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function NewChat() {
	const [sending, setSending] = useState(false)
	const [newPrompt, setNewPrompt] = useState("")
	const [messages, setMessages] = useState([])
	const [loading, setLoading] = useState(null)
	const [isUrdu, setIsUrdu] = useState(false)
	const [botTyping, setBotTyping] = useState(false)

	const navigate = useNavigate()
	const { sendMessage } = useSend(import.meta.env.VITE_API + `chat/create/`)

	const handleSubmit = async () => {
		if (!newPrompt.trim()) return

		const formattedNewMsg = {
			id: Date.now(),
			sender: "user",
			content: newPrompt
		}

		setMessages(prev => [...prev, formattedNewMsg])
		setNewPrompt("")
		setSending(true)
		setBotTyping(true)

		const language = isUrdu ? "urdu" : "english"

		try {
			const res = await sendMessage(newPrompt, language)
			if (res) navigate(`/chat/${res.id}`)
			else toast.error("Failed to send message")
		} catch (err) {
			toast.error("Something went wrong: " + err)
		} finally {
			setSending(false)
			setBotTyping(false)
		}
	}

	const renderBotTyping = () => (
		<div className="flex my-2 justify-start">
			<div className="bg-gray-200 rounded-bl-none rounded-2xl px-4 py-3 max-w-[30%] flex items-center gap-1 animate-pulse">
				<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
				<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
				<div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
			</div>
		</div>
	)

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
			<div className="w-full max-w-3xl px-4">
				{loading && <div className="animate-pulse h-6 bg-gray-300 rounded my-2"></div>}

				{messages.length > 0 ? messages.map(msg => (
					<div key={msg.id} className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
						<div className={`text-start rounded-2xl px-5 py-3 max-w-[70%] shadow-md ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
							{msg.content}
						</div>
					</div>
				)) : (!loading && (
					<h1 className='text-4xl font-semibold text-gray-700 text-center mt-10'>
						What's on your mind, my G?
					</h1>
				))}

				{botTyping && renderBotTyping()}
			</div>

			{/* Message bar */}
			<div className="fixed bottom-0 my-3 w-[350px] md:w-full md:max-w-3xl bg-white/80 backdrop-blur-md rounded-4xl flex items-center px-3 shadow-lg">
				<textarea 
					rows={1}
					placeholder="Send a message"
					value={newPrompt}
					onChange={(e) => setNewPrompt(e.target.value)}
					className="flex-1 resize-none focus:outline-none w-full h-full overflow-auto p-3 rounded-3xl bg-gray-50 shadow-inner" 
				/>

				{/* Toggle */}
				<div className="flex items-center gap-2 p-1 border-l border-gray-300">
					<span className={`text-sm ${isUrdu ? "text-gray-400" : "text-black"}`}>Eng</span>
					<button
						onClick={() => setIsUrdu(!isUrdu)}
						className={`w-8 h-5 md:w-12 md:h-6 rounded-full transition-colors duration-300 ${isUrdu ? "bg-blue-500" : "bg-gray-300"} relative`}
					>
						<div className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${isUrdu ? "translate-x-4 md:translate-x-6" : "translate-x-0.5"}`}></div>
					</button>
					<span className={`text-sm ${isUrdu ? "text-black" : "text-gray-400"}`}>Urdu</span>
				</div>

				<button 
					onClick={handleSubmit}
					disabled={sending}
					className={`p-2 m-2 rounded-full cursor-pointer transition ${sending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</button>
			</div>
		</div>
	)
}
