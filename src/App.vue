<script setup>
const staffList = Array.from({ length: 20 }, (v, i) => i)
</script>

<template>
  <div class="person-rank-chart webkit-scroll" ref="chartRef">
    <Vue3JScroll
      :autoplay="true"
      :speed="1"
      :steep="0.5"
      :direction="'up'"
      :lists="staffList"
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
  </div>
</template>

<style scoped>
.person-rank-chart {
  margin-top: 14px;
  height: 272px;

  position: relative;
  z-index: 1;
  overflow-y: auto;
  max-height: 272px;
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
</style>
