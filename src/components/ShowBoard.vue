<template>
    <div class="post-list">
        <div class="post-item">
            <h1 class="title">게시글 제목</h1>
            <p class="author">글쓴이: 작성자</p>
            <div class="content">
                <p>게시글 내용</p>
                <!-- <p>,</p>
                <p>,</p>
                <p>,</p>
                <p>,</p>
                <p>,</p>
                <p>,</p>
                <p>,</p> -->
            </div>
            <p class="date">작성일: 2023-05-30</p>
            <div class="buttons">
                <button>수정</button>
                <button>삭제</button>
            </div>
        </div>
    </div>
</template>

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
