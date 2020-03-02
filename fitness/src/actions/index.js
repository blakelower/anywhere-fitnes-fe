import axios from "axios";
import cookie from "react-cookies";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const register = user => dispatch => {
  dispatch({ type: REGISTER_START });
  return axios
    .post("https://anywhere--fitness.herokuapp.com/register", user)
    .then(res => {
      localStorage.setItem("token", res.data.payload);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.payload });
    })
    .catch(err => {
      dispatch({ type: REGISTER_FAIL, payload: err });
    });
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const login = credentials => dispatch => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://anywhere--fitness.herokuapp.com/login", credentials)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      cookie.save("instructor", res.data.instructor);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.instructor });
      return true;
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.response.data
      });
    });
};
export const isLoggedIn = instructor => dispatch => {
  dispatch({ type: LOGIN_SUCCESS, payload: instructor });
};

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
  localStorage.removeItem("token");
  cookie.remove("instructorId");
};

export const GET_CLASS_INSTRUCTOR_START = "GET_CLASS_INSTRUCTOR_START";
export const GET_CLASS_INSTRUCTOR_SUCCESS = "GET_CLASS_INSTRUCTOR_SUCCESS";
export const GET_CLASS_INSTRUCTOR_FAIL = "GET_CLASS_INSTRUCTOR_FAIL";
export const getClasses = instructorId => dispatch => {
  dispatch({ type: GET_CLASS_INSTRUCTOR_START });
  return axios
    .get(
      `https://anywhere--fitness.herokuapp.com/classes/coach/${instructorId}`
    )
    .then(res => {
      dispatch({
        type: GET_CLASS_INSTRUCTOR_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CLASS_INSTRUCTOR_FAIL,
        payload: err.response.data
      });
    });
};

export const CREATE_CLASS_START = "CREATE_CLASS_START";
export const CREATE_CLASS_SUCCESS = "CREATE_CLASS_SUCCESS";
export const CREATE_CLASS_FAILURE = "CREATE_CLASS_FAILURE";
export const createClass = singleClass => dispatch => {
  dispatch({ type: CREATE_CLASS_START });
  return axios
    .post(`https://anywhere--fitness.herokuapp.com/classes`, singleClass)
    .then(res => {
      dispatch({
        type: CREATE_CLASS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: CREATE_CLASS_FAILURE,
        payload: err.response.data.message
      });
    });
};

export const GETCLASS_BYID_START = "GETCLASS_BYID_START";
export const GETCLASS_BYID_SUCCESS = "GETCLASS_BYID_SUCCESS";
export const GETCLASS_BYID_FAIL = "GETCLASS_BYID_FAIL";
export const getClassByInstrucotor = classId => dispatch => {
  dispatch({ type: GETCLASS_BYID_START });
  return axios
    .get(`https://anywhere--fitness.herokuapp.com/classes/${classId}`)
    .then(res => {
      dispatch({
        type: GETCLASS_BYID_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GETCLASS_BYID_FAIL,
        payload: err.response.data
      });
    });
};

export const UPDATE_INSTRUCTOR_CLASS_START = "UPDATE_INSTRUCTOR_CLASS_START";
export const UPDATE_INSTRUCTOR_CLASS_SUCCESS =
  "UPDATE_INSTRUCTOR_CLASS_SUCCESS";
export const UPDATE_INSTRUCTOR_CLASS_FAIL = "UPDATE_INSTRUCTOR_CLASS_FAIL";
export const updateClasss = (classId, singleClass) => dispatch => {
  dispatch({ type: UPDATE_INSTRUCTOR_CLASS_START });
  return axios
    .put(
      `https://anywhere--fitness.herokuapp.com/classes/${classId}`,
      singleClass
    )
    .then(res => {
      dispatch({
        type: UPDATE_INSTRUCTOR_CLASS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: UPDATE_INSTRUCTOR_CLASS_FAIL,
        payload: err.response.data.message
      });
    });
};

export const DELETE_INSTRUCTOR_START = "DELETE_INSTRUCTOR_START";
export const DELETE_INSTRUCTOR_SUCCESS = "DELETE_INSTRUCTOR_SUCCESS";
export const DELETE_INSTRUCTOR_FAIL = "DELETE_INSTRUCTOR_FAIL";
export const deleteClass = (classId, singleClass) => dispatch => {
  dispatch({ type: DELETE_INSTRUCTOR_START });
  return axios
    .delete(
      `https://anywhere--fitness.herokuapp.com/classes/${classId}`,
      singleClass
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
