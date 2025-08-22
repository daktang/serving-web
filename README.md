Get-ChildItem -Path . -Recurse -Filter "config.js" | Where-Object { $_.FullName -notlike "*\\node_modules\\*" }
Get-ChildItem -Path . -Recurse -File -Filter "config.js" -ErrorAction SilentlyContinue |
  Where-Object { $_.FullName -notmatch '\\node_modules\\' }
