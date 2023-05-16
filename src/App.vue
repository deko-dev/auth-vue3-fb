<template>
  <div class="MainLayout">
    <div class="Content_Router">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'App',
  };
</script>

<style lang="scss">
  .MainLayout {
    max-width: 100vw;
    min-height: 100vh;
    background: rgb(249,249,249);
    background: linear-gradient(180deg, rgba(249,249,249,1) 57%, #7ab96bca 92%);

    .Content_Router {
      width: 100vw;
      height: 100vh;
      display: flex;
    }
  }
</style>