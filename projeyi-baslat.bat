@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ===============================================
echo  HarmonyBlend - Projeyi Baslat
echo ===============================================
echo.

REM --- 1) Docker Desktop calisiyor mu? -----------------------------------
docker info >nul 2>&1
if errorlevel 1 (
    echo [1/4] Docker Desktop baslatiliyor, biraz zaman alabilir...
    start "" "C:\Users\Egemen\AppData\Local\Programs\DockerDesktop\Docker Desktop.exe"

    set count=0
    :waitdocker
    timeout /t 3 /nobreak >nul
    docker info >nul 2>&1
    if not errorlevel 1 goto dockerready
    set /a count+=1
    if !count! GEQ 40 (
        echo HATA: Docker Desktop 2 dakika icinde hazir olmadi.
        echo Docker Desktop'i elle kontrol edip bu dosyayi tekrar calistirin.
        pause
        exit /b 1
    )
    goto waitdocker
    :dockerready
    echo       Docker hazir.
) else (
    echo [1/4] Docker Desktop zaten calisiyor.
)
echo.

REM --- 2) Self-hosted Neon (local Postgres) yigini ------------------------
echo [2/4] Neon ^(local Postgres^) baslatiliyor...
pushd neon-local
docker compose up -d
popd
echo.

REM --- 3) Redis ve RabbitMQ -------------------------------------------
REM NOT: docker-compose.yml'deki "app" servisi bilerek baslatilmiyor.
REM O servis eski bir production build'i calistirir ve "npm run dev" ile
REM ayni 3000 portunu kullanip cakisir. Gelistirme icin uygulama asagida
REM npm run dev ile ayri bir pencerede baslatiliyor.
echo [3/4] Redis, RabbitMQ ve Redis Commander baslatiliyor...
docker compose up -d redis rabbitmq redis-commander
echo.

REM --- 4) Next.js dev sunucusu ------------------------------------------
echo [4/4] Dev sunucusu kontrol ediliyor...
set devrunning=0
for /f "tokens=5" %%p in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    tasklist /fi "PID eq %%p" /fo csv /nh 2>nul | findstr /i "node.exe" >nul
    if not errorlevel 1 set devrunning=1
)
if !devrunning! EQU 1 (
    echo       Dev sunucusu zaten calisiyor, yeni pencere acilmadi.
) else (
    echo       Dev sunucusu yeni pencerede baslatiliyor...
    start "HarmonyBlend Dev Server" cmd /k "npm run dev"
)

echo.
echo ===============================================
echo  Tum servisler hazir:
echo   - Neon ^(Postgres^):     localhost:45432
echo   - Redis:                localhost:6379
echo   - Redis Commander UI:   http://localhost:8081
echo   - RabbitMQ UI:          http://localhost:15672  ^(guest/guest^)
echo   - Uygulama:             http://localhost:3000
echo ===============================================
echo.
pause
