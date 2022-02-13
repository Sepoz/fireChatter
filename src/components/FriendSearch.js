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
		<div className="flex justify-center content-center">
			{error !== null && <p>{error}</p>}

			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-5 w-5 self-center"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path d="M9 9a2 2 0 114 0 2 2 0 01-4 0z" />
				<path
					fillRule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z"
					clipRule="evenodd"
				/>
			</svg>

			<form className="flex" onSubmit={handleNewChat}>
				<input
					className="bg-slate-700 rounded-sm"
					type="text"
					name="message"
					value={searchedUser}
					disabled={status === "submitting"}
					onChange={(event) => setSearchedUser(event.target.value)}
				/>
				<button
					className="px-3 text-xs lg:text-base bg-orange-800 rounded-sm"
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
