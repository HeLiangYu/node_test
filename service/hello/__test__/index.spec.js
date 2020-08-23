// const { test } = require("picomatch");
// const { exact } = require("prop-types");

test("第一个测试用例", () => {
  const ret = require("../index");

  expect(ret).toBe("hellod");
});
