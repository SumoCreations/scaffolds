---
to: <%= `${process.env.STORYBOOK_PATH}/${h.inflection.camelize(moduleName)}/${name}.tsx` %>
---
import React from 'react'
import clsx from "clsx";

export interface <%= h.inflection.camelize(name) %>Props {
  className?: string
  style?: React.CSSProperties
  <%- h.buildProps(props) %>
}

const styles = {
  base: "flex"
}
/**
  * <%= description.split("\n").join("\n  * ") %>
  */
export const <%= h.inflection.camelize(name) %>: React.FC<<%= h.inflection.camelize(name) %>Props> = ({ className, style<%= h.deconstructProps(props) %> }) => {
  return (
    <div className={clsx(styles.base, className)} style={style}>
      {/* PLACEHOLDER */}
    </div>
  )
}

<%= h.inflection.camelize(name) %>.displayName = "<%= h.inflection.camelize(moduleName) %>.<%= h.inflection.camelize(name) %>";

