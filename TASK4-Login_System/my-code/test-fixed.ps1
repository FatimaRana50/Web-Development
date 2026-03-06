# test-fixed.ps1
Write-Host "Testing Login System" -ForegroundColor Green
Write-Host "====================="

Write-Host "`n1. Registering user..." -ForegroundColor Yellow
curl.exe -X POST http://localhost:3000/register `
  -H "Content-Type: application/json" `
  -d "{\"username\":\"john\",\"password\":\"123456\"}"

Write-Host "`n2. Logging in..." -ForegroundColor Yellow
curl.exe -X POST http://localhost:3000/login `
  -H "Content-Type: application/json" `
  -d "{\"username\":\"john\",\"password\":\"123456\"}" `
  -c cookies.txt

Write-Host "`n3. Accessing dashboard..." -ForegroundColor Yellow
curl.exe http://localhost:3000/dashboard -b cookies.txt

Write-Host "`n4. Logging out..." -ForegroundColor Yellow
curl.exe http://localhost:3000/logout -b cookies.txt

Write-Host "`n✅ Done!" -ForegroundColor Green