import { createServer as createViteDevServer } from "vite";
import { createIndexHtmlPlugin } from "./plugin-island/indexHtml";

export async function createDevServer(root = process.cwd()) {
  return createViteDevServer({
    root,
    plugins: [createIndexHtmlPlugin()],
  });
}