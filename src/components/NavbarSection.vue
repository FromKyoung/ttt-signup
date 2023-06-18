<template>
  <div>
    <header>
      <div class="header-logo">
        <router-link to="/"><h1>Taste The Trip</h1></router-link>
      </div>
      <nav>
        <ul>
          <li><router-link to="/mypage">마이페이지</router-link></li>
          <li><router-link to="/board">자유게시판</router-link></li>
          <li><router-link to="/pr">홍보</router-link></li>
          <li><router-link to="/">지역</router-link></li>
          <li v-if="!isAuth"><router-link to="/signup">회원가입</router-link></li>
          <li>
            <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
            <router-link v-else to="/login">Login</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <div class="header-auth"></div>
  </div>
</template>

<script>
export default {
  computed: {
    isAuth() {
      return this.$store.state.isAuth;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$store.commit('setIsAuth', false);
      this.$router.push('/');
    },
  },
};
</script>


<style scoped>
header {
    background-color: #fff;
    text-align: center;
}

.header-logo a {
  text-decoration: none;
}

.header-logo a:hover {
  text-decoration: none;
}

h1 {
    margin: 0;
    padding: 20px 0;
    font-size: 60px;
    color: rgb(4,122,255); 
    text-decoration: none;
}

nav {
    background-color: #87CEFA;
}

nav ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
}

nav li {
    margin: 0 10px;
}

nav a {
    display: block;
    padding: 10px;
    color: #fff;
    text-decoration: none;
}

nav a:hover {
    background-color: #fff;
    color: #87CEFA;
}
</style>