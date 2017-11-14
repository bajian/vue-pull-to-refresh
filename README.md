# pull2refresh
alternatively pull down or pull up or both for Vue2.0
> A Vue.js project

##demo

[live-demo](https://bajian.github.io/vue-pull-to-refresh/dist/)

## Build Setup DEMO

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

```html
  <pull-to-refresh
    @on-pullup='onPullup'
    @on-pulldown='onPulldown'>
    <ul>
      <li :key="index" v-for="(item, index) in items">
        # item {{ index }} 
      </li>
    </ul>
  </pull-to-refresh>
```

```js
import PullToRefresh from './components/pull-to-refresh'

onPullup(finshCallback) {
      setTimeout(()=>{
        this.items=this.items.concat([6,6,6,6,6,6,6,6,6,6,6])
        finshCallback();//finish the refreshing state
      },3000);
    }
```

## Api
### Properties
| Name                 | Type      | Default      | Description                                                        |
|----------------------|-----------|--------------|--------------------------------------------------------------------|
| disable-pullup            | `Boolean`  | `false` | set true to disable pullup function|
| disable-pulldown            | `Boolean`  | `false` | set true to disable pulldown function|
| on-pullup   | `Function` | `undefined`       | the pullup listener with a finshCallback param to tell it to finsh refreshing state |
| on-pulldown   | `Function` | `undefined`       | the pulldown listener with a finshCallback param to tell it to finsh refreshing state |
| ==================== | ========= | ============ | =================== |


for convenience & efficiency ,i donot set the tips and timeout editable,
if u want to edit ,just edit as u like:
```js
const PULL_DOWN_NORMAL='下拉刷新'
const PULL_DOWN_RELEASE='释放加载'
const PULL_DOWN_LOADING='加载中，请稍后'

const PULL_UP_NORMAL='上拉刷新'
const PULL_UP_RELEASE='释放加载'
const PULL_UP_LOADING='加载中，请稍后'

timeout=30000//the 30s timeout of reseting refreshing state if u donnot call the finshCallback
```

