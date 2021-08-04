<template>
  <div class="border-r-2 left-0 w-52 cfg-bar bg-purple-50">
    <button @click="log(seatCfg)">dddddddddddddddddddd</button>
    <p class="cfg-title">座位设计</p>
    <div class="p-3">
      <p>座位视图</p>
      <el-radio v-model="seatCfg.visual" label="teacher">教师视图</el-radio>
      <el-radio v-model="seatCfg.visual" label="student">学生视图</el-radio>
    </div>
  </div>
  <div class=""></div>
  <div class="border-l-2 right-0 w-36 cfg-bar bg-purple-50">
    <p class="cfg-title">学生列表</p>
    <ul class="overflow-y-auto students-ul">
      <li
        v-for="(item, index) in info?.students"
        :key="index"
        class="
          flex
          justify-between
          px-3
          py-2
          bg-pink-400
          hover:bg-pink-500
          cursor-move
          rounded
          text-white
          mb-3
          ml-2
          mr-2
        "
      >
        <span>{{ item.name }}</span>
        <span>{{ item.height }} </span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, reactive } from "vue";

export default defineComponent({
  setup() {
    let info = inject<IInfo>("info");
    let seatCfg = reactive({
      visual: "student",
      group: 4,
      column: 2,
    });

    const log = (e: any, text?: any) => {
      nextTick(() => {
        console.log(e, text);
      });
    };
    return { info, log, seatCfg };
  },
});
</script>
<style>
.cfg-bar {
  @apply h-screen fixed border-gray-300;
}
.cfg-title {
  @apply text-center text-xl text-white font-semibold leading-6 py-3 bg-gradient-to-r from-pink-300 to-purple-400;
}
.students-ul {
  height: calc(100vh - 1.5rem - 24px);
}
.students-ul li:nth-child(1) {
  margin-top: 8px;
}
</style>
