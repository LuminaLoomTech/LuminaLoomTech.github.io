# LCP 優化 - 一鍵回復腳本
# 使用方法: 在 PowerShell 中執行 .\回復原始檔案.ps1

Write-Host "=== LCP 優化回復腳本 ===" -ForegroundColor Cyan
Write-Host "備份日期: 2026/02/06" -ForegroundColor Yellow
Write-Host ""

$backupDate = "20260206"
$files = @(
    @{
        Backup = "src\components\banner\Banner.tsx.backup_$backupDate"
        Original = "src\components\banner\Banner.tsx"
    },
    @{
        Backup = "src\components\banner\Banner.module.css.backup_$backupDate"
        Original = "src\components\banner\Banner.module.css"
    },
    @{
        Backup = "src\pages\sections\home\HomeSection.tsx.backup_$backupDate"
        Original = "src\pages\sections\home\HomeSection.tsx"
    },
    @{
        Backup = "public\index.html.backup_$backupDate"
        Original = "public\index.html"
    }
)

Write-Host "即將回復以下檔案:" -ForegroundColor Yellow
foreach ($file in $files) {
    Write-Host "  - $($file.Original)" -ForegroundColor White
}
Write-Host ""

$confirm = Read-Host "確定要回復所有檔案嗎? (Y/N)"

if ($confirm -eq 'Y' -or $confirm -eq 'y') {
    $success = 0
    $failed = 0
    
    foreach ($file in $files) {
        if (Test-Path $file.Backup) {
            try {
                Copy-Item $file.Backup $file.Original -Force
                Write-Host "✓ 已回復: $($file.Original)" -ForegroundColor Green
                $success++
            } catch {
                Write-Host "✗ 回復失敗: $($file.Original)" -ForegroundColor Red
                Write-Host "  錯誤: $_" -ForegroundColor Red
                $failed++
            }
        } else {
            Write-Host "✗ 找不到備份檔案: $($file.Backup)" -ForegroundColor Red
            $failed++
        }
    }
    
    Write-Host ""
    Write-Host "=== 回復完成 ===" -ForegroundColor Cyan
    Write-Host "成功: $success 個檔案" -ForegroundColor Green
    Write-Host "失敗: $failed 個檔案" -ForegroundColor Red
    
} else {
    Write-Host "已取消回復操作" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "按任意鍵退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
