import axios from 'axios';

const BASE_URL = 'http://43.200.25.231:8080';

export function fetchCompanyData(region, district, page, smallCode) {
  return axios.get(`${BASE_URL}/region/${region}/company`, {
    params: {
      district,
      smallCode,
      page,
    },
  });
}


//새로운 토큰 방식

const apiClient = axios.create({
  baseURL: 'http://43.200.25.231:8080'  // Your API base URL
  ,headers: {
    'Content-Type': 'application/json'
  }
});

// Set the AUTH token for any request
apiClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

// Add a response interceptor
apiClient.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  if (error.response.status === 401) {
    localStorage.removeItem('token');
  }
  return Promise.reject(error);
});

export function login(data) {
  return apiClient.post('/auth/login', data);
}

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function clearToken() {
  localStorage.removeItem('token');
}

export function getUserInfo() {
  return apiClient.get('/mypage');
}

export function join(data) {
  return apiClient.post('/auth/signup', data);
}
export function ceojoin(data) {
  return apiClient.post('/auth/signup-business', data);
}

export function getBoards() {
  return apiClient.get('/posts'); // 여기서 '/boards'는 실제 API endpoint가 되어야 합니다.
}

// Add new board
export function createBoard(data) {
  return apiClient.post('/posts', data); // 여기서 '/boards'는 실제 API endpoint가 되어야 합니다.
}