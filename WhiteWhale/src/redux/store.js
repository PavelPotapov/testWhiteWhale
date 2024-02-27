import { configureStore } from "@reduxjs/toolkit"
import { userInfoReducer } from "./userInfoSlice"
import { mediaReducer } from "./mediaSlice"

export const store = configureStore({
	reducer: {
		userInfo: userInfoReducer,
		media: mediaReducer,
	},
})
