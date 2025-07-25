import { useState } from 'react'

export default function Sidebar () {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<div className={`fixed hidden md:block w-16 h-screen bg-gray-400 flex-col justify-center place-items-center`}>
				{/*Sidbar Toggle*/}
				<button onClick={() => setIsOpen(!isOpen)} className="my-5 cursor-pointer">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
	  					<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
					</svg>
				</button>
				
				<div className={`flex-col place-items-center space-y-3`}>
					{/*New Chat*/}
					<div className="cursor-pointer p-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
	  						<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
						</svg>
					</div>

					{/*Search Chats*/}
					<div className="cursor-pointer p-2">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
	  						<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>
					</div>
				</div>
			</div>

			{/*Sidebar*/}
			<div className={`fixed top-0 left-0 z-50 w-65 h-screen 
			bg-white shadow-xl
			transform transition-transform duration-300
			${ isOpen ? 'hidden -translate-x-full' : 'block translate-x-0'}`}>
				{/*Exit Button*/}
				<div className="flex justify-end px-1 my-5">
					<button onClick={() => setIsOpen(!isOpen)} className="">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
						  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				{/*Options*/}
					<div className={`flex-col justify-start space-y-3`}>
					{/*New Chat*/}
					<div className="sidebar-items">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
	  						<path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
						</svg>
						<span>New Chat</span>
					</div>

					{/*Search Chats*/}
					<div className="sidebar-items">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
	  						<path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
						</svg>
						<span>Search Chats</span>
					</div>
				</div>

				{/*Chats*/}
				<div className="flex flex-col text-start my-5 mx-3 text-gray-500 text-sm">
					<h3>Chats</h3>
				</div>
			</div>
		</>
	)
}