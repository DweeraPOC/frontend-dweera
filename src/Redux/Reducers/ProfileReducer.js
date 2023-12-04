import { Types } from "../Actions/types";
const initialState = {
    status : true,
    completed  : false
}

const ProfileReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case Types.SHOW_COMPLETE_PROFILE:
            return{
                ...state,
                status : action.payload.status
            };
        case Types.SET_COMPLETE_PROFILE : 
            return {
                ...state,
                completed : action.payload.completed
            };
        default:
            return state;
    }
}

export default ProfileReducer;