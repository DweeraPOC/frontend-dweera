
import { Types } from "../Actions/types"

const initialState = {
    userData : null,
    status : false,
    selectedUser : null

}
const UserReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case Types.SET_USER_TOKEN:
            return {
                ...state,
                userData : action.payload,
            }
        case Types.RM_USER_TOKEN:
            return {
                ...state,
                userData : null,
            }
        case Types.SHOW_MODALBOX:
            return {
                ...state,
                status : action.payload.status,
                selectedUser : action.payload.user
            }
        default : 
            return state;
    }
}

export default UserReducer;