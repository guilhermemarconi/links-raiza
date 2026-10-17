export const getDataByType = async (client, type) => {
  try {
    const data = await client.getAllByType(type);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAllData = async (client) => {
  const [link, profile, products, social_links] = await Promise.all([
    getDataByType(client, 'link'),
    getDataByType(client, 'profile'),
    getDataByType(client, 'products'),
    getDataByType(client, 'social_links'),
  ]);
  return { link, profile, products, social_links };
};
