import { useEffect } from "react"
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	ButtonGroup,
	Button,
	Stack,
	Image,
	Heading,
	Text,
	Divider,
	Box,
} from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { updateFiles } from "../redux/mediaSlice"
import viteImg from "../../public/vite.svg"

const CardElement = ({ image, name, fileName, createdAt }) => {
	return (
		<Card maxW="sm">
			<CardBody>
				<Image src={viteImg} alt={name} borderRadius="lg" />
				<Stack mt="6" spacing="3">
					<Heading size="md">{name}</Heading>
					<Text>{fileName}</Text>
					<Text color="blue.600" fontSize="2xl">
						{createdAt}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
			<CardFooter>
				<ButtonGroup spacing="2">
					<Button variant="solid" colorScheme="blue">
						Delete
					</Button>
				</ButtonGroup>
			</CardFooter>
		</Card>
	)
}

const createFiles = (files) => {
	files.map((file, index) => {
		return (
			<CardElement
				name="name"
				fileName="filename"
				createdAt="2025"
				key={index}
			></CardElement>
		)
	})
}

export const Workspace = () => {
	const dispatch = useDispatch()
	const { files } = useSelector((state) => state.media)

	useEffect(() => {
		dispatch(updateFiles())
	}, [])

	return (
		<Box>
			<Box
				paddingTop={"40px"}
				display={"flex"}
				justifyContent={"center"}
				gap="30px"
			>
				<Box display={"flex"} maxW={"1650px"} justifyContent={"center"}>
					{files.length === 0 ? (
						<Text fontSize={"2rem"}>File list empty 🗿</Text>
					) : (
						createFiles(files)
					)}
				</Box>
				<Box>
					<Button>Загрузить что-то новенькое</Button>
				</Box>
			</Box>
		</Box>
	)
}
