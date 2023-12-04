import { Types } from "./types"


export const SET_USER_TOKEN = (Token) =>
{
    return {
        type : Types.SET_USER_TOKEN,
        payload : Token
    }
}
export const RM_USER_TOKEN = () =>
{
    return {
        type : Types.RM_USER_TOKEN
    }
}

export const SET_DATE_START = (start) =>
{
    return {
        type : Types.SET_DATE_START,
        payload : start
    }
}
export const SET_DATE_END = (end) =>
{
    return {
        type : Types.SET_DATE_END,
        payload : end
    }
}

export const SHOW_MODALBOX = (status,user) =>
{
    return {
        type : Types.SHOW_MODALBOX,
        payload : {
            status : status,
            user : user
        }
    }
}

export const SET_CURRENT_COODRDS = (data) =>
{
    return {
        type : Types.SET_CURRENT_COODRDS,
        payload : data
    }
}

export const SET_CURRENT_ADDRESS = (data) =>
{
    return {
        type : Types.SET_CURRENT_ADDRESS,
        payload : data
    }
}

export const SET_LIST_PICTURES = (data) =>
{
    return {
        type : Types.SET_LIST_PICTURES,
        payload : data
    }
}

export const RM_LIST_PICTURES = (data) =>
{
    return {
        type : Types.RM_LIST_PICTURES,
        payload : data
    }
}

export const SET_OFFERS = (data) => {
    return {
        type : Types.SET_OFFERS,
        payload : data
    }
}
export const SET_QUERY_SEARCH = (term) => {
    return {
        type : Types.SET_QUERY_SEARCH,
        payload : term
    }
}
export const TOGGLE_FILTER_MODAL = () => {
    return {
        type : Types.TOGGLE_FILTER_MODAL,
    }
}

export const SET_PRICE_RANGE = (prices) => {
    return {
        type : Types.SET_PRICE_RANGE,
        payload : {
            min : prices[0],
            max : prices[1]
        }
    }
}

export const SET_PRICE_TYPE = (typeName) => {
    return {
        type : Types.SET_PRICE_TYPE,
        payload : typeName
    }
}

export const SET_VEHICLES_TYPE = (vehicles) => {
    return {
        type : Types.SET_VEHICLES_TYPE,
        payload : vehicles
    }
}

export const REST_ALL_FILTERS = () => {
    return {
        type : Types.REST_ALL_FILTERS
    }
}

export const SET_LOADING = (status) => {
    return {
        type : Types.SET_LOADING,
        payload : status
    }
}

export const SET_DATE_RANGE = (start,end) => {
    return {
        type : Types.SET_DATE_RANGE,
        payload : {
            start : start,
            end : end
        }
    }
}

export const SET_SELECTED_OFFER = (offer) => {
    return {
        type : Types.SET_SELECTED_OFFER,
        payload : offer
    }
}

export const SHOW_COMPLETE_PROFILE = (status) => {
    return {
        type : Types.SHOW_COMPLETE_PROFILE,
        payload : {
            status : status ,
        }
    }
}

export const SET_COMPLETE_PROFILE = (completed) => {
    return {
        type : Types.SET_COMPLETE_PROFILE,
        payload : {
            completed : completed
        }
    }
}

export const SHOW_MODAL_OFFER = (status,offer) => {
    return {
        type : Types.SHOW_MODAL_OFFER,
        payload : {
            status : status,
            offer : offer
        }
    }
}

export const SET_LISTBY = (listBy) => {
    return {
        type : Types.SET_LISTBY,
        payload : {
            listBy : listBy
        }
    }
}

export const SET_SEARCH_POSITION = (lat,lng,located) => {
    return {
        type : Types.SET_SEARCH_POSITION,
        payload : {
            p : {
                lat : lat,
                lng : lng
            },
            Located : located
        }
    }
}

export const OPEN_MODAL_TELEPHONE = (status) => {
    return {
        type :Types.OPEN_MODAL_TELEPHONE,
        payload : status
    }
}