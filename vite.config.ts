import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react-swc";
import basicSsl from "@vitejs/plugin-basic-ssl";
import path from "path";
import viteCompression from "vite-plugin-compression";

export default defineConfig(async () => {
  return {
    build: {
      outDir: "build"
    },
    optimizeDeps: {
      include: ["react/jsx-runtime"]
    },
    resolve: {
      alias: {
        "@images": path.join(__dirname, "src/images")
      }
    },
    plugins: [
      react(),
      tsConfigPaths(),
      eslint(),
      basicSsl(),
      viteCompression({
        verbose: false,
        disable: false,
        threshold: 10240, // 大于10kb才会压缩
        algorithm: "gzip",
        ext: ".gz"
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    server: {
      https: true,
      http2: true
    }
  };
});
