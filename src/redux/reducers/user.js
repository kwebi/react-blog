import actionTypes from "../actions/actionTypes";
import {getLocal, getSession} from "../../utils/stroage";

const isLogin = Boolean(getLocal('token')) || Boolean(getSession('token'))
const localUserInfo = getLocal('userInfo')
const userInfo = localUserInfo!=null ? localUserInfo : getSession('userInfo')

const initState = Object.assign({
    id: '',
    displayName: '',
    avatar: '',
    role: '',
    isLogin: isLogin,
    isLoading: false,
}, userInfo)

export default (state = initState, action) => {
    switch (action.type) {
        case actionTypes.START_LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload.userInfo,
                isLoading: false,
                isLogin: true
            }
        case actionTypes.LOGIN_FAILED:
            return {
                id: '',
                displayName: '',
                avatar: '',
                role: '',
                isLogin: false,
                isLoading: false,
            }
        default:
            return state
    }
}
