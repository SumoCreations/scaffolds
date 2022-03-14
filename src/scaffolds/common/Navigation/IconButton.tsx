import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/pro-regular-svg-icons'
import { ToolTip, ToolTipAlignment, ToolTipDirection } from './ToolTip'
import clsx from 'clsx'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

export interface IconButtonProps {
  tooltip?: string
  tooltipAlignment?: ToolTipAlignment
  toolTipDirection?: ToolTipDirection
  icon: IconDefinition
  disabled?: boolean
  inactive?: boolean
  onClick?: (target: HTMLButtonElement) => void
  className?: string
  style?: React.CSSProperties
  noPadding?: boolean
}

const BUTTON_STYLES = 'rounded-full w-10 flex-shrink-0'
const HOVER_STYLES = 'hover:bg-gray-400 hover:bg-opacity-25'
const INACTIVE_STYLES = 'opacity-50'
const DISABLED_STYLES = 'opacity-25 pointer-events-none'

export const IconButton: React.FC<IconButtonProps> = ({
  disabled,
  icon,
  onClick: clickHandlerFromProps,
  className,
  style,
  tooltip,
  tooltipAlignment = 'center',
  toolTipDirection = 'below',
  inactive,
  noPadding,
}) => {
  const [hoverTimeout, setHoverTimeout] = useState<any>()
  const [hover, setHover] = useState(false)

  const handleMouseOver: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tooltip) {
      setHoverTimeout(setTimeout(() => setHover(true), 500))
    }
  }
  const handleMouseOut: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (tooltip) {
      clearTimeout(hoverTimeout)
      setHover(false)
    }
  }
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (clickHandlerFromProps) {
      clickHandlerFromProps(e.currentTarget)
    }
  }
  return (
    <button
      className={clsx([
        BUTTON_STYLES,
        (className ?? '').indexOf('absolute') < 0 && 'relative',
        (className ?? '').indexOf('hover:bg') < 0 && HOVER_STYLES,
        !noPadding && 'p-2',
        className,
        disabled ? DISABLED_STYLES : inactive ? INACTIVE_STYLES : null,
      ])}
      onClick={handleClick}
      style={style}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseOut}
    >
      <FontAwesomeIcon icon={icon as IconProp} />
      {tooltip ? (
        <ToolTip
          label={tooltip}
          active={hover}
          direction={toolTipDirection}
          align={tooltipAlignment}
        />
      ) : null}
    </button>
  )
}
