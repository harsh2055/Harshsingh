const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(path.join(process.cwd(), 'src'), function(filePath) {
    if (filePath.endsWith('.astro') || filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        if (content.includes("const lang = 'en' as SupportedLang;")) {
            content = content.replace(/const lang = 'en' as SupportedLang;/g, "const lang = 'en' as any;");
            modified = true;
        }
        
        if (content.includes("const typedLang = 'en' as SupportedLang;")) {
            content = content.replace(/const typedLang = 'en' as SupportedLang;/g, "const typedLang = 'en' as any;");
            modified = true;
        }

        if (content.includes("const pathLang = 'en';")) {
             content = content.replace(/const pathLang = 'en';/g, "const pathLang = 'en' as any;");
             modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
