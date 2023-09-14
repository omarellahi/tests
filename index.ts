const fs = require('fs');
// import fs from 'fs';


const inputFiles = () => {
  let files = fs.readdirSync('./src');
  for (const file of files) {
    compress(file);
  }
}

const compress = (fileName:string) => {
  const buffer = fs.readFileSync(`./src/${fileName}`, 'utf-8');
  const newBuffer = buffer.replace(/ /g, '');
  const binaryArray = newBuffer.match(/(.)\1*/g);

  let result = '';

  for (const i in binaryArray) {
    const value = binaryArray[i].split('');
    if (value[0] === '1') {
      result += value.length + ' ' + value[0];
    } else if (value[0] === '0') {
      result += value.length + ' ' + value[0]
    }
    result += '\n';
  }
  fs.writeFileSync(`./build/${fileName}-output`, result);
}

inputFiles();



const outputFiles = () => {
  let files = fs.readdirSync('./build');
  for (const file of files) {
    decompress(file);
  }
}

const decompress = (fileName: string) => {
  const buffer = fs.readFileSync(`./build/${fileName}`, 'utf-8');
  const array = buffer.split('\n');

  let result = '';

  for (const i in array) {
    const values = array[i].split(' ');
    for (let i = 0; i < parseInt(values[0]); i++) {
      result += values[1];
    }
  }
  console.log(result);
}

outputFiles();


