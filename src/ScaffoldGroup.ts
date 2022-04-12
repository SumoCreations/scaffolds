import Scaffold from "simple-scaffold";
import path from "path";
import { ScaffoldGroupCmdConfig } from "./types";

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

  let data = {
    ...(options.data ?? {}),
    props: (options.props ?? []).reduce((acc, prop) => {
      const [name, type] = prop.split(":");
      return `${acc}${name}: ${type}\n  `;
    }, ""),
    deconstructedProps: (options.props ?? []).reduce((acc, prop) => {
      const [name] = prop.split(":");
      return `${acc}, ${name.replace(/[^\w\s]/gi, "")}`;
    }, ""),
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
