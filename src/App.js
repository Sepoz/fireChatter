// ReactJS
import React, { useState } from "react";

// Hooks
import useAuthContext from "./hooks/useAuthContext";

// Firebase
import { auth, provider } from "./firebase";
import { signInWithRedirect, signOut } from "firebase/auth";

import MainNavbar from "./components/MainNavbar";
import FriendSearch from "./components/FriendSearch";
import Rooms from "./components/Rooms";
import Chat from "./components/Chat";

function App() {
	let { user, setUserNull } = useAuthContext();
	const [selectedRoom, setSelectedRoom] = useState("");

	function signInUser() {
		signInWithRedirect(auth, provider)
			.then((result) => {
				console.log("sign in");
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

	return (
		<div className="grid grid-cols-5 h-screen bg-slate-800 text-stone-50 text-xs lg:text-base">
			<div className="col-span-2 flex flex-col mb-2 p-5">
				<div>
					<MainNavbar
						signInUser={signInUser}
						signOutUser={signOutUser}
					/>
				</div>

				<div className="mt-5">{user ? <FriendSearch /> : null}</div>

				<div className="overflow-y-auto flex flex-col items-center mt-5">
					<Rooms handleRoomSelection={handleRoomSelection} />
				</div>
			</div>

			<div className="col-span-3 rounded-sm  bg-slate-700">
				{user ? (
					<Chat selectedRoom={selectedRoom} />
				) : (
					<h2>Accedi per visualizzare la chat</h2>
				)}
			</div>
		</div>
	);
}

export default App;
