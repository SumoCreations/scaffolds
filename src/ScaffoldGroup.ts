import Scaffold from "simple-scaffold";
import path from "path";
import { ScaffoldGroupCmdConfig } from "./types";

export async function ScaffoldGroup({
  name,
  ...options
}: ScaffoldGroupCmdConfig) {
  console.log(`Scaffolding group ${name}`);
  let scaffolds: Promise<void>[] = [];

  let output = name.split("/");
  console.log("Output:", output.join("/"));
  const componentName = output.pop();

  if (!componentName) {
    throw new Error("No component name provided");
  }

  const template = String(options.template).toLowerCase();

  console.log("Template:", template);
  console.log("Output:", output.join("/"));

  scaffolds.push(
    Scaffold({
      ...options,
      name: componentName,
      templates: [path.join(__dirname, "scaffolds", template, "*")],
      output: path.join(__dirname, ...output),
      createSubFolder: false,
    })
  );

  return Promise.all(scaffolds);
}
