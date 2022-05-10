import ejs from "ejs";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import prettier from "prettier";

export default (config) => {
  // 配置package.json中type为module后，项目变成ems模式，无法使用__dirname；
  // 可以使用工具函数生成__dirname
  const __dirname = fileURLToPath(import.meta.url);

  const indexTemplate = fs.readFileSync(
    path.resolve(__dirname, "../template/index.ejs")
  );

  const code = ejs.render(indexTemplate.toString(), {
    middleware: config.middleware,
  });
  return prettier.format(code, { parser: "babel" });
};
