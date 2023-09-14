import fs from 'fs';

const generateTestFile = () => {
  const buffer = Buffer.allocUnsafe(1024);

  for (let i = 0; i < 1024; i++) {
    buffer[i] = 1;
  }

  fs.writeFileSync('test.bin', buffer);
}

const compress = () => {
  return new Promise((resolve) => {

    fs.readFile('test.bin', (err, data) => {
      for (let i = 0; i < data.length; i++) {

      }
    });
  });
}

generateTestFile();