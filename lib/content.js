// A Product or Social link without a destination is registered but never shown.
export const hasUrl = (item) => Boolean(item?.url);

export const withUrl = (items) => (items ?? []).filter(hasUrl);

// Prismic returns one document per singleton type, wrapped in an array.
export const firstData = (docs) => docs?.[0]?.data;
