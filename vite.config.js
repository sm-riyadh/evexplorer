import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "MyCssLib",
    },
  },
  plugins: [
    // Without Data
    ViteEjsPlugin(),

    // With Data
    ViteEjsPlugin({
      domain: "example.com",
      title: "My vue project!"
    }),

    // Or With Vite Config
    ViteEjsPlugin((viteConfig) => {
      // viteConfig is the current viteResolved config.
      return {
        root: viteConfig.root,
        domain: "example.com",
        title: "My vue project!"
      }
    }),
  ],
});
