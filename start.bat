@echo off
cd /d "%~dp0"
echo.
echo  ============================================
echo   KII Application Management System
echo  ============================================
echo.
echo   Applicant portal:
echo     http://localhost:8090/index.html
echo.
echo   Administration team portal:
echo     http://localhost:8090/admin-login.html
echo     (admin@kii.org / admin123)
echo.
echo  ============================================
echo   Keep this window open while using the system.
echo   Press Ctrl+C to stop the server.
echo  ============================================
echo.

REM open the applicant portal in the browser once the server is ready
start "" powershell -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:8090/index.html'"

python -m http.server 8090
pause
