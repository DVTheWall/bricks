import axios from 'axios';
// import {createNavigationContainerRef} from '@react-navigation/native';
import {localStore} from './constants';
// import {getAsyncStorage, removeAsyncStorage} from './globalFunction';
import {getEnvVars} from './config';
import {getAsyncStorage, removeAsyncStorage} from '../helpers/globalFunctions';

// export const navigationRef = createNavigationContainerRef();

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
    // const userData = await getAsyncStorage(localStore.userData);
    const BASE_URL = getEnvVars()?.base_url;

    const option = {
      method,
      baseURL: BASE_URL,
      url,
      headers: {
        Authorization: 'Token c7ea9fdfdf7bb23:16c5ca8dfea6003',
        // Authorization: userData?.token || null,
        'Content-Type': 'application/json',
      },
      params,
    };

    if (Object.keys(data).length != 0) {
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