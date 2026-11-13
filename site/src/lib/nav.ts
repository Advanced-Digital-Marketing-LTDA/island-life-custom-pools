// The pages link to #sections on the home page, so every other page needs a leading "/".
export const pathOf = (url: URL) => url.pathname.replace(/\/+$/, '') || '/';
export const homePrefix = (url: URL) => (pathOf(url) === '/' ? '' : '/');
