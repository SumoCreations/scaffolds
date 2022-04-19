import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { {{Name}}, {{Name}}Props, {{Name}}Values } from './{{Name}}'
import { wait } from 'utils'

export default {
  title: '{{moduleName}}/{{Name}}',
} as Meta

const Template: Story<{{Name}}Props> = (args) => {
  const [loading, setLoading] = useState(args.loading ?? false)

  const onSubmit: any = async (values: {{Name}}Values) => {
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

const args: {{Name}}Props = {
  onSubmit: async (values) => {
    await wait(1)
    console.log('Submitted', values)
    return undefined
  },
  defaultValues: { {{defaultValues}} },
}

export const Primary = Template.bind({})
Primary.args = args
