import fs from 'fs';


const compress = (fileName: string) => {
  return new Promise<void>((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      }

      const result: number[] = [];
      let value: number = 0;
      let count: number = 0;
      let checkData: number = data[0];
      for (const i of data) {
        if (checkData === i) {
          value = i;
          count += 1;
        } else {
          result.push(value, count);
          checkData = i;
          value = i;
          count = 1;
        }
      }
      result.push(value, count);
      fs.writeFile(`${fileName}.oz`, Buffer.from(result), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

compress('');


const decompress = (fileName: string) => {
  return new Promise<void>((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      }
      
      const result: number[] = [];

      for (let i = 0; i < data.length / 2; i++) {
        const value = data.subarray(i * 2, (i + 1) * 2);
        for (let j = 0; j < value[1]; j++) {
          result.push(value[0]);
        }
      }

      const outputFileName = fileName.split('.');
      fs.writeFile(`${outputFileName[0]}.${outputFileName[1]}`, Buffer.from(result), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

decompress('');

