import { useCallback, useContext, useEffect, useState } from "react"
import { Button, Text, Box, Spinner, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import Cookies from "js-cookie"
import { logout } from "../../redux/userInfoSlice"
import { setFiles } from "../../redux/mediaSlice"
import { useNavigate } from "react-router-dom"
import { pageLoadingContext } from "./../../context/pageLoadingContext"
import { logout as logoutAPI } from "../../api/userInfoAPI"

export const Header = () => {
	const { files } = useSelector((state) => state.media)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const toast = useToast()
	const { setIsPageLoading } = useContext(pageLoadingContext)

	const handleLogout = () => {
		setIsPageLoading(true)
		logoutAPI()
			.then(() => {
				Cookies.remove("access_token")
				dispatch(logout())
				dispatch(setFiles([]))
				navigate("/sign_in")
				toast({
					title: "You logout",
					status: "success",
					isClosable: true,
				})
			})
			.catch(() => {
				toast({
					title: "You not logout",
					status: "error",
					isClosable: true,
				})
			})
			.finally(() => {
				setIsPageLoading(false)
			})
	}

	return (
		<Box maxW={"930px"} margin={"0 auto"} paddingTop={"20px"}>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				flexDirection={"row-reverse"}
				alignItems={"center"}
				bgColor={"gray.100"}
				padding={"20px 20px"}
				borderRadius={"20px"}
			>
				<Box>
					<Text textAlign={"center"} fontWeight="600">
						<Button colorScheme="blue" onClick={() => handleLogout()}>
							Logout 🖐
						</Button>
					</Text>
				</Box>
				<Box>
					<Text
						textAlign={"center"}
						fontWeight="600"
						title="Max count 19"
						cursor={"pointer"}
						fontSize={"1.3rem"}
					>
						📚 Files : {files.length}
					</Text>
				</Box>
			</Box>
		</Box>
	)
}
