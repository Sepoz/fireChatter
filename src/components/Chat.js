import React, { useState } from "react";

// Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";

// Hooks
import useGetMessages from "../hooks/useGetMessages";

function Chat({ user, selectedRoom }) {
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("typing");
	const [error, setError] = useState(null);

	const messages = useGetMessages(selectedRoom);

	async function handleNewMessage(event) {
		event.preventDefault();
		setStatus("submitting");

		try {
			const collectionRef = collection(
				firestore,
				"rooms",
				selectedRoom,
				"messages"
			);

			const messagePayload = {
				author: user.userName,
				message: message,
				image: user.userImage,
				createdAt: serverTimestamp(),
			};

			const docRef = await addDoc(collectionRef, messagePayload);

			setMessage("");
			setStatus("typing");

			console.log("Document: ", docRef);
		} catch (error) {
			setStatus("typing");
			setError(error);
		}
	}

	return (
		<div>
			<h2>Chat</h2>

			{/* TODO use message uid as key for map */}
			<ul>
				{messages.map((msg) => {
					return (
						<li>
							<div>
								<img
									
									src={msg.image}
									alt="immagine utente"
								></img>
								<p>
									{msg.message}
								</p>
								<p>
									{msg.author}
								</p>
							</div>
						</li>
					);
				})}
			</ul>

			{error !== null && <p>{error}</p>}

			<form onSubmit={handleNewMessage}>
				<input
					type="text"
					name="message"
					value={message}
					disabled={status === "submitting"}
					onChange={(event) => setMessage(event.target.value)}
				/>
				<button
					type="submit"
					disabled={message.length === 0 || status === "submitting"}
				>
					Invia
				</button>
			</form>
		</div>
	);
}

export default Chat;
