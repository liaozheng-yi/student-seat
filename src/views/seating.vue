<template>
  <div class="border-r-2 left-0 w-52 cfg-bar">
    <!-- <button @click="log(info)">dddddddddddddddddddd</button> -->
    <p class="cfg-title">座位设计</p>
  </div>
  <div class=""></div>
  <div class="border-l-2 right-0 w-32 cfg-bar">
    <p class="cfg-title">学生列表</p>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  setup() {
    let info = inject("info");
    const log = (e: any, text?: any) => {
      console.log(e, text);
    };
    return { info, log };
  },
});
</script>
<style>
.cfg-bar {
  @apply h-screen fixed overflow-auto border-gray-300;
}
.cfg-title {
  @apply text-center text-xl text-white font-semibold leading-6 py-3 bg-gradient-to-r from-pink-300 to-purple-400;
}
</style>
