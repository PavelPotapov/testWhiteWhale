import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import {
	Box,
	Input,
	Button,
	Text,
	FormControl,
	Heading,
	VStack,
	useToast,
} from "@chakra-ui/react"

import { Link, useNavigate } from "react-router-dom"
import { registration } from "../api/userInfoAPI"
import { useDispatch, useSelector } from "react-redux"
import { routes } from "../const"
import { checkAuthSync } from "../redux/userInfoSlice"
import { handleError } from "../util"
import { setPageLoading } from "../redux/pageLoadingSlice"

export const SignUp = () => {
	const { isAuthenticated } = useSelector((state) => state.userInfo)
	const dispatch = useDispatch()
	const [loginValue, setLoginValue] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const toast = useToast()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(checkAuthSync())
		dispatch(setPageLoading({ status: false }))
		document.title = "WhiteWhale | Sign up"
	}, [])

	useEffect(() => {
		if (isAuthenticated) {
			navigate(routes.workspace)
		}
	}, [isAuthenticated])

	const onSubmit = (data) => {
		dispatch(setPageLoading({ status: true }))
		registration(data.email, data.password, data.name)
			.then(() => {
				toast({
					title: "Account created",
					status: "success",
					isClosable: true,
				})

				navigate(routes.singIn)
			})
			.catch((err) => {
				const errorMsg = handleError(err)
				toast({
					title: errorMsg,
					status: "error",
					isClosable: true,
				})
			})
			.finally(() => {
				dispatch(setPageLoading({ status: false }))
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
						placeholder="name"
						value={name}
						onInput={(e) => setName(e.target.value)}
						{...register("name", {
							required: "Required",
						})}
					/>
					{errors.name && (
						<Text color="red" fontSize="13px">
							{errors.name.message}
						</Text>
					)}
				</FormControl>
				<FormControl>
					<Input
						type="email"
						placeholder="email"
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
						placeholder="password"
						value={password}
						onInput={(e) => setPassword(e.target.value)}
						type="password"
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
				<FormControl>
					<Input
						placeholder="repeat password"
						// onInput={(e) => setPassword(e.target.value)}
						type="password"
						{...register("repeat_password", {
							required: "Required",
							validate: (val) => {
								if (watch("password") != val) {
									return "Passwords must match"
								}
							},
						})}
					/>
					{errors.repeat_password && (
						<Text color="red" fontSize="13px">
							{errors.repeat_password.message}
						</Text>
					)}
				</FormControl>
				<Button colorScheme="blue" type="submit">
					Sign Up
				</Button>
				<Box display={"flex"} justifyContent={"center"}>
					<Text>Already have acc? 👉&nbsp; </Text>
					<Text fontWeight={700}>
						<Link to={routes.singIn}>Sign In</Link>
					</Text>
				</Box>
			</VStack>
		</Box>
	)
}
