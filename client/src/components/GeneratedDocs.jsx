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
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Failed to fetch documents")

        const data = await res.json()
        setDocs(data || [])
      } catch (err) {
        console.error(err)
        alert("❌ " + err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDocs()
  }, [token])

  return (
    <div className="w-full max-w-4xl">

      {/* Header */}
      <h2 className="text-xl font-semibold text-gray-900">
        Generated Documents
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Download documents you’ve generated earlier
      </p>

      {/* Loading State */}
      {loading && (
        <div className="space-y-3 mt-5">
          {[1,2,3].map(i => (
            <div
              key={i}
              className="h-16 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && docs.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-3">
            <span className="text-blue-600 text-lg">📄</span>
          </div>

          <p className="text-gray-800 font-medium">
            No documents generated yet
          </p>

          <p className="text-gray-500 text-sm mt-1">
            Generate your first document to see it here
          </p>
        </div>
      )}

      {/* Docs List */}
      {!loading && docs.length > 0 && (
        <div className="mt-5 space-y-3">

          {docs.map(doc => {
            const name = doc?.template_name?.replaceAll("_", " ") || "Untitled Document"
            const created = doc?.created_at
              ? new Date(doc.created_at).toLocaleString()
              : "—"

            return (
              <a
                key={doc.id}
                href={doc.file}
                download
                className="block border border-gray-200 rounded-2xl p-4 
                           hover:shadow-md hover:border-gray-300 
                           transition group"
              >
                <div className="flex items-start justify-between gap-4">

                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {name}
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Created: {created}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <span className="hidden sm:block text-gray-500 text-sm mr-1">
                      Download
                    </span>

                    <div className="p-2 rounded-lg bg-blue-600 text-white group-hover:bg-blue-700">
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor">
                        <path fillRule="evenodd"
                          d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Z"
                          clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                </div>
              </a>
            )
          })}
        </div>
      )}
    </div>
  )
}
