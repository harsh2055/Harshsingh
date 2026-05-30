const fs = require('fs');
const path = require('path');

const targetStr1 = 'harshsingh.qzz.io';
const replacement1 = 'harshsingh.qzz.io';
const targetStr2 = 'harshsingh';
const replacement2 = 'harshsingh';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === 'dist' || file === '.vercel' || file === 'package-lock.json' || file.endsWith('.png') || file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.webp') || file.endsWith('.avif') || file.endsWith('.svg') || file.endsWith('.woff') || file.endsWith('.woff2') || file.endsWith('.ico') || file.endsWith('.pdf')) {
            return;
        }
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk(process.cwd());

let changedCount = 0;
files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        let newContent = content.replace(new RegExp(targetStr1, 'g'), replacement1);
        newContent = newContent.replace(new RegExp(targetStr2, 'g'), replacement2);
        newContent = newContent.replace(/Harshsingh/g, 'Harshsingh');
        
        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated ${file}`);
            changedCount++;
        }
    } catch (e) {
        // ignore binary files or errors
    }
});

console.log(`Replaced in ${changedCount} files.`);
