import { Types } from "../Actions/types";

const initialState = {
    status : false,
    isExact : true,
    options : {
        price : {
            priceType : "both",
            minPrice : 0,
            maxPrice : 2000
        },
        vehicles : [
            {
                name : "Bicycle",
                selected : false
            },
            {
                name : "Scooter",
                selected : false
            },
            {
                name : "Bicycle Electric",
                selected : false
            },
            {
                name : "Scooter Electric",
                selected : false
            }
        ],
        dateRange : {
            start : null,
            end : null
        } 
    }
}

const FilterReducer = (state = initialState,action) =>
{
    switch(action.type)
    {
        case Types.TOGGLE_FILTER_MODAL:
            return {
                ...state,
                status : !state.status
            };
        case Types.SET_PRICE_RANGE:
            return {
                ...state,
                options : {
                    ...state.options,
                    price : {
                        ...state.options.price,
                        minPrice : action.payload.min,
                        maxPrice : action.payload.max
                    }
                }
            }
        case Types.SET_PRICE_TYPE: 
            return {
                ...state,
                options : {
                    ...state.options,
                    price : {
                        ...state.options.price,
                        priceType : action.payload
                    }
                }
            }
        case Types.SET_VEHICLES_TYPE:
            /*const NewVehicle = state.options.vehicles.map(
                item => item.name.toLowerCase() === (action.payload).toLowerCase() 
                ? {...item, selected : !item.selected}
                : item
            )*/
            return {
                ...state,
                options : {
                    ...state.options,
                    vehicles : action.payload
                }
            }
        case Types.SET_DATE_RANGE:
            return {
                ...state,
                options : {
                    ...state.options,
                    dateRange : {
                        start : action.payload.start,
                        end : action.payload.end
                    }
                }
            }
        case Types.REST_ALL_FILTERS :
            return {
                ...state,
                options : {
                    price : {
                        priceType : 'both',
                        minPrice : 0,
                        maxPrice : 2000
                    },
                    vehicles : [
                        {
                            text : "Bicycle",
                            name: "bicycle",
                            selected: false,
                        },
                        {
                            text : "Scooter",
                            name: "scooter",
                            selected: false,
                        },
                        {
                            text : "Bicycle Electric",
                            name: "bicycle_electric",
                            selected: false,
                        },
                        {
                            text : "Scooter Electric",
                            name: "scooter_electric",
                            selected: false,
                        },
                    ]
                }
            }
        default:
            return state;
    }
}

export default FilterReducer;