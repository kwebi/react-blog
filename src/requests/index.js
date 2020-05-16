import axios from 'axios'
import {message} from "antd";

const isDev = process.env.NODE_ENV==='development'
const service = axios.create({
    baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/254197':''
})

const loginService = axios.create({
    baseURL: isDev?'http://rap2.taobao.org:38080/app/mock/254197':''
})

service.interceptors.request.use((config)=>{
    config.data = Object.assign({},config.data,{
        //token: window.localStorage.getItem('token')
        token: '12345678'
    })
    return config
})

service.interceptors.response.use((resp)=>{
    if(resp.data.code === 200){
        return resp.data.data
    }else {
        message.error(resp.data.errMsg)
    }
})


//获取文章列表
export const getArticles = (offset = 0,limited = 5)=>{
    return service.post('/api/v1/articleList',{
        offset,
        limited
    })
}
//删除文章通过id
export const deleteArticleById = (id)=>{
    return service.post(`/api/v1/articleDelete/${id}`)
}

//获得文章通过id
export const getArticleById = (id)=>{
    return service.post(`/api/v1/article/${id}`)
}

//保存文章
export const saveArticle = (id,data)=>{
    return service.post(`/api/v1/articleEdit/${id}`,data)
}

//登录
export const loginRequest = (userInfo)=>{
    return loginService.post('/api/v1/login',userInfo)
}
