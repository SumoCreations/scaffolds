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

  scaffolds.push(
    Scaffold({
      ...options,
      name: componentName,
      templates: [path.join(__dirname, "../scaffolds", template, "*")],
      output: path.join(process.cwd(), ...output),
      createSubFolder: false,
    })
  );

  return Promise.all(scaffolds);
}
