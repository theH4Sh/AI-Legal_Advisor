import { useState, useEffect, useRef } from 'react'
import useFetch from '../hooks/useFetch'
import useSend from '../hooks/useSend'
import { toast } from 'react-hot-toast'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chat({ chatId }) {
	const [messages, setMessages] = useState([])
	const [isUrdu, setIsUrdu] = useState(false)
	const [sending, setSending] = useState(false)
	const [newPrompt, setNewPrompt] = useState("")

	const url = import.meta.env.VITE_API + `chat/${chatId}/details/`
	const { data, loading, error } = useFetch(url)
	const messagesEndRef = useRef(null)

	useEffect(() => {
		if (data) setMessages(data.messages)
	}, [data])

	if (error) toast.error("Failed to load chat: " + error)

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages])

	const { sendMessage } = useSend(import.meta.env.VITE_API + `chat/${chatId}/message/`)
	const [botTyping, setBotTyping] = useState(false)

	const handleSubmit = async () => {
		if (!newPrompt.trim()) return
		const formattedNewMsg = { id: Date.now(), sender: "user", content: newPrompt }
		setMessages(prev => [...prev, formattedNewMsg])
		setNewPrompt("")
		setSending(true)
		setBotTyping(true)

		const language = isUrdu ? "urdu" : "english"

		try {
			const res = await sendMessage(newPrompt, language)
			if (res) setMessages(prev => [...prev, res.bot])
			else toast.error("Failed to send message")
		} catch (err) {
			toast.error("Something went wrong: " + err)
		} finally {
			setSending(false)
			setBotTyping(false)
		}
	}

	const renderSkeletons = () => {
		return Array.from({ length: 4 }).map((_, i) => {
			const isUser = i % 2 === 0
			return (
				<div key={i} className={`flex my-2 ${isUser ? 'justify-end' : 'justify-start'} animate-pulse`}>
					<div className={`rounded-2xl px-5 py-3 max-w-[70%] ${isUser ? 'bg-blue-500/80 rounded-br-none' : 'bg-gray-300/70 rounded-bl-none h-6 md:h-8'}`}>&nbsp;</div>
				</div>
			)
		})
	}

	const renderBotTyping = () => {
		return (
			<div className="flex my-2 justify-start">
				<div className="bg-gray-300/80 rounded-bl-none rounded-2xl px-5 py-3 max-w-[30%] flex items-center gap-1">
					<div className="w-2 h-2 bg-gray-500 rounded-full animate-wave"></div>
					<div className="w-2 h-2 bg-gray-500 rounded-full animate-wave delay-200"></div>
					<div className="w-2 h-2 bg-gray-500 rounded-full animate-wave delay-400"></div>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center min-h-screen overflow-y-auto pt-25 pb-60 bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="w-full max-w-3xl px-4">
				{loading && renderSkeletons()}

				{!loading && messages.length > 0 ? messages.map(msg => (
					<div key={msg.id} className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
						<div className={`prose break-words text-start rounded-2xl px-5 py-3 max-w-[70%] shadow-md ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none text-sm md:text-md'}`}>
							<ReactMarkdown remarkPlugins={[remarkGfm]}>
								{msg.content}
							</ReactMarkdown>
						</div>
					</div>
				)) : (!loading && <div className="text-gray-400 mt-5 text-center">No chats found</div>)}

				{botTyping && renderBotTyping()}
				<div ref={messagesEndRef} />
			</div>

			{/* message bar */}
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
						className={`w-8 h-5 md:w-12 md:h-6 rounded-full transition-colors duration-300 ${isUrdu ? "bg-blue-600" : "bg-gray-300"} relative`}
					>
						<div className={`w-4 h-4 md:w-5 md:h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-300 ${isUrdu ? "translate-x-4 md:translate-x-6" : "translate-x-0.5"}`}></div>
					</button>
					<span className={`text-sm ${isUrdu ? "text-black" : "text-gray-400"}`}>Urdu</span>
				</div>

				<button
					onClick={handleSubmit}
					disabled={sending}
					className={`p-2 m-2 rounded-full cursor-pointer transition ${sending ? "bg-gray-400 cursor-not-allowed" : 'bg-blue-600 hover:bg-blue-500'}`}
				>
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
					</svg>
				</button>
			</div>

			{/* Tailwind animation for wave typing */}
			<style>{`
				@keyframes wave {
					0%, 60%, 100% { transform: translateY(0); }
					30% { transform: translateY(-4px); }
				}
				.animate-wave {
					animation: wave 1s infinite;
				}
				.animate-wave.delay-200 { animation-delay: 0.2s; }
				.animate-wave.delay-400 { animation-delay: 0.4s; }
			`}</style>
		</div>
	)
}
