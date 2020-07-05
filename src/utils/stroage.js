import cookie from 'react-cookies'

const expiresH = 3;//3小时

/**
 * 读取本地存储
 * @param {String} key
 */
export const getLocal = key => {
    const value = cookie.load(key)
    //console.log(value)
    if (!value) return null
    //return value.indexOf('{') === 0 || value.indexOf('[') === 0 ? JSON.parse(value) : value
    return value
}

/**
 * 本地存储
 * @param {String} key
 * @param {any} value
 */
export const saveLocal = (key, value) => {
    //const data = typeof value === 'object' ? JSON.stringify(value) : value
    const data = value
    const expires = new Date(Date.now() + 1000 * 60 * 60 * expiresH);//转换为绝对时间，以毫秒为单位
    cookie.save(key, data, {
        expires,
    })
}

/**
 * 删除本地存储
 * @param {String} key
 */
export const removeLocal = key => {
    cookie.remove(key)
}

/**
 * 读取会话存储
 * @param {String} key
 */
export const getSession = key => {
    const value = sessionStorage.getItem(key)
    if (!value) return null
    return value.indexOf('{') === 0 || value.indexOf('[') === 0 ? JSON.parse(value) : value
}

/**
 * 会话存储
 * @param {String} key
 * @param {any} value
 */
export const saveSession = (key, value) => {
    const data = typeof value === 'object' ? JSON.stringify(value) : value
    sessionStorage.setItem(key, data)
}

/**
 * 删除会话存储
 * @param {String} key
 */
export const removeSession = key => {
    sessionStorage.removeItem(key)
}

export const clearSession = () => {
    sessionStorage.clear()
}

// 获取 token
export function getToken() {
    let token = ''
    const userInfo = getLocal('userInfo')
    const sUserInfo = getSession('userInfo')
    if (userInfo) {
        token = 'Bearer ' + userInfo.token
    } else if (sUserInfo) {
        token = 'Bearer ' + sUserInfo.token
    }

    return token
}
