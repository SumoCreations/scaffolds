import React, { useState } from 'react'

import { Button } from '../Form'
import { Overlay, OverlayProps } from './Overlay'
import { Story, Meta } from '@storybook/react/types-6-0'

export default {
  title: 'Overlay/Overlay',
  component: Overlay,
} as Meta

const ExampleContent: React.FC = () => (
  <div className="fixed left-1/2 bg-green-600 bg-opacity-75 rounded w-64 h-64 overflow-hidden flex items-center align-middle">
    <p className="text-center font-bold m-auto text-white">Overlay Content</p>
  </div>
)

const Template: Story<OverlayProps> = (args) => {
  const [enabled, setEnabled] = useState(false)
  const toggleEnabled = () => setEnabled(!enabled)
  return (
    <div className="relative h-40">
      <div
        className="absolute top-0 left-1/2 bg-red-800 rounded w-32 h-40 overflow-hidden flex items-center align-middle text-white font-bold text-center p-4"
        style={{ transform: 'translate(100px, 200px)' }}
      >
        <p>Absolute Content</p>
        {!enabled ? <ExampleContent /> : null}
        <Overlay>{enabled ? <ExampleContent /> : null}</Overlay>
      </div>
      <Button onClick={toggleEnabled}>
        {enabled ? 'Disable Overlay' : 'Enable Overlay'}
      </Button>
    </div>
  )
}

export const Primary = Template.bind({})
Primary.args = {}
