import {LOGIN} from '../types';

const INITIAL_STATE = {
  userData: {},
};

export default (
  state = INITIAL_STATE,
  action: {payload: any; type: string},
) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};
