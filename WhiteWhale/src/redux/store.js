import { configureStore } from "@reduxjs/toolkit"
import { userInfoReducer } from "./userInfoSlice"
import { mediaReducer } from "./mediaSlice"
import { pageLoadingReducer } from "./pageLoadingSlice"

export const store = configureStore({
	reducer: {
		userInfo: userInfoReducer,
		media: mediaReducer,
		pageLoading: pageLoadingReducer,
	},
})
