import zipIcon from "./assets/zip.svg"
import audioIcon from "./assets/audio.svg"
import pdfIcon from "./assets/pfd.svg"
import videoIcon from "./assets/video.svg"
import defaultIcon from "./assets/default.svg"

export const mimieTypesIcons = {
	"text/plain": "path/to/png-icon.png",
	"audio/mpeg": audioIcon,
	"audio/wav": audioIcon,
	"video/mp4": videoIcon,
	"application/pdf": pdfIcon,
	"application/json": defaultIcon,
	"application/octet-stream": defaultIcon,
	"application/zip": zipIcon,
	default: defaultIcon,
	// Добавьте другие MIME-типы и соответствующие иконки по мере необходимости
}

/**
 * разрешенные mimie types, если файл, загруженный на сервер, не обладает типа из этого списка, для него будет выбрана дефолтная иконка
 */
export const allowedMimieType = [
	"image/png",
	"image/jpeg",
	"image/gif",
	"image/svg+xml",
]
