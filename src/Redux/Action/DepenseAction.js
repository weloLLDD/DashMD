import axios from "axios";

import { logout } from "./userActions";
import {
  DEPENSE_CREATE_FAIL,
  DEPENSE_CREATE_REQUEST,
  DEPENSE_CREATE_SUCCESS,
  DEPENSE_DELETE_FAIL,
  DEPENSE_DELETE_REQUEST,
  DEPENSE_DELETE_SUCCESS,
  DEPENSE_EDIT_FAIL,
  DEPENSE_EDIT_REQUEST,
  DEPENSE_EDIT_SUCCESS,
  DEPENSE_LIST_FAIL,
  DEPENSE_LIST_REQUEST,
  DEPENSE_LIST_SUCCESS,
  DEPENSE_UPDATE_FAIL,
  DEPENSE_UPDATE_REQUEST,
  DEPENSE_UPDATE_SUCCESS,
} from "../constants/DepenseConstants";

//ALL depense
export const listDepense = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPENSE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("https://backenmd.onrender.com/api/depense", config);
    console.log("Données reçues du backend:", data);
    dispatch({ type: DEPENSE_LIST_SUCCESS, payload: data.depenses });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DEPENSE_LIST_FAIL,
      payload: message,
    });
  }
};

//DELETE DEPENSE
export const deleteDepense = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPENSE_DELETE_REQUEST });

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

    await axios.delete(`https://backenmd.onrender.com/api/depense/${id}`, config);
    dispatch({ type: DEPENSE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DEPENSE_DELETE_FAIL,
      payload: message,
    });
  }
};

//CREATE DEPENSE
export const createDepense =
  (name, montant, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: DEPENSE_CREATE_REQUEST });

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

      const { data } = await axios.post(
        `https://backenmd.onrender.com/api/depense/`,
        { name, montant, description },
        config
      );
      dispatch({ type: DEPENSE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: DEPENSE_CREATE_FAIL,
        payload: message,
      });
    }
  };

//EDIT DETAILS

export const editDepense = (id) => async (dispatch) => {
  try {
    dispatch({ type: DEPENSE_EDIT_REQUEST });
    const { data } = await axios.get(`https://backenmd.onrender.com/api/depense/${id}`);
    dispatch({ type: DEPENSE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DEPENSE_EDIT_FAIL,
      payload: message,
    });
  }
};

//update DEPENSE
export const updateDepense = (depense) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPENSE_UPDATE_REQUEST });

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

    const { data } = await axios.put(
      `https://backenmd.onrender.com/api/depense/${depense._id}`,
      depense,
      config
    );
    dispatch({ type: DEPENSE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: DEPENSE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: DEPENSE_UPDATE_FAIL,
      payload: message,
    });
  }
};
