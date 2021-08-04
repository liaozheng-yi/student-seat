import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";

export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "element-plus",
          esModule: true,
          ensureStyleFile: true,
          // resolveStyle: (name) => {
          //   return `element-plus/lib/theme-chalk/${name}.css`;
          // },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
  server: {
    open: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"), //设置@指向src目录
      comps: resolve(__dirname, "./src/components"), //设置comps指向components目录
    },
  },
});
