<template>
  <div class="search">
    <app-header v-on:search="searchMusics($event)"></app-header>
    <el-row :gutter="20">
      <el-col :span="18" :offset="4">
        <h1>搜索 {{searchText}}</h1>
        <div class="musics" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading">
          <div class="musics-item" v-for="music in musics">
            <div class="item-root">
              <router-link :to="{path:'subject/' + music.id}" class="cover-link"><img v-bind:src="music.image" v-bind:alt="music.title"></router-link>
              <div class="etail">
                <router-link :to="{path:'subject/' + music.id}" class="title">{{music.title}}{{music.alt_title}}</router-link>
                <div class="rating">
                  <span class="rating-stars" v-bind:class="music.rating.averageClass"></span>
                  <span class="rating_nums">{{music.rating.average}}</span>
                  <span class="pl">({{music.rating.numRaters}}人评价)</span>
                </div>
                <div class="abstract">{{music.attrs.singer}} {{music.attrs.pubdate}} {{music.attrs.version}} {{music.attrs.media}}</div>
              </div>
            </div>
          </div>
          <div class="no-data" v-if="noData"><i class="el-icon-warning-outline"></i>无数据</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Header from './Header'
export default {
  name: 'Search',
  components: {
    'app-header': Header
  },
  data() {
    return {
      searchText: '',
      loading: false,
      noData: false,
      musics: []
    }
  },
  beforeMount() {
    if (this.$route.query) {
      this.searchMusics(this.$route.query.q);
    }
  },
  methods: {
    searchMusics: function(searchText) {
      this.loading = true;
      this.noData = false;
      this.searchText = searchText;
      this.$axios({
        url: '/api/music/search',
        method: 'post',
        data: this.$qs.stringify({
          q: searchText
        })
      }).then(resp => {
        this.loading = false;
        if (resp.data && resp.data.musics.length) {
          for (let i in resp.data.musics) {
            resp.data.musics[i].rating.averageClass = 'allstar' + Math.round(resp.data.musics[i].rating.average) * 5;
            for (let j in resp.data.musics[i].attrs) {
              resp.data.musics[i].attrs[j] = resp.data.musics[i].attrs[j].join(',');
            }
          }
          this.musics = resp.data.musics;
        } else {
        	this.noData = true;
        	this.musicsss = [];
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
}

</script>
<style scoped>
.musics {
  width: 100%;
  height: auto;
  min-height: 80px;
}

.musics-item {
  margin-bottom: 30px;
}

.item-root {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.cover-link {
  width: 60px;
  max-height: 90px;
  margin-right: 15px;
  background: none;
}

.cover-link img {
  width: 60px;
  max-height: 90px;
  border-width: 0;
  vertical-align: middle;
}

.detail {
  min-width: 0px;
  flex: 1 1 0%;
  text-align: left;
}

.detail .title {
  font-size: 14px;
  font-weight: 500;
  position: relative;
  top: -1px;
  overflow: visible;
}

.detail .rating {
  margin: 10px 0px;
}

.rating-stars {
  width: 55px;
  height: 11px;
  margin: 0 3px 0 0;
  background: url(../assets/ic_rating_s.png) no-repeat;
  overflow: hidden;
  display: inline-block;
}

.allstar50 {
  background-position: 0 0px
}

.allstar45 {
  background-position: 0 -11px
}

.allstar40 {
  background-position: 0 -22px
}

.allstar35 {
  background-position: 0 -33px
}

.allstar30 {
  background-position: 0 -44px
}

.allstar25 {
  background-position: 0 -55px
}

.allstar20 {
  background-position: 0 -66px
}

.allstar15 {
  background-position: 0 -77px
}

.allstar10 {
  background-position: 0 -88px
}

.allstar05 {
  background-position: 0 -99px
}

.allstar0 {
  background-position: 0 -110px
}

.rating_nums {
  color: #e09015;
  font-size: 12px;
  padding: 0 3px 0 0;
}

.pl {
  font: 12px Arial, Helvetica, sans-serif;
  line-height: 1;
  color: #666666;
}
.no-data{
	width: 100%;
	height: 80px;
	text-align: center;
}
.no-data i{
	width: 100%;
	height: 60px;
	font-size: 32px;
	line-height: 60px;
	padding-top: 20px;
	display: block;
}
</style>
