/**
 * Natural Language Test Runner for Playwright (TypeScript)
 * 
 * This script allows you to run Playwright tests using plain English commands.
 * 
 * Usage Examples:
 * - npm run test:run -- "run smoke tests from login spec"
 * - npm run test:run -- "run regression and smoke tests from dashboard spec"
 * - npm run test:run -- "run mobile tests from all specs"
 * - npm run test:run -- "run all tests in headed mode"
 * - npm run test:run -- "run login tests with mobile viewport"
 */

import { execSync } from 'child_process';
import * as path from 'path';

// Get project root (parent directory of test-runner)
const projectRoot = path.resolve(__dirname, '..');

// ANSI color codes for beautiful console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    red: '\x1b[31m',
    magenta: '\x1b[35m'
} as const;

interface ParsedCommand {
    args: string;
    tags: string[];
    specFiles: string[];
    mode: string;
    browser: string | null;
}

/**
 * Parse natural language command and convert to Playwright CLI arguments
 */
function parseCommand(input: string): ParsedCommand {
    const command = input.toLowerCase();
    const playwrightArgs: string[] = [];
    const tags: string[] = [];
    const specFiles: string[] = [];
    let mode = 'headless';
    let browser: string | null = null;

    console.log(`\n${colors.blue}🔍 Parsing command: ${colors.bright}"${input}"${colors.reset}\n`);

    // Parse tags (smoke, regression, mobile, login, dashboard, transactions, negative)
    if (command.includes('smoke')) {
        tags.push('@smoke');
        console.log(`${colors.green}✓ Tag detected: @smoke${colors.reset}`);
    }
    if (command.includes('regression')) {
        tags.push('@regression');
        console.log(`${colors.green}✓ Tag detected: @regression${colors.reset}`);
    }
    if (command.includes('mobile')) {
        tags.push('@mobile');
        console.log(`${colors.green}✓ Tag detected: @mobile${colors.reset}`);
    }
    if (command.includes('negative')) {
        tags.push('@negative');
        console.log(`${colors.green}✓ Tag detected: @negative${colors.reset}`);
    }

    // Parse spec files
    if (command.includes('login')) {
        specFiles.push('tests/login.spec.ts');
        console.log(`${colors.green}✓ Spec file: tests/login.spec.ts${colors.reset}`);
    }
    if (command.includes('dashboard')) {
        specFiles.push('tests/Dashboard.spec.ts');
        console.log(`${colors.green}✓ Spec file: tests/Dashboard.spec.ts${colors.reset}`);
    }
    if (command.includes('transactions') || command.includes('transaction')) {
        specFiles.push('tests/transactions.spec.ts');
        console.log(`${colors.green}✓ Spec file: tests/transactions.spec.ts${colors.reset}`);
    }

    // If no specific spec mentioned but tags are present, search all specs
    if (specFiles.length === 0 && tags.length > 0) {
        console.log(`${colors.yellow}ℹ Running tests from all spec files${colors.reset}`);
    }

    // Parse mode (headed, headless, debug, ui)
    if (command.includes('headed') || command.includes('head mode')) {
        mode = 'headed';
        playwrightArgs.push('--headed');
        console.log(`${colors.green}✓ Mode: Headed (browser visible)${colors.reset}`);
    } else if (command.includes('debug')) {
        mode = 'debug';
        playwrightArgs.push('--debug');
        console.log(`${colors.green}✓ Mode: Debug (step-by-step execution)${colors.reset}`);
    } else if (command.includes('ui')) {
        mode = 'ui';
        playwrightArgs.push('--ui');
        console.log(`${colors.green}✓ Mode: UI (Playwright UI mode)${colors.reset}`);
    } else {
        console.log(`${colors.green}✓ Mode: Headless (default)${colors.reset}`);
    }

    // Parse browser
    if (command.includes('firefox')) {
        browser = 'firefox';
        playwrightArgs.push('--project=firefox');
        console.log(`${colors.green}✓ Browser: Firefox${colors.reset}`);
    } else if (command.includes('webkit') || command.includes('safari')) {
        browser = 'webkit';
        playwrightArgs.push('--project=webkit');
        console.log(`${colors.green}✓ Browser: WebKit (Safari)${colors.reset}`);
    } else {
        console.log(`${colors.green}✓ Browser: Chromium (default)${colors.reset}`);
    }

    // Build grep pattern for tags
    if (tags.length > 0) {
        const grepPattern = tags.join('|').replace(/@/g, '@');
        playwrightArgs.push(`--grep="${grepPattern}"`);
    }

    // Add spec files
    if (specFiles.length > 0) {
        playwrightArgs.push(...specFiles);
    }

    return {
        args: playwrightArgs.join(' '),
        tags,
        specFiles,
        mode,
        browser
    };
}

/**
 * Display help information
 */
function showHelp(): void {
    console.log(`
${colors.bright}${colors.blue}═══════════════════════════════════════════════════════════════
    🎭 Playwright Natural Language Test Runner (TypeScript)
═══════════════════════════════════════════════════════════════${colors.reset}

${colors.bright}USAGE:${colors.reset}
  npm run test:run -- "<your command in plain English>"
  Or use PowerShell function: run smoke tests from login spec

${colors.bright}COMMAND EXAMPLES:${colors.reset}

  ${colors.green}📋 By Tags:${colors.reset}
    run smoke tests
    run regression tests
    run smoke and regression tests
    run mobile tests
    run negative tests

  ${colors.green}📁 By Spec Files:${colors.reset}
    run tests from login spec
    run tests from dashboard spec
    run tests from transactions spec

  ${colors.green}🎯 Combining Tags + Specs:${colors.reset}
    run smoke tests from login spec
    run regression and smoke tests from dashboard spec
    run mobile tests from all specs

  ${colors.green}🎬 With Display Modes:${colors.reset}
    run smoke tests in headed mode
    run login tests in debug mode
    run all tests in ui mode

  ${colors.green}🌐 With Specific Browser:${colors.reset}
    run smoke tests in firefox
    run regression tests in webkit
    run dashboard tests in safari

  ${colors.green}🔥 Advanced Combinations:${colors.reset}
    run smoke and mobile tests from login spec in headed mode
    run regression tests from dashboard spec in debug mode
    run all mobile tests in firefox headed mode

${colors.bright}AVAILABLE TAGS:${colors.reset}
  @smoke, @regression, @mobile, @login, @dashboard, @transactions, @negative

${colors.bright}AVAILABLE SPEC FILES:${colors.reset}
  login, dashboard, transactions

${colors.bright}AVAILABLE MODES:${colors.reset}
  headed, headless (default), debug, ui

${colors.bright}AVAILABLE BROWSERS:${colors.reset}
  chromium (default), firefox, webkit/safari

${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}
    `);
}

/**
 * Main execution function
 */
function main(): void {
    const args = process.argv.slice(2);

    // Show help if no arguments or help requested
    if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
        showHelp();
        process.exit(0);
    }

    const userCommand = args.join(' ');
    
    // Parse the command
    const parsed = parseCommand(userCommand);

    // Build the final Playwright command
    const playwrightCommand = `npx playwright test ${parsed.args}`;

    console.log(`\n${colors.blue}${colors.bright}🚀 Executing Playwright Command:${colors.reset}`);
    console.log(`${colors.yellow}${playwrightCommand}${colors.reset}\n`);
    console.log(`${colors.blue}${'═'.repeat(60)}${colors.reset}\n`);

    try {
        // Execute the command from project root
        execSync(playwrightCommand, { 
            stdio: 'inherit',
            cwd: projectRoot
        });

        console.log(`\n${colors.green}${colors.bright}✅ Tests completed successfully!${colors.reset}\n`);
    } catch (error) {
        console.error(`\n${colors.red}${colors.bright}❌ Test execution failed!${colors.reset}\n`);
        process.exit(1);
    }
}

// Run the script
main();
