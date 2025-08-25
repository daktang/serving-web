Get-Process | ForEach-Object { try { 
p
=
.Modules | Where-Object { $.FileName -like "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend*" } if ($p) { Stop-Process -Id $_.Id -Force } } catch {} }

Rename-Item "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend" "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend-local"
