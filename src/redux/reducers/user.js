import actionTypes from "../actions/actionTypes";
import { getLocal, getSession } from "../../utils/stroage";

const isLogin = Boolean(getLocal('userInfo')) || Boolean(getSession('userInfo'))
const localUserInfo = getLocal('userInfo')
const userInfo = localUserInfo != null ? localUserInfo : getSession('userInfo')

const initState = Object.assign({
    userId: -1,
    username: '',
    avatar: '',
    role: -1,
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
                isLogin: true,
            }
        case actionTypes.LOGIN_FAILED:
            return {
                userId: -1,
                username: '',
                avatar: '',
                role: -1,
                isLogin: false,
                isLoading: false,
            }
        default:
            return state
    }
}
