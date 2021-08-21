<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <video
      class="max-h-screen mx-auto z-0"
      loop
      src="../assets/img/whale.mp4"
      ref="WhaleVideoRef"
    ></video>
    <div class="absolute">
      <div>
        <label class="w-28 inline-block text-purple-600 text-right pr-3"
          >班级:</label
        >
        <input
          class="
            bg-transparent
            border-2 border-purple-600
            rounded-xl
            pl-3
            text-purple-600
            border-opacity-50
            outline-none
            w-40
            focus:border-pink-300
          "
          type="text"
          @focus="classInputFocus"
          v-model="info.className"
        />
      </div>
      <div class="mt-4">
        <label class="w-20 text-purple-600 pr-3">导入学生信息:</label>
        <button
          class="
            bg-purple-600 bg-opacity-50
            text-white
            rounded-xl
            px-2.5
            w-40
            hover:bg-pink-300
          "
          @click="importFile"
        >
          导入excel文件
        </button>
        <input
          type="file"
          class="hidden"
          ref="ImportFileRef"
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="fileInput"
        />
      </div>
      <div class="mt-4 flex justify-center">
        <button
          class="
            bg-purple-600 bg-opacity-50
            text-white
            rounded-xl
            px-2.5
            w-40
            hover:bg-pink-300
          "
          @click="toEdit"
        >
          Let's go!
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, nextTick, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import XLSX from "xlsx";
export default defineComponent({
  setup() {
    let $router = useRouter();
    let info = reactive({ className: "", students: <Array<IStudent>>[] });
    let importInfo = inject("importInfo");

    //点击输入框的时候，开始动画
    let WhaleVideoRef = ref<HTMLVideoElement>();
    const classInputFocus = () => {
      WhaleVideoRef.value?.play();
    };

    //点击导入文件的时候，调用inputfile
    let ImportFileRef = ref<HTMLInputElement>();
    const importFile = () => {
      ImportFileRef.value?.click();
    };
    //传入并读取文件
    const fileInput = (f: any) => {
      console.log(f.target.files[0]);
      let reader = new FileReader();
      reader.onload = function (ev) {
        let data = ev.target?.result;
        let workBook = XLSX.read(data, {
          type: "binary",
        });
        console.log(workBook, "workBook");
        let fromTo: any = "";
        // 遍历每张表读取
        for (let sheet in workBook.Sheets) {
          if (workBook.Sheets.hasOwnProperty(sheet)) {
            fromTo = workBook.Sheets[sheet]["!ref"];
            console.log(fromTo, "fromTo");
            info.students = XLSX.utils.sheet_to_json(workBook.Sheets[sheet]);
            info.students = info.students.map((e) => {
              return {
                name: e.name,
                height: e.height || "",
              };
            });
            break; // 如果只取第一张表，就取消注释这行
          }
        }

        //读取后清空input内value,方便重新导入
        // (<HTMLInputElement>ImportFileRef.value).value = "";
      };
      reader.readAsBinaryString(f.target.files[0]);
    };

    //点击了确认-》let's go
    const toEdit = () => {
      (<Function>importInfo)(info.className, info.students);
      $router.push("/seating");
      sessionStorage.setItem("info", JSON.stringify(info));
      console.log(info, "login页面的info");
    };
    return {
      classInputFocus,
      WhaleVideoRef,
      importFile,
      ImportFileRef,
      fileInput,
      info,
      toEdit,
    };
  },
});
</script>
