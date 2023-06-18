<template>
  <div>
    <div class="container">

      <div class="right">
        <h2>{{ name }}
          <span v-if="branchName && branchName !== 'None'"> {{ branchName }}</span>
        </h2>
        <p>지번 주소 : {{ localAddress }}</p>
        <p>도로명 주소 : {{ roadAddress }}</p>
        <div class="map-container">
          <h2>Map Page </h2>
          <div id="map" class="map"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      // openingHours: {
      //   weekday_text: []
      // },
      // reviews: []
    };
  },
  mounted() {
   
    // 데이터를 변수에 저장 (실제로는 서버로부터 가져와야 함)
    const data = this.$route.query;
    this.name = data.name;
    this.branchName = data.branchName;
    this.localAddress = data.localAddress;
    this.roadAddress = data.roadAddress;
    //this.reviews = JSON.parse(data.reviews);
    
  // 지도 관련 코드
    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=trd4jhtdml';
    script.onload = this.initMap;
    document.head.appendChild(script);
   
  },
  methods: {
    initMap() {
      const { latitude, longitude } = this.$route.query;
      // 네이버 지도 API를 사용하여 지도 초기화
      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: 16
      });
      
      // 마커를 생성하고 지도에 추가
      new window.naver.maps.Marker({
    position: new window.naver.maps.LatLng(latitude, longitude),
    map: map 
});
    }
  },
};
</script>



<style scoped>
.map-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}

.map {
  width: 800px;
  height: 800px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(32, 93, 237, 0.2);
}
.container {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
}

.left {
    flex: 1;
    height: 500px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
}
.right {
    flex: 1;
    height: 500px;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>