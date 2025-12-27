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
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

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

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "rental_agreement.docx"
      a.click()

      URL.revokeObjectURL(url)
      alert("✅ Document downloaded successfully!")
    } catch (error) {
      alert("❌ " + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col gap-10">

      {/* Header */}
      <div className="max-w-5xl p-5 mt-10 mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Document Generator
        </h1>
        <p className="text-gray-500 mt-1">
          Select a template, fill details, and generate a downloadable document.
        </p>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Form Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Template Selection</h2>

          <select
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">— Select Template —</option>
            <option value="RENTAL_AGREEMENT">Rental Agreement</option>
          </select>

          {/* Form Fields */}
          {selectedTemplate ? (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              {Object.keys(formData).map((key) => (
                <div key={key} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replaceAll("_", " ")}
                  </label>

                  <input
                    type={key.includes("date") ? "date" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 rounded-lg font-medium transition 
                ${loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {loading ? "Generating..." : "Generate Document"}
              </button>
            </form>
          ) : (
            <p className="text-gray-500 text-center mt-6">
              Select a template to begin filling details.
            </p>
          )}
        </div>

        {/* Generated Docs Panel */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
          <GeneratedDocs />
        </div>

      </div>
    </div>
  )
}
