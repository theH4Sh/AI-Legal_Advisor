import { useState, useEffect } from 'react'
import useFetch from '../hooks/useFetch'

export default function Chat ({ chatId }) {
	const [messages, setMessages] = useState([])
	const url = import.meta.env.VITE_API + `chat/${chatId}/details/`
	const {data, loading, error} = useFetch(url)
	useEffect(() => {
		if (data) {
			setMessages(data.messages)
			console.log("data from API: ", messages)
		}
	}, [data])
	if (error) {
		console.log("Error in message: " + error)
	}
	return (
		<div className="flex flex-col place-items-center min-h-screen overflow-y-auto
			pt-25 pb-60">
			<div className="w-full max-w-3xl px-4">
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