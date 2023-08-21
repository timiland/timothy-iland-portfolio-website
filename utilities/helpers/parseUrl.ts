/* eslint-disable no-console */
const parseUrl = (urlString: string) => {
  try {
    const url = new URL(urlString);
    return url;
  } catch (error) {
    console.error('Invalid URL:', error);
    return urlString; // Return null as a fallback if the URL is invalid
  }
};

export default parseUrl;
