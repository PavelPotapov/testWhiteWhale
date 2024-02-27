import { useContext, useEffect, useState } from "react"
import { pageLoadingContext } from "../context/pageLoadingContext"

import {
	Box,
	Input,
	Button,
	Text,
	FormControl,
	FormLabel,
	Heading,
	VStack,
	flattenTokens,
	useToast,
} from "@chakra-ui/react"

import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"
import { login as loginReduce } from "../redux/userInfoSlice"
import { login } from "../api/userInfoAPI"
import { useForm } from "react-hook-form"

export const SignIn = () => {
	const { setIsPageLoading } = useContext(pageLoadingContext)
	const dispatch = useDispatch()
	const { isAuthenticated } = useSelector((state) => state.userInfo)

	const [loginValue, setLoginValue] = useState("")
	const [password, setPassword] = useState("")

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const toast = useToast()
	const navigate = useNavigate()

	useEffect(() => {
		setIsPageLoading(false)
		document.title = "WhiteWhale | Sign in"
	}, [])

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/workspace")
		}
	}, [isAuthenticated])

	const onSubmit = (data) => {
		setIsPageLoading(true)
		login(data.email, data.password)
			.then((res) => {
				toast({
					title: "Hello!",
					status: "success",
				})
				dispatch(loginReduce({ email: data.email, name: data.name }))
				Cookies.set("access_token", res.data.token)
				navigate("/workspace")
			})
			.catch((err) => {
				toast({
					title: "error",
					status: "error",
				})
			})
			.finally(() => {
				setIsPageLoading(false)
			})
	}

	return (
		<Box
			display={"flex"}
			justifyContent={"center"}
			height={"100dvh"}
			alignItems={"center"}
		>
			<VStack
				spacing={8}
				maxW={"500px"}
				minW={"350px"}
				padding={"2rem"}
				as="form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading as="h2" size="xl">
					WhiteWhale
				</Heading>
				<FormControl>
					<Input
						type="text"
						placeholder="login"
						value={loginValue}
						onInput={(e) => setLoginValue(e.target.value)}
						{...register("email", {
							required: "Required",
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "Invalid email address",
							},
						})}
					/>
					{errors.email && (
						<Text color="red" fontSize="13px">
							{errors.email.message}
						</Text>
					)}
				</FormControl>
				<FormControl>
					<Input
						type="password"
						placeholder="password"
						value={password}
						onInput={(e) => setPassword(e.target.value)}
						{...register("password", {
							required: "Required",
						})}
					/>
					{errors.password && (
						<Text color="red" fontSize="13px">
							{errors.password.message}
						</Text>
					)}
				</FormControl>
				<Button colorScheme="blue" type="submit">
					Sign In
				</Button>
				<Box display={"flex"} justifyContent={"center"}>
					<Text>Didn't register? 👉&nbsp; </Text>
					<Text fontWeight={700}>
						<Link to="/sign_up">Sign Up</Link>
					</Text>
				</Box>
			</VStack>
		</Box>
	)
}
