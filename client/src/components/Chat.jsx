export default function Chat () {
	return (
		<div className="flex flex-col place-items-center min-h-screen overflow-y-auto
			pt-25 pb-60">
			<div className="w-full max-w-3xl px-4">
				{/* Example messages */}
				{Array(30).fill().map((_, i) => (
					<div key={i} className="mb-2">
						Message {i + 1}
					</div>
				))}
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