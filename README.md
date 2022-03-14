# @sumocreations/scaffold

Our standard set of reusable templates based on the lovely [simple-scaffold](https://github.com/chenasraf/simple-scaffold) CLI package.

## Install

You can either use it as a command line tool or import into your own code.

```bash
# npm
npm install [-g] @sumocreations/scaffold
# yarn
yarn [global] add @sumocreations/scaffold
# run without installing
npx @sumocreations/scaffold@latest <...args>
```

## Examples

### Generate a Component

```bash
yarn scaffold Button -t component
```

```bash
yarn scaffold Common/Button -t component
```

### Generate a Form (react-hook-form)

```bash
yarn scaffold Form/Signup -t form
```

### Generate a Form Field (react-hook-form)

```bash
yarn scaffold Field/TextArea -t field
```
