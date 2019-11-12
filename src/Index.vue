<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'App'
}

</script>
<style>
body {
  width: 1366px;
  overflow-x: hidden;
  margin: 0;
  font: 12px Helvetica, Arial, sans-serif;
  line-height: 1.62;
  color: #111;
  background: #fff;
}

h1 {
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 30px;
  color: rgb(73, 73, 73);
  padding: 0px;
}

a {
  text-decoration: none;
}

.header-col {
  background: #f0f3ef;
}

.clearfix {
  zoom: 1;
  display: block;
}

</style>
