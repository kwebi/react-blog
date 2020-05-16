import actionTypes from "./actionTypes";


const startMarkAsRead=()=>{
    return {
        type: actionTypes.START_MARK_AS_READ
    }
}

const finishMarkAsRead=()=>{
    return {
        type: actionTypes.FINISH_MARK_AS_READ
    }
}

export const markNotificationsAsReadById=(id)=>{
    return dispatch=>{
        dispatch(startMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,
                payload: {
                    id
                }
            })
            dispatch(finishMarkAsRead())
        },500)
    }
}
export const markAllNotificationsAsRead=()=>{
    return dispatch=>{
        dispatch(startMarkAsRead())
        setTimeout(()=>{
            dispatch({
                type:actionTypes.MARK_ALL_NOTIFICATION_AS_READ
            })
            dispatch(finishMarkAsRead())
        },800)
    }
}

