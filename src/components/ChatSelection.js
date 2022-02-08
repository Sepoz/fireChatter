import React, { useState } from "react";

import Chat from "./Chat";
import FriendSearch from "./FriendSearch";

function ChatSelection({ user, updateUserRooms }) {
	const [selectedRoom, setSelectedRoom] = useState("");

	function handleRoomSelection(event) {
		const roomID = event.target.value;
		setSelectedRoom(roomID);
	}

	return (
		<div>
			{user ? (
				<FriendSearch user={user} updateUserRooms={updateUserRooms} />
			) : null}

			{user
				? user.userRooms.map((room) => (
						<button
							key={room}
							onClick={handleRoomSelection}
							value={room}
						>
							{room}
						</button>
				  ))
				: null}

			{user ? (
				<Chat user={user} selectedRoom={selectedRoom} />
			) : (
				<h2>Accedi per visualizzare la chat</h2>
			)}
		</div>
	);
}

export default ChatSelection;
