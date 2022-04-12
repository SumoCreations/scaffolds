import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { {{Name}}, {{Name}}Props } from "./{{Name}}";

export default {
  title: "{{moduleName}}/{{Name}}",
  component: {{Name}},
} as Meta;

const Template: Story<{{Name}}Props> = (args) => <{{Name}} {...args} />;

const args: {{Name}}Props = {
  className: ""
};

export const Standard = Template.bind({});
Standard.args = args;
