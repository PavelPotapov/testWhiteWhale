import { useEffect, useRef, useState } from "react"
import { Button, Text, Box, Spinner, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { updateFiles } from "../../redux/mediaSlice"

import { uploadFiles } from "../../api/mediaAPI"
import { isValidSizeFile, iso8601ToDate } from "../../util"
import { CardElement } from "../../components/Card/CardElement"
import styles from "./Workspace.module.css"
import { Header } from "../../components/Header/Header"
import { DragDropFiles } from "../../components/DragDropFiles/DragDropFiles"
import { SpinnerWithNumber } from "../../components/ui/SpinnerWithNumber/SpinnerWithNumber"

const createFilesElements = (files) => {
	return files.map((file) => {
		return (
			<CardElement
				name={file.name}
				createdAt={iso8601ToDate(file.createdAt)}
				key={file.id}
				id={file.id}
				url={file.url}
				fileName={file.fileName}
			></CardElement>
		)
	})
}

export const Workspace = () => {
	const dispatch = useDispatch()
	const toast = useToast()
	const { files } = useSelector((state) => state.media)
	const [selectedFile, setSelectedFile] = useState("")
	const [tryingToSendFile, setTryingToSendFile] = useState(false)
	const [percentOfLoaded, setPercentOfLoaded] = useState("0 %")

	useEffect(() => {
		dispatch(updateFiles())
		document.title = "Workspace"
	}, [])

	const onUploadProgress = (progressEvent) => {
		const { loaded, total } = progressEvent
		let percent = Math.floor((loaded * 100) / total)
		console.log(percent, "!!!!")
		if (percent < 100) {
			setPercentOfLoaded(percent + "%")
		}
	}

	const onFileDrop = (file) => {
		if (isValidSizeFile(file[0])) {
			setSelectedFile(file[0])
		} else {
			toast({
				title: "Do not support a file type or size larger than 1MB",
				status: "error",
				isClosable: true,
			})
		}
	}

	const sendFile = (file) => {
		const formData = new FormData()
		formData.append("files[]", file)
		setTryingToSendFile(true)

		uploadFiles(formData, onUploadProgress)
			.then(() => {
				toast({
					title: "File uploaded",
					status: "success",
					isClosable: true,
				})
				//чистим стейт файла
				setSelectedFile(null)
				//обновляем состояние файлов
				dispatch(updateFiles())
			})
			.catch((err) => {
				toast({
					title: "File not uploaded. Max size 1 MB",
					status: "error",
					isClosable: true,
				})
			})
			.finally(() => {
				setTryingToSendFile(false)
			})
	}

	return (
		<Box>
			<Header></Header>
			<Box
				paddingTop={"40px"}
				display={"flex"}
				flexDirection={"row"}
				justifyContent={"center"}
				gap="30px"
				flexWrap={"wrap"}
			>
				<Box
					display={"flex"}
					maxW={"550px"}
					justifyContent={"center"}
					flexWrap={"wrap"}
					gap="25px"
				>
					{files.length === 0 ? (
						<Text fontSize={"2rem"}>File list empty 🗿</Text>
					) : (
						createFilesElements(files)
					)}
				</Box>
				<Box w={"360px"} className={styles.workspaceDrop}>
					<DragDropFiles onFileDrop={onFileDrop} />
					{tryingToSendFile ? (
						<Box
							marginTop={"25px"}
							display={"flex"}
							minH={"60px"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<SpinnerWithNumber number={percentOfLoaded} />
						</Box>
					) : (
						<Box marginTop={"20px"}>
							<Box fontWeight="600">
								<Text fontSize={"1.3rem"}>
									{selectedFile && "Your file 👇"}
								</Text>
								<Text paddingTop={"10px"}>{selectedFile?.name}</Text>
							</Box>
							{selectedFile && (
								<Box marginTop={"20px"} display={"flex"} gap="10px">
									<Button
										borderRadius={"0.375rem"}
										onClick={() => sendFile(selectedFile)}
										colorScheme="blue"
									>
										Upload file 🚀
									</Button>
									<Button
										borderRadius={"0.375rem"}
										onClick={() => setSelectedFile()}
										colorScheme="blue"
									>
										Clear file 🧹
									</Button>
								</Box>
							)}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}
