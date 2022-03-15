import React, { FC, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

export type ToolTipDirection = 'above' | 'below' | 'left' | 'right'
export type ToolTipAlignment = 'left' | 'right' | 'center'

export interface ToolTipProps {
  /**
   * The label for the tool tip.
   */
  label: string
  /**
   * Controls where the tooltip appears relative to the parent.
   */
  direction?: ToolTipDirection
  /**
   * An optional keyboard shortcut to highlight.
   */
  shortCut?: string
  /**
   * If true the tooltip will appear, else hidden.
   */
  active?: boolean
  /**
   * If set the tooltip will be explicitly align to the left or right edge of the parent.
   */
  align?: ToolTipAlignment
}

const CONTAINER =
  'absolute flex m-0 p-0 transition duration-700 ease-in-out transform pointer-events-none z-20'
const BELOW = `${CONTAINER} inset-x-0 mt-2 top-[100%] left-0`
const ABOVE = `${CONTAINER} inset-x-0 mb-2 bottom-[100%] left-0`
const RIGHT = `${CONTAINER} inset-y-0 left-[100%] ml-2`
const LEFT = `${CONTAINER} inset-y-0 right-[100%] mr-2`
const HIDDEN_ABOVE = `${ABOVE} opacity-0 -translate-y-1`
const HIDDEN_BELOW = `${BELOW} opacity-0 translate-y-1`
const HIDDEN_LEFT = `${LEFT} opacity-0 -translate-x-1`
const HIDDEN_RIGHT = `${RIGHT} opacity-0 translate-x-1`

const BASE_TOOLTIP =
  'bg-accent-default px-2 text-xs text-white rounded-full whitespace-nowrap not-italic shadow-md'
const SHORTCUT = 'font-semibold opacity-75'

const containerClass = ({
  active,
  direction,
}: {
  active?: boolean
  direction?: ToolTipDirection
}) => {
  switch (direction) {
    case 'above':
      return active ? ABOVE : HIDDEN_ABOVE
    case 'left':
      return active ? LEFT : HIDDEN_LEFT
    case 'right':
      return active ? RIGHT : HIDDEN_RIGHT
    default:
      return active ? BELOW : HIDDEN_BELOW
  }
}

const alignmentClass = ({ align }: { align?: ToolTipAlignment }) => {
  switch (align) {
    case 'left':
      return 'mr-auto'
    case 'right':
      return 'ml-auto'
    default:
      return 'my-auto mx-auto'
  }
}

export const ToolTip: FC<ToolTipProps> = ({
  label,
  direction = 'below',
  shortCut,
  active,
  align = 'center',
}) => {
  const containerEl = useRef<HTMLElement>(null)
  const tooltipEl = useRef<HTMLParagraphElement>(null)
  const [style, setStyle] = useState<React.CSSProperties | undefined>()

  useEffect(() => {
    if (['above', 'below'].includes(direction)) {
      const diff =
        (containerEl.current?.offsetWidth ?? 0) -
        (tooltipEl.current?.offsetWidth ?? 0)
      if (diff < 0) {
        switch (align) {
          case 'left':
            setStyle({ right: `${diff}px` })
            break
          case 'right':
            setStyle({ left: `${diff}px` })
            break
          default:
            setStyle({
              left: `${diff / 2}px`,
              right: `${diff / 2}px`,
            })
        }
      } else {
        setStyle(undefined)
      }
    }
  }, [containerEl, tooltipEl, align, direction])
  return (
    <cite
      className={containerClass({ active, direction })}
      style={style}
      ref={containerEl}
    >
      <p
        className={clsx([BASE_TOOLTIP, alignmentClass({ align })])}
        ref={tooltipEl}
      >
        <span>{label}</span>
        {shortCut ? <span className={SHORTCUT}>&nbsp;({shortCut})</span> : null}
      </p>
    </cite>
  )
}
