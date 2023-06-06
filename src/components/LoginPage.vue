<template>
    <div>
      <form class="login" @submit.prevent="onSubmit">
        
            <h2>t t t</h2>
            <ul>
                <li><input class="form-control" required type="email"   v-model="email" autofocus placeholder="아이디" id="id" title="아이디입력"/></li>
                <li><input class="form-control" required type="password"  v-model="password" placeholder="비밀번호" id="password" title="비밀번호입력"/></li>
                <p class="error" v-if="error">아이디 혹은 비밀번호가 틀렸습니다.</p>
                <button  id="login_btn" class="account" :class="{'btn-success': !invalidForm}" type="submit" 
                :disabled="invalidForm">Log In</button><!--입력값 확인해서 dis/in able하게 함-->
            </ul>
      </form>
      
    </div>
  </template>
  
<script>
//새로운 토큰
import { login, setToken } from '../api';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    };
  },
  computed: {
    invalidForm() {
      return !(this.email && this.password);
    }
  },
  methods: {
    async onSubmit() {
      try {
        const response = await login({ email: this.email, password: this.password });
        setToken(response.data.token);
        this.error = '로그인불가';
        this.$router.push('/');
      } catch (e) {
        this.error = '아이디 혹은 비밀번호가 틀렸습니다.';
      }
    },
  },
};



  //token
  // import {auth, setAuthInHeader} from '../api' //auth:인증함수
  
  // export default {
  //   data() {
  //     return {
  //       email: '',
  //       password: '',
  //       error: '',
  //       rPath: ''
  //     }
  //   },
  //   computed: {
  //     invalidForm() {
  //       return !this.email || !this.password
  //     }
  //   },
  //   created() { //컴포넌트가 생성될때 rPath에 저장
  //     this.rPath = this.$route.query.rPath || '/'
  //   },
  //   methods: {
  //     onSubmit() {
  //       console.log(this.email, this.password)//email, password 콘솔창에 출력
  //       auth.login(this.email, this.password)
  //         .then(data => {
  //           localStorage.setItem('token', data.accessToken) //성공된 정보 저장
  //           setAuthInHeader(data.accessToken)//로그인 완료 후 토큰 정보 전달
  //           this.$router.push(this.rPath) //리다이렉트
  //         })
  //         .catch(err => {
  //           this.err = 'err.data.error'
  //         })
  //     }
  //   }
  // }
   </script>
  
  <style scoped>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
@import url('https://fonts.googleapis.com/css?family=Nanum+Gothic&display=swap');

ul,li{list-style:none;}
input::-webkit-input-placeholder{color:#b5b5b5; font-size:12px; line-height:100%;}
input:focus { border: 1px solid #727272;}
html,body,h1,h2,h3,h4,h5,h6,div,ul,li,label,form,input,button {margin:0;padding:0;}
body{background:#fff; min-width:320px; -webkit-text-size-adjust:none;word-wrap:break-word;word-break:break-all;}
body,input,button {border:none;font-size:12px; font-family:'Noto Sans KR', sans-serif;color:#727272;}
label,img,input,button{vertical-align:middle;}
input[type=text],
input[type=password],
input[type=email] { height:30px; font-size:13px; color:#373737; border:1px solid #e9e9e9; background:#fff; transition: all 0.5s; vertical-align:middle;background:#eaeaea; border-color:#c0c0c0; color:#666; -webkit-appearance:none;font-size:12px;}


.login { width: 410px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); /*border: 1px solid red;*/ } 
.login h2 {padding:0 0 20px; font-size: 50px; color:rgb(4,122,255); border-bottom: 2px solid rgb(62, 101, 159); text-align: center;
line-height:1; }
  
.login > ul { padding: 40px 0 10px;}
.login > ul li { padding: 0 0 12px;}

.login > ul li { padding: 0 0 12px; }
.login > ul li input { width: 100%; height: 46px; box-sizing: border-box; text-indent: 16px;}
.login > ul li input::-webkit-input-placeholder { font-size: 16px; color: rgb(184, 184, 184); text-indent: 16px;}
.login > ul li input:focus { outline-color: rgb(4,122,255);}

.login > ul li input[type="checkbox"] { position:absolute; left: -3000%; }
.login > ul li input[type="checkbox"]+label { height: 36px; line-height: 36px;}
.login > ul li input[type="checkbox"]+label:before { content:""; display: inline-block; width: 18px; height: 18px; border: 1px solid #666; background-color: #fff; vertical-align: -5px; margin:0 10px 0 0;}
.login > ul li input[type="checkbox"]:checked + label:before { background: url(../assets/ico_check_on.png) no-repeat center rgb(77,106,150); border-color: rgb(77,106,150);} 


.login button { width:100%; height: 56px; line-height: 56px; background:rgb(4,122,255); font-size: 20px; color:#fff; text-align: center; border-radius: 3px; margin-top: 15px;}
.login button:hover { cursor:pointer;}


.error {
    color: #f00;
  }
</style>