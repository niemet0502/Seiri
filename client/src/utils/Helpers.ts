export const textEllipsis = (str: string, length: number) => {
  if (!str) return "";
  if (str.length > length) {
    str = str.slice(0, length) + "...";
  }

  return str;
};

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
