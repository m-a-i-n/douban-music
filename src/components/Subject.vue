<template>
  <div class="Subject">
    <app-header v-on:search="searchMusics($event)"></app-header>
    <el-row :gutter="20">
      <el-col :span="18" :offset="4" v-if="music">
        <h1>{{music.title}}</h1>
        <div class="content">
          <div class="article">
            <div class="indent">
              <div class="subjectwrap">
                <div class="subject clearfix">
                  <div class="mainpic">
                    <a href="javascript:;">
                      <img v-bind:src="music.image" v-bind:alt="music.title">
                    </a>
                  </div>
                  <div class="info">
                    <div><span class="pl">又名：</span><span>{{music.alt_title}}</span></div>
                    <div><span class="pl">表演者：</span><span v-for="item in music.attrs.singer"><router-link :to="{path:'/search', query:{q: item}}"> {{item}} </router-link></span></div>
                    <div><span class="pl">专辑类型：</span>{{music.attrs.version}}</span></div>
                    <div><span class="pl">介质：</span><span>{{music.attrs.media}}</span></div>
                    <div><span class="pl">发行时间：</span><span>{{music.attrs.pubdate}}</span></div>
                    <div><span class="pl">出版者：</span><span>{{music.attrs.publisher}}</span></div>
                    <div><span class="pl">唱片数：</span><span>{{music.attrs.discs}}</span></div>
                  </div>
                </div>
                <div class="interest_sectl">
                  <div class="rating_wrap">豆瓣评分</div>
                  <div class="rating_self">
                    <strong class="rating_num">{{music.rating.average}}</strong>
                  </div>
                  <div class="rating_right">
                    <div v-bind:class="music.rating.averageClass" class="rating_star"></div>
                    <div class="rating_sum">{{music.rating.numRaters}}评价</div>
                  </div>
                </div>
              </div>
              <div class="gtleft"></div>
              <div class="related_info">
                <h2>曲目</h2>
                <div class="track-list">
                  <div class="indent" v-for="(track, index) in music.attrs.tracks" :key="index"><router-link :to="{path:'/search', query:{q: track}}">{{++index}}.{{track}}</router-link></div>
                </div>
              </div>
            </div>
          </div>
          <div class="aside">
            <h2>豆瓣成员常用的标签</h2>
            <router-link :to="{path:'/search', query:{q: tag.name}}" v-for="(tag, index) in music.tags" :key="index">{{tag.name}}</router-link>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Header from './Header'
export default {
  name: 'Subject',
  components: {
    'app-header': Header
  },
  data() {
    return {
      loading: true,
      music: null
    }
  },
  mounted: function() {
    this.$axios({
      url: '/api/music/' + this.$route.params.id,
      method: 'get'
    }).then(resp => {
      for (let i in resp.data) {
        if (i === 'attrs') {
          for (let j in resp.data.attrs) {
            if (resp.data.attrs[j] instanceof Array && j !=='singer') {
              resp.data.attrs[j] = resp.data.attrs[j].join('/');
              if (j === 'tracks') {
                resp.data.attrs[j] = resp.data.attrs[j].split('\n');
                let arr = [];
                resp.data.attrs[j].forEach(function(item) {
                  arr.push(item.split('.')[1]);
                })
                resp.data.attrs[j] = arr;
              }
            }
          }
        }
        if (i === 'rating') {
          resp.data.rating.averageClass = 'bigstar' + Math.round(resp.data.rating.average) * 5;
        }
      }
      this.loading = false;
      this.music = resp.data;
      console.log(this.music)
    }).catch(error => {
      console.log(error);
    });
  }
}

</script>
<style scoped>
.content {
  min-height: 420px;
}

.article {
  float: left;
  width: 675px;
  padding-right: 40px;
}

.indent {
  word-wrap: break-word;
  word-break: normal;
}

.subjectwrap {
  position: relative;
  float: left;
  width: 100%;
  margin-bottom: 15px;
}

.subject {
  float: left;
  width: 500px;
}

.mainpic {
  margin: 3px 0 0 0;
  float: left;
  text-align: center;
  margin: 3px 12px 0 0;
  max-width: 155px;
  overflow: hidden;
}

.subject .mainpic img {
  width: 135px;
}

.info {
  float: left;
  max-width: 333px;
  word-wrap: break-word;
}

.pl {
  font: 13px Arial, Helvetica, sans-serif;
  line-height: 150%;
  color: #666666;
}

.interest_sectl {
  float: left;
  width: 155px;
  margin: 2px 0 0 0;
  padding: 0 0 0 15px;
  border-left: 1px solid #eaeaea;
  color: #9b9b9b;
}

.interest_sectl .rating_wrap {
  padding-bottom: 15px;
  font-size: 12px;
  line-height: 14px;
}

.interest_sectl .rating_self {
  padding: 0;
  line-height: 2;
}

.interest_sectl .rating_num {
  float: left;
  color: #494949;
  padding: 0;
  min-width: 30%;
  font-size: 28px;
  clear: both;
}

.rating_star {
  width: 75px;
  height: 15px;
  margin: 1px 0 0 0;
  background: url(../assets/ic_rating_s.png) no-repeat;
  background-size: 100%;
  overflow: hidden;
  display: inline-block;
  zoom: 1;
}

.bigstar50 {
  background-position: 0 0px
}

.bigstar45 {
  background-position: 0 -15px
}

.bigstar40 {
  background-position: 0 -30px
}

.bigstar35 {
  background-position: 0 -45px
}

.bigstar30 {
  background-position: 0 -60px
}

.bigstar25 {
  background-position: 0 -75px
}

.bigstar20 {
  background-position: 0 -90px
}

.bigstar15 {
  background-position: 0 -105px
}

.bigstar10 {
  background-position: 0 -120px
}

.bigstar05 {
  background-position: 0 -135px
}

.bigstar0 {
  background-position: 0 -150px
}

h2 {
  font: 15px Arial, Helvetica, sans-serif;
  color: #072;
  margin: 0 0 12px 0;
  line-height: 150%;
}

.aside a {
  display: inline-block;
  letter-spacing: normal;
  margin: 0px 8px 8px 0px;
  padding: 0px 8px;
  border-radius: 2px;
  background-color: #f5f5f5;
  color: #37a;
}

</style>
