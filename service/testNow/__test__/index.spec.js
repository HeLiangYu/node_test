test("测试生成名称", () => {
  const testn = require("../index");
  const obj = new testn();
  const ret = obj.getFilename("/abc/cjk.js");

  expect(ret).toBe("/abc/__test__/cjk.spec.js");
});
