export const capitalizeWords = (arr: string[]) => {
  return arr.map((element: string) => {
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });
};

export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
