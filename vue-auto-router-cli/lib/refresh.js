const fs = require("fs");
const handlebars = require("handlebars");
const chalk = require("chalk");

function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const resutlt = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, resutlt);
  }

  console.log(chalk.green(`${filePath}创建成功`));
}

module.exports = () => {
  const list = fs
    .readdirSync("./src/views")
    .filter((v) => v !== "Home.vue")
    .map((v) => ({ name: v.replace(".vue", "").toLocaleLowerCase(), file: v }));

  // 生成路由定义
  compile(
    {
      list,
    },
    "./src/router.js",
    "./template/router.js.hbs"
  );
  // 生成菜单
  compile(
    {
      list,
    },
    "./src/App.vue",
    "./template/App.vue.hbs"
  );
};
