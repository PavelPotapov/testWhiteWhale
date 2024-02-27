import { createContext, useState } from "react"
import { Container, Spinner } from "@chakra-ui/react"

const initialValue = {
	isPageLoading: true,
	setIsPageLoading: () => {},
}

export const pageLoadingContext = createContext(initialValue)

export const PageLoadingProvider = ({ children }) => {
	const [isPageLoading, setIsPageLoading] = useState(initialValue.isPageLoading)

	return (
		<pageLoadingContext.Provider
			value={{
				isPageLoading,
				setIsPageLoading,
			}}
		>
			{isPageLoading && (
				<Container
					bg="#E2E6EF"
					position="absolute"
					width="100vw"
					height="100vh"
					display="flex"
					alignItems="center"
					justifyContent="center"
					zIndex={999}
				>
					<Spinner width="2rem" height="2rem" />
				</Container>
			)}
			{children}
		</pageLoadingContext.Provider>
	)
}