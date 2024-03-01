import { createSlice } from "@reduxjs/toolkit"
import { checkAuth } from "./authThunks"
import Cookies from "js-cookie"

export const userInfoSlice = createSlice({
	name: "userInfo",
	initialState: {
		user: {
			email: "",
			name: "",
		},
		isAuthenticated: false,
		loading: false,
	},
	reducers: {
		login: (state, action) => {
			state.user = action.payload
			state.isAuthenticated = true
		},
		logout: (state) => {
			Cookies.remove("access_token")
			state.user = null
			state.isAuthenticated = false
		},
		checkAuthSync: (state) => {
			if (Cookies.get("access_token")) {
				state.isAuthenticated = true
			} else {
				state.isAuthenticated = false
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(checkAuth.pending, (state) => {
				state.loading = true
			})
			.addCase(checkAuth.fulfilled, (state) => {
				//api не предоставляет возможность получить name и email пользователя
				//state.user = action.payload
				state.isAuthenticated = true
				state.loading = false
			})
			.addCase(checkAuth.rejected, (state) => {
				state.loading = false
			})
	},
})

export const { login, logout, checkAuthSync } = userInfoSlice.actions

export const userInfoReducer = userInfoSlice.reducer
