Write-Host "================================="
Write-Host "Instalando MySQL..."
Write-Host "================================="

$installer = Resolve-Path "$PSScriptRoot\..\mysql\mysql-installer-community-8.0.46.0.msi"

Write-Host "Instalador:"
Write-Host $installer

Start-Process `
    -FilePath "msiexec.exe" `
    -ArgumentList "/i","$installer" `
    -Wait

Write-Host "Proceso finalizado."