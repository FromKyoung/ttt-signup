<template>
    <div>
        <div id="wrap" class="wrapper">
            <form>
                <header>
                    <div id="header">
                        <h1>t t t</h1>
                    </div>
                </header>

                <div id="container">
    <div id="line"></div>

    <div class="row_group">
      <div class="userInput">
        <h3 class="list">아이디<span class="error_next_box" id="idError"></span></h3>
        <span class="box int_id">
          <input type="email" v-model="email" class="int check" @blur="checkId" placeholder="사용할 이메일을 입력해주세요." />
        </span>
      </div>

      <div class="userInput">
        <h3 class="list">비밀번호<span class="error_next_box int_pass" id="pwError"></span></h3>
        <span class="box int_id" id="alertTxt">
          <input type="password" v-model="password" class="int check" minlength="8" @blur="checkPw" placeholder="8자 이상, 영문 대소문자, 숫자, 특수문자 사용" />
        </span>
      </div>

      <div class="userInput">
        <h3 class="list">비밀번호 재확인<span class="error_next_box int_pass_check" id="pwCheckError"></span></h3>
        <span class="box int_id">
          <input type="password" v-model="passwordCheck" class="int check" minlength="8" @blur="comparePw" placeholder="비밀번호를 다시 입력해주세요." />
        </span>
      </div>
    </div>

    <div class="row_group">
      <div class="userInput">
        <h3 class="list">성명<span class="error_next_box" id="nameError"></span></h3>
        <span class="box int_id">
          <input type="text" v-model="name" class="int check" @blur="checkName" placeholder="홍길동" />
        </span>
      </div>

      <div class="userInput">
        <h3 class="list">전화번호("-" 제외)<span class="error_next_box" id="phoneNumError"></span></h3>
        <span class="box int_id">
          <input type="text" v-model="phoneNumber" class="int check" maxlength="11" @blur="checkPhoneNum" placeholder="01012345678" />
        </span>
      </div>
    </div>

    <div class="btn_type">
      <button type="button" class="box btn_box" @click="submitForm">고객님 회원가입</button>
      <button id="ceo" class="box btn_box" @click="ceoSubmitForm">사장님 회원가입</button>

    </div>
  </div>
            </form>
        </div>
    </div>
</template>

<script>
import {join} from '../api'
import { setToken } from '../api';
import { ceojoin } from '../api';




export default {
    data() {
    return {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
      phoneNumber: "",
      errorMsg: {
        idError: "",
        pwError: "",
        passwordCheckError: "",
        nameError: "",
        phoneNumError: "",
      },
    };
  },
    
  methods: {
    checkId() {
      const error = document.querySelector("#idError");
      const idPattern = /[a-zA-Z0-9]/;
      const idPattern2 = /[@]/;

      if (this.email === "") {
        error.innerHTML = "필수 정보입니다.";
        error.style.display = "block";
        return false;
      } else if (!idPattern.test(this.email) || !idPattern2.test(this.email)) {
        error.innerHTML = "@를 포함한 이메일로 작성해주세요.";
        error.style.display = "block";
        return false;
      } else {
        error.innerHTML = "사용가능한 아이디입니다.";
        error.style.color = "#08A600";
        error.style.display = "block";
        return true;
      }
    },

    checkPw() {
      const error = document.querySelector("#pwError");
      const pwMsg = document.querySelector("#alertTxt")
      const pwPattern = /[a-zA-Z0-9]{8,}/;
      //const pwPattern2 = /[~!@#$%^&*()_+|<>?:{}]/;

      if (this.password === "") {
        error.innerHTML = "필수 정보입니다.";
        error.style.display = "block";
        return false;
      } else if (
        !pwPattern.test(this.password) //||
        //!pwPattern2.test(this.password)
      ) {
        error.innerHTML = "8자 이상,영문 대소문자, 숫자, 특수문자를 사용하세요.";
        error.style.display = "block";
        return false;
      } else {
        error.style.display = "none";
        pwMsg.style.display = "block";
        pwMsg.style.color = "#03c75a";
        return true;
      }
    },

    comparePw() {
      const error = document.querySelector("#pwCheckError");

      if (this.passwordCheck === this.password && this.passwordCheck != "") {
        error.style.display = "none";
        return true;
      } else if (this.passwordCheck !== this.password) {
        error.innerHTML = "비밀번호가 일치하지 않습니다.";
        error.style.display = "block";
        return false;
      }

      if (this.passwordCheck === "") {
        error.innerHTML = "필수 정보입니다.";
        error.style.display = "block";
        return false;
      }
    },

    checkName() {
      const error = document.querySelector("#nameError");
      const namePattern = /[a-zA-Z가-희]/;

      if (this.name === "") {
        error.innerHTML = "필수 정보입니다.";
        error.style.display = "block";
        return false;
      } else if (!namePattern.test(this.name) || this.name.indexOf(" ") > -1) {
        error.innerHTML =
          "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error.style.display = "block";
        return false;
      } else {
        error.style.display = "none";
        return true;
      }
    },

    checkPhoneNum() {
      const error = document.querySelector("#phoneNumError");
      const isPhoneNum = /([01]{2})([01679]{1})([0-9]{3,4})([0-9]{4})/;

      if (this.phoneNumber === "") {
        error.innerHTML = "필수 정보입니다.";
        error.style.display = "block";
        return false;
      } else if (!isPhoneNum.test(this.phoneNumber)) {
        error.innerHTML = "형식에 맞지 않는 번호입니다.";
        error.style.display = "block";
        return false;
      } else {
        error.style.display = "none";
        return true;
      }
    },
    
async submitForm(event) {
  event.preventDefault();
  if (
    this.checkId() &&
    this.checkPw() &&
    this.comparePw() &&
    this.checkName() &&
    this.checkPhoneNum()
  ) {
      const response = await join({
        email: this.email,
        password: this.password,
        name: this.name,
        phoneNumber: this.phoneNumber,
      });
      console.log(response.data);
      alert("회원가입에 성공했습니다.");
      setToken(response.data.token);
      this.$router.push('/');  
         }
    },
    async ceoSubmitForm(event) {
      event.preventDefault();
      if (
        this.checkId() &&
        this.checkPw() &&
        this.comparePw() &&
        this.checkName() &&
        this.checkPhoneNum()
      ) {
        try {// formData 생성 및 API 호출 처리
          const response = await ceojoin({
            email: this.email,
            password: this.password,
            name: this.name,
            phoneNumber: this.phoneNumber,
          });
          console.log(response.data);
          alert("회원가입에 성공했습니다.");
          setToken(response.data.token);
          this.$router.push('/'); 
        } catch (error) {
          console.error(error);
          if (error.response && error.response.data) {
            // 서버에서 에러 메시지를 반환한 경우, 그 메시지를 사용자에게 표시합니다.
            alert(`회원가입 실패: ${error.response.data.message}`);
          } else {
            // 그 외의 경우, 일반적인 에러 메시지를 표시합니다.
            alert('회원가입 중에 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
          }
          }
          }
    },


  },
};


//     join.register(formData)
//       .then(() => {
//         alert("회원가입이 성공적으로 완료되었습니다.");
//           this.$router.push('/login');
//       })
//       .catch(error => {
//         console.error(error);
//         alert("회원가입 오류가 발생했습니다. 다시 시도해주세요.");
//       });
//   } else {
//     return alert("올바르게 입력된 정보가 아닙니다. 다시 확인해주세요.");
//   }
// },
//   },
// };

 //로그인 로직
//  async submitForm() {
//   if (
//     this.checkId() &&
//     this.checkPw() &&
//     this.comparePw() &&
//     this.checkName() //&&
//     //this.checkPhoneNum()
//   ) {
//     try {// formData 생성 및 API 호출 처리
//       const formData = ({
//         email: this.email,
//         password: this.password,
//         name: this.name
//         // phoneNumber: this.phoneNumber,
//       });

//       const response = await axios({
//         method: 'post',
//         url: 'http://43.200.25.231:8080/auth/signup', // 여기에 실제 API 주소를 넣으세요.
//         data: JSON.stringify(formData),
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });

//       console.log(response.data);
//       this.$router.push('/login');

//     } catch (error) {
//       console.error(error);
//       }
//       }
//     },
//   },
// };

</script>

<style>
#header h1{
    margin-top : 50px;
    margin-bottom: 2%;
    text-align: center;
    font-size: 60px;
    color:rgb(4,122,255);
    padding-bottom: 20px;
    /*border-bottom: 5px solid rgb(62, 101, 159);
    border-radius: 5px; */
 }

 #header {
    position: relative;
    overflow: hidden;
    padding-bottom: 8px;
    display: block;
 }
 
 #line {
    display: block;
    position: relative;
    width: 100%;
    height: 10px;
    border-top: 5px solid rgb(62, 101, 159);
    box-sizing: border-box;
 } 

 .int {
    display: block;
    position: relative;
    width: 100%;
    height: 29px;
    border: solid 1px #000000;
    padding-right: 25px;
    line-height: 29px;
    border: none;
    font-size: 15px;
    box-sizing: border-box;
    z-index: 10;
 }
 
 #container, #header {
     min-width: 220px;
     margin: 0 15px;
     margin-top: 0px;
     margin-right: 15px;
     margin-bottom: 0px;
     margin-left: 15px;
     box-sizing: border-box;
 }
 
 
 /* boby{
    width: 100%;
    height: 100%;
 } */
 
 div{
    display : block;
 }
 
 
 #idError, #pwError, #pwCheckError, #nameError, #phoneNumError, #addressError, #emailError, #consentError {
    width:0px auto;
    display : inline-block;
    color : red;
    text-align : right;
    font-size : 11px;
    font-weight: normal;
    margin-left : 10px;
 }
 
  #container, #footer {
     margin: 0 auto;
     max-width: 768px;
     min-width: 460px;
  }
  
  .wrapper {
     width: 100%;
     min-width: 760px;
  }
 
 
  .box{
      margin : 0px auto;
      display: block;
      position: relative;
      width: 60%;
      height: 51px;
      border: solid 1px #dadada;
      border-color: rgb(218, 218, 218);
      /*border-style: dashed;*/
      border-radius: 6px;
      border-width: 1px;
      padding: 10px 110px 10px 14px;
      background: rgb(4,122,255);
      box-sizing: border-box;
      /* vertical-align: top; */
  }
  
  .box.int_id, .box.int_id input {
      display: block;
      background: #fff;
      outline: 0;
  }
 
  .list {
     display : inline-black;
     margin : 0px auto;
     /*padding: 10px;*/
     width: 60%;
     font-size: 14px;
     font-weight: 700;
     padding-bottom: 3px;
  }
  .list h3{
     display : inline-black;
  }
 
  .userInput{
     margin : 3% 0;
  }
 
  .int {
     display: block;
     position: relative;
     width: 100%;
     height: 29px;
     border: solid 1px #dadada;
     padding-right: 25px;
     line-height: 29px;
     border: none;
     background: #fff;
     font-size: 15px;
     box-sizing: border-box;
     z-index: 10;
  }
 
 
  .btn_type {
     margin-bottom : 10%;
     display: block;
     width: 100%;
     padding: 15px 0 15px;
     font-size: 18px;
     font-weight: 700;
     text-align: center;
     cursor: pointer;
     box-sizing: border-box;
    }
  
 .btn_box {
    padding-left: 100px;
    margin-bottom: 10px;

 }
 
 button {
     cursor: pointer;
     color: #fff;
     font-size: 15px;
 }
 
 .box button {
    border: none;
 }

 button #ceo {
  padding-top: 10px;
 }

</style>