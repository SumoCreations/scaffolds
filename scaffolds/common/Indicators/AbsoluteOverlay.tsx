import React from 'react'
import { Spinner } from './Spinner'
import { concatStyles } from 'utils'
const ABSOLUTE_OVERLAY_STYLES =
  'flex h-full w-full absolute top-0 left-0 bg-opacity-75 z-30'

export interface AbsoluteOverlayProps {
  bgClassName?: string
}

export const AbsoluteOverlay: React.FC<AbsoluteOverlayProps> = ({
  bgClassName,
}) => (
  <div
    className={concatStyles(ABSOLUTE_OVERLAY_STYLES, bgClassName ?? 'bg-white')}
  >
    <Spinner size="4x" className="m-auto" />
  </div>
)
