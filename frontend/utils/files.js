export function readFileAsBlob(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      resolve(new Blob([new Uint8Array(e.target.result)], {type: file.type }));
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
    
  });
}

export async function handleFile(file) {
  let blob;
  try {
    blob = await readFileAsBlob(file);
    console.log(blob);
    return blob;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}