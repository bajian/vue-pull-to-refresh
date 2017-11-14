<template>
<div id="app">
  <pull-to-refresh
    @on-pullup='onPullup'
    @on-pulldown='onPulldown' class="page">
    <ul @click="testClick($event)">
      <li :key="index" v-for="(item, index) in items">
        # item {{ index }} 
      </li>
    </ul>
  </pull-to-refresh>

<!--   <b>examples for disable on-pullup && pulldown:</b>
  <pull-to-refresh
    :disable-pullup="true"
    :disable-pulldown="true">
    <ul>
      <li :key="index" v-for="(item, index) in items">
        # item {{ index }} 
      </li>
    </ul>
  </pull-to-refresh> -->
</div>
</template>

<script>
import PullToRefresh from './components/pull-to-refresh'

export default {
  components: { PullToRefresh },

  data () {
    return {
      items: [2,3,4,5,1,2,3,4,5,2,3,4,5,1,2,3,4,5,2,3,4,5,2,3,4,5]
    }
  },

  methods: {
    onPullup(finshCallback) {
      console.log('onPullup');
      setTimeout(()=>{
        console.log('finshCallback');
        this.items=this.items.concat([6,6,6,6,6,6,6,6,6,6,6])
        finshCallback();//finish refreshing state
      },3000);
    },

    onPulldown(finshCallback) {
      console.log('onPulldown');
      setTimeout(()=>{
        console.log('finshCallback');
        this.items=[9,9,9,9,9,9,9,9,9,9,9,9,9,9]
        finshCallback();//finish refreshing state
      },3000);
    },
    testClick(event){
      window.alert('click '+event.target.innerHTML)
    }
  },
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

.page{
  height: 400px;
  background: #eee;
  position: relative;
  /* Prevent native touch events on Windows */
  -ms-touch-action: none;
  /* Prevent the callout on tap-hold and text selection */
  -webkit-touch-callout: none;
  user-select: none;
  text-size-adjust: none;
}

#app {
  height: 100%;
  max-width: 400px;
  margin: 0 auto
}
ul{
  list-style: none;
  padding: 0px;
  margin: 0px
}
ul>li:nth-child(even){
  background-color: #fff
}

/*scrollbar start*/
.iScrollVerticalScrollbar {
  position: absolute;
  z-index: 9999;
  width: 2px;
  bottom: 2px;
  top: 2px;
  right: 2px;
  overflow: hidden;
}

.iScrollVerticalScrollbar.iScrollBothScrollbars {
  bottom: 18px;
}

.iScrollIndicator {
  position: absolute;
  background: #999;
  border-radius: 6px;
  opacity: .8;
}

.iScrollVerticalScrollbar .iScrollIndicator {
  width: 100%;
  background: #999;
}
/*scrollbar end*/
</style>
