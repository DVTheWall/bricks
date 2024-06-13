/* eslint-disable curly */
import {POST, api} from '../../api/apiConst';
import {makeAPIRequest} from '../../api/global';
import {GET_PROPERTY_LIST} from '../types';

export const getPropertyList =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async (dispatch: any) => {
    return makeAPIRequest({
      method: POST,
      url: api.getPropertyList,
      data: request.data,
    })
      .then((response: any) => {
        dispatch({
          type: GET_PROPERTY_LIST,
          payload: response?.data?.data?.properties_list_data,
        });
        if (request.onSuccess) request.onSuccess(response);
      })
      .catch(error => {
        if (request.onFail) request.onFail(error);
      });
  };

export const getPropertyDetails =
  (request: {
    onSuccess(response: any): unknown;
    onFail(error: any): unknown;
    data: {};
  }) =>
  async () => {
    return makeAPIRequest({
      method: POST,
      url: api.getPropertyDetails,
      data: request.data,
    })
      .then((response: any) => {
        if (request.onSuccess) request.onSuccess(response);
      })
      .catch(error => {
        if (request.onFail) request.onFail(error);
      });
  };
