<template>
    <div class="post-list">
      <div class="post-item" v-if="board">
        <h1 class="title" v-if="!editing">{{ board.title }}</h1>
        <input v-if="editing" v-model="editedTitle" />
        <p class="author">글쓴이: {{ board.writtenBy }}</p>
        <div class="content" v-if="!editing">
          <p>{{ board.content }}</p>
        </div>
        <textarea v-if="editing" v-model="editedContent"></textarea>
        <p class="date">작성일: {{ board.writtenDateTime }}</p>
        <div class="buttons" v-if="isAuthor">
          <button v-if="!editing" @click="editPost">수정</button>
          <button v-if="editing" @click="savePost">저장</button>
          <button @click="deletePost">삭제</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { showBoard, updateBoard, deleteBoard, getUserInfo } from '../api/index.js';
  
  export default {
    data() {
      return {
        board: null,
        editing: false,
        editedTitle: '',
        editedContent: '',
        isAuthor: false,
      };
    },
    async created() {
      const id = this.$route.params.id;
      try {
        const response = await showBoard(id);
        this.board = response.data;
        const userInfo = await getUserInfo();
        this.isAuthor = userInfo.data.name === this.board.writtenBy;
      } catch (error) {
        console.error(error);
      }
    },
    methods: {
      async editPost() {
        this.editing = true;
        this.editedTitle = this.board.title;
        this.editedContent = this.board.content;
      },
      async savePost() {
        try {
          const response = await updateBoard(this.board.id, {
            title: this.editedTitle,
            content: this.editedContent,
          });
          this.$router.push('/board');
          this.board = response.data;
          this.editing = false;
        } catch (error) {
          if (error.response && error.response.status === 403) {
            alert('권한이 없습니다.');
          } else {
            console.error(error);
          }
        }
      },
      async deletePost() {
        if (confirm('삭제하시겠습니까?')) {
          try {
            await deleteBoard(this.board.id);
            this.$router.push('/');
          } catch (error) {
            if (error.response && error.response.status === 403) {
              alert('권한이 없습니다.');
            } else {
              console.error(error);
            }
          }
        }
      },
    },
  };
  </script>
<!-- <template>
    <div class="post-list">
    <div class="post-item" v-if="board">
        <h1 class="title">{{ board.title }}</h1>
        <p class="author">글쓴이: {{ board.writtenBy }}</p>
        <div class="content">
            <p>{{ board.content }}</p>
        </div>
        <p class="date">작성일: {{ board.writtenDateTime }}</p>
        <div class="buttons">
            <button>수정</button>
            <button>삭제</button>
        </div>
    </div>
</div>
</template>

<script>
import { showBoard } from '../api/index.js';

export default {
  data() {
    return {
      board: null,
    };
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const response = await showBoard(id);
      this.board = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script> -->


<style scoped>
body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .post-list {
            width: 700px;
            margin: 20px auto;
        }
        .post-item {
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
            position: relative;
            margin-bottom: 20px;
        }
        .title {
            font-size: 24px;
            margin-bottom: 10px;
        }
        .author {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
        }
        .content {
            margin-bottom: 20px;
            height: 400px;
        }
        .date {
            font-size: 12px;
            color: #999;
        }
        .buttons {
            position: absolute;
            bottom: 10px;
            right: 10px;
        }
        .buttons button {
            background-color: #ccc;
            border: none;
            color: #fff;
            padding: 8px 12px;
            border-radius: 5px;
            margin-left: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        .buttons button:hover {
            background-color: #71a3ff;
        }
</style>
