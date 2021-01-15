import Link from '.';

export default {
  component: Link,
  title: 'Link',
  argTypes: {
    title: {
      control: 'text',
      name: 'Título do link',
    },
    url: {
      control: 'text',
      name: 'URL do link',
    },
    thumbnailUrl: {
      control: 'text',
      name: 'URL da imagem do link',
    },
    thumbnailAlt: {
      control: 'text',
      name: 'Texto descritivo da imagem',
    },
    thumbnailWidth: {
      control: 'number',
      name: 'Largura da imagem',
    },
    thumbnailHeight: {
      control: 'number',
      name: 'Altura da imagem',
    },
    colorText: {
      control: 'color',
      name: 'Cor do texto',
    },
    colorBackground: {
      control: 'color',
      name: 'Cor de fundo',
    },
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

export const WithColors = Template.bind({});

WithColors.args = {
  title: 'Canal Telegram - Materiais de apoio e troca sincera',
  url: 'https://t.me/raizasouto',
  colorText: '#d1b49d',
  colorBackground: '#417505',
};

export const WithThumbnail = Template.bind({});

WithThumbnail.args = {
  title: 'Canal Telegram - Materiais de apoio e troca sincera',
  url: 'https://t.me/raizasouto',
  thumbnailUrl: 'https://picsum.photos/800/500',
  thumbnailAlt:
    'Invisível para nós, mas é bom para SEO e, principalmente, para acessibilidade, pois assim pessoas que utilizam leitores de tela podem receber uma descrição do que tem nessa imagem. Com isso, pessoas cegas podem "ver" a imagem de acordo com o que estiver descrito referente a ela.',
  thumbnailWidth: 800,
  thumbnailHeight: 500,
};
