import { createSlice } from "@reduxjs/toolkit"

export const pageLoadingSlice = createSlice({
	name: "pageLoadingSlice",
	initialState: {
		isLoading: false,
	},
	reducers: {
		setPageLoading: (state, action) => {
			state.isLoading = action.payload.status
		},
	},
})

export const { setPageLoading } = pageLoadingSlice.actions
export const userInfoReducer = pageLoadingSlice.reducer
