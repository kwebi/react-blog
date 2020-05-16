import actionTypes from "../actions/actionTypes";

const initState = {
    isLoading: false,
    list:[
        {
            id: 1,
            title: '1 title',
            description: '111 desc',
            hasRead: true
        },
        {
            id: 2,
            title: '2 title',
            description: '222 desc',
            hasRead: false
        }
    ]
}

export default (state=initState,action)=>{
    switch (action.type) {
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            const newList = state.list.map(item=>{
                if(item.id===action.payload.id){
                    item.hasRead = true
                }
                return item
            })
            return {
                ...state,list: newList
            }
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
            return {
                ...state,list: state.list.map(item=>{item.hasRead=true;return item})
            }
        case actionTypes.START_MARK_AS_READ:
            return {
                ...state,isLoading: true
            }
        case actionTypes.FINISH_MARK_AS_READ:
            return {
                ...state,isLoading: false
            }
        default:
            return state
    }
}
