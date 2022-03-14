import React from 'react'
import { Spinner } from './Spinner'

const FULL_SCREEN_CLASS = 'h-screen w-screen flex'
export const FullScreen: React.FC = () => (
  <div className={FULL_SCREEN_CLASS}>
    <Spinner size="4x" className="m-auto" />
  </div>
)
