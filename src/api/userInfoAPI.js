import { baseAxios } from "./axiosUtil"
import { endpoints } from "./endpoints"

export const login = (email, password) =>
	baseAxios.post(endpoints.login, {
		email,
		password,
	})

export const registration = (email, password, name) =>
	baseAxios.post(endpoints.register, { email, password, name })

export const logout = () => baseAxios.post(endpoints.logout)

