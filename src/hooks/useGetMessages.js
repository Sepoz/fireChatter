import { useState, useEffect } from "react";

// Firebase
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";

// TO DO
// add the possibility to modify the query
function useGetMessages(selectedRoom) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		if (!selectedRoom) {
			console.log("nessuna chat selezionata");
		} else {
			// room variable is the id of the collection
			const messagesRef = collection(
				firestore,
				"rooms",
				selectedRoom,
				"messages"
			);

			const q = query(messagesRef, orderBy("createdAt", "desc"));

			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				let messagesArray = [];

				querySnapshot.forEach((doc) => {
					messagesArray.push(doc);
				});

				setMessages([...messagesArray]);
			});

			return function removeListener() {
				unsubscribe();
			};
		}
	}, [selectedRoom]);

	return messages;
}

export default useGetMessages;
