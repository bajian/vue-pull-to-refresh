# pull2refresh
alternatively pull down or pull up or both
> A Vue.js project

##demo

[online-demo](https://cdn.rawgit.com/bajian/vue-pull-to-refresh/master/dist/demo2.html)

## Build Setup

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
    <!-- content container -->
    <ul class="page">
      <li track-by="$index" v-for="(item, i) in items">
        # item {{ i }} 
      </li>
    </ul>
  </pull-to-refresh>
```

## Api
### Properties
| Name                 | Type      | Default      | Description                                                        |
|----------------------|-----------|--------------|--------------------------------------------------------------------|
| disable-pullup            | `Boolean`  | `false` | disable pullup |
| disable-pulldown            | `Boolean`  | `false` | disable pulldown |
| on-pullup   | `Function` | `undefined`       | the pullup listener with a finshCallback param to tell it finsh refreshing state |
| on-pulldown   | `Function` | `undefined`       | the pulldown listener with a finshCallback param to tell it finsh refreshing state |
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

timeout:8000//the 8s timeout of refreshing state if u donnot call the finshCallback
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
