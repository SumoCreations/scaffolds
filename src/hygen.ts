import * as dotenv from 'dotenv'
import { execSync } from 'child_process'

// Load .env file
dotenv.config()

function runHygen() {
  try {
    // Get the hygen command from the command-line arguments
    const hygenCommand = process.argv.slice(2).join(' ')

    if (!hygenCommand) {
      console.error('No hygen command provided')
      return
    }

    // Run the hygen command
    const hygen = execSync(`hygen ${hygenCommand}`, {
      stdio: 'inherit',
      encoding: 'utf-8'
    })
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

runHygen()
