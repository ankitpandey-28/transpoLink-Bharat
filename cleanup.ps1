# TranspoLink Cleanup Script
# Run this script from the project root directory
# Usage: .\cleanup.ps1

Write-Host "🧹 TranspoLink Codebase Cleanup Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path ".\README.md")) {
    Write-Host "❌ Error: Please run this script from the TranspoLink root directory" -ForegroundColor Red
    exit 1
}

Write-Host "📍 Current directory: $PWD" -ForegroundColor Yellow
Write-Host ""

# Ask for confirmation
Write-Host "⚠️  This script will:" -ForegroundColor Yellow
Write-Host "   1. Delete 10 temporary .md files from root directory" -ForegroundColor White
Write-Host "   2. Create docs/archive folder" -ForegroundColor White
Write-Host "   3. Move 8 completed documentation files to archive" -ForegroundColor White
Write-Host ""

$confirmation = Read-Host "Do you want to continue? (yes/no)"
if ($confirmation -ne "yes") {
    Write-Host "❌ Cleanup cancelled" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🚀 Starting cleanup..." -ForegroundColor Green
Write-Host ""

# Step 1: Delete temporary documentation files
Write-Host "📝 Step 1: Removing temporary documentation files..." -ForegroundColor Cyan

$filesToDelete = @(
    "AVAILABLE_PAGES_UPDATE.md",
    "BOOKINGS_PAGE_COMPLETE.md",
    "BOOKING_DEBUG_GUIDE.md",
    "BOOKING_SYSTEM_IMPLEMENTATION.md",
    "FIX_DRIVER_ERROR.md",
    "MY_LISTINGS_FEATURE.md",
    "POST_GOODS_INDIAN_STANDARDS.md",
    "QUICK_FIX_BOOKING.md",
    "QUICK_FIX_GUIDE.md",
    "USER_TYPE_INDICATOR.md"
)

$deletedCount = 0
foreach ($file in $filesToDelete) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "   ✅ Deleted: $file" -ForegroundColor Green
        $deletedCount++
    } else {
        Write-Host "   ⚠️  Not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "   📊 Deleted $deletedCount files" -ForegroundColor White
Write-Host ""

# Step 2: Create archive folder
Write-Host "📁 Step 2: Creating archive folder..." -ForegroundColor Cyan

if (-not (Test-Path ".\docs\archive")) {
    New-Item -ItemType Directory -Path ".\docs\archive" -Force | Out-Null
    Write-Host "   ✅ Created: docs\archive" -ForegroundColor Green
} else {
    Write-Host "   ℹ️  Already exists: docs\archive" -ForegroundColor Yellow
}
Write-Host ""

# Step 3: Move completed documentation to archive
Write-Host "📦 Step 3: Archiving completed documentation..." -ForegroundColor Cyan

$filesToArchive = @(
    "docs\POST_TRUCK_DEMO.md",
    "docs\NAVBAR_VISUAL_DEMO.md",
    "docs\VISUAL_DEMO.md",
    "docs\MIGRATION_COMPLETE.md",
    "docs\RESTRUCTURE_COMPLETE.md",
    "docs\LIVE_TRACKING_REMOVAL_SUMMARY.md",
    "docs\MODERN_REDESIGN_GUIDE.md",
    "docs\IMPLEMENTATION_SUMMARY.md"
)

$archivedCount = 0
foreach ($file in $filesToArchive) {
    if (Test-Path $file) {
        $fileName = Split-Path $file -Leaf
        Move-Item $file ".\docs\archive\$fileName" -Force
        Write-Host "   ✅ Archived: $fileName" -ForegroundColor Green
        $archivedCount++
    } else {
        Write-Host "   ⚠️  Not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "   📊 Archived $archivedCount files" -ForegroundColor White
Write-Host ""

# Step 4: Summary
Write-Host "✨ Cleanup Complete!" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green
Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "   • Deleted files: $deletedCount" -ForegroundColor White
Write-Host "   • Archived files: $archivedCount" -ForegroundColor White
Write-Host "   • Archive location: docs\archive\" -ForegroundColor White
Write-Host ""

# Calculate space saved (approximate)
$spaceSaved = ($deletedCount + $archivedCount) * 10  # Rough estimate in KB
Write-Host "💾 Approximate space saved: ~$spaceSaved KB" -ForegroundColor Green
Write-Host ""

Write-Host "📝 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Review the CLEANUP_REPORT.md for detailed information" -ForegroundColor White
Write-Host "   2. Consider removing console.log statements for production" -ForegroundColor White
Write-Host "   3. Run 'git status' to see changes" -ForegroundColor White
Write-Host ""

Write-Host "✅ All done! Your codebase is now cleaner." -ForegroundColor Green
