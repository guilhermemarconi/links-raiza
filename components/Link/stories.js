import Link from '.';

export default {
  component: Link,
  title: 'Link',
  argTypes: {
    title: { control: 'text' },
    url: { control: 'text' },
    thumbnail: { control: 'object' },
    colorText: { control: 'color' },
    colorBackground: { control: 'color' },
  },
};

const Template = (args) => <Link {...args} />;

export const Default = Template.bind({});

Default.args = {
  title: 'Canal Telegram - Materiais de apoio e troca sincera',
  url: 'https://t.me/raizasouto',
  colorText: '#ffffff',
  colorBackground: '#222222',
};

export const WithThumbnail = Template.bind({});

WithThumbnail.args = {
  title: 'Canal Telegram - Materiais de apoio e troca sincera',
  url: 'https://t.me/raizasouto',
  thumbnail: {
    dimensions: { width: 800, height: 500 },
    alt: null,
    copyright: null,
    url: 'https://picsum.photos/800/500',
  },
  colorText: '#ffffff',
  colorBackground: '#222222',
};
