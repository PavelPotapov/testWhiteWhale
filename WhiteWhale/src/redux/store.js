import { configureStore } from "@reduxjs/toolkit"
import { userInfoReducer } from "./userInfoSlice"

export const store = configureStore({
	reducer: {
		userInfo: userInfoReducer,
	},
})
