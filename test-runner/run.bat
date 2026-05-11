@echo off
REM Windows Batch wrapper for Natural Language Test Runner (TypeScript)
REM Usage: run.bat smoke tests from login spec

REM Get the directory where this script is located
set "SCRIPT_DIR=%~dp0"

REM Check if arguments provided
if "%~1"=="" (
    echo.
    echo No command provided!
    echo.
    echo Usage:
    echo   run.bat smoke tests from login spec
    echo   run.bat regression tests from dashboard spec in headed mode
    echo.
    echo Or use PowerShell function after setup:
    echo   run smoke tests from login spec
    echo.
    echo For full help:
    echo   run.bat --help
    echo.
    exit /b 1
)

REM Collect all arguments
set "COMMAND=%*"

REM Add 'run' prefix if not present
echo %COMMAND% | findstr /b /c:"run " >nul
if errorlevel 1 (
    set "COMMAND=run %COMMAND%"
)

REM Change to script directory and execute the test runner
cd /d "%SCRIPT_DIR%"
echo Executing: npx ts-node testRunner.ts "%COMMAND%"
npx ts-node testRunner.ts "%COMMAND%"
