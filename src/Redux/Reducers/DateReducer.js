import { Types } from "../Actions/types"

const initialState = {
    StartDate : window.localStorage.getItem("Start-Date"),
    EndDate : window.localStorage.getItem("End-Date")
}

const DateReducer = (state = initialState,action) =>{
    switch(action.type)
    {
        case Types.SET_DATE_START:
            return{
                ...state,
                StartDate : action.payload,
                ...window.localStorage.setItem("Start-Date", state.StartDate),
            }
        case Types.SET_DATE_END:
            
            return{
                ...state,
                EndDate : action.payload,
                ...window.localStorage.setItem("End-Date", state.EndDate),
            }
        default:
            return state;
    }
}

export default DateReducer;