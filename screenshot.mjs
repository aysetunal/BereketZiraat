import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const puppeteer = require('C:/Users/AYSE/AppData/Local/Temp/puppeteer-test/node_modules/puppeteer');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Find next available screenshot number
function nextIndex(label) {
  const files = fs.readdirSync(screenshotsDir);
  let max = 0;
  for (const f of files) {
    const m = f.match(/^screenshot-(\d+)/);
    if (m) max = Math.max(max, parseInt(m[1]));
  }
  const n = max + 1;
  const suffix = label ? `-${label}` : '';
  return path.join(screenshotsDir, `screenshot-${n}${suffix}.png`);
}

const args  = process.argv.slice(2);
const fullPage = args.includes('--full');
const positional = args.filter(a => !a.startsWith('--'));
const url   = positional[0] || 'http://localhost:3000';
const label = positional[1] || '';
const outPath = nextIndex(label);

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Scroll through page to trigger IntersectionObserver, then scroll back
await page.evaluate(async () => {
  await new Promise(resolve => {
    let pos = 0;
    const step = () => {
      pos += 600;
      window.scrollTo(0, pos);
      if (pos < document.body.scrollHeight) {
        setTimeout(step, 80);
      } else {
        window.scrollTo(0, 0);
        setTimeout(resolve, 600);
      }
    };
    step();
  });
});
// Allow fonts/animations to settle
await new Promise(r => setTimeout(r, 1000));

await page.screenshot({ path: outPath, fullPage });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
