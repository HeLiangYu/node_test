const { promisify } = require("util");
const figlet = promisify(require("figlet"));
const clear = require("clear");
const chalk = require("chalk");
const ora = require("ora");
const { clone } = require("./download");
const open = require("open");

const log = (content) => console.log(chalk.green(content));

const spawns = (...args) => {
  //   const { spawn } = require("child_process");
  const { spawn } = require("hexo-util");
  return new Promise(async (resolve) => {
    const proc = await spawn(...args);
    const process = ora("安装依赖....");
    // process.start();
    console.log(proc.stdio, 778);
    // proc.stdout.pipe(process.stdout);
    // proc.stderr.pipe(process.stderr);
    // proc.on("close", () => {
    //   process.succeed();
    //   resolve();
    // });
    resolve();
  });
};

module.exports = async (name) => {
  clear();
  const data = await figlet("heliangyu welcome");
  log(data);
  log("创建项目：", name);
  //   await clone("github:su37josephxia/vue-template", name);
  //   log("安装依赖...");
  await spawns("npm", ["install"], {
    cwd: `./${name}`,
  });
  log(`👌安装完成：
To get Start:
===========================
cd ${name}
npm run serve
===========================
web全栈架构师
启动项目
约定路由功能
loader 文件扫描
代码模板渲染 hbs Mustache风格模板
/lib/refresh.js`);

  open("http://localhost:8080/");
  await spawns("npm", ["run", "serve"], { cwd: `./${name}` });
};
