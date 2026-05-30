const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

const srcDir = path.join(__dirname, 'src', 'pages', '[lang]');
const destDir = path.join(__dirname, 'src', 'pages');

try {
    copyDir(srcDir, destDir);
    fs.rmSync(srcDir, { recursive: true, force: true });
    console.log('Successfully copied and deleted.');
} catch (e) {
    console.error(e);
}
