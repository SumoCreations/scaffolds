import React from 'react'
import clsx from "clsx";

export interface {{Name}}Props {
  className?: string
  style?: React.CSSProperties
}

export const {{Name}}: React.FC<{{Name}}Props> = ({className, ...props}) => {
  return (
    <div className={clsx("{{className}}", className)}>
      {{Name}} Component
    </div>
  )
}

{{Name}}.displayName = "Components.{{Name}}";