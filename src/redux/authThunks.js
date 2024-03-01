import { createAsyncThunk } from "@reduxjs/toolkit"
import { getAllMedia } from "../api/mediaAPI"

/**
 * Нужна отдельная ручка для проверки авторизации и для refresh token. Пока эту функцию не использую и проверяю авторизацию при наличии куки. Если их подменят или запрос за файлами не удастся - logout пользователя
 */
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
	try {
		
		const response = await getAllMedia()
		if (response.status === 200) {
			//по сути возвращаю файлы...
			return response.data
		}
	} catch (error) {
		throw new Error("Error auth", error)
	}
})
