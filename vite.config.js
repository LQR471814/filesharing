import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import sveltePreprocess from "svelte-preprocess";

import { svelte } from "@sveltejs/vite-plugin-svelte";

import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    root: "src",
    publicDir: "../public",
    server: { port: 8080 },
    build: {
      outDir: "../build",
    },
    resolve: {
      alias: {
        "~": resolve(__dirname, "src"),
      },
    },
    plugins: [
      svelte({
        preprocess: sveltePreprocess({
          sourceMap: mode !== "build",
          postcss: {
            plugins: [tailwindcss(), autoprefixer()],
          },
        }),
      }),
    ],
    optimizeDeps: {
      exclude: ["svelte-remixicon"]
    }
  };
});
