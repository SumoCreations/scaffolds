import React from 'react'
import clsx from 'clsx'

const BAR_HEADER_STYLE = `flex flex-col mx-1 my-auto`
const PRIMARY_HEADER_STYLE = 'font-bold text-primary-default text-sm'
const SECONDARY_HEADER_STYLE = 'font-body text-rose-darkest text-xs -mt-1'

export interface BarHeaderProps {
  primary: string
  secondary?: string
  className?: string
}

export const BarHeader: React.FC<BarHeaderProps> = ({
  primary,
  secondary,
  className,
}) => (
  <header className={clsx(BAR_HEADER_STYLE, className)}>
    <h1 className={PRIMARY_HEADER_STYLE}>{primary}</h1>
    <h2 className={SECONDARY_HEADER_STYLE}>{secondary}</h2>
  </header>
)
