import { createSlice } from "@reduxjs/toolkit"


export const userInfoSlice = createSlice({
	name: "userInfo",
	initialState: {
		email: "",
		name: "",
		files: [],
	},
	reducers: {
		setFiles: (state, action) => {
			state.files = action.payload
		},
	},
})

export const { setFiles } = userInfoSlice.actions

export const userInfoReducer = userInfoSlice.reducer
