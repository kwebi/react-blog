import actionTypes from "./actionTypes";
import { loginRequest } from "../../requests/index"
import { removeLocal, removeSession, saveLocal, saveSession } from "../../utils/stroage";
import { message } from "antd";

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
            console.log(resp.data.data)
            if (resp.data.code === 200) {
                const {
                    ...newUserInfo
                } = resp.data.data

                if (userInfo.remember === true) {
                    saveLocal('userInfo', newUserInfo)
                } else {
                    saveSession('userInfo', newUserInfo)
                }
                dispatch(loginSuccess(resp.data.data))
            }
        }, err => {
            dispatch(loginFailed())
            console.log(err)
            message.error("登录失败")
        })
    }
}

export const logout = () => {
    //告诉服务端用户已经退出
    return dispatch => {
        dispatch(loginFailed())
    }
}
