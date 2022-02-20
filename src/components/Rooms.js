import React from "react";

export default function Rooms({ user, handleRoomSelection }) {
	return (
		<div>
			{user
				? user.userRooms.map((room) => (
						<RoomButton
							key={room.roomID}
							room={room}
							handleRoomSelection={handleRoomSelection}
						/>
				  ))
				: null}
		</div>
	);
}

function RoomButton({ room, handleRoomSelection }) {
	return (
		<div className="flex flex-col mb-3">
			<button
				className="px-3 w-52 lg:w-60 bg-orange-800 rounded-sm"
				onClick={handleRoomSelection}
				value={room.roomID}
			>
				{room.roomName}
			</button>
		</div>
	);
}
