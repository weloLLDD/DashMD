import axios from "axios";
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../constants/ProductConstant";
import { logout } from "./userActions"; 
 

//ALL products
export const listProduct = () => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
       
      };
  
      const { data } = await axios.get("https://backenmd.onrender.com/api/products/all", config);
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: message,
      });
    }
  };


  //DELETE PRODUCT
  export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_DELETE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userInfo),
      };
  
      await axios.delete(`https://backenmd.onrender.com/api/products/${id}`, config);
      dispatch({ type: PRODUCT_DELETE_SUCCESS});
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      });
    }
  };


   //CREATE PRODUCT
   export const createProduct = (name,image, description,price,countInStock) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userInfo),
      };
  
      const {data} = await axios.post(`https://backenmd.onrender.com/api/products/`,{name,image, description,price,countInStock}, config);
      dispatch({ type: PRODUCT_CREATE_SUCCESS,payload:data});
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      });
    }
  };

  //EDIT DETAILS

export const editProduct = (id) => async(dispatch) =>{
  try {
      dispatch({type:PRODUCT_EDIT_REQUEST})
      const {data} = await axios.get(`https://backenmd.onrender.com/api/products/${id}`);
      dispatch({type:PRODUCT_EDIT_SUCCESS,
          payload: data
      });

  } catch (error) {

    const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_EDIT_FAIL,
        payload: message,
      });
      
  }
};



   //update PRODUCT
   export const updateProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(userInfo),
      };
  
      const {data} = await axios.put(`https://backenmd.onrender.com/api/products/${product._id}`,product, config);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS,payload:data});
      dispatch({ type: PRODUCT_EDIT_SUCCESS,payload:data});
  
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      });
    }
  };