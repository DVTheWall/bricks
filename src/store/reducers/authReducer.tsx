import {FCM_TOKEN, LOGIN, LOGOUT, TOKEN} from '../types';

const INITIAL_STATE = {
  authToken: '',
  userData: {},
  fcmToken: '',
};

export default (
  state = INITIAL_STATE,
  action: {payload: any; type: string},
) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
      };
    case FCM_TOKEN:
      return {
        ...state,
        fcmToken: action.payload,
      };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
