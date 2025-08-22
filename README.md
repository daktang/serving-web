Get-ChildItem -Path . -Recurse -Filter "config.js" | Where-Object { $_.FullName -notlike "*\\node_modules\\*" }
