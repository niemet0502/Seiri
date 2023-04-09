export const textEllipsis = (str: string, length: number) => {
  if (str.length > length) {
    str = str.slice(0, length) + "...";
  }

  return str;
};
