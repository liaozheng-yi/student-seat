<template>
  <div class="flex">
    <div class="border-r-2 w-52 cfg-bar bg-purple-50">
      <!-- <button @click="log(seatCfg)">用嘀嘀嗒嘀嗒</button> -->
      <p class="cfg-title">座位设计</p>
      <div class="p-3">
        <p class="mb-2">怎么看呢？</p>
        <el-radio-group
          v-model="seatCfg.visual"
          class="mb-3"
          @change="visualChange"
        >
          <el-radio-button label="teacher" class="el-text-base"
            >教师视图</el-radio-button
          >
          <el-radio-button label="student" class="el-text-base"
            >学生视图</el-radio-button
          >
        </el-radio-group>
        <!-- <p class="mb-2">分几组呢？</p>
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
        /> -->
        <p class="mb-2">展示身高</p>
        <el-switch
          v-model="seatCfg.showHeight"
          active-text="看一下"
          inactive-text="隐藏起来"
        ></el-switch>
      </div>
    </div>
    <div
      class="flex-grow h-screen flex items-center flex-col justify-center"
      :class="{ 'rotate-180 transform': seatCfg.visual == 'student' }"
    >
      <div
        class="self-stretch p-5"
        @dragenter="dragenter"
        @dragleave="dragleave"
        @dragover="dragover"
      >
        <div class="table-row" v-for="(item, index) in tableRows" :key="item">
          <div class="table-pair" v-for="num in 4" :key="num">
            <!-- 
              1 1 2
              2 3 4
              3 5 6
              4 7 8
             -->
            <span
              draggable="true"
              @dragstart="exchange($event, index + 1, num * 2 - 1)"
              @drop="drop($event, index + 1, num * 2 - 1)"
              @dblclick="remove(index + 1, num * 2 - 1)"
              :class="{ 'rotate-180 transform': seatCfg.visual == 'student' }"
              >{{ formatter(seatData[index + 1 + "_" + (num * 2 - 1)]) }}</span
            >
            <span
              draggable="true"
              @dragstart="exchange($event, index + 1, num * 2)"
              @drop="drop($event, index + 1, num * 2)"
              @dblclick="remove(index + 1, num * 2)"
              :class="{ 'rotate-180 transform': seatCfg.visual == 'student' }"
              >{{ formatter(seatData[index + 1 + "_" + num * 2]) }}</span
            >
          </div>
        </div>
      </div>
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
          transform
        "
        :class="{ 'rotate-180 transform': seatCfg.visual == 'student' }"
      >
        讲台
      </div>
      <div
        class="
          w-2/5
          h-16
          bg-gray-700
          rounded
          p-3
          leading-10
          my-4
          text-center text-white
          transform
        "
        :class="{ 'rotate-180 transform': seatCfg.visual == 'student' }"
      >
        {{ info?.className }}座位表
      </div>
    </div>
    <div class="border-l-2 w-36 cfg-bar bg-purple-50">
      <p class="cfg-title">学生列表</p>
      <ul class="overflow-y-auto students-ul">
        <li
          draggable="true"
          @dragstart="dragstart($event, item, index)"
          v-for="(item, index) in info.students"
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
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  reactive,
  ref,
} from "vue";

export default defineComponent({
  setup() {
    let info = inject("info") as IInfo;
    let seatCfg = reactive({
      visual: "teacher",
      // group: 4,
      // column: 2,
      showHeight: true,
    });
    const visualChange = (e: "teacher" | "student") => {
      console.log(e);
      // if(e)
    };

    //计算座位数目
    let tableRows = ref(<number>0);
    onMounted(() => {
      let rows = info.students.length / 8;
      let isInt = rows / 1 === 0;
      tableRows.value = Math.floor(info.students.length / 8) + (isInt ? 3 : 2);
    });

    let seatData = reactive(<Record<string, IStudent>>{});
    const dragstart = (e: DragEvent, data: IStudent, index: number) => {
      e.dataTransfer?.setData("student", JSON.stringify(data));
      e.dataTransfer?.setData("index", index.toString());
    };
    const dragenter = (e: any) => {
      if (e.target?.nodeName == "SPAN") {
        e.target.style.background = "rgba(236, 72, 153, 0.2)";
      }
    };
    const dragleave = (e: any) => {
      if (e.target?.nodeName == "SPAN") {
        (e.target as HTMLSpanElement).style.background = "transparent";
      }
    };
    const dragover = (e: DragEvent) => {
      e.preventDefault();
    };
    const drop = (e: DragEvent, row: number, column: number) => {
      e.preventDefault();
      (e.target as HTMLSpanElement).style.background = "transparent";
      let oldSeat = e.dataTransfer?.getData("oldSeat");
      let newSeat = seatData[row + "_" + column];
      if (oldSeat) {
        //如果有旧座位，那么就是交换座位
        seatData[oldSeat] = newSeat;
        console.log(oldSeat, "oldSeat");
      } else {
        //如果没有，那就是添加
        info.students.splice(
          +(<DataTransfer>e.dataTransfer).getData("index"),
          1
        );
      }
      seatData[row + "_" + column] = JSON.parse(
        (<DataTransfer>e.dataTransfer).getData("student")
      );
      console.log(row, column);
      console.log(seatData);
    };
    //移除座位
    const remove = (row: number, column: number) => {
      info.students.unshift(seatData[row + "_" + column]);
      seatData[row + "_" + column] = {
        name: "",
        height: "",
      } as unknown as IStudent;
    };
    //交换座位
    const exchange = (e: DragEvent, row: number, column: number) => {
      console.log(seatData[row + "_" + column]);
      e.dataTransfer?.setData(
        "student",
        JSON.stringify(seatData[row + "_" + column])
      );
      e.dataTransfer?.setData("oldSeat", row + "_" + column);
    };
    //转化信息展示
    const formatter = (e: IStudent) => {
      if (e) {
        if (seatCfg.showHeight) {
          return e.name + " " + e.height;
        } else {
          return e.name;
        }
      }
    };
    const log = (e: any, text?: any) => {
      console.log(e, text);
    };
    return {
      info,
      log,
      seatCfg,
      tableRows,
      dragenter,
      dragleave,
      drop,
      dragover,
      dragstart,
      seatData,
      formatter,
      remove,
      exchange,
      visualChange,
    };
  },
});
</script>
<style scoped>
.cfg-bar {
  @apply h-screen border-gray-300;
}
.cfg-title {
  @apply text-center text-xl text-white font-semibold leading-6 py-3 bg-gradient-to-r from-pink-300 to-purple-400;
}
.el-text-base :deep(.el-radio-button__inner) {
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
.table-row {
  display: flex;
  justify-content: space-between;
  .table-pair {
    height: 61px;
    border: 1px solid #000;
    width: 22%;
    margin-bottom: 16px;
    display: flex;
    position: relative;
    span {
      display: inline-block;
      user-select: none;
      height: 60px;
      line-height: 60px;
      text-align: center;
      width: 50%;
    }
  }
  .table-pair::before{
    content: '';
    width: 1px;
    height: 60px;
    background: #000;
    position: absolute;
    right: 50%;
  }
}
</style>
