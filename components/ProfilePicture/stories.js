import ProfilePicture from '.';

export default {
  component: ProfilePicture,
  title: 'Profile/Picture',
  argTypes: {
    src: { control: 'text' },
  },
};

const Template = (args) => <ProfilePicture {...args} />;

export const Default = Template.bind({});

Default.args = {
  src:
    'https://images.prismic.io/linksraiza/e545e32d-afa0-4f16-8b00-22f68b0714e1_raiza.png?auto=compress,format&rect=0,0,300,300&w=300&h=300',
};
