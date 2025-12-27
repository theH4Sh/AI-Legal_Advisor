import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'

export default function useFetch (url) {
	const token = useSelector(state => state.accessToken)

	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)


	const fetchData = async () => {
		setLoading(true)
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-Type": "application/json"
				}
			})

			if (response.ok) {
				const data = await response.json()
				console.log(data)
				setData(data)
				setLoading(false)
			} else {
				console.log(response)
				throw new Error("Failed to load user")
			}
		} catch (error) {
			setError(error)
			toast.error(`${error}`)
		}
	}

	useEffect(() => {
		fetchData()
	}, [token, url])
	return { data, error, loading }
}