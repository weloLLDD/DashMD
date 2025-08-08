import {legacy_createStore as createStore, combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "@redux-devtools/extension"; 
import { userListReducer, userLoginReducer } from "./Reducers/userReducer";
import { productCreateReducer, productDeleteReducer, productEditReducer, productListReducer, productUpdateReducer } from "./Reducers/ProductReducer";
import { orderDetailsReducer, ordersListReducer } from "./Reducers/orderReducer";
import { depenseCreateReducer, depenseDeleteReducer, depenseEditReducer, depenseListReducer, depenseUpdateReducer } from "./Reducers/DepenseReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer, 
  userList:userListReducer,
  productList:productListReducer,
  productDelete:productDeleteReducer,
  productCreate:productCreateReducer,
  productEdit:productEditReducer,
  productUpdate:productUpdateReducer,
  orderList:ordersListReducer,
  orderDetails:orderDetailsReducer, 
  
  depenseList:depenseListReducer,
  depenseDelete:depenseDeleteReducer,
  depenseCreate:depenseCreateReducer,
  depenseEdit:depenseEditReducer,
  depenseUpdate:depenseUpdateReducer,

})

 
//login

const UserInfoFromLocalStorage = localStorage.getItem("userInfo")
? JSON.parse(localStorage.getItem("userInfo")) 
:null; 
  
 
const initialState = {  
userLogin:{ userInfo:UserInfoFromLocalStorage },
} 

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store
