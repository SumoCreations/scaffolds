#!/usr/bin/env node
import massarg from 'massarg'
import chalk from 'chalk'
import { LogLevel } from 'simple-scaffold'
import { ScaffoldGroupCmdConfig } from './types'
import { ScaffoldGroup } from './ScaffoldGroup'

export function parseCliArgs(args = process.argv.slice(2)) {
  return massarg<ScaffoldGroupCmdConfig & { help: boolean; extras: string[] }>()
    .main(ScaffoldGroup)
    .option({
      name: 'name',
      aliases: ['n'],
      description:
        'Name to be passed to the generated files. {{name}} and {{Name}} inside contents and file names will be replaced accordingly.',
      isDefault: true,
      required: true
    })
    .option({
      name: 'template',
      aliases: ['t'],
      array: true,
      description:
        'Acceptable options are: component, form, or any of the subfolders of src/scaffolds.',
      required: true
    })
    .option({
      name: 'overwrite',
      aliases: ['w'],
      boolean: true,
      defaultValue: false,
      description:
        'Enable to override output files, even if they already exist.'
    })
    .option({
      name: 'data',
      aliases: ['d'],
      description:
        'Add custom data to the templates. By default, only your app name is included.',
      parse: (v) => JSON.parse(v)
    })
    .option({
      name: 'props',
      aliases: ['p'],
      description:
        "Add custom props for your component or params for an API call. This should just be a string in the form of name:type separated by spaces for example: 'name:string disabled?:boolean'.",
      parse: (p) => p.split(' ')
    })
    .option({
      name: 'fields',
      aliases: ['f'],
      description:
        "Add custom props for your component or params for an API call. This should just be a string in the form of name:type separated by spaces for example: 'name:string email:string password:password date:date acceptedTerms?:boolean'.",
      parse: (p) => p.split(' ')
    })
    .option({
      name: 'returnProps',
      aliases: ['rp'],
      description:
        "Add custom return value props. This should just be a string in the form of name:type separated by spaces for example: 'name:string disabled?:boolean'.",
      parse: (p) => p.split(' ')
    })
    .option({
      name: 'method',
      aliases: ['m'],
      description: 'Indicate an HTTP method for your API call.'
    })
    .option({
      name: 'path',
      aliases: ['pa'],
      description: 'Indicate a path for your API call.'
    })
    .option({
      name: 'create-sub-folder',
      aliases: ['s'],
      boolean: true,
      defaultValue: false,
      description: 'Create subfolder with the input name'
    })
    .option({
      name: 'sub-folder-name-helper',
      aliases: ['sh'],
      description:
        'Default helper to apply to subfolder name when using `--create-sub-folder true`.'
    })
    .option({
      name: 'quiet',
      aliases: ['q'],
      boolean: true,
      defaultValue: false,
      description: 'Suppress output logs (Same as --verbose 0)'
    })
    .option({
      name: 'verbose',
      aliases: ['v'],
      defaultValue: LogLevel.Info,
      description: `Determine amount of logs to display. The values are: ${chalk.bold`0 (none) | 1 (debug) | 2 (info) | 3 (warn) | 4 (error)`}. The provided level will display messages of the same level or higher.`,
      parse: Number
    })
    .option({
      name: 'dry-run',
      aliases: ['dr'],
      boolean: true,
      defaultValue: false,
      description:
        "Don't emit files. This is good for testing your scaffolds and making sure they " +
        "don't fail, without having to write actual file contents or create directories."
    })
    .help({
      binName: 'scaffold',
      useGlobalColumns: true,
      usageExample: '[options]',
      header: 'Create structured files based on templates.',
      footer: [
        `Copyright © Sumo Creations 2022`,
        `NPM: ${chalk.underline`https://npmjs.com/package/@sumo/scaffolds`}`,
        `GitHub: ${chalk.underline`https://github.com/sumo-creations/scaffolds`}`
      ].join('\n')
    })
    .parse(args)
}

parseCliArgs()
