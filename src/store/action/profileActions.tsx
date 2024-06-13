/* eslint-disable curly */
import {GET, POST, api} from '../../api/apiConst';
import {localStore} from '../../api/constants';
import {makeAPIRequest} from '../../api/global';
import ToastAlert from '../../components/common/Alert';
import {setAsyncStorage} from '../../helpers/globalFunctions';
import {GET_WALLET_PROFILE_DATA} from '../types';

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
      .catch(error => {
        if (request.onFail) request.onFail(error);
        ToastAlert({
          toastType: 'error',
          title: 'Oops!',
          description: 'Something went wrong',
        });
      });
  };
