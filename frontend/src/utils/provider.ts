import axios, {AxiosInstance} from 'axios';
import cookie from 'react-cookies';
import {API} from '../constant/api';

class Provider {
  getInstance(): AxiosInstance {
    return axios.create({
      baseURL: API,
      withCredentials: true,
      headers: {
        "X-CSRFToken": cookie.load('csrftoken')
      },
    });
  }
}

const provider = new Provider();

export default provider;
