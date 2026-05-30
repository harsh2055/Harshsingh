const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'pages', '[lang]');
const destDir = path.join(__dirname, 'src', 'pages');

const files = fs.readdirSync(srcDir);

files.forEach(file => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);
    
    // renameSync works if the destination doesn't exist or is on same device
    // if there are leftovers in destDir from previous attempts, delete them
    if (fs.existsSync(destPath)) {
        fs.rmSync(destPath, { recursive: true, force: true });
    }
    
    fs.renameSync(srcPath, destPath);
    console.log(`Moved ${file}`);
});

fs.rmSync(srcDir, { recursive: true, force: true });
console.log('Deleted src/pages/[lang]');
