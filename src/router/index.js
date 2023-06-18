
import { createRouter, createWebHistory } from 'vue-router';

//뷰라우터 사용법:https://v3.router.vuejs.org/kr/guide/#javascript
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import JoinPage from '../components/JoinPage.vue'
import BoardList from '../components/BoardList.vue'
import ShowBoard from '../components/ShowBoard.vue'
import MyPage from '../components/MyPage.vue'
import NotFound from '../components/NotFound.vue'
//지역
import seoul from '../components/region/seoulPage.vue'
import chungcheongnamdo from '../components/region/chungcheongnamdoPage.vue'
import busan from '../components/region/busanPage.vue'
import chungcheongbukdo from '../components/region/chungcheongbukdoPage.vue'
import daegu from '../components/region/daeguPage.vue'
import daejeon from '../components/region/daejeonPage.vue'
import gangwondo from '../components/region/gangwondoPage.vue'
import gwangju from '../components/region/gwangjuPage.vue'
import gyeongsangbukdo from '../components/region/gyeongsangbukdoPage.vue'
import gyeonggido from '../components/region/gyeonggidoPage.vue'
import gyeongsangnamdo from '../components/region/gyeongsangnamdoPage.vue'
import incheon from '../components/region/incheonPage.vue'
import jejudo from '../components/region/jejudoPage.vue'
import jeollabukdo from '../components/region/jeollabukdoPage.vue'
import jeollanamdo from '../components/region/jeollanamdoPage.vue'
import sejong from '../components/region/sejongPage.vue'
import ulsan from '../components/region/ulsanPage.vue'


import CompanyList from '../components/CompanyList.vue'
import PrPage from '../components/PrPage.vue'
import ShowPr from '../components/ShowPr.vue'
import MapPage from '../components/MapPage.vue'
import DetailPage from '../components/DetailPage.vue'




const requireAuth = (to, from, next) =>{ //네비게이션 가드 설정(로그인 인증이 필요한 부분)
    const isAuth = localStorage.getItem('token') //token정보가있으면 문자열 저장
    const loginPath = `/login?rPath=${encodeURIComponent(to.path)}` //로그인 완료후 현재페이지로 돌아오게함
    isAuth ? next() : next(loginPath)//로그인 토큰 값이 있으면 next함수로 라우팅 로직 이어서 수행, 그렇지 않을경우 loginPath로 리다이렉트
}

const routes = [  //우선순위에 의해 선언된 순서대로 매칭
    { path: '/', component: HomePage}, //beforeEnter: requireAuth-로그인 인증 필요
    { path: '/login', component: LoginPage },
    { path: '/signup', component: JoinPage },
    { path: '/board', component: BoardList, beforeEnter: requireAuth},
    { path: '/boards/:id',name: 'ShowBoard',component: ShowBoard,},
    { path: '/mypage', component: MyPage , beforeEnter: requireAuth},
    { path: '/MapPage', name: 'MapPage', component: MapPage },
    { path: '/DetailPage', name: 'DetailPage', component: DetailPage },
    

    { path: '/:catchAll(.*)', component: NotFound }, //위에 경로로 매칭 안됐을때 마지막으로 규칙 적용
    

    { path: '/region/seoul', component: seoul, beforeEnter: requireAuth},
    { path: '/region/chungcheongnamdo', component: chungcheongnamdo, beforeEnter: requireAuth},
    { path: '/region/busan', component: busan, beforeEnter: requireAuth},
    { path: '/region/chungcheongbukdo', component: chungcheongbukdo, beforeEnter: requireAuth},
    { path: '/region/daegu', component: daegu, beforeEnter: requireAuth},
    { path: '/region/daejeon', component: daejeon, beforeEnter: requireAuth},
    { path: '/region/gangwondo', component: gangwondo, beforeEnter: requireAuth},
    { path: '/region/gwangju', component: gwangju, beforeEnter: requireAuth},
    { path: '/region/gyeongsangbukdo', component: gyeongsangbukdo, beforeEnter: requireAuth},
    { path: '/region/gyeonggido', component: gyeonggido, beforeEnter: requireAuth},
    { path: '/region/gyeongsangnamdo', component: gyeongsangnamdo, beforeEnter: requireAuth},
    { path: '/region/incheon', component: incheon, beforeEnter: requireAuth},
    { path: '/region/jejudo', component: jejudo, beforeEnter: requireAuth},
    { path: '/region/jeollabukdo', component: jeollabukdo, beforeEnter: requireAuth},
    { path: '/region/jeollanamdo', component: jeollanamdo, beforeEnter: requireAuth},
    { path: '/region/sejong', component: sejong, beforeEnter: requireAuth},
    { path: '/region/ulsan', component: ulsan, beforeEnter: requireAuth},

    { path: '/company', name: 'Company', component: CompanyList},
    
    
    // beforeEnter: requireAuth 

    { path: '/pr', component: PrPage, beforeEnter: requireAuth},
    { path: '/pr/:id',name: 'ShowPr',component: ShowPr,},

    

  ]

  const router = createRouter({
    history: createWebHistory(),
    base: process.env.BASE_URL,
    routes
  });




//사용 할수 있도록 모듈로 익스포트
export default router