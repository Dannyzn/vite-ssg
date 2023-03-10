import { readFile } from "fs/promises";
import { Plugin } from "vite";
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from "../constants";

export function createIndexHtmlPlugin(): Plugin {
    return {
        name: "vite-ssg:index-html",
        apply: "serve",
        // 插入入口 script 标签
        transformIndexHtml(html, ctx) {
            // const { path } = ctx;
            // const { base } = ctx.server.config;
            // const script = `<script type="module" src="${base}${path}"></script>`;
            // return html.replace(/<\/body>/, script + "</body>");
            return {
                html,
                tags: [ 
                    {
                        tag: 'script',
                        attrs: {    
                            type: 'module',
                            // src: 'http://localhost:3000/src/main.tsx',
                            src: `/@fs/${CLIENT_ENTRY_PATH}`,
                        },
                        injectTo: 'body',
                    }
                ],
            }
        },
        configureServer(server) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    let html = await readFile(DEFAULT_HTML_PATH, "utf-8");

                    try {
                        html = await server.transformIndexHtml(
                            req.url,
                            html,
                            req.originalUrl,
                        );
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "text/html");
                        res.end(html);
                    } catch (e) {
                        return next(e);
                    }
                });
            }
        }
    }
}