const fs = require('fs');
const path = require('path');
const {
  readdir,
  copyFile,
  readFile,
  writeFile,
  rm,
  mkdir,
} = require('fs/promises');

(async () => {
  const distFolder = path.join(__dirname, 'project-dist');
  await rm(distFolder, { recursive: true, force: true });
  await mkdir(path.join(distFolder, 'assets'), { recursive: true });
  let list = await readdir(path.join(__dirname, 'components'), {
    withFileTypes: true,
  });

  let base = await readFile(path.join(__dirname, 'template.html'), 'utf-8');
  for (let item of list) {
    let component = await readFile(
      path.join(__dirname, 'components', item.name),
    );
    base = base.replace(`{{${item.name.slice(0, -5)}}}`, component);
  }
  await writeFile(path.join(distFolder, 'index.html'), base);

  let bundle = fs.createWriteStream(
    path.join(distFolder, 'style.css'),
    'utf-8',
  );
  const styleList = await readdir(path.join(__dirname, 'styles'), {
    withFileTypes: true,
  });
  styleList.forEach((item) => {
    const filePath = path.join(__dirname, 'styles', item.name);
    if (item.isFile() && path.extname(filePath) === '.css') {
      const input = fs.createReadStream(filePath, 'utf8');
      input.on('data', (chunk) => bundle.write(`${chunk}\n`));
    }
  });

  async function copyFolder(input, output) {
    let list = await readdir(input, { withFileTypes: true });
    for (let item of list) {
      if (item.isFile()) {
        await copyFile(
          path.join(input, item.name),
          path.join(output, item.name),
        );
      } else {
        await mkdir(path.join(output, item.name), { recursive: true });
        await copyFolder(
          path.join(input, item.name),
          path.join(output, item.name),
        );
      }
    }
  }

  copyFolder(path.join(__dirname, 'assets'), path.join(distFolder, 'assets'));
  console.log('Final build has been created!');
})();
