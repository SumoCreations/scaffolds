import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faAsterisk } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import clsx from "clsx";
import { Error } from "./Error";

import { ErrorMap } from "./FieldTypes";

export interface FieldProps {
  label?: string;
  name: string;
  required?: boolean;
  icon?: IconDefinition;
  className?: string;
  labelClassName?: string;
  style?: React.CSSProperties;
  errorMessage?: string;
  grow?: boolean;
  disabled?: boolean;
  errors?: ErrorMap;
  searchField?: boolean;
}

export const getErrorMessage = ({
  name,
  errorMessage,
  errors,
}: {
  name: string;
  errorMessage?: string;
  errors?: ErrorMap;
}) => errorMessage ?? (errors ?? {})[name]?.message;

const style = {
  container: "flex flex-col",
  iconWrap: "absolute inset-y-0 flex text-contentAreaBorder",
  icon: "m-auto text-gray-500",
  fieldWrap: "relative flex flex-grow flex-wrap",
  required: "text-accent-default text-xs mx-2 my-auto",
};

const getGrowStyle = (grow?: boolean) => (grow ? "flex-grow" : "");
const getDisabledStyle = (disabled?: boolean) => (disabled ? "opacity-75" : "");
const getIconPositionIf = (searchField?: boolean) =>
  searchField ? "left-0 ml-3" : "right-0 mr-3";

export const Field: React.FC<FieldProps> = ({
  label,
  name,
  className,
  labelClassName,
  required,
  icon,
  errorMessage,
  grow,
  children,
  disabled,
  searchField,
}) => (
  <div
    className={clsx([
      style.container,
      getGrowStyle(grow),
      getDisabledStyle(disabled),
      className,
    ])}
  >
    <label htmlFor={name} className={clsx("flex", labelClassName)}>
      {label}{" "}
      {required && (
        <FontAwesomeIcon
          icon={faAsterisk as IconProp}
          className={style.required}
        />
      )}
    </label>
    <div className={style.fieldWrap}>
      {children}
      {icon ? (
        <span
          className={clsx([style.iconWrap, getIconPositionIf(searchField)])}
        >
          <FontAwesomeIcon icon={icon as IconProp} className={icon} />
        </span>
      ) : (
        <span />
      )}
      {errorMessage ? <Error>{errorMessage}</Error> : null}
    </div>
  </div>
);

Field.displayName = "Form.Field";
