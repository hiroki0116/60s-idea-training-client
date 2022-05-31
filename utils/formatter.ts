export const capitalizeWords = (arr: string[]) => {
    return arr.map((element: string) => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    });
  }