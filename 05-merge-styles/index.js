const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const result = fs.createWriteStream(
      path.join(__dirname, 'project-dist', 'bundle.css'),
      'utf-8',
    );
    const list = await readdir(path.join(__dirname, 'styles'), {
      withFileTypes: true,
    });
    list.forEach((item) => {
      const filePath = path.join(__dirname, 'styles', item.name);
      if (item.isFile() && path.extname(filePath) === '.css') {
        const input = fs.createReadStream(path.join(filePath), 'utf8');
        input.on('data', (data) => result.write(`${data}\n`));
      }
    });
    console.log('CSS file has been created');
  } catch (err) {
    console.log(err.message);
  }
})();
