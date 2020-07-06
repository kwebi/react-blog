import axios from 'axios'
import { message } from 'antd'
import { getToken } from '../utils/stroage'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://localhost:6543' : 'http://rap2.taobao.org:38080/app/mock/254197'
})

const loginService = axios.create({
    baseURL: isDev ? 'http://localhost:6543' : 'http://rap2.taobao.org:38080/app/mock/254197'
})


service.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.common['Authorization'] = token
    }
    return config
}, error => {
    message.error('bed request')
    Promise.reject(error)
})

let timer
service.interceptors.response.use(resp => {
    if (resp.data.code === 200) {
        return resp.data.data
    }
}, err => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    clearTimeout(timer)
    timer = setTimeout(() => {
        if (err.response) {
            const { status, data } = err.response
            switch (status) {
                case 401:
                    message.error((data && data.message) || '登录信息过期或未授权，请重新登录！')
                    break
                default:
                    message.error(data.message || `连接错误 ${status}！`)
                    break
            }
        } else {
            message.error(err.message)
        }
    }, 200) // 200 毫秒内重复报错则只提示一次！

    return Promise.reject(err)
})


//获取文章列表
export const getArticles = (offset = 0, limit = 5) => {
    return service.get('/article', {
        params: {
            offset,
            limit
        }
    })
}
//删除文章通过id
export const deleteArticleById = (id) => {
    return service.delete(`/article/${id}`)
}

//获得文章通过id
export const getArticleById = (id) => {
    return service.get(`/article/${id}`)
}

//保存文章
export const saveArticle = (id, data) => {
    return service.post(`/article/${id}`, data)
}

//创建文章
export const createArticle = (data) => {
    return service.post(`/article`, data)
}

//登录
export const loginRequest = (userInfo) => {
    return loginService.post('/login', userInfo)
}

//注册
export const registerRequest = (userInfo) => {
    return loginService.post('/register', userInfo)
}

//设置个人信息
export const setting = (userInfo) => {
    return service.put(`/user/${userInfo.userId}`, userInfo)
}

//获取个人信息
export const getSettingById = (id) => {
    return service.get(`/user/${id}`)
}