import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useDefaultValueListener,
  FormProps,
  ErrorMap,
} from "@sumocreations/forms";
import { camelCase } from "lodash";

// Assumes we have some existing UI implementation for forms in our library. Replace as needed.
import { TextField, Fields, ErrorList } from '../Fields'
import { Button } from '../Navigation'
import { AbsoluteOverlay } from '../Indicators'

export type {{Name}}Values = {
  {{values}}
};

const schema = yup.object({
  {{validations}}
});

export interface {{Name}}Props extends FormProps<{{Name}}Values> {
  loading?: boolean
  {{props}} }

export const {{Name}}: React.FC<{{Name}}Props> = ({
  onSubmit: externalSubmitHandler,
  loading,
  defaultValues,
  submitTitle{{deconstructedProps}}
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    setError,
    reset,
  } = useForm<{{Name}}Values>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useDefaultValueListener<{{Name}}Values>(defaultValues, reset);

  const handleFormSubmit = handleSubmit(async (data) => {
    const { errors = {} } = (await externalSubmitHandler(data)) ?? {};
    const keys = Object.keys(errors);
    if (keys.length) {
      keys.map((key) =>
        setError(camelCase(key) as keyof {{Name}}Values, {
          message: errors[key],
        })
      );
    }
  });

  return (
    <form onSubmit={handleFormSubmit} className="relative">
      <Fields register={register} errors={formErrors} grow className="pb-2">
        {{fields}}
        <ErrorList errors={formErrors as ErrorMap} />
        <Button type="submit" className="mt-2 w-full">
          {submitTitle ?? "Submit Form"}
        </Button>
      </Fields>
      {loading ? <AbsoluteOverlay /> : null}
    </form>
  );
};

{{Name}}.displayName = '{{moduleName}}.{{Name}}'