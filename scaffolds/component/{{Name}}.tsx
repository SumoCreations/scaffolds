import React from 'react'
import clsx from "clsx";

export interface {{Name}}Props {
  className?: string
  style?: React.CSSProperties
  {{props}}
}

export const {{Name}}: React.FC<{{Name}}Props> = ({ className, style{{deconstructedProps}} }) => {
  return (
    <div className={clsx("{{className}}", className)} style={style}>
      {{Name}} Component
    </div>
  )
}

{{Name}}.displayName = "{{moduleName}}.{{Name}}";