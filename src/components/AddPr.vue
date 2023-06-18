<template>
    <div class="add-board">
      <ModalVue @close="close">
        <template #header>
          <h2>
            홍보글 작성
            <a href="" class="modal-default-button" @click.prevent="close">&times;</a>
          </h2>
        </template>
  
        <template #body>
          <form id="add-board-form" @submit.prevent="addBoard">
            <div>
              <label for="title">제목</label>
              <input type="text" id="title" v-model="input" ref="title" required>
            </div>
            <div>
              <label for="content">내용</label>
              <textarea id="content" v-model="content" rows="15" required></textarea>
            </div>
            <div>
                <label for="image">홍보할 사진 *</label>
                <input type="file" id="image" name="image" required @change="onFileChange" />
            </div>
          </form>
        </template>
  
        <template #footer>
          <button class="btn" :class="{'btn-success': valid}" type="submit"
           form="add-pr-form" :disabled="!valid" id="submit" @click="addPr">
            작성
          </button>
        </template>
      </ModalVue>
    </div>
  </template>
  
    <script>
    //import {mapMutations, mapActions} from 'vuex'
    import ModalVue from './ModalVue.vue'
    
    export default {
      components: {
        ModalVue
      },
      data() {
        return {
          input: '',
          content: '',
          valid: false,
          image: null,
        }
      },
      watch: {
        input(v) {//input부분 감시하고있다가 length > 0일때 vaild값 true로바꿔줌
          this.valid = v.trim().length > 0
        }
      },
      mounted() {
        this.$refs.title.focus(); //상위에서 mount됐을때 focus를 입력필드로 옮김
      },
      methods: {
        close() { //창닫기
          this.$emit('close')
        },
        addPr() {
    this.$emit('close');
    
    // createPr 함수에 image도 함께 전달
    this.$emit("submit", { title: this.input, content: this.content, image: this.image });
  },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.image = files[0];
    },
  },
};
</script>
    
    <style scoped>
    body {
        font-family: Arial, sans-serif;
        background-color: #f2f2f2;
    }
    form {
        background-color: #fff;
        padding: 20px;
        margin: 20px auto;
        max-width: 600px;
        box-shadow: 0 0 10px rgb(0, 56, 120);
    }
    h1 {
        text-align: center;
        margin-top: 0;
    }
    label {
        display: block;
        margin-bottom: 10px;
        font-weight: bold;
    }
    input[type="text"], input[type="file"], textarea {
        display: block;
        width: 96%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        margin-bottom: 20px;
        font-size: 16px;
    }
    input[type="submit"] {
        background-color: #0077c2;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }
    input[type="submit"]:hover {
        background-color: rgb(0, 56, 120);
    }
    .btn {
    background-color: rgb(4,122,255);
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    
}

.btn:hover {
    background-color: rgb(0, 56, 120);
}
  </style>