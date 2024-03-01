import { createSlice } from "@reduxjs/toolkit"
import { getAllMedia } from "../api/mediaAPI"
import { logout } from "./userInfoSlice"

export const mediaSlice = createSlice({
	name: "media",
	initialState: {
		isLoading: false, //загружаются ли файлы с сервера
		isTryAddFile: false, //если мы хотим добавить какой-то файл, нужно для показа скелетонов
		files: [], //список файлов
	},
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload.statusLoading
		},
		toggleTryAddFile: (state, action) => {
			state.isTryAddFile = action.payload.status
		},
	},
})

export const { setFiles, setLoading, toggleTryAddFile } = mediaSlice.actions

export const mediaReducer = mediaSlice.reducer

/**
 * в случае подмененных куки, или истекших куки, или ошибки запроса получения файлов, куки удалятся и пользователь попадет на страницу входа. По правильному должна быть ручка на refresh cookies, в api ее не было
 */
export const updateFiles = () => {
	return async (dispatch) => {
		dispatch(setLoading({ statusLoading: true }))
		await getAllMedia()
			.then((res) => {
				dispatch(setFiles(res.data.files))
			})
			.catch((err) => {
				console.error(err)
				dispatch(logout())
			})
			.finally(() => {
				dispatch(setLoading({ statusLoading: false }))
			})
	}
}
