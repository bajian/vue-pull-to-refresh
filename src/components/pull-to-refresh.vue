<template>
  <div class="pull-container">
    <div class="pull-body"
      :style="{ transform: `translate3d(0,${diffMax}px,0)` }">
      <div class="pulldown"
        :class="[pulldownChangeStyle,{'hide':!displaypullDownDiv}]">
        <div class="pulldown-icon"></div>
        <div class="pulldown-label">{{pullDownTip}}</div>
      </div>
      <slot></slot>
      <div class="pullup"
      :class="[pullupChangeStyle,{'hide':!displaypullUpDiv}]">
        <div class="pullup-icon"></div>
        <div class="pullup-label">{{pullUpTip}}</div>
      </div>
    </div>
  </div>
</template>

<script>

import Drag from '../utils/drag'

const PULL_DOWN_NORMAL='下拉刷新'
const PULL_DOWN_RELEASE='释放加载'
const PULL_DOWN_LOADING='加载中，请稍后'

const PULL_UP_NORMAL='上拉刷新'
const PULL_UP_RELEASE='释放加载'
const PULL_UP_LOADING='加载中，请稍后'

// 加载状态-1默认，0显示提示下拉信息，1显示释放刷新信息，2执行加载数据，只有当为-1时才能再次加载
const STATE_DEFAULT=-1
const STATE_PULL_NORMAL=0
const STATE_PULL_RELEASE=1
const STATE_PULL_LOADING=2

const STYLE_RELEASE='release'
const STYLE_REFRESH='refresh'


export default {
  props: {
    maxScrollY: {
    type: Number,
    default: 150,
  },
  disablePulldown: {
    type: Boolean,
    default: false,
  },
  disablePullup: {
    type: Boolean,
    default: false,
  }
},

computed: {
  diffMax() {
    if (this.deltaY>0) 
      return this.deltaY>this.maxScrollY?this.maxScrollY:this.deltaY;
    else
      return this.deltaY<-this.maxScrollY?-this.maxScrollY:this.deltaY;
  }
},

data() {
  return {
    start: 0,
    deltaY: 0,
    pullDownHeight: 50,
    pullUpHeight: 50,
    isTouchEnd: false,
    displaypullDownDiv: false,
    displaypullUpDiv: false,
    pullUpTip: PULL_UP_NORMAL,
    pullDownTip: PULL_DOWN_NORMAL,
    refreshStep:STATE_DEFAULT,
    timeoutHandler:0,
    timeout:8000,
    pulldownChangeStyle:'',
    pullupChangeStyle:''
  }
},
  mounted(){
    this.$nextTick(function () {
      this.registerDrag()
  })
  }
,
methods: {
  registerDrag(){
    const drager = this.drager = new Drag(this.$el)
    drager.start(this._onTouchStart)
    .drag(this._onTouchMove)
    .end(this._onTouchEnd)
  },
  _onTouchStart (startPos,e) {
    this.isTouchEnd = false
    this.start = startPos.y
  },

  _onTouchMove (pos,e) {
    if (pos.y < 5 && pos.y > -5) return ;
    e.preventDefault()
    e.stopPropagation()
    this.deltaY=pos.y;
    // 加载状态-1STATE_DEFAULT默认，0STATE_PULL_NORMAL显示提示下拉信息，
    // 1STATE_PULL_RELEASE显示释放刷新信息，2STATE_PULL_LOADING执行加载数据，只有当为-1时才能再次加载
    if(this.refreshStep==STATE_PULL_LOADING){
          //do nothing
        }else if(!this.disablePulldown && this.deltaY > 0 && this.deltaY < this.pullDownHeight){
          this.displaypullDownDiv=true
          this.displaypullUpDiv=false
          this.pulldownChangeStyle='';
          this.pullDownTip = PULL_DOWN_NORMAL
          this.refreshStep = STATE_PULL_NORMAL
        }else if(!this.disablePulldown && this.deltaY >= this.pullDownHeight){
          this.pulldownChangeStyle=STYLE_RELEASE
          this.pullDownTip=PULL_DOWN_RELEASE
          this.refreshStep = STATE_PULL_RELEASE
        }else if(!this.disablePullup && this.deltaY < 0 && -this.deltaY >= this.pullUpHeight){
          this.pullupChangeStyle=STYLE_RELEASE
          this.pullUpTip=PULL_UP_RELEASE
          this.refreshStep = STATE_PULL_RELEASE
        }else if(!this.disablePullup && this.deltaY < 0 && -this.deltaY < this.pullUpHeight ){
          this.displaypullUpDiv=true
          this.displaypullDownDiv=false
          this.pullupChangeStyle='';
          this.pullUpTip=PULL_UP_NORMAL
          this.refreshStep = STATE_PULL_NORMAL
        }
      },
      reset(){
        if(this.refreshStep!=STATE_DEFAULT){
          this.refreshStep=STATE_DEFAULT
          if(!this.disablePulldown){
            this.displaypullDownDiv=false
            this.pulldownChangeStyle=''
            }
            if(!this.disablePullup){
              this.displaypullUpDiv=false
              this.pullupChangeStyle=''
            }
            clearTimeout(this.timeoutHandler)
          }
        },

        _onTouchEnd (endPos,e) {
          if (endPos.y<5 && endPos>-5) return;
          this.isTouchEnd = true
          this.start = 0
          this.deltaY=0
          let _this=this;
          if(this.refreshStep == STATE_PULL_RELEASE){
            if (!this.disablePullup && this.pullupChangeStyle==STYLE_RELEASE) {  
              this.pullupChangeStyle=STYLE_REFRESH
              this.pullUpTip=PULL_UP_LOADING
              this.refreshStep = STATE_PULL_LOADING;
              this.$emit('on-pullup',this.reset);
            }else if(!this.disablePulldown && this.pulldownChangeStyle==STYLE_RELEASE){
              this.pulldownChangeStyle=STYLE_REFRESH 
              this.pullDownTip=PULL_DOWN_LOADING
              this.refreshStep = STATE_PULL_LOADING;
              this.$emit('on-pulldown',this.reset);
            }

            this.timeoutHandler=window.setTimeout(function(){
              if(_this.refreshStep==STATE_PULL_LOADING) 
                _this.reset();
            },this.timeout);
          }else{
            _this.reset();
          }

        }
      }
    }
</script>

<style scoped>
.pulldown,.pullup{
  transition: all 0.2s linear;
}
  .hide{
    display: none;
  }
  .pull-container {
    overflow: hidden;
  }

  /*refresh start*/
  .pulldown,.pullup {  
    height: 50px;  
    line-height: 50px;  
    padding: 5px 15px;  
    font-weight: bold;  
    font-size: 14px;  
    color: #888;  
    text-align: center;
  }  
  
  .pulldown .pulldown-icon,.pullup .pullup-icon {  
    display: block;   
    width: 40px;  
    height: 40px;  
    background: url(../assets/img/pull-icon@2x.png) 0 0 no-repeat;  
    -webkit-background-size: 40px 80px;  
    background-size: 40px 80px;  
    -webkit-transition-property: -webkit-transform;  
    -webkit-transition-duration: 250ms;  
  }  

  .pulldown .pulldown-label, .pullup .pullup-label{  
    position:relative;  
    top: -40px;
  }  
  .pulldown .pulldown-icon {  
    -webkit-transform: rotate(0deg) translateZ(0);  
  }  
  .pullup .pullup-icon {  
    -webkit-transform: rotate(-180deg) translateZ(0);  
  }
  
  .pulldown.release .pulldown-icon {  
    -webkit-transform: rotate(-180deg) translateZ(0);  
  }

  .pullup.release .pullup-icon {  
    -webkit-transform: rotate(0deg) translateZ(0);  
  }

  .pulldown.refresh .pulldown-icon,.pullup.refresh .pullup-icon {  
    background-position: 0 100%;  
    -webkit-transition-duration: 0ms;  
    -webkit-animation: spinner 3s infinite linear;
    animation: spinner 3s infinite linear;
  }
  /*通用转动动画*/
@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  50% { -webkit-transform: rotate(180deg); }
    100% { -webkit-transform: rotate(360deg); }
}
  /*refresh end*/

</style>