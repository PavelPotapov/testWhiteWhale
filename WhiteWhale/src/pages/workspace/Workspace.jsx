import { useCallback, useEffect, useState } from "react"
import { Button, Text, Box, Spinner, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { updateFiles } from "../../redux/mediaSlice"

import { useDropzone } from "react-dropzone"
import { uploadFiles } from "../../api/mediaAPI"
import { isValidSizeFile, iso8601ToDate } from "../../util"
import { CardElement } from "../../components/Card/CardElement"
import styles from "./Workspace.module.css"
import { Header } from "../../components/Header/Header"

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

	useEffect(() => {
		dispatch(updateFiles())
		document.title = "Workspace"
	}, [])

	useEffect(() => {
		console.log(files)
	}, [files])

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
		uploadFiles(formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
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
			.catch(() => {
				toast({
					title: "File not uploaded",
					status: "error",
					isClosable: true,
				})
			})
			.finally(() => {
				setTryingToSendFile(false)
			})
	}

	const {
		getRootProps: getDropzoneRootProps,
		getInputProps: getDropzoneInputProps,
		isDragActive: isDropzoneDragActive,
	} = useDropzone({
		onDrop: onFileDrop,
	})

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
					<Box
						height={"180px"}
						bgColor={"gray.100"}
						cursor={"pointer"}
						borderRadius={"20px"}
						display={"flex"}
						alignItems={"center"}
						justifyContent={"center"}
						{...getDropzoneRootProps()}
						style={{
							WebkitBoxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
							MozBoxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
							boxShadow: "11px 9px 10px 2px rgba(34, 60, 80, 0.24)",
						}}
						transition={"transform .3s ease"}
						_hover={{
							transform: "scale(1.05)",
						}}
					>
						<input {...getDropzoneInputProps()} />
						{!isDropzoneDragActive ? (
							<Text textAlign={"center"} fontWeight="600">
								Drag 'n' drop some files here, or click to select files 🎯
							</Text>
						) : (
							<Text textAlign={"center"} fontWeight="600">
								Drop files 🗳️
							</Text>
						)}
					</Box>
					{tryingToSendFile ? (
						<Box
							display={"flex"}
							minH={"60px"}
							justifyContent={"center"}
							alignItems={"center"}
						>
							<Spinner></Spinner>
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
										borderRadius={"20px"}
										onClick={() => sendFile(selectedFile)}
									>
										Send file
									</Button>
									<Button
										borderRadius={"20px"}
										onClick={() => setSelectedFile()}
									>
										Clear file
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
