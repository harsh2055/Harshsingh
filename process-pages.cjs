const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.astro') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(process.cwd(), 'src/pages'));

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Remove getStaticPaths that exports languages
    content = content.replace(/export function getStaticPaths\(\) \{\s*return Object\.keys\(languages\)\.map\(\(lang\) => \(\{\s*params: \{ lang \}\s*\}\)\);\s*\}/g, '');
    
    // Replace const lang = getLangFromUrl(Astro.url); with const lang = 'en';
    content = content.replace(/const lang = getLangFromUrl\(Astro\.url\);/g, "const lang = 'en';");

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
        count++;
    }
});

console.log(`Processed ${count} files.`);
