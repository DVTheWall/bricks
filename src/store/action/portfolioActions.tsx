/* eslint-disable curly */
import {api, GET} from '../../api/apiConst';
import {makeAPIRequest} from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import {GET_PORTFOLIO_DATA} from '../types';

export const getPortfolioDataApi =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async (dispatch: any) => {
    return makeAPIRequest({
      method: GET,
      url: api.getPortfolioData,
      data: request.data,
    })
      .then((response: any) => {
        if (request.onSuccess) request.onSuccess(response);
        dispatch({
          type: GET_PORTFOLIO_DATA,
          payload: response?.data?.data,
        });
      })
      .catch(error => {
        if (request.onFail) request.onFail(error);
        ToastAlert({
          toastType: 'error',
          title: 'Oops!',
          description: 'Something went wrong',
        });
      });
  };
