import type { App } from "vue";
import {
  ElInput,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElInputNumber,
  ElSwitch,
} from "element-plus";

const elementComponents = [
  ElInput,
  ElRadio,
  ElRadioButton,
  ElRadioGroup,
  ElInputNumber,
  ElSwitch,
];
export default function importElementUi(app:App<Element>) {
  //设置中文，默认饿了么组件的大小为small
  app.config.globalProperties.$ELEMENT = { size: "small" };
  elementComponents.forEach((components: any) => {
    app.use(components);
  });
}
