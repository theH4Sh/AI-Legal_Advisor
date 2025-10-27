import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function GeneratedDocs() {
	const [docs, setDocs] = useState([])
	const [loading, setLoading] = useState(true)
	const token = useSelector(state => state.accessToken)

	useEffect(() => {
		const fetchDocs = async () => {
			try {
				const res = await fetch("http://localhost:8000/chat/get-generated-docs/", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				if (!res.ok) throw new Error("Failed to fetch documents")
				const data = await res.json()
				setDocs(data)
			} catch (error) {
				console.error(error)
				alert("❌ " + error.message)
			} finally {
				setLoading(false)
			}
		}
		fetchDocs()
	}, [token])

	return (
		<div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
			<div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl">
				<h1 className="text-2xl font-bold mb-6 text-center">
					Your Generated Documents
				</h1>

				{loading ? (
					<p className="text-center text-gray-500">Loading documents...</p>
				) : docs.length === 0 ? (
					<p className="text-center text-gray-500">
						You haven’t generated any documents yet.
					</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full border border-gray-200 rounded-lg">
							<thead className="bg-gray-50">
								<tr>
									<th className="p-3 text-left">Template Name</th>
									<th className="p-3 text-left">Created</th>
									<th className="p-3 text-left">Download</th>
								</tr>
							</thead>
							<tbody>
								{docs.map((doc) => (
									<tr key={doc.id} className="border-t">
										<td className="p-3">{doc.template_name}</td>
										<td className="p-3">
											{new Date(doc.created_at).toLocaleString()}
										</td>
										<td className="p-3">
											<a
												href={doc.file}
												download
												className="text-blue-600 hover:underline"
											>
												Download
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}
