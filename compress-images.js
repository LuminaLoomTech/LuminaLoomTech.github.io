const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');

// 壓縮 CZ_LOGO3.png
const compressLogo = async () => {
  const inputPath = path.join(imagesDir, 'CZ_LOGO3.png');
  const outputPath = path.join(imagesDir, 'CZ_LOGO3-optimized.png');
  const backupPath = path.join(imagesDir, 'CZ_LOGO3-backup.png');
  
  console.log('🔍 檢查原始檔案...');
  const originalStats = fs.statSync(inputPath);
  const originalSize = (originalStats.size / 1024).toFixed(2);
  console.log(`📦 原始大小: ${originalSize} KB`);
  
  // 備份原始檔案
  console.log('\n📋 備份原始檔案...');
  fs.copyFileSync(inputPath, backupPath);
  console.log(`✅ 已備份至: CZ_LOGO3-backup.png`);
  
  console.log('\n🔧 開始壓縮...');
  
  try {
    // 壓縮 PNG
    await sharp(inputPath)
      .png({
        quality: 85,
        compressionLevel: 9,
        palette: true // 轉為 8-bit 色板（大幅減少檔案大小）
      })
      .toFile(outputPath);
    
    const compressedStats = fs.statSync(outputPath);
    const compressedSize = (compressedStats.size / 1024).toFixed(2);
    const reduction = ((1 - compressedStats.size / originalStats.size) * 100).toFixed(1);
    
    console.log(`\n✨ 壓縮完成！`);
    console.log(`📊 壓縮後大小: ${compressedSize} KB`);
    console.log(`💾 減少: ${reduction}% (節省 ${(originalSize - compressedSize).toFixed(2)} KB)`);
    console.log(`\n📂 檔案位置:`);
    console.log(`   - 原始: CZ_LOGO3-backup.png`);
    console.log(`   - 壓縮: CZ_LOGO3-optimized.png`);
    console.log(`\n👀 請先預覽壓縮後的圖片，滿意後執行:`);
    console.log(`   node replace-image.js (用壓縮版替換原始檔)`);
    
  } catch (error) {
    console.error('❌ 壓縮失敗:', error.message);
  }
};

compressLogo();
