const http = require("http");
const context = require("./context");
const response = require("./response");
const request = require("./request");

/**
 * koa使用的是中间件机制，洋葱圈模型
 * 有执行顺序的要求
 * 每一个中间件中的next函数只能调用一次
 */
class koa {
  constructor() {
    this.middlewares = [];
  }
  use(callback) {
    // this.callback = callback;
    this.middlewares.push(callback);
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      try {
        const fn = await this.compose(this.middlewares)(ctx);
      } catch (err) {
        console.log(err);
      }

      // this.callback(ctx);

      res.end(ctx.body);
    });

    server.listen(...args);
  }
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.response = Object.create(response);
    ctx.request = Object.create(request);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.request.res = res;

    return ctx;
  }
  compose(middlewares) {
    return (ctx) => {
      let index = -1;
      return dispatch(0);

      function dispatch(i) {
        if (i <= index) {
          return Promise.reject("err");
        }
        index = i;

        const fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        } else {
          return fn(ctx, () => dispatch(i + 1));
        }
      }
    };
  }
}

module.exports = koa;
