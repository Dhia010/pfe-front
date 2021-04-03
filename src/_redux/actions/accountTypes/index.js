import axios from "axios";
import { api } from "../../../api/api";

export const getAccountTypes = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/account-types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ACCOUNT_TYPES", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteAccountType = (NatureCode) => async (dispatch) => {
  const token = localStorage.token;
  try {
    await axios.delete(`${api}/delete-account-type/${NatureCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "ACCOUNT_DELETE_SUCCESS", payload: NatureCode });
  } catch (error) {
    dispatch({ type: "ACCOUNT_DELETE_FAILED", payload: error.response });
  }
};
