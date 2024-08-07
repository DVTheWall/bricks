import { combineReducers } from 'redux';
import { IRootState } from '../../interface/Common';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers<IRootState | any>({
  auth: authReducer,
  data: dataReducer,
});

export default (state: IRootState | any, action: any) => {
  // if (action.type === 'LOGOUT') {
  //   return rootReducer(undefined, action)
  // }
  return rootReducer(state, action);
};
