import React, { useState } from "react";

// Firebase
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../firebase";

// Hooks
import useGetMessages from "../hooks/useGetMessages";

// Components
import Message from "./Message";

function Chat({ user, selectedRoom }) {
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("typing");
	const [error, setError] = useState(null);

	const messages = useGetMessages(selectedRoom);

	console.log(messages);

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
		<div className="flex flex-col h-screen p-3">
			{/* TODO use message uid as key for map */}
			<ul className="overflow-auto flex flex-col-reverse">
				{messages.map((msg) => {
					return <Message msg={msg} />;
				})}
			</ul>

			{error !== null && <p>{error}</p>}

			<form
				className="flex justify-center pt-5"
				onSubmit={handleNewMessage}
			>
				<input
					className="w-3/4 bg-slate-800 rounded-sm"
					type="text"
					name="message"
					value={message}
					disabled={status === "submitting"}
					onChange={(event) => setMessage(event.target.value)}
				/>
				<button
					className="px-3 text-xs lg:text-base bg-orange-800 rounded-sm"
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
