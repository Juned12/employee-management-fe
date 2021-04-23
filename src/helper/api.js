import axios from "axios";

//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("manager_access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor to refresh token on receiving token expired error
axios.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("manager_refresh");
    if (
          refreshToken &&
          refreshToken !== 'undefined' &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          return axios
            .post(`${process.env.REACT_APP_API_URL}/token/refresh/`, { refresh: refreshToken })
            .then((res) => {
              if (res.status === 200) {
                localStorage.setItem("manager_access", res.data.access);
                return axios(originalRequest)
              }
              return Promise.reject(error)
            });
        }
        return Promise.reject(error)
      }
);

//functions to make api calls
const api = {
  signup: (body) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/auth/register/`, body);
  },
  login: (body) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/token/`, body);
  },
  refreshToken: (body) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/token/refresh/`, body);
  },
  validateToken: (body) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/jwt/verify/`, body);
  },
  me: () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/me/`, );
  },
  getEmployees: (page,page_size) => {
    const url =  `${process.env.REACT_APP_API_URL}/employees/?page_size=${page_size}&page=${page}`
    return axios.get(url);
  },
  createEmployee: (body) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/employee/create/`, body);
  },
  updateEmployee: (id,body) => {
    return axios.put(`${process.env.REACT_APP_API_URL}/employee/${id}/`, body);
  },
  deleteEmployee: (id) => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/employee/${id}/`);
  },

};
export default api;