import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

function useAuthContext() {
	const { user, setUserNull, updateUserRooms } = useContext(AuthContext);
	if (!{ user }) {
		throw Error("Did not received user data!");
	} else {
		return { user, setUserNull, updateUserRooms };
	}
}

export default useAuthContext;
