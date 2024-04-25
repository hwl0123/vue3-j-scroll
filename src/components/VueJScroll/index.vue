<template>
  <div
    class="custom-list"
    ref="scrollBody"
    @mouseenter="mouseenterFunc"
    @mouseleave="mouseleaveFunc"
    @mousewheel="mousewheelFunc"
  >
    <div
      class="list-body"
      :class="{
        'list-body2': isHorizontal,
      }"
      ref="listBody"
      :style="{ transform: getScrollDistance }"
    >
      <slot></slot>
    </div>
    <div
      class="list-body"
      :class="{
        'list-body2': isHorizontal,
      }"
      ref="tBody"
      v-if="isCanScroll"
      :style="{ transform: getScrollDistance }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup name="vue-j-scroll">
import {
  ref,
  computed,
  reactive,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue';
const props = defineProps({
	//滚动速度
  steep: {
    type: Number,
    default: 1,
  },
	//滚动方向
  direction: {
    type: String,
    default: 'top',
  },
	//是否可以滑轮滚动
  isRoller: {
    type: Boolean,
    default: true,
  },
	//滑轮滚动的距离
  rollerScrollDistance: {
    type: Number,
    default: 20,
  },
	//列表数据
  lists: {
    type: Array,
    default: () => [],
  },
	//是否自动播放
  autoplay: {
    type: Boolean,
    default: true,
  },
});
// 是否水平滚动
const isHorizontal = computed(() => {
  return props.direction === 'left' || props.direction === 'right';
});
const timer = ref();
const delayTime = ref(); //延迟时间
const animationFrame = ref(); //动画帧
const bodyHeight = ref(0); //滚动容器高度
const bodyWidth = ref(0); //滚动容器宽度
const listHeight = ref(0); //列表高度
const listWidth = ref(0); //列表宽度
const scrollDistance = ref(0); //滚动距离
const isCanScroll = ref(false); //是否可以滚动
const scrollBody = ref();
const listBody = ref();
const isStop = ref(!1);

const start = () => {
  //判断是否可以滚动函数
  let isScrollFunc = (bodySize, listSize) => {
    if (bodySize > listSize) {
      scrollDistance.value = 0;
      isCanScroll.value = !1;
    }
  };

  isStop.value = !1;
  //判断是否可以滚动
  if (!isHorizontal.value) {
    isScrollFunc(bodyHeight.value, listHeight.value);
  } else {
    isScrollFunc(bodyWidth.value, listWidth.value);
  }
  if (isCanScroll.value) {
    run();
  }
};
const run = () => {
  //清空动画
  clearAnimation();

  animationFrame.value = window.requestAnimationFrame(() => {
    //滚动主逻辑函数
    let main = (listSize, bodySize) => {
      let abs = Math.abs(scrollDistance.value);
      if (scrollDistance.value < 0) {
        let cc = 2 * listSize - bodySize;
        if (abs > cc) {
          scrollDistance.value = -(listSize - bodySize);
        }
      } else {
        scrollDistance.value = -listSize;
      }
    };

    //根据滚动方向判断使用高度或宽度控制效果
    if (!isHorizontal.value) {
      main(listHeight.value, bodyHeight.value);
    } else {
      main(listWidth.value, bodyWidth.value);
    }
    //判断滚动值
    if (!isStop.value) {
      if (props.direction === 'top' || props.direction === 'left') {
        scrollDistance.value -= props.steep;
      } else if (props.direction === 'bottom' || props.direction === 'right') {
        scrollDistance.value += props.steep;
      }
      run();
    }
  });
};
const clearAnimation = () => {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
    animationFrame.value = null;
  }
};
//停止滚动
const stop = () => {
  isStop.value = !0;
  clearAnimation();
};

//初始化数值
const initData = () => {
  clearTimeout(delayTime.value);
  delayTime.value = setTimeout(() => {
    clearTimeout(delayTime.value);
    scrollDistance.value = 0;
    isCanScroll.value = !0;
    bodyHeight.value = scrollBody.value.clientHeight;
    bodyWidth.value = scrollBody.value.clientWidth;
    listHeight.value = listBody.value.clientHeight;
    listWidth.value = listBody.value.clientWidth;

    if (
      (bodyHeight.value !== 0 &&
        listHeight.value !== 0 &&
        listHeight.value >= bodyHeight.value) ||
      (bodyWidth.value !== 0 &&
        listWidth.value !== 0 &&
        listWidth.value >= bodyWidth.value)
    ) {
      isCanScroll.value = true;
      //判断是否自动播放
      if (!props.autoplay) return;
      start();
    } else {
      isCanScroll.value = false;
    }
  }, 1000);
};

//获取滚动样式
const getScrollDistance = computed(() => {
  let c;
  if (!isHorizontal.value) {
    c = 'translate(0px, ' + scrollDistance.value + 'px)';
  } else {
    c = 'translate(' + scrollDistance.value + 'px,0px)';
  }
  return c;
});
const mouseenterFunc = () => {
  stop();
};
const mouseleaveFunc = () => {
  //判断是否自动播放
  if (!props.autoplay) return;
  start();
};
const mousewheelFunc = (e) => {
  if (!isCanScroll.value || !props.isRoller) {
    return false;
  }
  let dis = e.deltaY;
  if (dis > 0) {
    scrollDistance.value -= props.rollerScrollDistance;
  } else {
    scrollDistance.value += props.rollerScrollDistance;
  }
  run();
};

watch(
  () => props.lists,
  (val) => {
    if (val && val.length > 0) {
      initData();
    }
  },
  {
    immediate: true,
    deep: true,
  }
);

onBeforeUnmount(() => {
  clearInterval(timer.value);
  timer.value = null;
});
defineExpose({
  start,
  stop,
  initData,
});
</script>

<style scoped>
.custom-list {
  white-space: nowrap;
  height: 100%;
  overflow: hidden;
}
.list-body {
  overflow: hidden;
  white-space: nowrap;
}
.list-body2 {
  display: inline-block;
}
</style>
