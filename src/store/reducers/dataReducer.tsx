import {
  GET_HOME_PAGE_DATA,
  GET_HOME_PROFILE_DATA,
  GET_PORTFOLIO_DATA,
  GET_PROPERTY_LIST,
  GET_WALLET_PROFILE_DATA,
  MY_TRANSACTIONS_LIST,
  LOGOUT_1
} from '../types';

const INITIAL_STATE = {
  walletProfileData: [],
  propertyList: [],
  myTransactionsList: [],
  homePageData: [],
  homeProfileData: [],
  portfolioData: [],
};

export default (
  state = INITIAL_STATE,
  action: { payload: any; type: string },
) => {
  switch (action.type) {
    case GET_WALLET_PROFILE_DATA:
      return { ...state, walletProfileData: action?.payload };
    case GET_PROPERTY_LIST:
      return { ...state, propertyList: action?.payload };
    case MY_TRANSACTIONS_LIST:
      return { ...state, myTransactionsList: action?.payload };
    case GET_HOME_PAGE_DATA:
      return { ...state, homePageData: action?.payload };
    case GET_HOME_PROFILE_DATA:
      return { ...state, homeProfileData: action?.payload };
    case GET_PORTFOLIO_DATA:
      return { ...state, portfolioData: action?.payload };
    case LOGOUT_1:
      return INITIAL_STATE;
    default:
      return state;
  }
};
