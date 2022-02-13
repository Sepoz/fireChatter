import React from "react";

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

export default Message;
