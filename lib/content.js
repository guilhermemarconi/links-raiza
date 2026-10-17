// A Product or Social link without a destination is registered but never shown.
export const hasUrl = (item) => Boolean(item?.url);

export const withUrl = (items) => (items ?? []).filter(hasUrl);

// An Extra link with neither title nor URL is registered but never shown.
export const isExtraRenderable = ({ title, url } = {}) => Boolean(title || url);

// Prismic returns one document per singleton type, wrapped in an array.
export const firstData = (docs) => docs?.[0]?.data;
