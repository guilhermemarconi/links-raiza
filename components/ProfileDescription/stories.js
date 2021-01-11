import ProfileDescription from '.';

export default {
  component: ProfileDescription,
  title: 'Profile/Description',
};

const Template = (args) => <ProfileDescription {...args} />;

export const Default = Template.bind({});

Default.args = {
  content: [
    {
      type: 'paragraph',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi ipsum eros, congue et mollis a, elementum ac nisl. Ut vehicula vestibulum dolor, quis pellentesque metus. Suspendisse posuere turpis eget sem tincidunt, vitae rhoncus ante cursus. Aenean convallis eros nulla, nec venenatis leo mollis ut. Nam sodales felis quis massa rutrum mattis. Mauris tempor imperdiet risus vitae mattis. Curabitur semper iaculis neque, a fermentum magna convallis vitae. Vivamus erat velit, semper a nunc at, porttitor suscipit risus.',
      spans: [],
    },
  ],
};
