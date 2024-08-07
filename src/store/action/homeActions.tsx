/* eslint-disable curly */
import { GET, api } from '../../api/apiConst';
import { localStore } from '../../api/constants';
import { makeAPIRequest } from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import { getAsyncStorage } from '../../helpers/globalFunctions';
import { GET_HOME_PAGE_DATA, GET_HOME_PROFILE_DATA } from '../types';

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
          if (request.onSuccess) request.onSuccess(response);
          dispatch({
            type: GET_HOME_PAGE_DATA,
            payload: response?.data?.data?.home_page_data,
          });
          dispatch({
            type: GET_HOME_PROFILE_DATA,
            payload: response?.data?.data?.profile_data,
          });
        })
        .catch(async error => {
          if (request.onFail) request.onFail(error);
          const token = await getAsyncStorage(localStore.token);
          if (token) {
            ToastAlert({
              toastType: 'error',
              title: 'Oops!',
              description: 'Something went wrong',
            });
          }
        });
    };
