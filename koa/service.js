const koa = require("./koa/index");
const Router = require("./koa/router");
const static = require("./koa/static");
const path = require("path");

const app = new koa();
const router = new Router();
app.use(static(path.join(__dirname, "./public")));
// app.use(static("/public"));
// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "2";
// });

router.get("/index", async (ctx, next) => {
  ctx.body += "7";
  await next();
});

router.get("/index2", async (ctx, next) => {
  ctx.body += "3";
  await next();
  ctx.body += "1";
});

app.use(router.routes());

// app.use(async (ctx, next) => {
//   ctx.body += "3";
//   await next();
//   // await next();
//   ctx.body += "4";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "5";
//   await next();
//   ctx.body += "6";
// });

app.listen(3000, () => {
  console.log("程序已运行");
});
