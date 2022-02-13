function RoomButton({ room, handleRoomSelection }) {
	return (
		<div className="flex flex-col mb-3">
			<button
				className="px-3 w-52 lg:w-60 bg-orange-800 rounded-sm"
				key={room}
				onClick={handleRoomSelection}
				value={room}
			>
				{room}
			</button>
		</div>
	);
}

export default RoomButton;
