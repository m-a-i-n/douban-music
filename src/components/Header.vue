<template>
  <el-row :gutter="20" class="header-col">
    <el-col :span="18" :offset="4">
      <div class="headerWrapper">
        <div class="header">
          <div class="header-logo">
            <router-link to="/" class="logo"></router-link>
          </div>
          <div class="header-search">
            <el-input v-bind:placeholder="placeholder" v-model="searchText" class="input-with-select" clearable>
              <el-button slot="append" icon="el-icon-search" v-on:click="clickSearch"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: 'Header',
  data() {
    return {
      placeholder: '唱片名、表演者、条码、ISRC',
      searchText: ''
    }
  },
  methods: {
    clickSearch: function() {
      if (this.$route.path !== '/search') {
        this.$router.replace('/search');
      }
      this.$emit('search', this.searchText);
    }
  }
}

</script>
<style scoped>
.header {
  float: left;
  width: 100%;
  height: auto;
}

.header-logo {
  float: left;
  height: 56px;
  width: 145px;
  margin: 0 13px 0 0;
  background: url(../assets/lg_music_a12_2.png) no-repeat 0 12px;
}

.logo {
  width: 100%;
  height: 100%;
  display: inline-block;
}

.header-search {
  float: left;
  width: 470px;
  height: 100%;
  margin-top: 8px;
}

</style>
