import { Types } from "../Actions/types";
const initialState = {
    status : false,
    offer  : null,
    isOpen : false
}

const ModalReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case Types.SHOW_MODAL_OFFER:
            return{
                ...state,
                status : action.payload.status,
                offer : action.payload.offer
            };
        case Types.OPEN_MODAL_TELEPHONE:
            return {
                ...state,
                isOpen : action.payload
            }
        default:
            return state;
    }
}

export default ModalReducer;