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
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Workspace } from "./pages/workspace/Workspace"
import { checkAuth } from "./redux/authThunks"
import Cookies from "js-cookie"

const AuthRequired = () => {
	const navigate = useNavigate()
	const { isAuthenticated } = useSelector((state) => state.userInfo)
	useEffect(() => {
		if (!isAuthenticated) navigate("/sign_in")
	}, [])

	if (isAuthenticated) return <Outlet />
}

const CheckAuth = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(checkAuth())
	}, [dispatch])
	return <Outlet />
}

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<AppWrapper />}>
			<Route element={<CheckAuth />}>
				<Route exact path="sign_in" element={<SignIn />} />
				<Route exact path="sign_up" element={<SignUp />} />
				<Route element={<AuthRequired />}>
					<Route path="*" element={<Navigate to="workspace" />} />
					<Route exact path="/workspace" element={<Workspace />} />
				</Route>
			</Route>
		</Route>
	)
)

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
