---
to: <%= `${process.env.STORYBOOK_PATH}/${h.inflection.camelize(moduleName)}/${name}.stories.tsx` %>
---
import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { StoryFn, Meta } from '@storybook/react'
import { <%= h.inflection.camelize(name) %>, <%= h.inflection.camelize(name) %>Props } from "./<%= h.inflection.camelize(name) %>";

export default {
  title: "<%= h.inflection.camelize(moduleName) %>/<%= h.inflection.camelize(name) %>",
  component: <%= h.inflection.camelize(name) %>,
} as Meta;


const Template: StoryFn<<%= h.inflection.camelize(name) %>Props> = (args) => <<%= h.inflection.camelize(name) %> {...args} />;

const args: <%= h.inflection.camelize(name) %>Props = {
  <%- h.buildArgs(props) %>
};

export const Standard = Template.bind({});
Standard.args = args;
