import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw Error('useUserContextt must be used inside a userContextProvider')
    }

    return context
}