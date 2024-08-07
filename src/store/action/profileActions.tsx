/* eslint-disable curly */
import { POST, api } from '../../api/apiConst';
import { localStore } from '../../api/constants';
import { makeAPIRequest } from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import { getAsyncStorage } from '../../helpers/globalFunctions';
import { GET_WALLET_PROFILE_DATA } from '../types';

export const walletProfile =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
    async (dispatch: any) => {
      return makeAPIRequest({
        method: POST,
        url: api.walletProfile,
        data: request.data,
      })
        .then((response: any) => {
          dispatch({
            type: GET_WALLET_PROFILE_DATA,
            payload: response?.data?.data?.profile,
          });
          if (request.onSuccess) request.onSuccess(response);
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

export const logOutAPI =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
    async (dispatch: any) => {
      return makeAPIRequest({
        method: POST,
        url: api.logout,
        data: request.data,
      })
        .then((response: any) => {
          dispatch({
            type: GET_WALLET_PROFILE_DATA,
            payload: response?.data?.data?.profile,
          });
          if (request.onSuccess) request.onSuccess(response);
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

