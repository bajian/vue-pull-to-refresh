<template>
<div id="app">
  <pull-to-refresh
    @on-pullup='onPullup'
    @on-pulldown='onPulldown'>
    <ul class="page">
      <li :key="index" v-for="(item, index) in items">
        # item {{ index }} 
      </li>
    </ul>
  </pull-to-refresh>

<!--   <b>disable on-pullup && pulldown:</b>
  <pull-to-refresh
    :disable-pullup="true"
    :disable-pulldown="true"
    @on-pullup='onPullup'
    @on-pulldown="onPulldown">
    <ul>
      <li :key="index" v-for="(item, index) in items">
        # item {{ index }} 
      </li>
    </ul>
  </pull-to-refresh> -->
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
        this.items=[6,6,6,6,6,6,6,6,6,6,6]
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
</style>
