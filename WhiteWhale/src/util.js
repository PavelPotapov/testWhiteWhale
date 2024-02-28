export function iso8601ToDate(isoString) {
	const date = new Date(isoString)
	const year = date.getFullYear()
	const month = ("0" + (date.getMonth() + 1)).slice(-2) // добавляем 1, так как месяцы в JavaScript нумеруются с 0
	const day = ("0" + date.getDate()).slice(-2)
	const hours = ("0" + date.getHours()).slice(-2)
	const minutes = ("0" + date.getMinutes()).slice(-2)
	const seconds = ("0" + date.getSeconds()).slice(-2)
	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const isValidSizeFile = (file) => {
	if (!(file instanceof File)) {
		return false
	}
	// Проверяем размер файла
	//По тз максимальный размер 1МБ, я специально сделал больше (*1024), чтобы показать, как работает uploadOnProgress в момент отправки файла и отображаются проценты загрузки.
	//Бек по итогу все равно у себя сделал эту проверку 413 Request Entity Too Large
	const maxSizeInBytes = 1024 * 1024 * 1024
	if (file.size > maxSizeInBytes) {
		return false
	}

	// Размер файла не превышает 1 МБ
	return true
}

export function dataURItoBlob(dataURI, mimeType) {
	const blob = new Blob([dataURI], { type: mimeType })
	const imageUrl = URL.createObjectURL(blob)
	return imageUrl
}
