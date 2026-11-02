@echo off
chcp 65001 >nul
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Opening the download page...
  start https://nodejs.org
  pause
  exit /b
)
if not exist node_modules (
  echo Installing, this takes about a minute...
  call npm install
)
start "" http://localhost:4321
echo.
echo To open on your phone (same Wi-Fi), type the "Network" address shown below into the phone browser.
echo.
call npm run dev -- --host
pause
