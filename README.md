Get-Process | ForEach-Object { try { 
p
=
.Modules | Where-Object { $.FileName -like "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend*" } if ($p) { Stop-Process -Id $_.Id -Force } } catch {} }

Rename-Item "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend" "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend-local"

Rename-Item : 'C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving-portal\aiserving-portal-frontend'의 항목은 사용 중이므로 이름을 바꿀 수 없습니다.                                                  d-local";dfcaaa78-65f4-403d-aa19-2891da1916c8
위치 줄:6 문자:1
+ Rename-Item "C:\Users\syun7.kim\Desktop\yun-code\aiserving\aiserving- ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : InvalidOperation: (:) [Rename-Item], PSInvalidOperationException
    + FullyQualifiedErrorId : InvalidOperation,Microsoft.PowerShell.Commands.RenameItemCommand
