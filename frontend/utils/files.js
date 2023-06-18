export function readFileAsBinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(event) {
      resolve(event.target.result);
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
}

export async function handleFile(file) {
  let binaryCode;
  try {
    binaryCode = await readFileAsBinary(file);
    return binaryCode;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}