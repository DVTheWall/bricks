/* eslint-disable curly */
import {POST, api} from '../../api/apiConst';
import {makeAPIRequest} from '../../api/global';
import {MY_TRANSACTIONS_LIST} from '../types';

export const getMyTransactionsList =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async (dispatch: any) => {
    return makeAPIRequest({
      method: POST,
      url: api.myTransactions,
      params: request.data,
    })
      .then((response: any) => {
        dispatch({
          type: MY_TRANSACTIONS_LIST,
          payload: response?.data?.data?.transactions_data,
        });
        if (request.onSuccess) request.onSuccess(response);
      })
      .catch(error => {
        if (request.onFail) request.onFail(error);
      });
  };
