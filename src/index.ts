import fs from 'fs';


const compress = (fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      }

      const result = [];
      let value: any;
      let count = 0;
      let checkData = data[0];
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
      resolve(result);      
    });
  }).then((value: any) => {
    const resultBuffer = Buffer.from(value);
    fs.writeFileSync(`${fileName}.oz`, resultBuffer);
  });
}

compress('');


const decompress = (fileName: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      const values = [];
      for (let i = 0;  i < data.length / 2; i++) {
        values.push(data.slice(i * 2, (i + 1) * 2));
      }
      
      const result = [];
      for (const i of values) {
        for (let j = 0; j < i[1]; j++) {
          result.push(i[0]);
        }
      }
      resolve(result);
    });
  }).then((value: any) => {
    const resultBuffer = Buffer.from(value);
    const outputFileName = fileName.split('.');
    fs.writeFileSync(`${outputFileName[0]}.${outputFileName[1]}`, resultBuffer);
  });
}

decompress('');

