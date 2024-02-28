import { baseAxios } from "./axiosUtil"
import { endpoints } from "./endpoints"

export const getAllMedia = () => baseAxios.get(endpoints.media)

export const getMedia = (id) => baseAxios.get(`${endpoints.media}/${id}`)

export const deleteMedia = (id) => baseAxios.delete(`${endpoints.media}/${id}`)

export const uploadFiles = async (formData, onUploadProgress) =>
	baseAxios.post(`${endpoints.media}/upload`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		onUploadProgress,
	})

export const loadResources = (url) =>
	baseAxios.get(url, {
		responseType: "blob",
	})
