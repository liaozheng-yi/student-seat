<template>
  <div class="flex">
    <div class="border-r-2 w-52 cfg-bar bg-purple-50">
      <!-- <button @click="log(seatCfg)">dddddddddddddddddddd</button> -->
      <p class="cfg-title">座位设计</p>
      <div class="p-3">
        <p class="mb-2">怎么看呢？</p>
        <el-radio-group v-model="seatCfg.visual" class="mb-3">
          <el-radio-button label="teacher" class="el-text-base"
            >教师视图</el-radio-button
          >
          <el-radio-button label="student" class="el-text-base"
            >学生视图</el-radio-button
          >
        </el-radio-group>
        <p class="mb-2">分几组呢？</p>
        <el-input-number
          class="mb-3"
          v-model="seatCfg.group"
          :min="2"
          :max="8"
        />
        <p class="mb-2">每组几列呢？</p>
        <el-input-number
          class="mb-3"
          v-model="seatCfg.column"
          :min="1"
          :max="4"
        />
        <p class="mb-2">展示身高</p>
        <el-switch
          v-model="seatCfg.hideHeight"
          active-text="看一下"
          inactive-text="隐藏起来"
        ></el-switch>
      </div>
    </div>
    <div class="flex-grow h-screen flex flex-col items-center">
      <div class="flex-grow">学生座位分布区</div>
      <div
        class="
          w-52
          h-8
          bg-table
          rounded-lg
          text-center
          font-semibold
          text-lg
          leading-8
        "
      >
        讲台
      </div>
      <div class=" w-64 h-10 bg-gray-700 rounded leading-10 my-4 text-center text-white">
        {{ info?.className }}座位表
      </div>
    </div>
    <div class="border-l-2 w-36 cfg-bar bg-purple-50">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, reactive } from "vue";

export default defineComponent({
  setup() {
    let info = inject<IInfo>("info");
    let seatCfg = reactive({
      visual: "teacher",
      group: 4,
      column: 2,
      hideHeight: true,
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
  @apply h-screen border-gray-300;
}
.cfg-title {
  @apply text-center text-xl text-white font-semibold leading-6 py-3 bg-gradient-to-r from-pink-300 to-purple-400;
}
.el-text-base .el-radio-button__inner {
  font-size: 14px;
}
.bg-table {
  background-image: url(../assets/img/桌子背景.jpg);
}
.students-ul {
  height: calc(100vh - 1.5rem - 24px);
}
.students-ul li:nth-child(1) {
  margin-top: 8px;
}
</style>
