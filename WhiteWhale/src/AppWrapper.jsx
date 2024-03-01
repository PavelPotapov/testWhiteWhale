import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { Outlet } from "react-router-dom"
import { PageLoading } from "./components/PageLoading/PageLoading"
import { theme } from "./theme"

function AppWrapper() {
	return (
		<ChakraProvider theme={theme}>
			<Provider store={store}>
				<PageLoading>
					<Outlet />
				</PageLoading>
			</Provider>
		</ChakraProvider>
	)
}

export default AppWrapper
