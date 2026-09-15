import { chromium } from '@playwright/test';
import { readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const documentUrl = new URL('../documents/kateh-agreement.html', import.meta.url);
const font = await readFile(new URL('../public/fonts/Vazirmatn.woff2', import.meta.url));
const source = (await readFile(documentUrl, 'utf8')).replace('../public/fonts/Vazirmatn.woff2', `data:font/woff2;base64,${font.toString('base64')}`);
const browser = await chromium.launch({ channel: 'msedge', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 1300 }, deviceScaleFactor: 1 });
  await page.setContent(source, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: 'print' });
  const layout = await page.locator('.sheet').evaluateAll((sheets) => sheets.map((sheet, index) => {
    const footer = sheet.querySelector('.page-footer').getBoundingClientRect();
    const content = [...sheet.children].filter((child) => !child.classList.contains('page-footer'));
    const bottom = Math.max(...content.map((child) => child.getBoundingClientRect().bottom));
    return { page: index + 1, gapBeforeFooter: Math.round(footer.top - bottom), overflow: sheet.scrollHeight > sheet.clientHeight + 1 };
  }));
  if (layout.some((item) => item.gapBeforeFooter < 10 || item.overflow)) throw new Error(`Document overflow: ${JSON.stringify(layout)}`);
  await page.pdf({ path: fileURLToPath(new URL('../documents/kateh-agreement.pdf', import.meta.url)), format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
  const previews = new URL('../test-results/agreement/', import.meta.url);
  await mkdir(previews, { recursive: true });
  for (const [index, sheet] of (await page.locator('.sheet').all()).entries()) {
    await sheet.screenshot({ path: fileURLToPath(new URL(`page-${index + 1}.png`, previews)) });
  }
  const pdf = await readFile(new URL('../documents/kateh-agreement.pdf', import.meta.url));
  const raw = pdf.toString('latin1');
  const pages = (raw.match(/\/Type\s*\/Page\b/g) || []).length;
  // Chromium may embed variable-font glyphs as Type 3 CharProcs instead of FontFile streams.
  const embeddedFont = /\/FontFile[23]?\b/.test(raw) || (/\/Subtype\s*\/Type3\b/.test(raw) && /\/CharProcs\b/.test(raw) && /\/ToUnicode\b/.test(raw));
  if (pages !== 2 || !embeddedFont) throw new Error(`PDF verification failed: pages=${pages}, embeddedFont=${embeddedFont}`);
  console.log(JSON.stringify({ pdf: 'documents/kateh-agreement.pdf', pages, embeddedFont, bytes: pdf.length, layout }, null, 2));
} finally {
  await browser.close();
}
