const initialState = { showMouvements: false };
// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "MOUVEMENTS_DATA":
      return {
        ...state,
        data: payload,
      };
    case "MOUVEMENT_UPLOADS":
      return {
        ...state,
        uploads: payload,
      };
    case "MOUVEMENT_DELETE_SUCCESS":
      return {
        ...state,
        uploads: state.uploads.filter((mouvement) => mouvement.id !== payload),
      };
    case "MOUVEMENT_DELETE_FAILED":
      return {
        ...state,
        error: payload,
      };
    case "SHOW_MOUVEMENT_TABLE":
      return {
        ...state,
        showMouvements: true,
      };
    case "HIDE_MOUVEMENT_TABLE":
      return {
        ...state,
        showMouvements: false,
      };
    default:
      return state;
  }
};
