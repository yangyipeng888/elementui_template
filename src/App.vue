<template>
  <div id="app">
    <router-view></router-view>
    <div class="logo">本系统由广州城投智慧城市科技发展有限公司提供技术支持</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    watch: {
      '$store.state.user.loginTimeOut'() {
        if (this.$store.state.user.loginTimeOut) {
          this.$alert('登录超时,请重新登录!', '登录超时', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({name: 'login'});
            }
          });
        }
      }
    },
    methods: {
      handleOpen() {

      },
      handleClose() {

      }
    }
  }
</script>
<style lang="scss">
  @media (max-width: 1024px) {
    html,
    body {
      font-size: 14px;
      /*min-width: 65rem;*/
    }
  }

  @media (min-width: 1280px) {
    html,
    body {
      font-size: 16px;
      /*min-width: 70rem;*/
    }
  }

  @media (min-width: 1281px) {
    html,
    body {
      font-size: 18px;
      /*min-width: 80rem;*/
    }
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    position: relative;
  }

  #app {
    height: 100%;
    width: 100% !important;
    margin: 0;
    padding: 0;

    .logo {
      font-size: 0.8rem;
      color: black;
      position: absolute;
      right: 5px;
      bottom: 5px;
    }

  }
</style>
