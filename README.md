# vue3-j-scroll

> A Vue3.js project

## 一个循环滚动列表插件

该插件为 @david-j/vue-j-scroll 改的vue3版 ，可以自动滚动也可以手动滚动。dom 中的事件也保存了下来。
本人菜的扣脚, 如有需要自行改进

```bash
npm install vue3-j-scroll


在项目中使用
import Vue3JScroll from 'vue3-j-scroll';
Vue.use(Vue3JScroll);
```

```bash

示例：

    <vue3-j-scroll
      class="list-style"
      :autoplay="true"
      :steep="0.5"
      :direction="'top'"
      :lists="lists"
    >
        <div
          v-for="(item, index) in lists"
          :key="'t' + index"
          class="list-item"
        >
          <p>{{ item + "rrrrssserrdd" }}</p>
        </div>
    </vue3-j-scroll>

```

| 属性   | 属性名称 | 类型   | 可选值 |
| ------ | -------- | ------ | ------ |
| steep  | 滚动的速率   | number | 为正数即可 |
| direction | 滚动的方向   | string | top,left,right |
| autoplay | 是否自动滚动   | bolean | true,false |
| lists | 接收异步数据   | array | - |
| isRoller | 是否可以滑轮滚动   | bolean | true |

<font color=#ff0000>注：请固定容器大小</font>
<br>
