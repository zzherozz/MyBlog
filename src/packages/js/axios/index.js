import axios from 'axios';
const defaultConfig = {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 表示跨域请求时是否需要使用凭证
  validateStatus: function (status) {
    return status >= 200 && status <= 304;
  },
};

const axiosInstance = axios.create(defaultConfig);
export function request(method, url, config) {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        method: method,
        url: url,
        config: config,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// 添加拦截

export function put(url, data, config) {
  return request('PUT', url, { data, ...config });
}

export function post(url, data, config) {
  return request('POST', url, { data, ...config });
}

export function httpDelete(url, data, config) {
  return request('DELETE', url, { data, ...config });
}

export function get(url, params, config) {
  return request('GET', url, { params, ...config });
}

export function download(url, params, config) {
  return request('GET', url, {
    params,
    responseType: 'blob',
    ...config,
  });
}

export default axiosInstance;
