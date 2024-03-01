import { createSlice } from "@reduxjs/toolkit"

export const pageLoadingSlice = createSlice({
	name: "pageLoading",
	initialState: {
		isLoading: true,
	},
	reducers: {
		setPageLoading: (state, action) => {
			state.isLoading = action.payload.status
		},
	},
})

export const { setPageLoading } = pageLoadingSlice.actions
export const pageLoadingReducer = pageLoadingSlice.reducer
