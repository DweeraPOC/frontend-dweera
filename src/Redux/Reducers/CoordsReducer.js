import { Types } from "../Actions/types";

const initialState = {
    position : {
        lat : 33.5731104,
        lng : -7.589843399999999
    }
}

const CoordsReducer = (state = initialState,action) =>{
    switch(action.type)
    {
        case Types.SET_CURRENT_COODRDS:
            return {
                ...state,
                position : action.payload
            }
        default :
            return state;
    }
}

export default CoordsReducer;