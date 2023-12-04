import { Types } from "../Actions/types";
const initialState = {
    offers : [],
    offerSelected : null,
    query : "",
    loading : true,
    listBy : localStorage.getItem("display") ? localStorage.getItem("display") : "grid",
    isLocated : localStorage.getItem("Located") ? localStorage.getItem("Located") : false,
    position : {
        lat : 33.5731104,
        lng : -7.589843399999999
    }
}

const OffersReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case Types.SET_OFFERS:
            return {
                ...state,
                offers : action.payload
            };
        case Types.SET_QUERY_SEARCH:
            return {
                ...state,
                query : action.payload
            }
        case Types.SET_LOADING:
            return {
                ...state,
                loading : action.payload
            }
        case Types.SET_LISTBY:
            return {
                ...state,
                listBy : action.payload.listBy,
                ...localStorage.setItem("display",action.payload.listBy)
            }
        case Types.SET_SEARCH_POSITION:
            return {
                ...state,
                position : action.payload.p,
                isLocated : action.payload.Located,
                ...localStorage.setItem("Located",action.payload.Located)
            }
        default:
            return state;
    }
}

export default OffersReducer;