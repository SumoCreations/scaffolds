import prettier from 'prettier'
import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import fs from 'fs'

// Load .env file
dotenv.config()

// Execute OpenAI on Hygen Output
async function executeOpenAI() {
  try {
    // Get the file path from the command-line arguments
    const filePath = process.argv[2]
    if (!filePath) {
      console.error('No file path provided')
      return
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not set in .env file')
      return
    }

    // Read the contents of the file
    var fileContent = fs.readFileSync(filePath, 'utf-8')
    const maxTokens = 3000 // Max tokens for OpenAI completion

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY
    })
    const openai = new OpenAIApi(configuration)

    const prompt = `${fileContent}\n\n"""\nAssume we are using tailwindcss for styling and referencing any styles in the component in the const 'styles' defined in the examples. A completed implementation of the example component would look like:\n\n`
    console.log("[1] Prompting open AI to generate component's content")
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      temperature: 0,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""']
    })

    // Parse the OpenAI response
    const component = response.data.choices[0].text

    const prettierOptions = await prettier.resolveConfig(process.cwd())

    if (!component) {
      console.error('No component generated')
      return
    }

    // Write the updated content back to the file
    fs.writeFileSync(
      filePath,
      prettier.format(component, {
        ...prettierOptions,
        parser: 'babel-ts'
      }),
      'utf-8'
    )

    console.log(
      '[2] Prompting open AI to generate a test suite for the component'
    )
    const testPath = filePath.replace('.tsx', '.test.tsx')

    const testResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${component}\n\n"""\nA comprehensive test suite written with the react testing-library in jest would look like:\n\n`,
      temperature: 0,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""']
    })

    const test = testResponse.data.choices[0].text ?? ''

    // Write the test suite
    fs.writeFileSync(
      testPath,
      prettier.format(test, {
        ...prettierOptions,
        parser: 'babel-ts'
      }),
      'utf-8'
    )

    console.log('[3] Prompting open AI to generate stories for the component')
    const storyPath = filePath.replace('.tsx', '.stories.tsx')
    fileContent = fs.readFileSync(storyPath, 'utf-8')
    console.log(
      `// component\n${component}\n\n// story\n${fileContent}\n\n"""\nA comprehensive set of examples written for storybookJS written in typescript would look like:\n\n`
    )
    const storyResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `// component\n${component}\n\n// story\n${fileContent}\n\n"""\nA comprehensive set of examples written for storybookJS written in typescript would look like:\n\n`,
      temperature: 0,
      max_tokens: maxTokens,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ['"""']
    })

    // Write the updated content back to the file
    fs.writeFileSync(
      filePath.replace('.tsx', '.stories.tsx'),
      prettier.format(storyResponse.data.choices[0].text ?? '', {
        ...prettierOptions,
        parser: 'babel-ts'
      }),
      'utf-8'
    )
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

executeOpenAI()
