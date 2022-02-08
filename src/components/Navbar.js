// TRY CONDITIONAL CHAINING
import React from "react";

function Navbar({ user, signInUser, signOutUser }) {
	return (
		<div>
			<div>
				<h1>
					Chotter
				</h1>
			</div>

			<div>
				{user ? (
					<p>il tuo codice è: {user.userUID}</p>
				) : (
					<p>nessun user</p>
				)}
			</div>
			<div>
				{user ? (
					<button
						onClick={signOutUser}
					>
						Sign Out
					</button>
				) : (
					<button
						onClick={signInUser}
					>
						Sign In
					</button>
				)}
			</div>
		</div>
	);
}

export default Navbar;
