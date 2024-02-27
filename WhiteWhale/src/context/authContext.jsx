import { createContext } from "react"

const defaultState = {
	checkAuthorization: () => {},
	authorize: () => {},
	logout: () => {},
}

export const authContext = createContext(defaultState)

export function AuthProvider({ children }) {
	return <>{children}</>
}
