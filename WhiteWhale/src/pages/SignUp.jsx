import { useContext, useEffect, useState } from "react"
import { pageLoadingContext } from "../context/pageLoadingContext"
import { useForm } from "react-hook-form"
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
import { registration } from "../api/userInfoAPI"
import { useSelector } from "react-redux"

export const SignUp = () => {
	const { setIsPageLoading } = useContext(pageLoadingContext)
	const { isAuthenticated } = useSelector((state) => state.userInfo)

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
		setIsPageLoading(false)
		document.title = "WhiteWhale | Sign up"
	}, [])

	useEffect(() => {
		if (isAuthenticated) {
			navigate("/workspace")
		}
	}, [isAuthenticated])

	const onSubmit = (data) => {
		setIsPageLoading(true)
		registration(data.email, data.password, data.name)
			.then((res) => {
				toast({
					title: "Account created",
					status: "success",
				})

				navigate("/sign_in")
			})
			.catch((err) => {
				const errorMsg = err.response.data.errors.email[0]
				toast({
					title: errorMsg,
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
						<Link to="/sign_in">Sign In</Link>
					</Text>
				</Box>
			</VStack>
		</Box>
	)
}
