import {LOGIN} from '../types';

const INITIAL_STATE = {
  loginUserData: {},
};

export default (
  state = INITIAL_STATE,
  action: {payload: any; type: string},
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginUserData: {...state.loginUserData, ...action.payload},
      };
    default:
      return state;
  }
};
