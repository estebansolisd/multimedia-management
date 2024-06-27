
export const isVideoUrlWithExtension = (url: string): boolean => {
  const videoExtensionsRegExp = /\.(mp4|webm|ogg|ogv|mov|qt|avi|wmv|flv|mkv|ts|3gp|3g2|m4v)$/i;
  const parsedUrl = new URL(url); // Sanitize and parse the URL

  // Check if protocol is supported (http or https)
  if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
    return false;
  }

  // Check if path extension matches video extensions
  return videoExtensionsRegExp.test(parsedUrl.pathname);
};