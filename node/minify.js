const fs = require('fs-extra');
const htmlMinify = require('html-minifier').minify;
const CleanCSS = require('clean-css');
const {
  minify
} = require('terser');
const path = require('path')
const fs_ = require('fs/promises')
// 压缩HTML
const compressHTML = async (filePath) => {
  const html = await fs.readFile(filePath, 'utf8');
  const compressed = htmlMinify(html, {
    collapseWhitespace: true,
    removeComments: true
  });
  await fs.outputFile(filePath.replace('src', 'dist'), compressed);
};

// 压缩CSS
const compressCSS = async (filePath) => {
  const css = await fs.readFile(filePath, 'utf8');
  const {
    styles
  } = new CleanCSS().minify(css);
  await fs.outputFile(filePath.replace('src', 'dist'), styles);
};

// 压缩JS
const compressJS = async (filePath) => {
  const code = await fs.readFile(filePath, 'utf8');
  const result = await minify(code, {
    compress: {
      drop_console: true
    }
  });
  await fs.outputFile(filePath.replace('src', 'dist'), result.code);
};

// 遍历文件并执行压缩
const processFiles = async (dir) => {
  const files = await fs.readdir(dir, {
    withFileTypes: true
  });
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    const name = file.name;
    if (file.isFile()) {
      switch (path.extname(name)) {
        case ".html":
          await compressHTML(filePath);
          break;
        case ".css":
          await compressCSS(filePath);
          break
        case ".js":
          await compressJS(filePath);
          break;
        default:
          await fs_.cp(filePath, filePath.replace('src', 'dist'), {
            force: true,
            recursive: true
          })
      }
    } else {
      await processFiles(filePath);
    }
  }
};
async function main() {
  try {
    await fs_.rm(path.join(__dirname, "./../dist"))
  } catch {}
  await processFiles(path.join(__dirname, "./../src"))
  console.log("压缩完成")
}
main()
console.log("开始压缩")