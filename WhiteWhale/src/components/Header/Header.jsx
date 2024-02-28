import { useCallback, useEffect, useState } from "react"
import { Button, Text, Box, Spinner, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"

export const Header = () => {
	const { files } = useSelector((state) => state.media)
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
						<Button colorScheme="blue">Logout 🖐</Button>
					</Text>
				</Box>
				<Box>
					<Text
						textAlign={"center"}
						fontWeight="600"
						title="Max count 20"
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
