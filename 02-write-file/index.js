const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');

const result = fs.createWriteStream(path.join(__dirname, 'text.txt'), {
  flags: 'a',
});
stdout.write(
  'Hello there! Enter your text. Also, you can type "exit" or press "ctrl+c" to stop this suffering\n',
);
stdin.on('data', (data) => {
  if (data.toString().trim() == 'exit') process.exit();
  result.write(data);
});

process.on('SIGINT', () => process.exit());
process.on('exit', () => console.log('May the force be with you!(exit)'));
