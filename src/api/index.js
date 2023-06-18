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
// export function detailData(region, district, page, smallCode) {
//   return axios.get(`${BASE_URL}/region/${region}/company`, {
//     params: {
//       district,
//       smallCode,
//       page,
//     },
//   });
// }


//새로운 토큰 방식

const apiClient = axios.create({
  baseURL: 'http://43.200.25.231:8080'
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

apiClient.interceptors.response.use(function (response) {
  return response;
}, function (error) {
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

//게시판
export function getBoards() {
  return apiClient.get('/posts'); 
}

export function createBoard(data) {
  return apiClient.post('/posts', data); 
}

export function showBoard(id) {
  return apiClient.get(`/posts/${id}`); 
}

export function updateBoard(id, data) {
  return apiClient.patch(`/posts/${id}`, data);
}

export function deleteBoard(id) {
  return apiClient.delete(`/posts/${id}`);
}

//홍보
export function getPrItems() {
  return apiClient.get('/review');
}

export function createPr(data) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("images", data.image);
  
  // axios에서 Content-Type을 multipart/form-data로 설정
  return apiClient.post('/review', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}


export function showPr(id) {
  return apiClient.get(`/review/${id}`); 
}

export function deletePr(id) {
  return apiClient.delete(`/review/${id}`);
}
