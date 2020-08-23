const path = require("path");

module.exports = class testNow {
  getFilename(filename) {
    // 拆解地址
    const dirName = path.dirname(filename);
    // 文件名
    const baseName = path.basename(filename);
    // 文件后缀
    const extName = path.extname(filename);
    // 新的文件名
    const testName = baseName.replace(extName, `.spec${extName}`);

    // console.log(dirName, baseName, extName, testName);
    return path.format({
      root: dirName + "/__test__/",
      base: testName,
    });
  }
};
