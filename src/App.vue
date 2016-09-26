<template>
<div id="app">
  <pull-to-refresh
    @on-pullup='onPullup'
    @on-pulldown='onPulldown'>
    <ul>
      <li track-by="$index" v-for="(item, i) in items">
        # item {{ i }} 
      </li>
    </ul>
  </pull-to-refresh>
  <b>disable on-pullup && pulldown:</b>
  <pull-to-refresh
    :disable-pullup="true"
    :disable-pulldown="true"
    @on-pullup='onPullup'
    @on-pulldown="onPulldown">
    <ul>
      <li track-by="$index" v-for="(item, i) in items">
        # item {{ i }} 
      </li>
    </ul>
  </pull-to-refresh>
</div>
</template>

<script>
import PullToRefresh from './components/pull-to-refresh.vue'

export default {
  components: { PullToRefresh },

  data () {
    return {
      items: [2,3,4,5,1,2,3,4,5,2,3,4,5,1,2,3,4,5]
    }
  },

  methods: {
    onPullup(finshCallback) {
      console.log('onPullup');
      setTimeout(()=>{
        console.log('finshCallback');
        this.items=[6,6,6,6,6]
        finshCallback();//finish refreshing state
      },3000);
    },

    onPulldown(finshCallback) {
      console.log('onPulldown');
      setTimeout(()=>{
        console.log('finshCallback');
        this.items=[9,9,9,9,9,9]
        finshCallback();//finish refreshing state
      },3000);
    }
  },
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

#app {
  height: 100%;
}
ul{
  list-style: none;
  padding: 0px;
  margin: 0px
}
</style>
