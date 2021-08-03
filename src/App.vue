<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, inject, provide, reactive } from "vue";

export default defineComponent({
  name: "App",
  components: {},
  setup() {
    let info = reactive({ className: "", students: <Array<IStudent>>[] });
    let importInfo = (className: string, students: Array<IStudent>) => {
      info.className = className;
      info.students = students;
      console.log(info, "根组件的info");
    };
    provide("info", info);
    provide("importInfo", importInfo);
  },
});
</script>

<style></style>
