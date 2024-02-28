import React from "react"
import { useDropzone } from "react-dropzone"

export const DragDropFiles = ({ onFileDrop }) => {
	const {
		getRootProps: getDropzoneRootProps,
		getInputProps: getDropzoneInputProps,
		isDragActive: isDropzoneDragActive,
	} = useDropzone({
		onDrop: onFileDrop,
	})

	return <div>DragDropFiles</div>
}
