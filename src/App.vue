<template>
  <div class="person-rank-chart webkit-scroll" ref="chartRef">
    <Vue3JScroll
      :speed="1"
      :steep="0.5"
      :lists="staffList"
      ref="scrollRef"
    >
      <ul ref="ulRef">
        <li v-for="(item, index) in staffList" :key="index">
          <div class="person-rank-company">
            <span>{{ index }}.</span>
            <p>这是一块内容</p>
          </div>
        </li>
      </ul>
    </Vue3JScroll>
    
    <!-- <div class="operate-btn">
			<button @click="stop">stop</button>
			<button @click="start">start</button>
			<button @click="initData">initData</button>
		</div> -->
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const staffList = Array.from({ length: 20 }, (v, i) => i)

const scrollRef = ref(null);

const stop = () => {
  scrollRef.value.stop();
};
const start = () => {
  scrollRef.value.start();
};
const initData = () => {
  scrollRef.value.initData();
};
</script>

<style scoped>
.person-rank-chart {
  height: 270px;
  position: relative;
  z-index: 1;
  /* 不需要滚动条, 以免与鼠标滚动冲突 */
  overflow: hidden;
}
.person-rank-chart ul li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  margin-bottom: 6px;
}
.person-rank-chart ul li:nth-child(1) span {
  color: #ffd800;
}
.person-rank-chart ul li:nth-child(2) span {
  color: #db44ab;
}
.person-rank-chart ul li:nth-child(3) span {
  color: #e19537;
}
.person-rank-company {
  display: flex;
}
.operate-btn {
	position: fixed;
	left: 10px;
	bottom: 100px;
}
</style>
