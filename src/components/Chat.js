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

			await addDoc(collectionRef, messagePayload);

			setMessage("");
			setStatus("typing");
		} catch (error) {
			setStatus("typing");
			setError(error);
		}
	}

	return (
		<div className="flex flex-col justify-end h-screen p-3">
			<ul className="overflow-auto flex flex-col-reverse">
				{messages.map((msg) => {
					return <Message key={msg.id} msg={msg.data()} />;
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

function Message({ msg }) {
	return (
		<li className="flex justify-start items-center p-2 mb-3 bg-slate-800 rounded-sm">
			<img
				className="rounded-full w-5 lg:w-10 -left-8"
				src={msg.image}
				alt="immagine utente"
			></img>

			<div className="flex flex-col pl-3">
				<p className="text-slate-400 font-semibold text-xs">
					{msg.author}
				</p>
				<p>{msg.message}</p>
			</div>
		</li>
	);
}

export default Chat;
