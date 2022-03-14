import clsx from 'clsx'
import React, { FC } from 'react'

const BAR_DIVIDER = `mx-3 my-2 w-px bg-gray-200`

export const BarDivider: FC<{ className?: string }> = ({ className }) => (
  <span className={clsx(BAR_DIVIDER, className)} />
)
