import axios from "axios"
import Cookies from "js-cookie"
import { BACKEND_ADDRESS } from "../const"

export const baseAxios = axios.create({ baseURL: BACKEND_ADDRESS })

baseAxios.interceptors.request.use(
	(config) => {
		const accessToken = Cookies.get("access_token")

		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		} else {
			delete baseAxios.defaults.headers.common.Authorization
		}
		return config
	},

	(error) => Promise.reject(error)
)