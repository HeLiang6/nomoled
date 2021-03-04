<template>
  <div>

    <div id="footer">
      <ul>
        <li>
          <img
            src="../../../../static/images/nav_img/advertising.png"
            :alt="$t('nav.ad')"
            :title="$t('nav.ad')"
          >
        </li>
        <li>
          <img
            src="../../../../static/images/nav_img/camera.png"
            :alt="$t('nav.camera')"
            :title="$t('nav.camera')"
          >
        </li>
        <li>
          <img
            src="../../../../static/images/nav_img/charging.png"
            :alt="$t('nav.char')"
            :title="$t('nav.char')"
          >
        </li>
        <li>
          <img
            src="../../../../static/images/nav_img/environmental.png"
            :alt="$t('nav.environ')"
            :title="$t('nav.environ')"
          >
        </li>
        <li>
          <img
            src="../../../../static/images/nav_img/wifi.png"
            :alt="$t('nav.wifi')"
            :title="$t('nav.wifi')"
          >
        </li>
        <router-link
          to="/projectList"
          tag="li"
        >
          <img
            src="../../../../static/images/nav_img/streetLamp.png"
            :alt="$t('nav.light')"
            :title="$t('nav.light')"
          >
        </router-link>
      </ul>
    </div>
  </div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#footer {
  position: fixed;
  box-sizing: border-box;
  bottom: 0;
  left: 0;
  width: 44%;
  margin: 0 25%;
  padding: 0 0.5%;
  height: 120px;
  // background: -webkit-linear-gradient(
  //   bottom,
  //   #0b0b3b,
  //   transparent
  // ); /* Safari 5.1 - 6.0 */
  // background: -o-linear-gradient(
  //   top,
  //   #0b0b3b,
  //   transparent
  // ); /* Opera 11.1 - 12.0 */
  // background: -moz-linear-gradient(
  //   top,
  //   #0b0b3b,
  //   transparent
  // ); /* Firefox 3.6 - 15 */
  // background: linear-gradient(
  //   to top,
  //   #0b0b3b,
  //   transparent
  // ); /* 标准的语法（必须放在最后） */
  align-items: center;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    li {
      width: 72px;
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #0090ff;
      border-radius: 5px;
      cursor: pointer;
      background: #0090ff;
      opacity: 0.7;
    }
  }
}
</style>
