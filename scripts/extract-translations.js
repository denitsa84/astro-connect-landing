/**
 * extract-translations.js
 *
 * Extracts the inline T and AUTHOR_T objects from index.html
 * into separate JSON files per language in locales/
 *
 * Usage: node scripts/extract-translations.js
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const outDir = path.join(__dirname, '..', 'locales');

console.log('Reading index.html...');
const html = fs.readFileSync(htmlPath, 'utf8');

// --- Extract T object ---
// Find "const T = {" and its matching closing "};"
const tStart = html.indexOf('const T = {');
if (tStart === -1) {
  console.error('ERROR: Could not find "const T = {" in index.html');
  process.exit(1);
}

// Find the closing "};" by tracking brace depth
let braceDepth = 0;
let tEnd = -1;
for (let i = tStart + 'const T = '.length; i < html.length; i++) {
  if (html[i] === '{') braceDepth++;
  else if (html[i] === '}') {
    braceDepth--;
    if (braceDepth === 0) {
      tEnd = i + 1; // include the closing }
      break;
    }
  }
}

if (tEnd === -1) {
  console.error('ERROR: Could not find closing of T object');
  process.exit(1);
}

const tBlock = html.substring(tStart + 'const T = '.length, tEnd);

let T;
try {
  T = eval('(' + tBlock + ')');
} catch (e) {
  console.error('ERROR: Failed to parse T object:', e.message);
  process.exit(1);
}

console.log('T object parsed: ' + Object.keys(T).length + ' languages');

// --- Extract AUTHOR_T object ---
const aStart = html.indexOf('const AUTHOR_T = {');
if (aStart === -1) {
  console.error('ERROR: Could not find "const AUTHOR_T = {" in index.html');
  process.exit(1);
}

braceDepth = 0;
let aEnd = -1;
for (let i = aStart + 'const AUTHOR_T = '.length; i < html.length; i++) {
  if (html[i] === '{') braceDepth++;
  else if (html[i] === '}') {
    braceDepth--;
    if (braceDepth === 0) {
      aEnd = i + 1;
      break;
    }
  }
}

if (aEnd === -1) {
  console.error('ERROR: Could not find closing of AUTHOR_T object');
  process.exit(1);
}

const aBlock = html.substring(aStart + 'const AUTHOR_T = '.length, aEnd);

let AUTHOR_T;
try {
  AUTHOR_T = eval('(' + aBlock + ')');
} catch (e) {
  console.error('ERROR: Failed to parse AUTHOR_T object:', e.message);
  process.exit(1);
}

console.log('AUTHOR_T parsed: ' + Object.keys(AUTHOR_T).length + ' languages');

// --- Write JSON files ---
fs.mkdirSync(outDir, { recursive: true });

const langs = Object.keys(T);
for (const lang of langs) {
  const data = { ...T[lang] };

  // Merge AUTHOR_T into main translations
  if (AUTHOR_T[lang]) {
    data.authorRole = AUTHOR_T[lang].role || '';
    data.authorBio = AUTHOR_T[lang].bio || '';
  }

  const filePath = path.join(outDir, lang + '.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  const keyCount = Object.keys(data).length;
  const hasSignsObj = data.signs && typeof data.signs === 'object';
  console.log('  ' + lang + '.json — ' + keyCount + ' keys' + (hasSignsObj ? ' (signs: ' + Object.keys(data.signs).length + ' entries)' : ''));
}

console.log('\nDone! ' + langs.length + ' JSON files written to locales/');
