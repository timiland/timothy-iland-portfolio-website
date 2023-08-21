import parseUrl from './parseUrl';

const addCorsPrefix = (url: string) => {
  const parsedUrl = parseUrl(url) as URL;

  const { hostname, href } = parsedUrl;

  const position = href.indexOf(hostname);

  return `${href.slice(0, position)}s3.amazonaws.com/${href.slice(position)}`;
};

export default addCorsPrefix;

// https://dmitripavlutin.com/parse-url-javascript/
