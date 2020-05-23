import actionTypes from "./actionTypes";
import { loginRequest } from "../../requests/index"
import { removeLocal, removeSession, saveLocal, saveSession } from "../../utils/stroage";

const startLogin = () => {
    return {
        type: actionTypes.START_LOGIN
    }
}

const loginSuccess = (userInfo) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: {
            userInfo
        }
    }
}
const loginFailed = () => {
    removeLocal('token')
    removeSession('token')
    removeLocal('userInfo')
    removeSession('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const login = (userInfo) => {
    return dispatch => {
        dispatch(startLogin())
        loginRequest(userInfo).then(resp => {
            if (resp.data.code === 200) {
                const {
                    token,
                    ...newUserInfo
                } = resp.data.data
                if (userInfo.remember === true) {
                    saveLocal('token', token)
                    saveLocal('userInfo', newUserInfo)
                } else {
                    saveSession('token', token)
                    saveSession('userInfo', newUserInfo)
                }
                dispatch(loginSuccess(resp.data.data))
            } else {
                dispatch(loginFailed())
            }
        })
    }
}

export const logout = () => {
    //告诉服务端用户已经退出
    return dispatch => {
        dispatch(loginFailed())
    }
}
