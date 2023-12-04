import { combineReducers } from "redux";
import AddressReducer from "./AddressReducer";
import CoordsReducer from "./CoordsReducer";
import DateReducer from "./DateReducer";
import ModalReducer from "./ModalReducer";
import PicReducer from "./PicReducer";
import UserReducer from "./UserReducer";
import OffersReducer from "./OffersReducer";
import FilterReducer from "./FilterReducer";
import ProfileReducer from "./ProfileReducer"

const RootReducer = combineReducers({
    UserReducer : UserReducer,
    DateReducer : DateReducer,
    ModalReducer : ModalReducer,
    CoordsReducer : CoordsReducer,
    AddressReducer : AddressReducer,
    PicReducer : PicReducer,
    OffersReducer : OffersReducer,
    FilterReducer : FilterReducer,
    ProfileReducer : ProfileReducer
});


export default RootReducer;