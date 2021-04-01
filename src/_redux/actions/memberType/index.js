import axios from "axios";
import { api } from "../../../api/api";

export const getMemberTypes = () => async (dispatch) => {
  const token = localStorage.token;
  if (token) {
    const response = await axios.get(`${api}/member-types`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "MEMBER_TYPES", payload: response.data });
    //console.log(response.data);
  }
};

export const deleteMemberType = (MemberTypeCode) => async (dispatch) => {
  const token = localStorage.token;
  try {
    const response = await axios
      .delete(`${api}/delete-member-type/${MemberTypeCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        window.location.reload();
      });
    dispatch({ type: "MEMBER_TYPE_DELETE_SUCCESS", payload: response });
    //console.log(response.data);
  } catch (error) {
    dispatch({ type: "MEMBER_TYPE_DELETE_FAILED", payload: error.response });
  }
};