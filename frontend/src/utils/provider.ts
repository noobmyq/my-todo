/*
 * @Date: 2021-12-26 23:02:08
 * @LastEditTime: 2021-12-26 23:43:17
 * @FilePath: /new-simple-todo/my-todo/frontend/src/utils/provider.ts
 */
import axios, { AxiosInstance } from 'axios';
import cookie from 'react-cookies';
import { TodoItem } from '../constant/interface';

class Provider {
    getInstance(): AxiosInstance {
        return axios.create({
            baseURL: "",
            withCredentials: true,
            headers: {
                "X-CSRFToken": cookie.load('csrftoken')
            },
        });
    }
}

const provider = new Provider();

export default provider;
