import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

export default function useSend (url) {
	const token = useSelector(state => state.accessToken)

	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)


	const sendMessage = async (postData, language) => {
		setLoading(true)
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ content: postData, language: language })
			})

			if (response.ok) {
				const data = await response.json()
				console.log(data)
				return data
			} else {
				console.log(response)
				throw new Error("Failed to load Message")
			}
		} catch (error) {
			setError(error)
			toast.error(`${error}`)
		} finally {
			setLoading(false)
		}
	}

	return { sendMessage, error, loading }
}