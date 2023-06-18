<template>
  <div class="left">
        <div class="info-container">
          <h2>{{ name }} 
            <span v-if="branchName && branchName !== 'None'"> {{ branchName }}</span>
          </h2>
          <h3>영업시간</h3>
          <ul>
        <div v-if="openingHours && openingHours.weekday_text && openingHours.weekday_text.length > 0">
    <ul>
        <li v-for="time in openingHours.weekday_text" :key="time">
            <p>{{ time }}</p>
        </li>
    </ul>
</div>
<p v-else>정보가 없습니다.</p>

      </ul>
          <h3>리뷰</h3>
          <div id="review" v-for="review in reviews" :key="review.id">
            <p>작성자: {{ review.author_name}}</p>
            <p>평점: {{ review.rating }}</p>
            <p>{{ review.text }}</p>

          </div>

        </div>
  </div>
</template>

<script>

export default {
    data() {
      return {
        name:"",
        openingHours: [],
        reviews:[]
      };
    },
    mounted() {
      this.reviews = JSON.parse(this.$route.query.reviews);
      this.name = this.$route.query.name;
      this.branchName = this.$route.query.branchName;
      this.openingHours = JSON.parse(this.$route.query.openingHours);

    },
    methods: {
      
      }
    };
</script>
    
    
<style scoped>
    .map-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .map {
      width: 700px;
      height: 900px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 20px rgba(32, 93, 237, 0.2);
    }
    
    .container {
      display: flex;
      flex-direction: row;
      margin-top: 40px;
      
    
    }
    
    .left {
      flex: 1;
      margin-left: 80px;
      margin-right: 20px;
      height: auto;
      background-color: #fff;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(32, 93, 237, 0.2);
      margin-top: 20px;
    }
    
    .info-container {
      text-align: center;
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
    
    .review-list {
      list-style-type: none;
      padding: 0;
      margin-top: 20px;
    }
    
    .review-list li {
      margin-bottom: 10px;
    }
    #review {
      border: 2px solid rgb(159, 203, 254);
      border-radius: 8px;
      margin-top: 10px;
      padding: 5px;
      padding-left: 10px;
      padding-right: 10px;
    }
    </style>