import React from 'react'
import clsx from 'clsx'

const BAR_GROUP_STYLE = `flex flex-row my-0`

export interface BarGroupProps {
  className?: string
}

export const BarGroup: React.FC<BarGroupProps> = ({ className, children }) => (
  <div className={clsx(BAR_GROUP_STYLE, className)}>{children}</div>
)
