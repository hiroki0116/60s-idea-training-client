export const getRandomArbitrary = (min, max) =>
  Math.random() * (max - min) + min;

export const inIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};
