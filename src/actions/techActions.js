
import {
    SET_LOADING,
    GET_TECHS,
    ADD_TECH,
    DELETE_TECH,
    TECHS_ERROR
  } from "./types";


// Get techs from server

export const getTechs = () => async dispatch => {
    try {
        setLoading();

        const res = await fetch("/techs");
        const data = await res.json();

        dispatch({
            type: GET_TECHS,
            payload: data,
        })
    } catch (err) {
        dispatch({
            type: TECHS_ERROR,
            payload: err.response.statusText
        })
    }
};

// Add techs to server
export const addTech = (tech) => async (dispatch) => {
    try {
      setLoading();
  
      const res = await fetch("/techs", {
        method: "POST",
        body: JSON.stringify(tech),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
  
      dispatch({
        type: ADD_TECH,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.statusText,
      });
    }
  };

  // Delete logs from server
export const deleteTech = (id) => async (dispatch) => {
    try {
      setLoading();
  
      await fetch(`/techs/${id}`, {
        method: "DELETE",
      });
  
      dispatch({
        type: DELETE_TECH,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err.response.statusText,
      });
    }
  };

// Setting Loading To True ( see logReducer )
export const setLoading = () => {
    return {
      type: SET_LOADING,
    };
  };
  