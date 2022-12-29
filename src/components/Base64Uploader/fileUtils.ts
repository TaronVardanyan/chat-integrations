const MEGABYTES = 1000 * 1000;

export function getBase64(file: Blob | File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function bytesToMegabytes(size: number) {
  return Math.round(size / MEGABYTES);
}
