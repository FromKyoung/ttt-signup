import { createStore } from 'vuex';

export default createStore({
  state: {
    isAuth: !!localStorage.getItem('token'),
  },
  mutations: {
    setIsAuth(state, value) {
      state.isAuth = value;
    },
  },
});