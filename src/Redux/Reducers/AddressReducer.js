import { Types } from "../Actions/types";

const initialState = {
    locations : [
        /*{
            Address : useSelector((state) => state.AddressReducer.address),
            Latitude : useSelector((state) => state.CoordsReducer.position.lat),
            Longitude : useSelector((state) => state.CoordsReducer.position.lng)
        }*/
    ]
}

const AddressReducer = (state = initialState,action) =>{
    switch(action.type)
    {
        case Types.SET_CURRENT_ADDRESS:
            return {
                ...state,
                locations : [
                    ...state.locations,
                    action.payload
                ]
            }
        default :
            return state;
    }
}

export default AddressReducer;