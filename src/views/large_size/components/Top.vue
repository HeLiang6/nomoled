<template>
  <div>
    <div class="top">
      <h1 class="logo">
        <img
          src="../../../../static/images/logo.png"
          alt="雷摩"
        >
        <h2>
          智慧雷摩 点亮生活
        </h2>
      </h1>
      <div class="right_box">

        <div class="right">
          <ul>
            <li>
              <img
                src="../../../../static/images/large/u85.png"
                alt=""
              >
              <div>
                <p>太阳能发电</p>
                <p>20000kwh</p>
              </div>
            </li>
            <li>
              <img
                src="../../../../static/images/large/co₂³_u1.png"
                alt=""
              >
              <div>
                <p>co₂减排
                </p>
                <p>0.5T</p>
              </div>
            </li>
            <li>
              <img
                src="../../../../static/images/large/leaf_u5.png"
                alt=""
              >
              <div>
                <p>等效植树

                </p>
                <p>12m³</p>
              </div>
            </li>
            <li>
              <img
                src="../../../../static/images/large/soal_u3.png"
                alt=""
              >
              <div>
                <p>节省标准煤
                </p>
                2.5T
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.top {
  // padding: 15px;
  // display: flex;
  // justify-content: flex-end;
  background: -webkit-linear-gradient(
    top,
    #0b0b3b,
    transparent
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    bottom,
    #0b0b3b,
    transparent
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    bottom,
    #0b0b3b,
    transparent
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to bottom,
    #0b0b3b,
    transparent
  ); /* 标准的语法（必须放在最后） */
}
.logo {
  display: flex;
  margin: 0 auto;
  width: 700px;
  h2 {
    color: #00ffff;
    font-family: "楷体 Bold", "楷体 Regular", "楷体", sans-serif;
  }
}
.right_box {
  position: absolute;
  top: 40px;
  right: 40px;
}
.right {
  display: flex;
  align-items: center;
  ul {
    color: #fff;
    display: flex;
    z-index: 100;
    li {
      display: flex;
      align-items: center;
      font-size: 12px;
    }
    li img {
      width: 46px;
      height: 39px;
    }
  }
}
</style>
