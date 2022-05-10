#!/usr/bin/env node

import fs from "fs";
import { execa } from "execa";
import chalk from "chalk"; // 用于生成带有颜色的文字
import createIndexTemplate from "./createIndexTemplate.js";
import createPackageTemplate from "./createPackageTemplate.js";
import question from "./question/index.js";
import { createConfig } from "./configadapter.js";

// 获取用户输入
// 格式为： { packageName: 'xxxxx', port: '9000', middleware: [ 'koaStatic' ] }
const answer = await question();

// 将用户输入的参数默认格式适配成我们需要的格式
// 转化成格式：{ packageName: 'xxxxx', port: '9000', middleware: { koastatic: true, router: false } }
const config = createConfig(answer);

// 获取输出的初始化项目文件的路径
function getRootPath() {
  return `./${config.packageName}`;
}

// 1. 创建输出的文件夹 ——> setup
console.log(chalk.blue(`创建文件夹 ——> ${config.packageName}`));
fs.mkdirSync(getRootPath());

// 2. 创建入口文件 ——> setup/index.js 通过模板生成入口文件
console.log(chalk.blue("创建入口文件 ——> index.js"));
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));

// 3. 创建setup/package.json
console.log(chalk.blue("创建package.json"));
fs.writeFileSync(
  `${getRootPath()}/package.json`,
  createPackageTemplate(config)
);

// 4. 安装依赖
console.log(chalk.blue("安装依赖"));
execa("npm install", [], {
  cwd: getRootPath(), // 指定命令执行的环境
  stdio: [2, 2, 2], // 把子进程的输入输出显示到父进程内，展示出依赖包的安装过程
});
