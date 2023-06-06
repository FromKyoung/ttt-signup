<template>
    <div>
        <div class="dropdown-container">
          <input type="text" readonly @click="showDropdown = !showDropdown" v-model="selectedRegion" placeholder="전라남도">
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
          <div class="large-category-item" v-for="category in jeollanamdo" :key="category.largeCode">
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
            <img src="../../assets/jeonnam.jpg" alt="jeollabukdo"  height="350">
          </div>
            <div class="location-description">
              <span>
              <img id="icon" src="../../assets/location_icon.png" alt="Location Icon" style="vertical-align: middle; width: 2rem; height: 2rem;" >
              <span><h2>전라남도</h2></span>
            </span>
              <p>전라남도는 대한민국의 남서쪽에 위치한 지방입니다. 전남은 전국적으로 유적지와 자연경관, 그리고 맛집들이 많아 여행객들에게 인기가 많은 지역 중 하나입니다.
                    전남에는 대표적인 관광지로는 순천, 완도, 여수 등이 있습니다. 전남은 또한 전통문화와 역사적 유산이 풍부한 지역입니다. 
                    전라남도는 자연경관이 아름다워서 다양한 자연 관광지도 많습니다. 또한, 바다와 산, 계곡 등 다양한 지형도 가지고 있어서 자연을 즐길 수 있는 산책로와 하이킹코스도 다양합니다.
              </p>
            </div>
        </div>
     </div>
    </div>
</template>



<script>
import jeollanamdo from './data/jeollanamdo.js';
  
export default {
  data() {
    return {
      jeollanamdo,
      showDropdown: false,
      selectedRegion: '',
      regions: [
        '강진군', 
        '고흥군', 
        '곡성군', 
        '광양시', 
        '구례군', 
        '나주시', 
        '담양군', 
        '목포시', 
        '무안군', 
        '보성군', 
        '순천시', 
        '신안군', 
        '여수시', 
        '영광군', 
        '영암군', 
        '완도군', 
        '장성군', 
        '장흥군', 
        '진도군', 
        '함평군', 
        '해남군', 
        '화순군'
      ],
    };
  },
  methods: {
    selectRegion(district) {
      this.selectedRegion = district;
      this.showDropdown = false;
      console.log(district); // 선택한 구 이름 출력
    },
    handleClick(categoryId) {
      console.log(categoryId);
      this.$router.push({ 
        name: 'Company', 
        query: { 
          smallCode: categoryId, 
          district: this.selectedRegion,
          region: 'jeollanamdo' // 지역명
        } 
      });
    },
  },
};
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