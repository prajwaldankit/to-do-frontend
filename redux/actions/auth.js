import { actionTypeConstants } from "./../constants";

export function registerUser() {
  return {
    type: actionTypeConstants.REGISTER
  };
}

export function logInUser() {
  return {
    type: actionTypeConstants.LOGIN
  };
}
