import { cac } from "cac";

const version = require("../../package.json").version;

const cli = cac("vite-ssg").version(version).help();

cli
    .command("[root]", "start dev server")
    .alias("dev")
    .action(async(root: string) => {
        console.log('dev', root)
    });

cli
    .command("bulid [root]", "build for production")
    .action(async(root: string) => {
        console.log('build', root)
    });

cli.parse();