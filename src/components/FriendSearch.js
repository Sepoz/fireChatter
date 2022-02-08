import React, { useState } from "react";

// Firebase
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { firestore } from "../firebase";

function FriendSearch({ user, updateUserRooms }) {
	const [searchedUser, setSearchedUser] = useState("");
	const [status, setStatus] = useState("typing");
	const [error, setError] = useState(null);

	// what if the chat is already there?
	// the user should not be able to add again
	// if a chat is already in the userRooms array
	async function handleNewChat(event) {
		event.preventDefault();
		setStatus("submitting");

		try {
			const userRef = doc(firestore, "users", searchedUser);
			const docSnap = await getDoc(userRef);

			if (docSnap.exists()) {
				const roomRef = await addDoc(collection(firestore, "rooms"), {
					roomName: `${user.userUID + searchedUser}`,
					users: [user.userUID, searchedUser],
				});

				// add the new room to the user
				updateUserRooms(searchedUser, roomRef.id);
			} else {
				console.log("user not found");
			}

			setStatus("typing");
		} catch (error) {
			setStatus("typing");
			setError(error);
		}
	}

	return (
		<div>
			{error !== null && <p>{error}</p>}

			<form
				onSubmit={handleNewChat}
			>
				<h2>Aggiungi per chattare</h2>
				<input
					type="text"
					name="message"
					value={searchedUser}
					disabled={status === "submitting"}
					onChange={(event) => setSearchedUser(event.target.value)}
				/>
				<button
					type="submit"
					disabled={
						searchedUser.length === 0 || status === "submitting"
					}
				>
					Aggiungi
				</button>
			</form>
		</div>
	);
}

export default FriendSearch;
