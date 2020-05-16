/**
 * 读取本地存储
 * @param {String} key
 */
export const getLocal = key => {
    const value = localStorage.getItem(key)
    if (!value) return null
    return value.indexOf('{') === 0 || value.indexOf('[') === 0 ? JSON.parse(value) : value
}

/**
 * 本地存储
 * @param {String} key
 * @param {any} value
 */
export const saveLocal = (key, value) => {
    const data = typeof value === 'object' ? JSON.stringify(value) : value
    localStorage.setItem(key, data)
}

/**
 * 删除本地存储
 * @param {String} key
 */
export const removeLocal = key => {
    localStorage.removeItem(key)
}

export const clearLocal = () => {
    localStorage.clear()
}

/**
 * 读取会话存储
 * @param {String} key
 */
export const getSession = key => {
    const value = localStorage.getItem(key)
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
    localStorage.setItem(key, data)
}

/**
 * 删除会话存储
 * @param {String} key
 */
export const removeSession = key => {
    localStorage.removeItem(key)
}

export const clearSession = () => {
    localStorage.clear()
}
