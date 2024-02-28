import { useDropzone } from "react-dropzone"
import { Text, Box, Spinner, useToast } from "@chakra-ui/react"

export const DragDropFiles = ({ onFileDrop }) => {
	const {
		getRootProps: getDropzoneRootProps,
		getInputProps: getDropzoneInputProps,
		isDragActive: isDropzoneDragActive,
	} = useDropzone({
		onDrop: onFileDrop,
	})

	return (
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
	)
}
