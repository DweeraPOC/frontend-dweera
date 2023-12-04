import { Types } from "../Actions/types";

const initialState = {
    picturesList : []
}

const PicReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case Types.SET_LIST_PICTURES :
            //state.picturesList.push(action.payload);
            return {
                ...state,
                picturesList : action.payload
            }
        case Types.RM_LIST_PICTURES :
            return {
                ...state,
                picturesList : action.payload
            }
        default :
            return state;
    }
}

export default PicReducer;