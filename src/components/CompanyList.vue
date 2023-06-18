<template>
  <div>
    <main>
      <div class="center">
        <div class="background">
          <h2>{{ district }}</h2>
        </div>
        <div class="card-group">
          <div class="card" v-for="company in companyList" v-bind:key="company.id">
            <h3>{{ company.name }} 
              <span v-if="company.branchName && company.branchName !== 'None'"> {{ company.branchName }}</span>
            </h3>
            <div class="adress">
              <p>지번 주소: {{ company.localAddress }}</p>
              <p>도로명 주소: {{ company.roadAddress }}</p>
              <p>전화번호: {{ company.formattedPhoneNumber ? company.formattedPhoneNumber : '업체에서 지원하지 않습니다.' }}</p>
              <p>평점: {{ company.rating ? company.rating : '업체에서 지원하지 않습니다' }}</p>
            </div>
            <div>
            <router-link :to="getMapLink(company)">지도 보기</router-link>
            </div>
            <div v-if="company.formattedPhoneNumber || company.rating">
            <router-link :to="getDetail(company)">상세 보기</router-link>
            </div>
          </div>
        </div>

        <div id="page-btns">
          <button class="page-btn" @click="prevPage" v-if="currentPage > 0">이전 페이지</button>
          <button class="page-btn" v-for="pageNumber in pageNumbers" v-bind:key="pageNumber.id"
           @click="goToPage(pageNumber - 1)" :class="{ 'active': currentPage === pageNumber - 1 }">{{ pageNumber }}</button>
          <button class="page-btn" @click="nextPage" v-if="hasNextPage">다음 페이지</button>
        </div>

       
      </div>
    </main>
  </div>
</template>
  
<script>
import { fetchCompanyData } from '../api'

export default {
  data() {
    return {
      companyList: [],
      district: '',
      currentPage: 0,
      pageNumbers: [1],
      hasNextPage: true,
      companiesPerPage: 9, // 페이지당 회사 수를 정의
      totalPages: 0,
    };
  },

  created() {
    this.fetchCompanyData();
  },
  methods: {
    getMapLink(company) {        
      return {
        name: 'MapPage',
        path: '/MapPage',
        query: {
          latitude: company.latitude,
          longitude: company.longitude,
          name: company.name,
          branchName: company.branchName,
          localAddress: company.localAddress,
          roadAddress: company.roadAddress
          // largeName: company.largeName,
          // reviews: reviewsString,
        },
      };
      // return `/map?latitude=${company.latitude}&longitude=${company.longitude}`;
    },
    getDetail(company) {
      const reviewsString = JSON.stringify(company.reviews);    
      const openingHoursString = JSON.stringify(company.openingHours);    

      return {
        name: 'DetailPage',
        path: '/DetailPage',
        query: {
          name: company.name,
          branchName: company.branchName,
          openingHours : openingHoursString,
          reviews: reviewsString,
        },
      };
      // return `/map?latitude=${company.latitude}&longitude=${company.longitude}`;
    },

    fetchCompanyData() {
        const { smallCode, district, region } = this.$route.query;
 
    //   const { smallCode } = this.$route.query;
    //   const district = this.$route.params.district; // 라우트 매개변수에서 region 값을 가져옵니다.
      this.district = district;

      fetchCompanyData(region, district, this.currentPage, smallCode)
        .then((response) => {
          this.companyList = response.data.content;
          this.totalPages = response.data.totalPageNumber;
          this.hasNextPage = this.currentPage < this.totalPages - 1;

          const startPage = Math.max(0, this.currentPage - 4);
          const endPage = Math.min(this.totalPages, startPage + 10);
          this.pageNumbers = Array.from({ length: endPage - startPage }, (v, i) => i + startPage + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    
    },
    nextPage() {
      if (this.hasNextPage) {
        this.currentPage++;
        this.fetchCompanyData();
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.fetchCompanyData();
      }
    },
    goToPage(pageNumber) {
      this.currentPage = pageNumber;
      this.fetchCompanyData();
    },
  },
};
</script>

  
<style scoped>
header {
    background-color: #fff;
    text-align: center;
}

h1 a {
    text-decoration: none;
    color: rgb(4,122,255);
}

h1 a:visited,
h1 a:active {
    color: rgb(4,122,255);
    text-decoration: none;
}

h1 {
    margin: 0;
    padding: 20px 0;
    font-size: 60px;
    color: rgb(4,122,255);
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
    color: #ffffff;
    text-decoration: none;
}

nav a:hover {
    background-color: #fff;
    color: #87CEFA;
}


/*검색창*/
.search-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  
  .search-container input[type="text"] {
    width: 40%;
    padding: 12px 20px;
    margin-right: 10px;
    border: 2px solid #2196F3;
    border-radius: 25px;
    outline: none;
  }
  
  .search-container button[type="submit"] {
    background-color: #2196F3;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
  }

/*서울*/
main {
    margin: 20px;
}

.background {
    /* background-color:  #87CEFA; */
    width: 65%;
    border-bottom: 2px solid rgb(62, 101, 159);
    /* border-top: 2px solid rgb(62, 101, 159); */
    margin-bottom: 10px;
    align-items: center;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

h2 {
    font-size: 36px;
    margin-bottom: 20px;
    text-align: center;
}

.adress {
    margin-top: 40px;
}
p {
    font-size: 20px;
    margin-bottom: 40px;
}

.button-group {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 40px;
}

.category-button {
    background-color: #0077c2;
    /* rgb(4,122,255); */
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 16px;
}

.category-button:hover {
    background-color: rgb(33, 44, 132);
    
}

.card-group {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.card {
    background-color: #fff;
    box-shadow: 0 0 10px rgb(4,122,255);
    border-radius: 5px;
    margin: 20px;
    padding: 20px;
    width: 300px;
    text-align: center;
    padding-bottom: 20px;
}

/* .card img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 20px;
} */

.card h3 {
    font-size: 24px;
    margin-bottom: 10px;
}

.card p {
    font-size: 16px;
    margin-bottom: 20px;
}

.card a {
    display: inline-block;
    background-color: rgb(33, 44, 132);
    color: #fff;
    padding: 15px 30px;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    margin-top: 30px;
}

.card a:hover {
    background-color: rgb(4,122,255);
}


.page-btn {
    display: inline-block;
    padding: 5px 10px;
    background-color: #0077c2;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    border-radius: 5px;
}
#page-btns {
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
}
.active {
    background-color: #87CEFA;
}

</style>