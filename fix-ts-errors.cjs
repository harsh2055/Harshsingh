const fs = require('fs');
const path = require('path');
const glob = require('glob'); // Use raw fs or glob if installed? Let's just use fs recursive

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

        // fix: const lang = 'en'; -> const lang = 'en' as any;
        if (content.includes("const lang = 'en';")) {
            content = content.replace(/const lang = 'en';/g, "const lang = 'en' as any;");
            modified = true;
        }

        // fix: 'blog-to-faqs' not in DividerTransition
        if (filePath.endsWith('DiagonalDivider.astro') && !content.includes("'blog-to-faqs'")) {
            content = content.replace("'blog-to-testimonials'", "'blog-to-faqs'\n        | 'blog-to-testimonials'");
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
