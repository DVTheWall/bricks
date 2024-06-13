import {combineReducers} from 'redux';
import {IRootState} from '../../interface/Common';
import authReducer from './authReducer';
import dataReducer from './dataReducer';

const rootReducer = combineReducers<IRootState | any>({
  auth: authReducer,
  data: dataReducer,
});

export default (state: IRootState | any, action: any) => {
  return rootReducer(state, action);
};
