/* eslint-disable curly */
import { POST, api } from '../../api/apiConst';
import { localStore } from '../../api/constants';
import { makeAPIRequest } from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import { getAsyncStorage } from '../../helpers/globalFunctions';
import { MY_TRANSACTIONS_LIST } from '../types';

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
        data: request.data,
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

export const addMoney =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
    async () => {
      return makeAPIRequest({
        method: POST,
        url: api.addMoney,
        data: request.data,
      })
        .then((response: any) => {
          if (request.onSuccess) request.onSuccess(response);
          // ToastAlert({
          //   toastType: 'success',
          //   title: 'Success!',
          //   description: 'Money added successfully!',
          // });
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

export const addMoneyReject =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
    async () => {
      return makeAPIRequest({
        method: POST,
        url: api.addMoneyReject,
        data: request.data,
      })
        .then((response: any) => {
          if (request.onSuccess) request.onSuccess(response);
          // ToastAlert({
          //   toastType: 'error',
          //   title: 'Oops!',
          //   description: 'Money could not be Added!',
          // });
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

export const withdrawMoney =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
    async () => {
      return makeAPIRequest({
        method: POST,
        url: api.withdrawMoney,
        data: request.data,
      })
        .then((response: any) => {
          if (request.onSuccess) request.onSuccess(response);
          ToastAlert({
            toastType: 'success',
            title: 'Success!',
            description: 'Money withdrawn successfully!',
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
