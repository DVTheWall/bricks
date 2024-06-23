import axios from 'axios';

import {getEnvVars} from './config';
import {localStore} from './constants';
import {getAsyncStorage, removeAsyncStorage} from '../helpers/globalFunctions';

export const makeAPIRequest = ({
  method,
  url,
  data = {},
  params,
}: {
  method?: string;
  url?: string;
  data?: any;
  params?: any;
}) =>
  new Promise(async (resolve, reject) => {
    const token = await getAsyncStorage(localStore.token);
    const BASE_URL = getEnvVars()?.base_url;

    const option = {
      method,
      baseURL: BASE_URL,
      url,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Token ${token}` : null,
      },
      params,
    };

    if (Object.keys(data).length !== 0) {
      //@ts-ignore
      option.data = data;
    }

    axios(option)
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          resolve(response);
        } else {
          reject(response);
        }
      })
      .catch(error => {
        if (error?.response?.status === 401) {
          removeAsyncStorage();
          //   resetStack(navigationRef as never, routeNames.Landing);
        }
        reject(error);
      });
  });
