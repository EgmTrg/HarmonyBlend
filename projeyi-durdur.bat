@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ===============================================
echo  HarmonyBlend - Projeyi Durdur
echo ===============================================
echo.

REM --- 1) Dev sunucusunu durdur (port 3000'de dinleyen node.exe) ---------
echo [1/3] Dev sunucusu durduruluyor...
set found=0
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    tasklist /fi "PID eq %%p" /fo csv /nh 2>nul | findstr /i "node.exe" >nul
    if not errorlevel 1 (
        echo       node.exe ^(PID %%p^) sonlandiriliyor...
        taskkill /PID %%p /F >nul 2>&1
        set found=1
    )
)
if !found! EQU 0 echo       Port 3000'de calisan bir dev sunucusu bulunamadi.
echo.

REM --- 2) Redis / RabbitMQ / Redis Commander -----------------------------
REM -v KULLANILMIYOR: volume'lar silinmez, veriler korunur.
echo [2/3] Redis, RabbitMQ ve Redis Commander durduruluyor...
docker compose down
echo.

REM --- 3) Neon (local Postgres) -------------------------------------------
REM -v KULLANILMIYOR: local veritabanindaki veriler korunur.
echo [3/3] Neon ^(local Postgres^) durduruluyor...
pushd neon-local
docker compose down
popd

echo.
echo ===============================================
echo  Tum servisler durduruldu.
echo  Docker Desktop acik birakildi, veritabani verileri korunuyor.
echo ===============================================
echo.
pause
