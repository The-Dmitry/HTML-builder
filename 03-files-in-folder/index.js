const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

(async () => {
  try {
    const list = await readdir(path.join(__dirname, 'secret-folder'), {
      withFileTypes: true,
    });
    list.forEach((item) => {
      if (item.isFile()) {
        let filePath = path.join(__dirname, 'secret-folder', item.name);
        fs.stat(filePath, (err, stats) => {
          if (err) throw err;
          const ext = path.extname(filePath);
          const name = item.name.replace(ext, '');
          console.log(
            `${name} - ${ext.replace('.', '')} - ${(stats.size / 1024).toFixed(
              3,
            )}kb`,
          );
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
})();
