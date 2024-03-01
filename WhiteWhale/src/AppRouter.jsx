import {
	Navigate,
	Outlet,
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
	useNavigate,
} from "react-router-dom"
import AppWrapper from "./AppWrapper"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { Workspace } from "./pages/workspace/Workspace"
import routes from "./routes"

const AuthRequired = () => {
	const navigate = useNavigate()
	const { isAuthenticated } = useSelector((state) => state.userInfo)
	useEffect(() => {
		if (!isAuthenticated) navigate(routes.singIn)
	}, [isAuthenticated, navigate])
	if (isAuthenticated) return <Outlet />
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<AppWrapper />}>
			<Route exact path={routes.singIn} element={<SignIn />} />
			<Route exact path={routes.signUp} element={<SignUp />} />
			<Route element={<AuthRequired />}>
				<Route path="*" element={<Navigate to={routes.workspace} />} />
				<Route exact path={routes.workspace} element={<Workspace />} />
			</Route>
		</Route>
	)
)

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
