import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { {{Name}}Form, {{Name}}FormProps, {{Name}}FormValues } from './{{Name}}'
import { wait } from 'utils'

export default {
  title: '{{moduleName}}/{{Name}}Form',
} as Meta

const Template: Story<{{Name}}Props> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: {{Name}}FormValues) => {
    setLoading(true)
    await wait(1)
    setLoading(false)
    console.log('Submitted', values)
    return undefined
  }

  return (
    <div className="p-4 border rounded">
      <{{Name}} {...args} onSubmit={onSubmit} loading={loading} />
    </div>
  )
}

const args: {{Name}}FormProps = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { email: 'admin@example.com', password: '123456789' },
}

export const Primary = Template.bind({})
Primary.args = args
