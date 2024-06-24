/* eslint-disable curly */
import {GET, api} from '../../api/apiConst';
import {makeAPIRequest} from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import {GET_HOME_PAGE_DATA} from '../types';

export const getHomePageData =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async (dispatch: any) => {
    return makeAPIRequest({
      method: GET,
      url: api.getHomePageData,
      data: request.data,
    })
      .then((response: any) => {
        dispatch({
          type: GET_HOME_PAGE_DATA,
          payload: response?.data?.data?.home_page_data,
        });
        if (request.onSuccess) request.onSuccess(response);
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
