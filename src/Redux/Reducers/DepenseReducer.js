import { DEPENSE_CREATE_FAIL, DEPENSE_CREATE_REQUEST, DEPENSE_CREATE_RESET, DEPENSE_CREATE_SUCCESS, DEPENSE_DELETE_REQUEST, DEPENSE_DELETE_SUCCESS, DEPENSE_EDIT_FAIL, DEPENSE_EDIT_REQUEST, DEPENSE_EDIT_SUCCESS, DEPENSE_LIST_FAIL, DEPENSE_LIST_REQUEST, DEPENSE_LIST_SUCCESS, DEPENSE_UPDATE_FAIL, DEPENSE_UPDATE_REQUEST, DEPENSE_UPDATE_RESET, DEPENSE_UPDATE_SUCCESS } from "../constants/DepenseConstants";


// LIST DEPENSE
export const depenseListReducer = (state = { depenses: [] }, action) => {
  switch (action.type) {
    case DEPENSE_LIST_REQUEST:
      return { loading: true, depenses: [] };
    case DEPENSE_LIST_SUCCESS:
      return { loading: false, depenses: action.payload };
    case DEPENSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE DEPENSES
export const depenseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPENSE_DELETE_REQUEST:
      return { loading: true };
    case DEPENSE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEPENSE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE DEPENSE
export const depenseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEPENSE_CREATE_REQUEST:
      return { ...state, loading: true };
    case DEPENSE_CREATE_SUCCESS:
      return { loading: false, success: true, depense: action.payload };
    case DEPENSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPENSE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT DEPENSE

export const depenseEditReducer = (
  state = { depense: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case DEPENSE_EDIT_REQUEST:
      return { ...state, loading: true };
    case DEPENSE_EDIT_SUCCESS:
      return { loading: false, depense: action.payload };

    case DEPENSE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};


// UPDATE DEPENSE
export const depenseUpdateReducer = (state = {depense:{}}, action) => {
  switch (action.type) {
    case DEPENSE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case DEPENSE_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case DEPENSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DEPENSE_UPDATE_RESET:
      return { depense:{}};
    default:
      return state;
  }
};