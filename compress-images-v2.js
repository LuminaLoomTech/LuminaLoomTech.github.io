const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src/assets/images');

// 需要壓縮的圖片
const imagesToCompress = [
  { input: 'BANNER.png', outputs: [
    { name: 'BANNER.webp', format: 'webp', quality: 75 },
    { name: 'BANNER-optimized.png', format: 'png', quality: 80 }
  ]},
  { input: 'CZ_LOGO3.png', outputs: [
    { name: 'CZ_LOGO3.webp', format: 'webp', quality: 85 }
  ]}
];

async function compressImages() {
  for (const image of imagesToCompress) {
    const inputPath = path.join(imagesDir, image.input);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️ 找不到: ${image.input}`);
      continue;
    }

    const inputSize = fs.statSync(inputPath).size / 1024;
    console.log(`\n📦 正在處理: ${image.input} (${inputSize.toFixed(2)}KB)`);

    for (const output of image.outputs) {
      try {
        const outputPath = path.join(imagesDir, output.name);
        
        if (output.format === 'webp') {
          await sharp(inputPath)
            .webp({ quality: output.quality })
            .toFile(outputPath);
        } else if (output.format === 'png') {
          await sharp(inputPath)
            .png({ quality: output.quality })
            .toFile(outputPath);
        }

        const outputSize = fs.statSync(outputPath).size / 1024;
        const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
        console.log(`   ✅ ${output.name}: ${outputSize.toFixed(2)}KB (減少 ${reduction}%)`);
      } catch (err) {
        console.error(`   ❌ 壓縮失敗: ${err.message}`);
      }
    }
  }

  console.log('\n✨ 壓縮完成！');
}

compressImages().catch(err => {
  console.error('❌ 錯誤:', err);
  process.exit(1);
});
