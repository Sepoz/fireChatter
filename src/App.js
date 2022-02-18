// ReactJS
import React, { useState, useContext } from "react";

import { signInWithRedirect, signOut } from "firebase/auth";

import { AuthContext } from "./contexts/AuthContext";

// Firebase
import { auth, provider } from "./firebase";

import MainNavbar from "./components/MainNavbar";
import FriendSearch from "./components/FriendSearch";
import RoomButton from "./components/RoomButton";
import Chat from "./components/Chat";

function App() {
	const { user, setUserNull, updateUserRooms } = useContext(AuthContext);
	const [selectedRoom, setSelectedRoom] = useState("");

	function signInUser() {
		signInWithRedirect(auth, provider)
			.then((result) => {
				console.log(result.user);
			})
			.catch((err) => console.log(err));
	}

	function signOutUser() {
		signOut(auth)
			.then(() => {
				console.log("sign out");
				setUserNull();
			})
			.catch((err) => console.log(err));
	}

	function handleRoomSelection(event) {
		const roomID = event.target.value;
		setSelectedRoom(roomID);
	}

	//console.log(user.userRooms);

	return (
		<div className="grid grid-cols-5 h-screen bg-slate-800 text-stone-50 text-xs lg:text-base">
			<div className="col-span-2 flex flex-col mb-2 p-5">
				<div>
					<MainNavbar
						user={user}
						signInUser={signInUser}
						signOutUser={signOutUser}
					/>
				</div>

				<div className="mt-5">
					{user ? (
						<FriendSearch
							user={user}
							updateUserRooms={updateUserRooms}
						/>
					) : null}
				</div>

				<div className="overflow-y-auto flex flex-col items-center mt-5">
					{user
						? user.userRooms.map((room) => (
								<RoomButton
									key={room.roomID}
									room={room.roomName}
									handleRoomSelection={handleRoomSelection}
								/>
						  ))
						: null}
				</div>
			</div>

			<div className="col-span-3 rounded-sm  bg-slate-700">
				{user ? (
					<Chat user={user} selectedRoom={selectedRoom} />
				) : (
					<h2>Accedi per visualizzare la chat</h2>
				)}
			</div>
		</div>
	);
}

export default App;
