import React, { FC, useState } from 'react'
import { IconDefinition } from '@fortawesome/fontawesome-common-types'
import { Icon } from '../Form'
import { ToolTip } from './ToolTip'

export interface TabProps {
  /**
   * The FontAwesome icon definition to be utilized.
   */
  icon: IconDefinition
  /**
   * The determines if the tab is selected.
   */
  selected?: boolean
  /**
   * The determines if the tab should expand to fill the parent container (flexbox).
   */
  grow?: boolean
  /**
   * An optional tool tip for the item
   */
  toolTip?: string
  /**
   * A callback fired when the tab is clicked.
   */
  onClick: () => void
  /**
   * Indicates the tab should be compact in appearance.
   */
  compact?: boolean
}

interface TabStyleArgs {
  /**
   * Indicates the tab should be compact in appearance.
   */
  compact?: boolean
}

const BASE_TAB = (args: TabStyleArgs) =>
  `outline-none active:outline-none px-2 ${
    args.compact ? 'py-1' : 'py-4'
  } flex-shrink-0 relative`
const DEFAULT_TAB = (args: TabStyleArgs) =>
  `${BASE_TAB(args)} bg-gray-200 hover:bg-gray-300`
const SELECTED_TAB = (args: TabStyleArgs) =>
  `${BASE_TAB(args)} bg-primary-default hover:bg-primary-default`

export const Tab: FC<TabProps> = ({
  icon,
  selected,
  onClick,
  grow,
  toolTip,
  compact,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onClick()
  }
  const [hover, setHover] = useState(false)
  return (
    <button
      style={{ outlineColor: 'rgba(0,0,0,0)' }}
      className={`${
        selected ? SELECTED_TAB({ compact }) : DEFAULT_TAB({ compact })
      } ${grow ? 'flex flex-grow' : 'flex'}`}
      onClick={handleClick}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <Icon mode={selected ? 'negative' : 'default'} icon={icon} />
      {toolTip ? (
        <ToolTip label={toolTip} direction="below" active={hover} />
      ) : null}
    </button>
  )
}
