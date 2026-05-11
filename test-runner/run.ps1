# PowerShell wrapper for Natural Language Test Runner (TypeScript)
# Usage: .\run.ps1 smoke tests from login spec
#    or: .\run.ps1 "smoke tests from dashboard spec"

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Get all arguments and join them into a single string
$command = $args -join ' '

# If no arguments provided, show help
if ([string]::IsNullOrWhiteSpace($command)) {
    Write-Host "`n" -ForegroundColor Yellow
    Write-Host "⚠️  No command provided!`n" -ForegroundColor Yellow
    Write-Host "Usage:" -ForegroundColor Cyan
    Write-Host "  .\run.ps1 smoke tests from login spec" -ForegroundColor White
    Write-Host "  .\run.ps1 regression tests from dashboard spec in headed mode`n" -ForegroundColor White
    Write-Host "Or use the PowerShell function (after setup):" -ForegroundColor Cyan
    Write-Host "  run smoke tests from login spec`n" -ForegroundColor White
    Write-Host "For full help:" -ForegroundColor Cyan
    Write-Host "  .\run.ps1 --help`n" -ForegroundColor White
    exit 1
}

# Add 'run' prefix if not already present
if (-not $command.StartsWith('run ')) {
    $command = "run $command"
}

# Execute the test runner using ts-node from script directory
Push-Location $scriptDir
try {
    Write-Host "Executing: npx ts-node testRunner.ts `"$command`"" -ForegroundColor Cyan
    & npx ts-node testRunner.ts $command
} finally {
    Pop-Location
}
