import React from 'react'
import clsx from 'clsx'

export interface {{Name}}Props {
  name: string
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  value?: string
  error?: boolean
  disabled?: boolean
  onBlur?: React.FocusEventHandler<HTML{{Name}}Element>
  onChange?: React.ChangeEventHandler<HTML{{Name}}Element>
  onFocus?: React.FocusEventHandler<HTML{{Name}}Element>
  onKeyUp?: React.KeyboardEventHandler<HTML{{Name}}Element>
  onKeyDown?: React.KeyboardEventHandler<HTML{{Name}}Element>
}

const style = {
  input: 'font-body border rounded p-2 flex flex-grow max-w-full focus:outline-none focus:border-green-300'
} 

export const {{Name}} = React.forwardRef<HTML{{Name}}Element, {{Name}}Props>(
  (
    {
      name,
      error,
      disabled,
      className,
      placeholder,
      value,
      style,
      onBlur,
      onChange,
      onFocus,
      onKeyUp,
      onKeyDown,
    },
    forwardedRef
  ) => {
    const controlledInputProps = value ? { value } : {}
    return (
      <input
        name={name}
        ref={forwardedRef}
        className={clsx([
          style.input,
          error ? 'border-error text-error' : '',
          disabled ? 'opacity-50 cursor-not-allowed' : '',
          className,
        ])}
        disabled={disabled}
        placeholder={placeholder}
        style={style}
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        {...controlledInputProps}
      />
    )
  }
)

{{Name}}.displayName = 'Field.{{Name}}'
