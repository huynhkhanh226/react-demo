import { userConstants } from '../constants/user.constants';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user !== null ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  debugger;
  switch (action.type) {
    //secret
    case userConstants.CLIENTID_REQUEST:
      return {
        username: action.client.username,
        clientID: action.client.token
      };
    case userConstants.CLIENTID_SUCCESS:
      return {
        username: action.client.username,
        clientID: action.client.token
      };
    case userConstants.CLIENTID_FAILURE:
      return {};

    //Login
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: false,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};

    //Logout
    case userConstants.LOGOUT_REQUEST:
      return {};
    case userConstants.LOGOUT_SUCCESS:
      return {
        loggingIn: false,
        user: null
      };
    case userConstants.LOGOUT_FAILURE:
      return {
          code: action.code,
          message: action.message
      };

    //default
    default:
      return state
  }
}