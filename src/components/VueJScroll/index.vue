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

		<!-- <button @click="stop">stop</button>
    <button @click="start">start</button>
    <button @click="initData">result</button> -->
	</div>
</template>

<script setup name="vue-j-scroll">
import { ref, computed, reactive, onMounted, onBeforeUnmount, watch } from 'vue';
const props = defineProps({
	steep: {
		//滚动速度
		type: Number,
		default: 1,
	},
	scrollDirection: {
		//滚动方向
		type: String,
		default: 'top',
	},
	isRoller: {
		//是否可以滑轮滚动
		type: Boolean,
		default: true,
	},
	rollerScrollDistance: {
		//滑轮滚动的距离
		type: Number,
		default: 20,
	},
	lists: {
		type: Array,
		default: () => [],
	},
});
const isHorizontal = computed(() => {
	return props.scrollDirection === 'left' || props.scrollDirection === 'right';
});
const data = ref({
	// timer: null, //滚动定时器
	// scrollDistance: 0, //滚动距离
	// tDom: '', //复制的容器
	// bodyHeight: 0, //滚动容器高度
	// bodyWidth: 0, //滚动容器宽度
	// listHeight: 0, //列表高度
	// listWidth: 0, //列表宽度
	// isStop: !1,
	// animationFrame: null,
	// delayTime: null,
});
const timer = ref();
const delayTime = ref();
const animationFrame = ref();
const bodyHeight = ref(0);
const bodyWidth = ref(0);
const listHeight = ref(0);
const listWidth = ref(0);
const scrollDistance = ref(0);
const isCanScroll = ref(false)
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
			if (props.scrollDirection === 'top' || props.scrollDirection === 'left') {
				scrollDistance.value -= props.steep;
			} else if (props.scrollDirection === 'bottom' || props.scrollDirection === 'right') {
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
			(bodyHeight.value !== 0 && listHeight.value !== 0 && listHeight.value >= bodyHeight.value) ||
			(bodyWidth.value !== 0 && listWidth.value !== 0 && listWidth.value >= bodyWidth.value)
		) {
			isCanScroll.value = true;
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
		if(val && val.length>0) {
			initData();
		}
	},
	{
		immediate: true,
		deep: true,
	},
);

// onMounted(() => {
// 	//初始化页面数据
// 	initData();
// });
onBeforeUnmount(() => {
	clearInterval(timer.value);
	timer.value = null;
});
</script>

<style scoped>
.custom-list {
	white-space: nowrap;
  /* height: 300px; */
  height: 270px;
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
