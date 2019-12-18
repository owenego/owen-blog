import qs from 'qs'
import axios from 'axios'

const axiosConfig = {
    baseURL: process.env.NODE_ENV==='development'?'/':'https://owen-blog-node.herokuapp.com:1998',
    transformResponse: [(data) => {
        return data
    }],
    transformRequest: [(data) => {
        return qs.stringify(data)
    }],
    timeout: 30000,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

const service = axios.create(axiosConfig)

service.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (res) => {
        return res.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default service