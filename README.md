Get-Process | ForEach-Object {
    try {
        $p = $_.Modules | Where-Object { $_.FileName -like "C:\경로\폴더이름*" }
        if ($p) { Stop-Process -Id $_.Id -Force }
    } catch {}
}

Rename-Item "C:\경로\폴더이름" "새폴더이름"
