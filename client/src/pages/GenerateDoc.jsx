import { useState } from "react"
import { useSelector } from "react-redux"
import GeneratedDocs from "../components/GeneratedDocs"

export default function GenerateDoc() {
	const token = useSelector(state => state.accessToken)

	const templates = {
		RENTAL_AGREEMENT: {
			landlord_name: "",
			landlord_address: "",
			tenant_name: "",
			tenant_address: "",
			property_address: "",
			rental_period: "",
			start_date: "",
			end_date: "",
			monthly_rent: "",
			security_deposit: "",
			notice_period: "",
			date: "",
		},
		// You can add more templates later, e.g.
		// EMPLOYMENT_CONTRACT: { employer_name: "", employee_name: "", salary: "", start_date: "", end_date: "" }
	}

	const [selectedTemplate, setSelectedTemplate] = useState("")
	const [formData, setFormData] = useState({})
	const [loading, setLoading] = useState(false)

	const handleTemplateChange = (e) => {
		const template = e.target.value
		setSelectedTemplate(template)
		setFormData(templates[template] || {})
	}

	const handleInputChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)
		console.log("template vlue: ", selectedTemplate)
		try {
			const res = await fetch("http://localhost:8000/chat/generate-doc/", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					template_name: selectedTemplate,
					context: formData,
					save: true,
				}),
			})

			if (!res.ok) throw new Error("Failed to generate document")

			// Convert response to a blob (Word file)
			const blob = await res.blob()
			const url = window.URL.createObjectURL(blob)
			const a = document.createElement("a")
			a.href = url
			a.download = "rental_agreement.docx"
			document.body.appendChild(a)
			a.click()
			a.remove()
			window.URL.revokeObjectURL(url)
			alert("✅ Document downloaded successfully!")
		} catch (error) {
			console.error(error)
			alert("❌ " + error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
			<div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 border border-gray-100">
				<h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
					Generate Document
				</h1>

				<div className="mb-6">
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Select Template
					</label>
					<select
						className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={selectedTemplate}
						onChange={handleTemplateChange}
					>
						<option value="">-- Select Template --</option>
						<option value="RENTAL_AGREEMENT">Rental Agreement</option>
						{/* Add more templates here */}
					</select>
				</div>

				{selectedTemplate && (
					<form onSubmit={handleSubmit} className="space-y-4">
						{Object.keys(formData).map((key) => (
							<div key={key}>
								<label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
									{key.replaceAll("_", " ")}
								</label>
								<input
									type={
										key.toLowerCase().includes("date")
											? "date"
											: "text"
									}
									name={key}
									value={formData[key]}
									onChange={handleInputChange}
									className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						))}

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
						>
							Generate Document
						</button>
					</form>
				)}

				{!selectedTemplate && (
					<p className="text-gray-500 text-center mt-6">
						Please select a template to fill out the details.
					</p>
				)}
			</div>
			<GeneratedDocs />
		</div>
	)
}
