<template>
  <div>
      <div class="container">
  <div class="title">
    <h3>게시판</h3>
  </div>
  <div class="board-list" ref="boardList">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>글 제목</th>
          <!-- <th>내용</th> -->
          <th>글쓴이</th>
          <th>작성시간</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(b, index) in boards" :key="b.id" ref="boardItem">
          <td>{{ index + 1 }}</td>
          <td><a href="#" @click="showBoard(b.id)">{{ b.title }}</a></td>
          <!-- <td>{{ b.content }}</td> -->
          <td>{{ b.writtenBy }}</td>
          <td>{{ b.writtenDateTime }}</td>
        </tr>
      </tbody>
    </table>
    
    
  </div>
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

  <form>
    <!-- <input type="text" placeholder="검색어를 입력하세요">
    <input type="submit" value="검색"> -->
    <button type="button" class="write" id="write" @click.prevent="addBoard">글쓰기</button>
    <!-- onclick="location.href='board_write.html'" -->
  </form>
</div>


  <!--상태 변수로 isAddBoard일때 AddBoard실행-->
  <AddBoard v-if="isAddBoard" @close="isAddBoard=false" @submit="onAddBoard" /> <!--@close:닫기 누르면 isAddBoard를 false로해서 닫히게 함/@submit:생성-->
  
  </div>
</template>

<script>
import { getBoards, createBoard } from '../api/index.js';
//import Modal from './Modal.vue'//Modal가져옴
import AddBoard from './AddBoard.vue' //AddBoard가져오기

export default{
  components: {
      AddBoard
  },
  //components: {Modal},//component로 modal등록
  data() {
      return {
          //loading: false,
          boards: [],
          error: '',
          isAddBoard: false, //초기값 flase로 안뜨게 함
          currentPage: 1,
          itemsPerPage: 10,
          newBoard: {
          title: '',
          content: '',
          author: '',
    },
      }
  },
  computed: {
      totalPages() {
      return Math.ceil(this.boards.length / this.itemsPerPage);
      },
      currentBoards() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = this.currentPage * this.itemsPerPage;
      return this.boards.slice(start, end);
      }
  },
  async created() {
  await this.fetchBoards();
  },
//     updated() { //데이터에 변화 감지시 updated:보드의 갯수만큼 생기는 boardItem을 찾아옴
//     this.$refs.boardItem.forEach(el => {//boardItem을 순회하면서
//       el.style.backgroundColor = el.dataset.bgcolor //backgroundColor변경 - bgcolor가져와서 새팅
//     })
//   },
  methods: {
  async fetchBoards() {
    try {
      const response = await getBoards();
      this.boards = response.data;
    } catch (error) {
      console.error(error);
      // TODO: handle error
    }
  },
  async addBoard() {
      this.isAddBoard = true //isAddBoard를 true로 바꿔 addBoard창을 뜨게 만듦
  },
  async onAddBoard(title, author, date){
    try {
      await createBoard(title, author, date);
      this.isAddBoard = false;
      this.fetchBoards();
    } catch (error) {
      console.error(error);   
  }
},
showBoard(id) {
      this.$router.push({ name: 'ShowBoard', params: { id } });
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

#board {
  background-color: #fff;
  color: #87CEFA;
}

/* 컨테이너*/
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 40px;
  padding: 20px;
  padding-top: 5px;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  align-items: center;
}
h3 {
  margin-bottom: 20px;
  font-size: 30px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}
th {
  background-color: #0077c2;
  color: #fff;
}
td {
  background-color: #e6f2ff;
}
td a {
text-decoration: none;
color:black;
}
tr:nth-child(even) td {
  background-color: #d9e6f2;
}
tr:hover td {
  background-color: #b3d1ff;
}


form {
  display: flex;
  align-items: center;
}
input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  width: 70%;
  margin-right: 10px;
  font-size: 16px;
  
}
input[type="submit"], button {
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #0077c2;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.write {
  margin-left: 30px;
  padding-left: 20px;
  padding-right: 20px;
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