import { PageLoadingProvider } from "./context/pageLoadingContext"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Outlet } from "react-router-dom"

function AppWrapper() {
	return (
		<PageLoadingProvider>
			<ChakraProvider>
				<Provider store={store}>
					<Outlet />
				</Provider>
			</ChakraProvider>
		</PageLoadingProvider>
	)
}

export default AppWrapper
