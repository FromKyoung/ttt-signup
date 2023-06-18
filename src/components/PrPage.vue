<template>
    <div class="container">
        <div class="title">
            <h3>홍보게시판</h3>
        </div>

        <main>
        <div class="card" v-for="prItem in prItems" :key="prItem.id">
        <img :src="prItem.imageUrls" :alt="prItem.title">
        <h2><a href="#" @click="showPr(prItem.id)">{{ prItem.title }}</a></h2>
        <p>{{ prItem.writtenDateTime }}</p>
      </div>
      <div class="card add-card" id="add-card">
        <button @click.prevent="addPr" class="add-btn">+</button>
      </div>
    </main>
    <div id="page-btns">
        <button
          v-if="currentPage > 1"
          class="page-btn"
          @click="currentPage--"
        >Previous</button>
        <button
          v-for="page in totalPages"
          :key="page"
          :class="['page-btn', { active: page === currentPage }]"
          @click="currentPage = page"
        >{{ page }}</button>
        <button
          v-if="currentPage < totalPages"
          class="page-btn"
          @click="currentPage++"
        >Next</button>
      </div>
    
        <!-- <footer>
            <form class="search-container">
                <input type="text" placeholder="검색어를 입력하세요.">
                <button type="submit">검색</button>
            </form>
        </footer> -->
        <AddPr v-if="showAddPrModal" @close="showAddPrModal = false" @submit="onAddPr" />
    </div>
</template>

<script>
import { getPrItems, createPr } from '../api/index.js'; // API 호출 함수를 추가하세요.
import AddPr from './AddPr.vue';

export default {
  components: {
    AddPr
  },
  data() {
    return {
      prItems: [],
      showAddPrModal: false,
      error: '',
      currentPage: 1,
      itemsPerPage: 10,
      newPr: {
        title: '',
        content: '',
        author: '',
      },
    }
  },
   computed: {
        totalPages() {
        return Math.ceil(this.prItems.length / this.itemsPerPage);
        },
        currentBoards() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = this.currentPage * this.itemsPerPage;
        return this.prItems.slice(start, end);
        }
    },
  async created() {
    await this.fetchPr();
    },
    
  methods: {
    async fetchPr() {
        try {
      const response = await getPrItems(); // getPrItems는 서버에서 홍보 게시물 데이터를 가져오는 API 호출 함수
      this.prItems = response.data;
    } catch (error) {
      console.error(error);
    }
    },
    async addPr() {
        this.showAddPrModal = true //isAddBoard를 true로 바꿔 addBoard창을 뜨게 만듦
    },
    async onAddPr(image, title, date) {
      try {
        await createPr(image, title, date);
        this.showAddPrModal = false;
        this.fetchPr();
      } catch (error) {
        if (error.response && error.response.status === 403) {
              alert('권한이 없습니다.');
            } else {
              console.error(error);
            }
          }  
    },
    showPr(id) {
        this.$router.push({ name: 'ShowPr', params: { id } });
    },

  }
};
</script>

<style scoped>
.title {
    background-color: #0077c2;
    color: rgb(255, 255, 255);
    padding: 20px;
    text-align: center;
}

h3 {
    font-size: 30px;
    margin: 0;
    color: #fff;
}



/*컨테이너 */
body {
    background-color: #F2F2F2;
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
}

.container {
    background-color: white;
    border-radius: 20px;
    box-shadow: 2px 2px 5px #888888;
    display: flex;
    flex-direction: column;
    height: 90vh;
    margin: 5vh auto;
    overflow: hidden;
    width: 80%;
}


/* 카드 */
main {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 20px;
    flex-grow: 1;
    overflow-y: auto;
    padding-right: 20px;
}

.card {
    background-color: white;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    box-shadow: 2px 2px 5px #888888;
    margin: 20px;
    padding: 10px;
    width: 300px;
}

.card img {
    height: 200px;
    object-fit: cover;
    width: 100%;
}

.card h2 {
    font-size: 24px;
    margin: 10px 0;
}

.card p {
    color: #888888;
    font-size: 16px;
    margin: 0;
}

.add-card {
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-btn {
    background-color: white;
    border: 1px solid #E6E6E6;
    border-radius: 50%;
    color: #1E90FF;
    cursor: pointer;
    font-size: 48px;
    height: 100px;
    width: 100px;
}

/*  */
footer {
    background-color: #0077c2;
    /* #1E90FF; */
    color: white;
    display: flex;
    justify-content: center;
    padding: 20px;
}

form {
    display: flex;
}

form input[type="text"] {
    border: none;
    border-radius: 5px;
    flex-grow: 1;
    font-size: 16px;
    margin-right: 10px;
    padding: 10px;
    width: 500px;
}

form button[type="submit"] {
    background-color: white;
    border: 1px solid #E6E6E6;
    border-radius: 5px;
    color: #1E90FF;
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
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

