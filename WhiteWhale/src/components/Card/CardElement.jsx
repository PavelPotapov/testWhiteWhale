import { useEffect, useState } from "react"
import {
	Card,
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
	Spinner,
	useToast,
} from "@chakra-ui/react"

import { useDispatch, useSelector } from "react-redux"
import { updateFiles, setFiles } from "../../redux/mediaSlice"
import { deleteMedia, loadResources } from "../../api/mediaAPI"
import { dataURItoBlob } from "../../util"
import { allowedMimieType, mimieTypesIcons } from "../../mimieTypes"
import styles from "./Card.module.css"

export const CardElement = ({ id, name, url, createdAt, fileName }) => {
	const [isTryingToDelete, setIsTryingToDelete] = useState(false)
	const [isTryingToLoadResources, setIsTryingToLoadResources] = useState(false)
	const [file, setFile] = useState(null)
	const [imageUrl, setImageUrl] = useState(null)

	const { files } = useSelector((state) => state.media)

	const toast = useToast()
	const dispatch = useDispatch()

	const handleDelete = () => {
		setIsTryingToDelete(true)
		deleteMedia(id)
			.then(() => {
				toast({
					title: "File was deleted",
					status: "success",
					isClosable: true,
				})
				dispatch(setFiles(files.filter((file) => file.id !== id)))
			})
			.catch(() => {
				toast({
					title: "File was not deleted",
					status: "error",
					isClosable: true,
				})
			})
			.finally(() => {
				setIsTryingToDelete(false)
				dispatch(updateFiles())
			})
	}

	useEffect(() => {
		setIsTryingToLoadResources(true)
		let urlToIcon
		let urlToFile
		loadResources(url)
			.then((res) => {
				const mimeType = res.headers["content-type"]
				const data = res.data
				urlToFile = dataURItoBlob(data, mimeType)
				if (allowedMimieType.includes(mimeType)) {
					urlToIcon = urlToFile
				} else {
					if (mimeType in mimieTypesIcons) {
						urlToIcon = mimieTypesIcons[mimeType]
					} else {
						urlToIcon = mimieTypesIcons.default
					}
				}
				setImageUrl(urlToIcon)
				setFile(urlToFile)
			})
			.catch((err) => {
				console.error(err)
				urlToIcon = mimieTypesIcons.default
			})
			.finally(() => {
				setIsTryingToLoadResources(false)
			})
	}, [])

	return (
		<Box>
			{isTryingToDelete ? (
				<Box
					w={"257px"}
					h={"261px"}
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
					bgColor={"gray.100"}
					borderRadius={"20px"}
					style={{
						WebkitBoxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
						MozBoxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
						boxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
					}}
				>
					<Spinner></Spinner>
				</Box>
			) : (
				<Card
					w={"257px"}
					style={{
						WebkitBoxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
						MozBoxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
						boxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
					}}
					bgColor={"gray.100"}
				>
					<CardBody>
						<Box
							w={"50px"}
							aspectRatio={"1/1"}
							display={"flex"}
							alignItems={"center"}
							justifyContent={"center"}
						>
							{isTryingToLoadResources ? (
								<Spinner></Spinner>
							) : (
								<Image
									src={imageUrl ? imageUrl : mimieTypesIcons.default}
									alt={name}
									borderRadius="lg"
									objectFit={"contain"}
									maxH={"100%"}
								/>
							)}
						</Box>
						<Stack mt="6" spacing="3">
							<Heading size="m" className={styles.overflowText}>
								{fileName}
							</Heading>
							<Text color="blue.600" fontSize="xs">
								{createdAt}
							</Text>
						</Stack>
					</CardBody>
					<CardFooter display={"flex"} justifyContent={"space-between"}>
						<ButtonGroup spacing="2">
							<Button
								variant="solid"
								colorScheme="whiteAlpha"
								onClick={handleDelete}
								padding={"0px 30px"}
								fontSize={"1.5rem"}
							>
								🗑️
							</Button>
						</ButtonGroup>
						<ButtonGroup spacing="2" as="a" href={file} download>
							<Button
								variant="solid"
								colorScheme="whiteAlpha"
								padding={"0px 30px"}
								w={"100%"}
								fontSize={"1.5rem"}
							>
								💾
							</Button>
						</ButtonGroup>
					</CardFooter>
				</Card>
			)}
		</Box>
	)
}
