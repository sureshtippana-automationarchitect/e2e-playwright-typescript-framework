# PowerShell Profile Setup for Natural Language Test Runner

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$projectRoot = Split-Path -Parent $scriptPath

Write-Host " "
Write-Host "Setting up Natural Language Test Runner..." -ForegroundColor Blue
Write-Host " "

# Create profile if it doesn't exist
if (-not (Test-Path $PROFILE)) {
    Write-Host "Creating PowerShell profile..." -ForegroundColor Yellow
    New-Item -Path $PROFILE -Type File -Force | Out-Null
    Write-Host "Profile created at: $PROFILE" -ForegroundColor Green
    Write-Host " "
}
else {
    Write-Host "Profile exists at: $PROFILE" -ForegroundColor Green
    Write-Host " "
}

# Build the function code
$lines = @()
$lines += ""
$lines += "# ========================================"
$lines += "# Natural Language Test Runner"
$lines += "# ========================================"
$lines += "function run {"
$lines += "    param("
$lines += "        [Parameter(ValueFromRemainingArguments=`$true)]"
$lines += "        [string[]]`$Command"
$lines += "    )"
$lines += "    "
$lines += "    `$testRunnerDir = `"$scriptPath`""
$lines += "    `$projectRoot = Split-Path -Parent `$testRunnerDir"
$lines += "    `$testRunnerPath = Join-Path `$testRunnerDir `"testRunner.ts`""
$lines += "    "
$lines += "    if (-not (Test-Path `$testRunnerPath)) {"
$lines += "        Write-Host `"Error: testRunner.ts not found`" -ForegroundColor Red"
$lines += "        return"
$lines += "    }"
$lines += "    "
$lines += "    `$commandString = `$Command -join ' '"
$lines += "    "
$lines += "    if ([string]::IsNullOrWhiteSpace(`$commandString)) {"
$lines += "        Write-Host ' '"
$lines += "        Write-Host `"No command provided!`" -ForegroundColor Yellow"
$lines += "        Write-Host ' '"
$lines += "        Write-Host `"Usage:`" -ForegroundColor Cyan"
$lines += "        Write-Host `"  run smoke tests from login spec`" -ForegroundColor White"
$lines += "        Write-Host `"  run regression tests in headed mode`" -ForegroundColor White"
$lines += "        Write-Host ' '"
$lines += "        return"
$lines += "    }"
$lines += "    "
$lines += "    if (-not `$commandString.StartsWith('run ')) {"
$lines += "        `$commandString = `"run `$commandString`""
$lines += "    }"
$lines += "    "
$lines += "    Push-Location `$projectRoot"
$lines += "    try {"
$lines += "        & npx ts-node test-runner/testRunner.ts `$commandString"
$lines += "    } finally {"
$lines += "        Pop-Location"
$lines += "    }"
$lines += "}"
$lines += ""
$lines += "Write-Host `"Natural Language Test Runner loaded!`" -ForegroundColor Green"

$functionCode = $lines -join "`r`n"

# Read current profile
$profileContent = ""
if (Test-Path $PROFILE) {
    $profileContent = Get-Content $PROFILE -Raw -ErrorAction SilentlyContinue
}

# Check if function exists
if ($profileContent -and ($profileContent -match "Natural Language Test Runner")) {
    Write-Host "Function already exists, updating..." -ForegroundColor Yellow
    
    # Remove old function - simple approach
    $lines = Get-Content $PROFILE
    $newLines = @()
    $skip = $false
    
    foreach ($line in $lines) {
        if ($line -match "# Natural Language Test Runner") {
            $skip = $true
        }
        if (-not $skip) {
            $newLines += $line
        }
        if ($skip -and $line -match "Write-Host.*Natural Language Test Runner loaded") {
            $skip = $false
        }
    }
    
    Set-Content -Path $PROFILE -Value ($newLines -join "`r`n")
}

# Add function
Add-Content -Path $PROFILE -Value $functionCode

Write-Host " "
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host " "

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "  1. Reload profile: . `$PROFILE" -ForegroundColor White
Write-Host "  2. Or close and reopen PowerShell" -ForegroundColor White
Write-Host " "

Write-Host "Then run commands directly:" -ForegroundColor Cyan
Write-Host "  run smoke tests from login spec" -ForegroundColor Yellow
Write-Host "  run regression tests in headed mode" -ForegroundColor Yellow
Write-Host " "

# Reload
$reload = Read-Host "Reload profile now? (Y/n)"
if ($reload -ne 'n' -and $reload -ne 'N') {
    Write-Host " "
    Write-Host "Reloading..." -ForegroundColor Cyan
    . $PROFILE
    Write-Host "Profile reloaded!" -ForegroundColor Green
    Write-Host " "
}
