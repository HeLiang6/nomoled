<template>
  <div id="box">
    <left ref="left"></left>
    <Main ref="main"></Main>
  </div>
</template>

<script>
import Left from './components/Left'
import Main from './components/Main'
export default {
  components: {
    Left,
    Main
  }
}
</script>

<style lang='scss' scoped>
#box {
  display: flex;
}
</style>
