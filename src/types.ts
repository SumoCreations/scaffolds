import { LogLevel } from "simple-scaffold";

export interface ScaffoldGroupCmdConfig {
  name: string;
  template: string;
  output: string;
  createSubFolder: boolean;
  data?: Record<string, string>;
  overwrite: boolean;
  quiet: boolean;
  verbose: LogLevel;
  dryRun: boolean;
  props?: string[];
  returnProps?: string[];
  path?: string;
  method?: string;
}
