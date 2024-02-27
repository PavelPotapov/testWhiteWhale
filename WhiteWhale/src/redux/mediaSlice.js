import { createSlice } from "@reduxjs/toolkit"
import { getAllMedia } from "../api/mediaAPI"

export const mediaSlice = createSlice({
	name: "media",
	initialState: {
		files: [],
	},
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload
		},
	},
})

export const { setFiles } = mediaSlice.actions

export const mediaReducer = mediaSlice.reducer

export const updateFiles = (setIsPageLoading = () => {}) => {
	return async (dispatch) => {
		await getAllMedia().then((res) => {
			dispatch(setFiles(res.data.files))
		})
		setIsPageLoading(false)
	}
}
