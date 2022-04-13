// Use scaffold axiosBase to generate the resources imported below.
import { getInstance } from "../getInstance";
import { RequestConfig } from "../types";

export interface {{Name}}Params {
  {{props}} 
}

export interface {{Name}}Response {
  {{returnProps}}
}

export const {{name}} = async (
  params: {{Name}}Params,
  { debug, instance = getInstance() }: RequestConfig = {}
) => {
  const url = "{{path}}";

  if (debug) {
    console.debug(`{{ upperCase method }} ${url}`);
  }

  const response = await instance.{{method}}(url, params);
  return response.data as {{Name}}Response;
};
