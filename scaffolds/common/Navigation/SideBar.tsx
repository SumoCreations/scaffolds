import React, { FC } from 'react'
import clsx from 'clsx'

export type SideBarMode = 'expanded' | 'hidden' | 'compact'
export type SideBarAppearance = 'default' | 'navigator'
export type SideBarAlignment = 'left' | 'right'

export interface SideBarProps {
  /**
   * Indicates the alignment or placement of the sidebar border.
   */
  appearance?: SideBarAppearance
  /**
   * Indicates the alignment or placement of the sidebar border.
   */
  alignment?: SideBarAlignment
  /**
   * Determines the width / appearance of the sidebar.
   */
  mode?: SideBarMode
  /**
   * An optional heading to inject above the sidebar content.
   */
  renderHeading?: () => JSX.Element
  /**
   * Inject any style overrides.
   */
  style?: React.CSSProperties
  /**
   * Inject any additional tailwind classes.
   */
  className?: string
}

const BASE_BAR = 'flex flex-col relative'
const EXPANDED_BAR = `${BASE_BAR} overflow-visible w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5`
const COMPACT_BAR = `${BASE_BAR} overflow-visible w-auto`
const HIDDEN_BAR = `${BASE_BAR} w-0 overflow-hidden`

const classForMode = (mode?: SideBarMode) => {
  switch (mode) {
    case 'compact':
      return COMPACT_BAR
    case 'expanded':
      return EXPANDED_BAR
    default:
      return HIDDEN_BAR
  }
}

const borderForAlignment = (alignment: SideBarAlignment) =>
  alignment === 'left' ? 'border-r' : 'border-l'

const colorsForAppearance = (appearance: SideBarAppearance) =>
  appearance === 'navigator'
    ? 'border-gray-300 bg-primary-default'
    : 'border-gray-300 bg-gray-100'

export const SideBar: FC<SideBarProps> = ({
  mode = 'compact',
  appearance = 'default',
  alignment = 'right',
  children,
  renderHeading,
  className,
  style,
}) => {
  return (
    <div
      className={clsx([
        classForMode(mode),
        borderForAlignment(alignment),
        colorsForAppearance(appearance),
        className,
      ])}
      style={style}
    >
      {renderHeading ? (
        <div className="flex w-full mb-1">{renderHeading()}</div>
      ) : null}
      <nav className={`${BASE_BAR} p-1 h-full`}>{children}</nav>
    </div>
  )
}
