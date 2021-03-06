import { HYDRATE } from "next-redux-wrapper";
import { ErrorActionType } from "types/redux-actions.types";
import { InitialStateErrorReducerType } from "types/redux-reducers.types";
import { SET_ERROR } from "../actions/error.actions";

const initialState: InitialStateErrorReducerType = {
  hasError: false,
};

export const errorReducer = (state = initialState, action: ErrorActionType) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        hasError: !!action.payload.error.hasError,
      };

    case SET_ERROR:
      return {
        ...state,
        hasError: action.payload,
      };

    default:
      return state;
  }
};
