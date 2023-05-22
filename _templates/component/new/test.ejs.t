---
to: <%= `${process.env.STORYBOOK_PATH}/${h.inflection.camelize(moduleName)}/${name}.test.tsx` %>
sh: yarn component <%= `${process.env.STORYBOOK_PATH}/${h.inflection.camelize(moduleName)}/${name}.tsx` %>
---

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { <%= h.inflection.camelize(name) %>, <%= h.inflection.camelize(name) %>Props } from './<%= h.inflection.camelize(name) %>'

const props: <%= h.inflection.camelize(name) %>Props = {
  <%- h.buildArgs(props) %>
};
