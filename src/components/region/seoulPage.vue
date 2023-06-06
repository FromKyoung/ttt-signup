<template>
<div>
    
    <!-- <div class="search-container">
        <input type="text" placeholder="서울">
        <button type="submit">검색</button>
    </div> -->
    <div class="dropdown-container">
      <input type="text" readonly @click="showDropdown = !showDropdown" v-model="selectedRegion" placeholder="서울">
      <div class="dropdown" v-if="showDropdown">
        <div
          class="dropdown-item"
          v-for="(district, index) in regions"
          :key="index"
          @click="selectRegion(district)"
        >
          {{ district }}
        </div>
      </div>
    </div>


 <div class="content">
  <div class="container">
     <div class="category-menu">
      <ul class="category-list">
      <div class="large-category-item" v-for="category in seoul" :key="category.largeCode">
        <a href="#" class="large-category-link">{{ category.largeName }}</a>
        <ul class="medium-category-list">
          <li class="sub-category-item" v-for="subCategory in category.subCategories" :key="subCategory.mediumCode">
            <a href="#" class="sub-category-link">{{ subCategory.mediumName }}</a>
            <ul class="sub-sub-category-list">
              <li class="sub-sub-category-item" v-for="subSubCategory in subCategory.subSubCategories" :key="subSubCategory.smallCode">
                <a href="#" @click="handleClick(subSubCategory.smallCode)">{{ subSubCategory.smallName }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      </ul>
     </div>
    </div>

     
    
    <div class="region-container">
      <div class="image">
        <img src="../../assets/seoul.jpg" alt="seoul"  height="350">
      </div>
        <div class="location-description">
          <span>
          <img id="icon" src="../../assets/location_icon.png" alt="Location Icon" style="vertical-align: middle; width: 2rem; height: 2rem;" >
          <span><h2>서울</h2></span>
        </span>
          <p>서울은 대한민국의 수도이자, 경제, 문화, 교육, 정치, 국제교류의 중심지입니다.
            대한민국 정부와 국회, 그리고 다양한 중앙 정부 기관들이 서울에 위치해 있습니다.
            서울은 또한 대한민국에서 가장 발전된 문화와 예술의 중심지 중 하나입니다. 국내 최대 규모의 박물관과 미술관, 민속촌, 공원, 극장, 음악당 등의 문화 시설이 위치해 있으며, 대한민국의 전통적인 문화를 즐길 수 있는 곳도 많이 있습니다.
            서울은 대한민국에서 가장 인기 있는 여행지 중 하나입니다. 서울에는 다양한 쇼핑센터, 음식점, 바, 클럽 등이 있어서, 쇼핑과 먹거리를 즐길 수 있는 곳으로도 유명합니다. 
          </p>
        </div>
    </div>
 </div>
</div>
</template>

<script>
import seoul from './data/seoul.js';

export default {
  data() {
    return {
      seoul,
      showDropdown: false,
      selectedRegion: '',
      regions: [
        '강남구',
        '강동구',
        '강북구',
        '강서구',
        '관악구',
        '광진구',
        '구로구', 
        '금천구', 
        '노원구', 
        '도봉구', 
        '동대문구', 
        '동작구', 
        '마포구', 
        '서대문구', 
        '서초구', 
        '성동구', 
        '성북구', 
        '송파구', 
        '양천구', 
        '영등포구', 
        '용산구', 
        '은평구', 
        '종로구', 
        '중구', 
        '중랑구'
      ],
    };
  },
  methods: {
    selectRegion(district) {
      this.selectedRegion = district;
      this.showDropdown = false;
      console.log(district); 
    },
    
    handleClick(categoryId) {
      console.log(categoryId);
      this.$router.push({ 
        name: 'Company', 
        query: { 
          smallCode: categoryId, 
          district: this.selectedRegion,
          region: 'seoul' // 선택한 지역명을 추가합니다.
        } 
      });
    },
// handleClick(categoryId) {
    //   console.log(categoryId);
    //   axios
    //     .get(`http://43.201.199.65:8080/region/seoul/company`, {
    //       params: {
    //         smallCode: categoryId,
    //         district: this.selectedRegion,
    //       },
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       this.$router.push({ name: 'Company', query: { smallCode: categoryId, district: this.selectedRegion } });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
  },
};




// import axios from 'axios';
// import seoul from './data/seoul.js';
  
// export default {
//   data() {
//     return {
//       seoul,
//       showDropdown: false,
//       selectedRegion: '',
//       regions: [
//         '강남구',
//         '강동구',
//         '강북구',
//         '강서구',
//         '관악구',
//         '광진구',
//         // ... 다른 구 이름들 ...
//       ],
//     };
//   },
//   methods: {
//     selectRegion(region) {
//       this.selectedRegion = region;
//       this.showDropdown = false;
//       console.log(region); // 선택한 구 이름 출력
//     },
//     handleClick(categoryId) {
//       console.log(categoryId);

//       axios.get(`http://43.201.199.65:8080/region/seoul/company`, {
//         params: {
//           smallCode: categoryId,
//           region: this.selectedRegion
//         }
//       })          
//       .then(response => {
//         // API 응답을 처리합니다.
//         console.log(response.data);
//       })
//       .catch(error => {
//         // 에러를 처리합니다.
//         console.error(error);
//       });
//     },
//   },
// };

//첫smallName코드
// import {regionSeoulSmallName} from '../../api'
// export default {
//   methods: {
//     saveText(event) {
//       event.preventDefault();
//       const smallName = event.target.innerText;

//       regionSeoulSmallName.give(smallName)
//         .then(response => {
//           console.log(response);
//           console.log(smallName);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   }
// }

</script>

<style scoped>

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

/* 마크다운 */

.dropdown-container {
  /* 여기에 스타일 추가 */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}
.dropdown-container input[type="text"] {
    width: 30%;
    padding: 12px 20px;
    margin-right: 10px;
    border: 2px solid #2196F3;
    border-radius: 25px;
    outline: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.dropdown {
  position: absolute;
  top: 35px;  /* input 필드의 높이 + 테두리 두께 + 아래 마진 등을 고려하여 조절 */
  width: 30%;
  z-index: 1;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  padding: 10px 0;
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
  white-space: nowrap;
}

.dropdown-item:hover {
  background-color: #2196F3;
  color: white;
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
    width: 30%;
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

  /* 지역과 배너
  .content {
    display: flex;
  } */

  /*지역설명*/
  
  .region-container {
    display: relative;
    justify-content: center;
    align-items: center;
    height: 100vh;
    float: right;
    width: 50%;
    height: 100%;
    margin-right: 100px;
  }

  .image {
    position: absolute;
    margin-right: 15px;
    margin-top: 60px;
    margin-left: -215px;
    width: 50%;
    float: left;
}

  
  .location-description {
    width: 50%;
    float: right;
    position: relative;
  }

  #icon{
    position: relative;
    top :20px;
    left : 35px
  }
  
  .location-description h2 {
    font-size: 2rem;
    margin-bottom: 10px;
    margin-left: 20px;
  }

  
  .location-description p {
    font-size: 1.2rem;
    line-height: 1.5;
    margin-left: 20px;
  }
  
 * {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Noto Sans KR', sans-serif;
}


/*배너*/

ul,li{list-style:none;}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  margin-left: -30px;
  margin-top: 30px;
  width: 40%;
  height: 100%;
  margin-right: -100px;
}

.category-menu {
  position: relative;
  width: 200px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
}

.category-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.large-category-item {
  position: relative;
  margin-bottom: 10px;
}

.large-category-link {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
}

.medium-category-list {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  min-width: 200px;
}

.sub-category-item {
  margin-bottom: 5px;
}

.sub-category-item:last-child {
  margin-bottom: 0;
}

.sub-category-link {
  display: block;
  padding: 5px;
  color: #333;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
}

.sub-sub-category-list {
  display: none;
  position: absolute;
  top: 0;
  left: 100%;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  min-width: 200px;
}

.sub-sub-category-item {
  margin-bottom: 5px;
}

.sub-sub-category-item:last-child {
  margin-bottom: 0;
}

.sub-sub-category-item a {
  display: block;
  padding: 5px;
  color: #333;
  text-decoration: none;
  font-size: 0.9rem;
}

.large-category-item:hover .medium-category-list {
  display: block;
}

.sub-category-item:hover .sub-sub-category-list {
  display: block;
}

.sub-category-item {
    position: relative;
  }


</style>