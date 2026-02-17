$ErrorActionPreference = "Stop"

$SERVER_IP = "49.12.246.186"
$USER = "helldex"
$REMOTE_DIR = "/home/$USER/pbai-web"

Write-Host "Zacinam nasazeni na $SERVER_IP..." -ForegroundColor Cyan

# 1. Kontrola dostupnosti SSH nástrojů
if (-not (Get-Command ssh -ErrorAction SilentlyContinue) -or -not (Get-Command scp -ErrorAction SilentlyContinue)) {
    Write-Error "Nastroje OpenSSH (ssh, scp) nejsou dostupne. Prosim nainstalujte je."
    exit 1
}

# 2. Vytvoreni slozky na serveru via SSH (bude vyzadovat heslo)
Write-Host "Vytvarim slozku na serveru (zadejte heslo pro $USER)..." -ForegroundColor Yellow
ssh -o StrictHostKeyChecking=no $USER@$SERVER_IP "mkdir -p $REMOTE_DIR"

# 3. Nahrani souboru via SCP (bude vyzadovat heslo)
Write-Host "Nahravam soubory na server (zadejte heslo pro $USER)..." -ForegroundColor Yellow
scp -o StrictHostKeyChecking=no -r Dockerfile nginx.conf docker-compose.yml package*.json tsconfig*.json vite.config.ts index.html *.ts src $USER@${SERVER_IP}:$REMOTE_DIR

# 4. Spusteni Docker Compose na serveru via SSH (bude vyzadovat heslo)
Write-Host "Spoustim aplikaci na serveru (zadejte heslo pro $USER)..." -ForegroundColor Yellow
ssh -o StrictHostKeyChecking=no $USER@$SERVER_IP "cd $REMOTE_DIR && docker compose up -d --build"

Write-Host "Hotovo! Aplikace by mela bezet na portu 3000." -ForegroundColor Green
Write-Host "Nyni prosim upravte konfiguraci vaseho web serveru (Nginx/Apache) podle navodu." -ForegroundColor Cyan
