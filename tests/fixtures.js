export const image = (url, alt = '', width = 300, height = 300) => ({
  url,
  alt,
  dimensions: { width, height },
});

export const richText = (...paragraphs) =>
  paragraphs.map((text) => ({ type: 'paragraph', text, spans: [] }));

export const emptyImage = {};

export const profileDoc = (data = {}) => ({
  type: 'profile',
  data: {
    profile_image: image('https://img.test/raiza.jpg', 'Foto de Raíza'),
    name: 'Raíza Souto',
    description: richText('Mentora de comunicação.'),
    meta_title: null,
    meta_description: null,
    meta_image: emptyImage,
    ...data,
  },
});

export const productsDoc = (products = []) => ({ type: 'products', data: { products } });

export const socialDoc = (social_links = []) => ({ type: 'social_links', data: { social_links } });

export const linkDoc = (links = []) => ({ type: 'link', data: { links } });

export const product = (name, url, description = `Descrição ${name}`) => ({
  name,
  image: image(`https://img.test/${name}.jpg`, '', 676, 400),
  description,
  url,
});

export const fixtures = (overrides = {}) => ({
  profile: [profileDoc()],
  products: [productsDoc()],
  social_links: [socialDoc()],
  link: [linkDoc()],
  ...overrides,
});
