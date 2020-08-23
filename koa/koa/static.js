// 静态资源
const path = require("path");
const fs = require("fs");

function static(pathDir) {
  return async (ctx, next) => {
    if (ctx.url.indexOf("/public") === 0) {
      if (fs.readdirSync(pathDir)) {
        const filePath = path.join(pathDir, ctx.url.replace("/public", ""));
        try {
          const stats = fs.statSync(filePath);
          if (stats.isDirectory()) {
            let dirConetnt = fs
              .readdirSync(filePath)
              .map((file) => `<a href="${ctx.url + "/" + file}">${file}</a>`);
            ctx.body = dirConetnt.join("</br>");
          } else {
            const content = fs.readFileSync(filePath);
            if (content) {
              ctx.body = content;
            }
          }
        } catch (err) {
          console.log(err);
          ctx.body = "404";
        }
      }
    }

    await next();
  };
}

module.exports = static;
