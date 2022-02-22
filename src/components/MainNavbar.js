// TRY CONDITIONAL CHAINING
import React, { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

function MainNavbar({ signInUser, signOutUser }) {
	const { user } = useContext(AuthContext);

	return (
		<div className="container bg-transparent border-b-2 border-orange-800 font-sans">
			<div className="flex justify-between mb-2">
				<div className="flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10 flex self-center"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
						<path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
					</svg>
					<h1 className="flex self-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-800">
						FireChat
					</h1>
				</div>

				{user ? (
					<button
						className="px-3 h-8 text-xs lg:text-base bg-orange-800 rounded-sm"
						onClick={signOutUser}
					>
						Sign Out
					</button>
				) : (
					<button
						className="px-3 h-8 text-xs lg:text-base bg-orange-800 rounded-sm"
						onClick={signInUser}
					>
						Sign In
					</button>
				)}
			</div>

			<div className="mb-2">
				{user ? (
					<p className="font-semibold">
						Il tuo codice è: {user.userUID}
					</p>
				) : (
					<p className="font-semibold">Nessun user</p>
				)}
			</div>
		</div>
	);
}

export default MainNavbar;
