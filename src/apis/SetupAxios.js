
import axios from 'axios';
import { CONSTANTS } from 'utils/common';

export const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_API_PREFIX,
    headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': 'http://localhost:3000',
        // 'Access-Control-Allow-Credentials': 'true'
    },
    // withCredentials: true,
    timeout: 15000,
});

// Add a request interceptor
request.interceptors.request.use(
    async (config) => {
        const accessToken = await localStorage.getItem(CONSTANTS.ACCESS_TOKEN);
        if (accessToken)
        //   eslint-disable-next-line no-param-reassign
          config.headers = {
            Authorization: `Bearer ${accessToken}`,
          }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// Add a response interceptor
request.interceptors.response.use(
    (response) => {
        return response;
    },
    // eslint-disable-next-line func-names
    async function (error) {
        return Promise.reject(error);
    },
);

const apiClient = {
    get: (url, data, config = {}) => {
        return request({
            method: 'get',
            url,
            params: data
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    },
    post: (url, data) => {
        return request({
            method: 'post',
            url,
            data,
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    },
    patch: (url, data) => {
        return request({
            method: 'patch',
            url,
            data,
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    },
    delete: (url, data) => {
        return request({
            method: 'delete',
            url,
            data,
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    },
    put: (url, data) => {
        return request({
            method: 'put',
            url,
            data,
        })
            .then((response) => {
                return response;
            })
            .catch((err) => {
                throw err;
            });
    },
};

export { apiClient };
