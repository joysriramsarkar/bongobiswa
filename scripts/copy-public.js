const fs = require('fs');
const path = require('path');

// ফাংশন: ডিরেক্টরি কপি করা
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);

    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

// সোর্স এবং ডেস্টিনেশন পাথ ঠিক করা
const publicDir = path.join(process.cwd(), 'public');
const staticDir = path.join(process.cwd(), '.next', 'static');

const destPublicDir = path.join(process.cwd(), '.next', 'standalone', 'public');
const destStaticDir = path.join(process.cwd(), '.next', 'standalone', '.next', 'static');

console.log('⏳ Copying public and static files for standalone build...');

try {
  if (fs.existsSync(publicDir)) {
    copyDir(publicDir, destPublicDir);
    console.log('✅ Public folder copied.');
  }
  if (fs.existsSync(staticDir)) {
    copyDir(staticDir, destStaticDir);
    console.log('✅ .next/static folder copied.');
  }
  console.log('🎉 Build copy successful!');
} catch (error) {
  console.error('❌ Error copying files:', error);
  process.exit(1);
}