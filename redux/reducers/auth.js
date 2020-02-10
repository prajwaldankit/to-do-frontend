import { actionTypeConstants } from "./../constants";

export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypeConstants.REGISTER:
      return !state;
    case actionTypeConstants.LOGIN:
      return !state;
    case defalut:
      return state;
  }
};
