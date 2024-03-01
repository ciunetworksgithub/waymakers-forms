export const isDev = process.env.NODE_ENV === 'development';

export const readFiles = fileList => {
  const files = [];
  for (const file of fileList) {
    files.push(file);
  }
  return Promise.all(files.map(readFile));
};

export const readFile = file =>
  new Promise((resolve, reject) => {
    const { name, size, type } = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const data = reader.result.split(',')[1];
      resolve({ data, name, size, type });
    };
    reader.onerror = function (error) {
      reject(`Error reading a file: ${error}`);
      console.error('Error reading the file:', error);
    };
  });
