/* eslint-disable quotes */
/* eslint-disable curly */
import {POST, api} from '../../api/apiConst';
import {makeAPIRequest} from '../../api/global';
import ToastAlert from '../../components/common/Alert';

export const investNowAction =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async () => {
    return makeAPIRequest({
      method: POST,
      url: api.investNowOrder,
      data: request.data,
    })
      .then((response: any) => {
        if (request.onSuccess) request.onSuccess(response);
        // ToastAlert({
        //   toastType: 'success',
        //   title: 'Success!',
        //   description: `Order created Successfully!`,
        // });
      })
      .catch(error => {
        if (request.onFail) request.onFail(error);
        if (error?.message?.includes('417')) {
          ToastAlert({
            toastType: 'error',
            title: 'Oops!',
            description: `Please, Check your Wallet Balance!`,
          });
        } else {
          ToastAlert({
            toastType: 'error',
            title: 'Oops!',
            description: 'Something went wrong',
          });
        }
      });
  };
