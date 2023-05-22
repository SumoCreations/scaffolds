// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What do you want to name this component?'
  },
  {
    type: 'input',
    name: 'moduleName',
    message: 'What is the category of this component in the storybook?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'What is the description of this component?',
    multiline: true
  },
  {
    type: 'input',
    name: 'props',
    message: 'What props should we add to this component?',
    hint: 'name:string steps:number required?:boolean results?:string[]'
  }
]
