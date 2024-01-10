import Button from "./../app/_components/Button";

export default { title: "Button", component: Button };

const Template = (args: any) => <Button {...args} />;

export const White = Template.bind({});

White.args = {
  alt: true,
  children: "Click",
};
