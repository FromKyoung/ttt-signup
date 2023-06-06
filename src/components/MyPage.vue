<template>
    <div class="my-page">
      <h1 class="title">마이페이지</h1>
      <div class="content">
        <div class="icon">
          <img src="../assets/user_icon.png" alt="user_icon" />
        </div>
        <div class="info" v-if="user">
            <p>이름: {{ user.name }}</p>
            <p>이메일: {{ user.email }}</p>
            <p>전화번호: {{ user.phoneNumber }}</p>
        </div>
      </div>
    </div>
  </template>

<script>
import { getUserInfo } from '../api';

export default {
  data() {
    return {
      user: null,
    };
  },
  async created() {
    try {
      const response = await getUserInfo();
      this.user = response.data;
    } catch (error) {
      console.error(error);
      this.error = '정보를 불러오지 못했습니다...';
    }
  },
  
};
// import { auth } from '../api'; 

// export default {
//   data() {
//     return {
//       user: null, // 사용자 정보를 저장할 객체
//     };
//   },
//   created() {
//     this.fetchUser(); // 컴포넌트 생성시 사용자 정보를 요청
//   },
//   methods: {
//     fetchUser() {
//       auth.fetchUser() // 사용자 정보를 불러오는 API를 호출
//         .then(user => {
//           this.user = user; // 불러온 사용자 정보를 저장
//         })
//         .catch(error => {
//             console.error('An error occurred:', error);
//          });
//     },
//   },
// };

</script>
  
<style scoped>
  .my-page {
    text-align: center;
    margin: 50px auto;
    width: 400px;
  }
  
  .title {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .content {
    border: 2px solid rgb(4,122,255);
    border-radius: 10px;
    padding: 20px;
  }
  
  .icon {
    margin-bottom: 20px;
  }
  
  .icon img {
    width: 70px; /* 적절한 크기로 조정 */
    height: 70px; /* 적절한 크기로 조정 */
  }
  </style>
  