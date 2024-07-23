import {LOGIN, LOGOUT, TOKEN} from '../types';

const INITIAL_STATE = {
  authToken: '',
  userData: {},
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
    case LOGOUT:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
