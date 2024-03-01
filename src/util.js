/**
 * Функция для обработки строки даты
 * @param {string} isoString
 */
export function formatDate(isoString) {
	const date = new Date(isoString)
	return `📅 ${date.getDay()}/${date.getMonth()}/${date.getFullYear()} - 🕥${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

/**
Проверяем размер файла
По тз максимальный размер 1МБ, я специально сделал больше (*1024), чтобы показать, как работает uploadOnProgress в момент отправки файла и отображаются проценты загрузки.
Бек по итогу все равно у себя сделал эту проверку 413 Request Entity Too Large
 * @param {File} file 
 * @returns {Boolean}
 */
export const isValidSizeFile = (file) => {
	if (!(file instanceof File)) {
		return false
	}
	const maxSizeInBytes = 1024 * 1024 * 1024
	return file.size < maxSizeInBytes
}
/**
 *
 * @param {string} dataURI Строка, представляющая собой data URI.
 * @param {string} mimeType Строка, представляющая собой data MIME type.
 * @returns
 */
export function urlToFile(dataURI, mimeType) {
	const blob = new Blob([dataURI], { type: mimeType })
	return URL.createObjectURL(blob)
}

/**
 * Функция для обработки ошибок сервера или сети, или во время обработки запроса
 * @param {AxiosError | Error} err - Error object
 * @returns {string}
 */
export function handleError(err) {
	let errorMsg
	if (err.response) {
		errorMsg = `${err.response.statusText}`
	} else if (err.request) {
		errorMsg = err.message
	}
	return errorMsg
}
