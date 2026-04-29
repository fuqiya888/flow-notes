@echo off
echo 启动 Flow Notes...
start "flow-server" node "%~dp0server.js"
timeout /t 2 /nobreak >nul
start "" http://localhost:19527
