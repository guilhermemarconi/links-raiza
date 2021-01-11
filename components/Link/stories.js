import Link from '.';

export default {
  component: Link,
  title: 'Link',
};

const Template = (args) => <Link {...args} />;

export const Default = Template.bind({});

Default.args = {};
