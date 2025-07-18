export default function Navbar ({ user }) {

	return (
		<div className="fixed top-0 left-0 right-0 md:ml-16 bg-white 
			flex justify-between items-center border-b border-gray-300 
			p-3 h-16">
			{/*Sidbar Toggle*/}
			<button className="md:hidden my-5 cursor-pointer">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
				</svg>
			</button>
			<div className="font-semibold text-blue-600">AI Legal Advisor</div>
			<div className="flex justify-center items-center">
				<div className="text-sm">{user.username}</div>
				<div className="bg-gray-300 px-5 py-3 rounded-4xl mx-1 text-lg">{user.username.charAt(0).toUpperCase()}</div>
			</div>
		</div>
	)
}