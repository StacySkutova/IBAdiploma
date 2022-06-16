import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Basic dmlrdGFycnVkemVuaWE6SzhQTGhteHFSUy4iVG0maw==',
  },
};

export const axiosInstance: AxiosInstance = axios.create(config);
