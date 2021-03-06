import React from 'react'
import { Field, FieldProps, getErrorMessage } from './Field'
import { {{Name}} } from './{{Name}}'

export interface {{Name}}FieldInputProps {
  placeholder?: string
  disabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
}

export type {{Name}}FieldProps = {{Name}}FieldInputProps & FieldProps

const hasError = (error?: string) => (error ?? '').length > 0

const getPaddingForField = (hasIcon?: boolean, searchField?: boolean) =>
  hasIcon ? (searchField ? 'pl-8' : 'pr-8') : ''

export const {{Name}}Field = React.forwardRef<
  HTMLInputElement,
  {{Name}}FieldProps
>(
  (
    {
      name,
      placeholder,
      className,
      style,
      disabled,
      errorMessage,
      errors,
      onChange,
      onBlur,
      onFocus,
      ...fieldProps
    },
    forwardedRef
  ) => {
    const determinedErrorMessage = getErrorMessage({
      name,
      errorMessage,
      errors,
    })
    const hasIcon = typeof fieldProps.icon !== 'undefined'
    return (
      <Field
        name={name}
        className={className}
        style={style}
        errorMessage={determinedErrorMessage}
        {...fieldProps}
      >
        <{{Name}}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          error={hasError(determinedErrorMessage)}
          ref={forwardedRef}
          className={getPaddingForField(hasIcon)}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </Field>
    )
  }
)

{{Name}}Field.displayName = 'Fields.{{Name}}Field'
