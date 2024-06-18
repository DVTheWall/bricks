/* eslint-disable curly */
import {GET, POST, api} from '../../api/apiConst';
import {localStore} from '../../api/constants';
import {makeAPIRequest} from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import {setAsyncStorage} from '../../helpers/globalFunctions';
import {LOGIN} from '../types';

export const login =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {} | any;
  }) =>
  async () => {
    return makeAPIRequest({
      method: GET,
      url: api.login,
      params: request.data,
    })
      .then((response: any) => {
        if (request.onSuccess) request.onSuccess(response);
      })
      .catch(error => {
        if (request.onFail) request.onFail(error);
      });
  };

export const sendOtp =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async () => {
    return makeAPIRequest({
      method: GET,
      url: api.sendOtp,
      params: request.data,
    })
      .then((response: any) => {
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

export const verifyOtp =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {} | any;
  }) =>
  async (dispatch: any) => {
    return makeAPIRequest({
      method: GET,
      url: api.verifyOtp,
      params: request.data,
    })
      .then((response: any) => {
        if (request.onSuccess) request.onSuccess(response);
        setAsyncStorage(localStore.userData, response?.data?.user);
        setAsyncStorage(localStore.token, response?.data?.token);
        dispatch({
          type: LOGIN,
          payload: response?.data?.user,
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

export const signUpUser =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {} | any;
  }) =>
  async () => {
    console.log('request.data==', request.data);

    return makeAPIRequest({
      method: POST,
      url: api.signUp,
      data: request.data,
    })
      .then((response: any) => {
        if (request.onSuccess) request.onSuccess(response);
        ToastAlert({
          toastType: 'success',
          description: 'Signed Up Successfully',
        });
      })
      .catch(error => {
        console.log('error main------------', error);

        if (request.onFail) request.onFail(error);
        ToastAlert({
          toastType: 'error',
          title: 'Oops!',
          description: 'Something went wrong',
        });
      });
  };
