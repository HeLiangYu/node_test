class router {
  constructor() {
    this._stack = new Map();
  }

  regist(method, path, callback) {
    this._stack.set(method + "-" + path, (...args) => callback(...args));
  }

  get(url, callback) {
    this.regist("get", url, callback);
  }

  post(url, callback) {
    this.regist("post", url, callback);
  }

  routes() {
    return (ctx, next) => {
      const fn = this._stack.get(ctx.method + "-" + ctx.url);
      if (fn) {
        fn(ctx, next);
      }
    };
  }
}

module.exports = router;
