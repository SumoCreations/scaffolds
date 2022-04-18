import Scaffold from "simple-scaffold";
import path from "path";
import { ScaffoldGroupCmdConfig } from "./types";

const deconstruct = (props?: string[]) =>
  (props ?? []).reduce((acc, prop) => {
    const [name] = prop.split(":");
    return `${acc}, ${name.replace(/[^\w\s]/gi, "")}`;
  }, "");

const buildProps = (props?: string[]) =>
  (props ?? []).reduce((acc, prop, i) => {
    const [name, type] = prop.split(":");
    return `${acc}${name}: ${type}${
      i < (props?.length ?? 0) - 1 ? "\n  " : ""
    }`;
  }, "");

const argForType = (type: string) => {
  switch (type) {
    case "string":
      return '"example"';
    case "number":
      return "1";
    case "boolean":
      return "true";
    case "object":
      return "{}";
    case "array":
      return "[]";
    case "block":
      return "() => {}";
    default:
      return "{} as any";
  }
};

const buildArgs = (props?: string[]) =>
  (props ?? []).reduce((acc, prop, i) => {
    const [name, type] = prop.split(":");
    return `${acc}${name.replace(/[\W_]+/g, "")}: ${argForType(
      type.indexOf("[") > -1
        ? "array"
        : type.indexOf("=>") > -1
        ? "block"
        : type
    )}${i < (props?.length ?? 0) ? ",\n  " : ""}`;
  }, "");

export async function ScaffoldGroup({
  name,
  ...options
}: ScaffoldGroupCmdConfig) {
  let scaffolds: Promise<void>[] = [];

  let output = name.split("/");
  const componentName = output.pop();

  if (!componentName) {
    throw new Error("No component name provided");
  }

  const template = String(options.template).toLowerCase();
  const method = options.method ?? "post";

  let data = {
    ...(options.data ?? {}),
    props: buildProps(options.props),
    args: buildArgs(options.props),
    returnProps: buildProps(options.returnProps),
    deconstructedProps: deconstruct(options.props),
    path: options.path ?? "",
    method,
    requestParams: ["get", "delete"].includes(method)
      ? "`${url}?${new URLSearchParams({ ...params })}`"
      : "url, params",
  };

  scaffolds.push(
    Scaffold({
      ...options,
      name: componentName,
      templates: [
        path.join(__dirname, "../scaffolds", template, "*"),
        path.join(__dirname, "../scaffolds", template, "**/*"),
      ],
      data: {
        moduleName: output[output.length - 1],
        ...data,
      },
      output: path.join(process.cwd(), ...output),
      createSubFolder: false,
    })
  );

  return Promise.all(scaffolds);
}
