import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom"
import AppWrapper from "./AppWrapper"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<AppWrapper/>}>
			<Route exact path="sign_in" element={<SignIn />} />
			<Route exact path="sign_up" element={<SignUp />} />
		</Route>
	)
)

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
