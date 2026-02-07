const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'src/assets/images');

// 需要壓縮的圖片 - 使用現有的 optimized 版本作為源
const imagesToCompress = [
  { input: 'BANNER-optimized.png', outputs: [
    { name: 'BANNER-final.webp', format: 'webp', quality: 55, resize: { width: 1600 } }
  ]},
  { input: 'CZ_LOGO3.png', outputs: [
    { name: 'CZ_LOGO3-final.webp', format: 'webp', quality: 85 }
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
        
        let pipeline = sharp(inputPath);
        
        // 如果有 resize 設定，先調整大小
        if (output.resize) {
          pipeline = pipeline.resize(output.resize.width, null, {
            fit: 'inside',
            withoutEnlargement: true
          });
        }
        
        if (output.format === 'webp') {
          await pipeline.webp({ quality: output.quality }).toFile(outputPath);
        } else if (output.format === 'png') {
          await pipeline.png({ quality: output.quality }).toFile(outputPath);
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
