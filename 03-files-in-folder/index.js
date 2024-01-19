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
          console.log(
            `${item.name.split('.')[0]} - ${path
              .extname(filePath)
              .slice(1)} - ${(stats.size / 1024).toFixed(3)}kb`,
          );
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
})();
