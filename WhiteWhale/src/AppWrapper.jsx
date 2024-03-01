import { PageLoadingProvider } from "./context/pageLoadingContext"
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Outlet } from "react-router-dom"
import { PageLoading } from "./context/PageLoading"

function AppWrapper() {
	return (
		<PageLoading>
			<PageLoadingProvider>
				<ChakraProvider>
					<Provider store={store}>
						<Outlet />
					</Provider>
				</ChakraProvider>
			</PageLoadingProvider>
		</PageLoading>
	)
}

export default AppWrapper
