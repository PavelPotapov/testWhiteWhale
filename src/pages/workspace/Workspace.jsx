import { useEffect, useState } from "react"
import { Button, Text, Box, useToast } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { toggleTryAddFile, updateFiles } from "../../redux/mediaSlice"
import { uploadFiles } from "../../api/mediaAPI"
import { isValidSizeFile, formatDate, handleError } from "../../util"
import { CardElement } from "../../components/Card/CardElement"
import styles from "./Workspace.module.css"
import { Header } from "../../components/Header/Header"
import { DragDropFiles } from "../../components/DragDropFiles/DragDropFiles"
import { SpinnerWithNumber } from "../../components/ui/SpinnerWithNumber/SpinnerWithNumber"
import SceletonLoaderCard from "../../components/ui/SceletonLoader/SceletonLoaderCard"

//Создание карточек
const createFilesElements = (files) => {
	return files.map((file) => {
		return (
			<CardElement
				name={file.name}
				createdAt={formatDate(file.createdAt)}
				key={file.id}
				id={file.id}
				url={file.url}
				fileName={file.fileName}
			></CardElement>
		)
	})
}

//Создание скелетона перед показом файлов
const createSceletonLoaderCard = (count) => {
	return [
		...Array(count)
			.fill(0)
			.map((_, index) => {
				return <SceletonLoaderCard key={index} />
			}),
	]
}

export const Workspace = () => {
	const dispatch = useDispatch()
	const toast = useToast()
	const { files, isLoading, isTryAddFile } = useSelector((state) => state.media)
	const [selectedFile, setSelectedFile] = useState("")
	const [percentOfLoaded, setPercentOfLoaded] = useState("0 %")

	//Отслеживание загрузки файла на сервер
	const onUploadProgress = (progressEvent) => {
		const { loaded, total } = progressEvent
		let percent = Math.floor((loaded * 100) / total)
		if (percent < 100) {
			setPercentOfLoaded(percent + "%")
		}
	}

	//Обработка дропа файла в dropzone
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

	//Отправка файла на сервер
	const sendFile = (file) => {
		const formData = new FormData()
		formData.append("files[]", file)

		dispatch(toggleTryAddFile({ status: true }))
		uploadFiles(formData, onUploadProgress)
			.then(() => {
				toast({
					title: "File uploaded",
					status: "success",
					isClosable: true,
				})

				setSelectedFile(null)
				dispatch(updateFiles())
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
				dispatch(toggleTryAddFile({ status: false }))
			})
	}

	//Пытаемся получить файлы
	useEffect(() => {
		dispatch(updateFiles())
		document.title = "Workspace"
	}, [])
	
	const renderFileCards = () => {
		if (isLoading) {
			return createSceletonLoaderCard(19)
		} else if (files.length !== 0) {
			return createFilesElements(files)
		} else {
			return <Text fontSize={"2rem"}>File list empty 🗿</Text>
		}
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
					{renderFileCards()}
				</Box>
				<Box w={"360px"} className={styles.workspaceDrop}>
					<DragDropFiles onFileDrop={onFileDrop} />
					{/* Пытаемся ли отправить файл на сервер */}
					{isTryAddFile ? (
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
