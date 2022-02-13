// TO DO!

// auth the user here
// make the user context available in all the app

// for now is not the required solution

import React, { createContext, useState, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";

// Firebase
import { getDoc, doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, firestore } from "../firebase";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [user, setUser] = useState(null);

	/* 	
	how to update the user object when the userRooms is modified
	
	- set up an event that updates the local value 
	and the db value and keep using the local one 
	*/

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				// get the user from the database
				const docRef = doc(firestore, "users", user.uid);
				const docSnap = await getDoc(docRef);

				// add the user to the db if it's not in it already
				if (docSnap.exists()) {
					console.log("user already in store", docSnap.data());

					setUser(docSnap.data());
				} else {
					console.log("user added to firestore");

					const userData = {
						userName: user.displayName,
						userEMail: user.email,
						userImage: user.photoURL,
						userUID: user.uid,
						userRooms: [],
					};

					await setDoc(doc(firestore, "users", user.uid), userData);

					setUser(userData);
				}
			} else {
				console.log("user not signed in");
			}
		});
	}, []);

	function setUserNull() {
		setUser(null);
	}

	// update both users's userRooms with the new room id
	async function updateUserRooms(friendID, roomID) {
		// ref user
		const userRef = doc(firestore, "users", user.userUID);

		// ref friend
		const friendRef = doc(firestore, "users", friendID);

		// update user
		const userSnap = await updateDoc(userRef, {
			userRooms: arrayUnion(roomID),
		});

		// update friend
		const friendSnap = await updateDoc(friendRef, {
			userRooms: arrayUnion(roomID),
		});

		// does it return the updated object?
		// setUser the returned object
		console.log("docSnap", userSnap, friendSnap);
	}

	const value = {
		user,
		setUserNull,
		updateUserRooms,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export default AuthContextProvider;
