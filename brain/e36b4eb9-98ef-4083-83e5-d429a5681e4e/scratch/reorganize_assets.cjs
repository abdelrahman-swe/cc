const fs = require('fs');
const path = require('path');

const workspacePath = 'c:/Users/Azza/Documents/Codex/2026-06-25/figma-plugin-figma-openai-curated-remote';
const publicDir = path.join(workspacePath, 'public');
const srcDir = path.join(workspacePath, 'src');

// helper function to move files recursively
function moveFolder(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      moveFolder(srcPath, destPath);
    } else {
      if (fs.existsSync(destPath)) {
        fs.unlinkSync(destPath);
      }
      fs.renameSync(srcPath, destPath);
    }
  }
  // remove empty source directory
  try {
    fs.rmdirSync(src);
  } catch {}
}

function moveFile(src, dest) {
  if (!fs.existsSync(src)) return;
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
  fs.renameSync(src, dest);
}

// 1. Move folders to assets/
const assetsDest = path.join(publicDir, 'assets');
const toAssets = ['icons', 'images', 'mockups', 'partners'];
for (const folder of toAssets) {
  console.log(`Moving folder ${folder}...`);
  moveFolder(path.join(publicDir, folder), path.join(assetsDest, folder));
}

// Move root files to assets/
const rootFilesToAssets = ['Logo.svg', 'footer-logo.svg', 'favicon.svg', 'hero-blur.svg'];
for (const file of rootFilesToAssets) {
  console.log(`Moving root file ${file}...`);
  moveFile(path.join(publicDir, file), path.join(assetsDest, file));
}

// Move folders to _originals/
const originalsDest = path.join(publicDir, '_originals');
const toOriginals = ['planets', 'videos', 'work', 'lead', 'projects', 'services'];
for (const folder of toOriginals) {
  console.log(`Archiving folder ${folder}...`);
  moveFolder(path.join(publicDir, folder), path.join(originalsDest, folder));
}

// Move root footer.svg to _originals/
console.log(`Archiving root footer.svg...`);
moveFile(path.join(publicDir, 'footer.svg'), path.join(originalsDest, 'footer.svg'));

// 2. Find and replace in src/
const replacements = [
  [/"\/icons\//g, '"/assets/icons/'],
  [/'\/icons\//g, "'/assets/icons/"],
  [/"\/images\//g, '"/assets/images/'],
  [/'\/images\//g, "'/assets/images/"],
  [/"\/mockups\//g, '"/assets/mockups/'],
  [/'\/mockups\//g, "'/assets/mockups/"],
  [/"\/partners\//g, '"/assets/partners/'],
  [/'\/partners\//g, "'/assets/partners/"],
  
  [/"\/Logo\.svg"/g, '"/assets/Logo.svg"'],
  [/'\/Logo\.svg'/g, "'/assets/Logo.svg'"],
  [/"\/footer-logo\.svg"/g, '"/assets/footer-logo.svg"'],
  [/'\/footer-logo\.svg'/g, "'/assets/footer-logo.svg'"],
  [/"\/favicon\.svg"/g, '"/assets/favicon.svg"'],
  [/'\/favicon\.svg'/g, "'/assets/favicon.svg'"],
  [/"\/hero-blur\.svg"/g, '"/assets/hero-blur.svg"'],
  [/'\/hero-blur\.svg'/g, "'/assets/hero-blur.svg'"]
];

function walk(dir) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      walk(filePath);
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.json')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        for (const [regex, replacement] of replacements) {
          if (regex.test(content)) {
            content = content.replace(regex, replacement);
            modified = true;
          }
        }
        if (modified) {
          console.log(`Updating references in ${filePath}`);
          fs.writeFileSync(filePath, content, 'utf8');
        }
      }
    }
  }
}

console.log('Scanning src directory for path replacements...');
walk(srcDir);
console.log('Reorganization completed!');
