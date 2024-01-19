const path = require('path');
const { readdir, mkdir, rm, copyFile } = require('fs/promises');

(async () => {
  try {
    const src = path.join(__dirname, 'files');
    const dest = path.join(__dirname, 'files-copy');
    const list = await readdir(src);

    await rm(dest, { recursive: true, force: true });
    await mkdir(dest, { recursive: true });

    list.forEach((item) =>
      copyFile(path.join(src, item), path.join(dest, item)),
    );
    console.log('Files have been copied');
  } catch (err) {
    console.log(err.message);
  }
})();
