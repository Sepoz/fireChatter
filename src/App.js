// ReactJS
import React, { useContext } from "react";

import { signInWithRedirect, signOut } from "firebase/auth";

import { AuthContext } from "./contexts/AuthContext";

// Firebase
import { auth, provider } from "./firebase";

import MainNavbar from "./components/MainNavbar";
import ChatSelection from "./components/ChatSelection";

function App() {
	const { user, setUserNull, updateUserRooms } = useContext(AuthContext);

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

	return (
		<div>
			<MainNavbar
				user={user}
				signInUser={signInUser}
				signOutUser={signOutUser}
			/>

			<ChatSelection user={user} updateUserRooms={updateUserRooms} />
		</div>
	);
}

export default App;
