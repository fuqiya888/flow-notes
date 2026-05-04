@echo off
echo 启动 Flow Notes...
taskkill /F /IM node.exe /T >nul 2>&1
timeout /t 1 /nobreak >nul
start "flow-server" node "%~dp0server.js"
timeout /t 2 /nobreak >nul
start "" http://localhost:18889

