import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllMedia } from "../api/mediaAPI"

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
	try {
		//По хорошему нужна отдельная ручка для проверки авторизации или типа того, сейчас я просто делаю запрос на файлы, и если он успешен - делаю вывод, что авторизация есть
		const response = await getAllMedia()
		if (response.status === 200) {
			//по сути возвращаю файлы...
			return response.data
		} else {
			throw new Error("some error")
		}
	} catch (error) {
		throw new Error("Error auth")
	}
})
