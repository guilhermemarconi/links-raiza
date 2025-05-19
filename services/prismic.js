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
  const link = await getDataByType(client, 'link');
  const profile = await getDataByType(client, 'profile');
  return { link, profile };
};
