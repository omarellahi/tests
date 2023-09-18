import fs from 'fs';


const compress = () => {
  const fileName = '';
  
  return new Promise((resolve, reject) => {
    const buffer = fs.readFileSync(fileName).toJSON();

    const result = [];
    let value: any;
    let count = 0;
    let checkData = buffer.data[0];
    for (const i of buffer.data) {
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
  }).then((value: any) => {
    const resultBuffer = Buffer.from(value);
    fs.writeFileSync(`${fileName}.oz`, resultBuffer);
  });
}

compress();


const decompress = () => {
  const fileName = '';

  return new Promise((resolve, reject) => {
    const buffer = fs.readFileSync(fileName).toJSON();

    const data = [];
    for (let i = 0, end = buffer.data.length / 2; i < end; ++i) {
      data.push(buffer.data.slice(i * 2, (i + 1) * 2));
    }
    
    const result = [];
    for (const i of data) {
      for (let j = 0; j < i[1]; j++) {
        result.push(i[0]);
      }
    }
    resolve(result);
  }).then((value: any) => {
    const resultBuffer = Buffer.from(value);
    const outputFileName = fileName.split('.');
    fs.writeFileSync(`${outputFileName[0]}.${outputFileName[1]}`, resultBuffer);
  });
}

decompress();

