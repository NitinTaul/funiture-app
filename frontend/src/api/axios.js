import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem("refreshToken")

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
          { refreshToken }
        )

        localStorage.setItem(
          "accessToken",
          res.data.accessToken
        )

        originalRequest.headers.Authorization =
          "Bearer " + res.data.accessToken

        return api(originalRequest)
      } catch (err) {
        localStorage.clear()
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  }
)

export default api