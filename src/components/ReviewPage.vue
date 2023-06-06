<template>
    <div>
        <div class="container">

            <div class="title">
                <h3>업소 리뷰페이지</h3>
            </div>

            <div class="review">
                <div class="left">
                    <a href="#"><h2 class="name">업소명</h2></a>
                    <div class="rating"><img src="../assets/star_icon.png" alt="star">4.5</div>
                    <div class="author">작성자: test@tset.com</div>
                    <div class="date">작성일: 2021년 10월 1일</div>
                    <div class="content">
                        <p>이 업소는 정말 좋아요! 서비스도 좋고 음식도 맛있어요. 다음에 또 방문할게요.</p>
                    </div>
                </div>
                <!-- <div class="right">
                    <a href="#"><img src="https://via.placeholder.com/150x150" alt="업소 이미지"></a>
                    <a href="#"><h2 class="name">업소명</h2></a>
                </div> -->
            </div>
            <div class="review">
                <div class="left">
                    <div class="rating">3.0</div>
                    <div class="author">작성자: Jane Smith</div>
                    <div class="date">작성일: 2021년 9월 15일</div>
                    <div class="content">
                        <p>음식은 괜찮았지만 서비스가 조금 아쉬웠어요.</p>
                        <p>가격 대비 만족도는 그저 그랬어요.</p>
                    </div>
                </div>
                <div class="right">
                    <a href="#"><img src="https://via.placeholder.com/150x150" alt="업소 이미지"></a>
                    <a href="#"><h2 class="name">업소명</h2></a>
                </div>
            </div>
            <div class="review">
                <div class="left">
                    <div class="rating">5.0</div>
                    <div class="author">작성자: Jane Smith</div>
                    <div class="date">작성일: 2021년 9월 15일</div>
                    <div class="content">
                        <p>이 업소는 최고에요! 음식도 맛있고 서비스도 좋아요.</p>
                        <p>가격도 저렴해서 자주 방문하게 될 것 같아요.</p>
                    </div>
                </div>
                <div class="right">
                    <a href="#"><img src="https://via.placeholder.com/150x150" alt="업소 이미지"></a>
                    <a href="#"><h2 class="name">업소명</h2></a>
                </div>
            </div>
            <div class="review">
                <div class="left">
                    <div class="rating">4.0</div>
                    <div class="author">작성자: Jane Smith</div>
                    <div class="date">작성일: 2021년 9월 15일</div>
                    <div class="content">
                        <p>음식은 맛있었지만 서비스가 조금 아쉬웠어요.</p>
                        <p>가격 대비 만족도는 괜찮았어요.</p>
                    </div>
                </div>
                <div class="right">
                    <a href="#"><img src="https://via.placeholder.com/150x150" alt="업소 이미지"></a>
                    <a href="#"><h2 class="name">업소명</h2></a>
                </div>
            </div>

            <div class="add-review" id="add-review">
                <a>리뷰 작성하기</a>
            </div>

            </div>
    </div>
</template>

<script>
export default{
    
}

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

#review {
    background-color: #fff;
    color: #87CEFA;
}


/* 내용 */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}
.title {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    transition: background-color 0.3s ease;
    color: #fff;
    margin-bottom: 20px;
}
h3 {
    margin: 0;
    font-size: 20px;
}
.container {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    
}
.review {
    display: flex;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
}
.review .left {
    /* flex: 1; */
    margin-right: 20px;
}
/* .review .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.review .right img {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
}
.review .right .name {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    margin: 0;
} */
.review h2 {
    margin-top: 0;
    font-size: 24px;
}
.review p {
    margin: 0;
    font-size: 16px;
}
.review .rating {
    font-size: 24px;
    color: rgb(4,122,255);
    margin-bottom: 10px;
}
.review .author {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
}
.review .date {
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
}
.review .content {
    font-size: 16px;
    margin-bottom: 10px;
}

.add-review {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    color: #fff;
}
.add-review:hover {
    background-color: #2980b9;
}
.add-review a {
    color: #fff;
}
a {
text-decoration: none;
}

.review img {
    width: 20px; /* 적절한 크기로 조정 */
    height: 20px; /* 적절한 크기로 조정 */
    padding-right: 5px;
  }
</style>