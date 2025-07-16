export default function Navbar ({ user }) {

	return (
		<div className="flex justify-between items-center border-b border-gray-300 p-3 w-full">
			<div className="font-semibold text-blue-600">AI Legal Advisor</div>
			<div className="flex justify-center items-center">
				<div className="text-sm">{user.username}</div>
				<div className="bg-gray-300 px-5 py-3 rounded-4xl mx-1 text-lg">{user.username.charAt(0).toUpperCase()}</div>
			</div>
		</div>
	)
}