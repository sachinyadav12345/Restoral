import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ApiData: [],
  EditApiData: [],
  uid: {},
  LoginStatus: true,
};
export const ApiSlice = createSlice({
  name: "RestoData",
  initialState,
  reducers: {
    setRestoData: (state, action) => {
      state.ApiData = action.payload;
    },
    EditRestoData: (state, action) => {
      state.EditApiData = action.payload;
    },
    updateId: (state, action) => {
      state.uid = action.payload;
    },
    ChangeStatus : (state ,action) =>{
      state.LoginStatus = action.payload
    }
  },
});
export const { setRestoData, EditRestoData, updateId  , ChangeStatus} = ApiSlice.actions;
export default ApiSlice.reducer;

export function getRestoData() {
  return async function getRestDataThunk(dispatch) {
    let res = await axios.get("http://localhost:3000/restaurants");
    dispatch(setRestoData(res.data));
  };
}

export function postRestoData(item) {
  return async function postRestoDataThunk(dispatch) {
    let res = await axios.post("http://localhost:3000/restaurants", item);
    dispatch(setRestoData(res.data));
  };
}

export function patchRestoData(id) {
  return async function patchRestoDataThunk(dispatch) {
    let res = await axios.patch(`http://localhost:3000/restaurants/${id}`);
    dispatch(EditRestoData(res.data));
    dispatch(updateId(id));
  };
}

export function RemoveRestoData(id) {
  return async function deleteRestoDataThunk(dispatch, getState) {
    try {
      await axios.delete(`http://localhost:3000/restaurants/${id}`);
      const updatedData = getState().RestoData.ApiData.filter(
        (item) => item.id !== id
      );
      dispatch(setRestoData(updatedData));
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };
}

export function putRestoData(uid, values) {
  return async function patchRestoDataThunk(dispatch) {
    let res = await axios.put(
      `http://localhost:3000/restaurants/${uid}`,
      values
    );
    dispatch(setRestoData(res.data));
  };
}
