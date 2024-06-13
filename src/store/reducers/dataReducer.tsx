import {
  GET_PROPERTY_LIST,
  GET_WALLET_PROFILE_DATA,
  MY_TRANSACTIONS_LIST,
} from '../types';

const INITIAL_STATE = {
  adminCreatedData: {},
  walletProfileData: [],
  propertyList: [],
  myTransactionsList: [],
};

export default (
  state = INITIAL_STATE,
  action: {payload: any; type: string},
) => {
  switch (action.type) {
    case GET_WALLET_PROFILE_DATA:
      return {...state, walletProfileData: action?.payload};
    case GET_PROPERTY_LIST:
      return {...state, propertyList: action?.payload};
    case MY_TRANSACTIONS_LIST:
      return {...state, myTransactionsList: action?.payload};
    default:
      return state;
  }
};
