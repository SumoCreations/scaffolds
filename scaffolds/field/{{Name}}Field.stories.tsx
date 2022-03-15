import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'
import { {{Name}}Field, {{Name}}FieldProps } from './{{Name}}Field'
import { faFileInvoice } from '@fortawesome/pro-regular-svg-icons/faFileInvoice'

export default {
  title: 'Form/{{Name}}Field',
  component: {{Name}}Field,
} as Meta

const Template: Story<{{Name}}FieldProps> = (args) => (
  <div className="bg-contentAreaBackgroundAlt p-4 flex">
    <{{Name}}Field {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Enter a brief description about your event...',
}

export const Error = Template.bind({})
Error.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Enter a brief description about your event...',
  icon: faFileInvoice,
  errorMessage: 'cannot be blank',
}

export const WithErrors = Template.bind({})
WithErrors.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Enter a brief description about your event...',
  icon: faFileInvoice,
  errors: {
    description: { name: 'description', message: 'cannot be blank' },
  },
}

export const WithInapplicableErrors = Template.bind({})
WithInapplicableErrors.args = {
  name: 'description',
  label: 'Description',
  placeholder: 'Enter a brief description about your event...',
  icon: faFileInvoice,
  errors: { firstName: { name: 'firstName', message: 'cannot be blank' } },
}
