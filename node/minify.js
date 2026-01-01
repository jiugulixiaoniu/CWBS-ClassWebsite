const htmlMinify = require('html-minifier').minify;
const CleanCSS = require('clean-css');
const {
  minify
} = require('terser');
const path = require('path')
const fs = require('fs/promises')
const outdir = path.join(__dirname, "../dist");
const sourceDir = path.join(__dirname, "../src")
const compressHTML = (fileContext) => {
  const compressed = htmlMinify(fileContext, {
    collapseWhitespace: true,
    removeComments: true
  });
  return compressed;
};
const compressCSS = (fileContext) => {
  const {
    styles
  } = new CleanCSS().minify(fileContext);
  return styles;
};
const compressJS = async (fileContext) => {
  const result = await minify(fileContext, {
    compress: {
      drop_console: true
    }
  });
  return result.code;
};
const processDir = async (dir) => {
  try {
    const files = await fs.readdir(path.join(sourceDir, dir), {
      withFileTypes: true
    });
    for (const file of files) {
      const filePath = path.join(sourceDir, dir, file.name);
      const name = file.name;
      if (file.isFile()) {
        const fileContext = await fs.readFile(filePath, "utf-8");
        let context = "";
        switch (path.extname(name)) {
          case ".html":
            context = compressHTML(fileContext);
            break;
          case ".css":
            context = compressCSS(fileContext);
            break
          case ".js":
            context = await compressJS(fileContext);
            break;
          default:
            context = await fs.readFile(filePath);
        }
        context = context.toString();
        await fs.mkdir(path.join(outdir, dir), {
          recursive: true
        }).catch(() => null)
        await fs.writeFile(path.join(outdir, dir, file.name), context)
      } else {
        await processDir(path.join(dir, file.name));
      }
    }
  } catch (err) {
    console.error(dir, err.stack)
  }
};
async function main() {
  try {
    await fs.rm(outdir)
  } catch {}
  await processDir("./")
  console.log("压缩完成")
}
main()
console.log("开始压缩")
