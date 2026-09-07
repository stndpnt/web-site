#!/usr/bin/env node
/* StandPoint — regenerate the FAQPage JSON-LD in faq/index.html (and dist/faq/index.html
   if present) from the page's own accordion markup, so the schema can never drift from
   the visible questions and answers. Run: npm run faq:schema */
const fs = require('fs');
const path = require('path');

const decode = s => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  .replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();

const MARKER = /<script type="application\/ld\+json" id="faq-schema">[\s\S]*?<\/script>\n/;

function build(html) {
  const items = html.match(/<details class="faq-item">[\s\S]*?<\/details>/g) || [];
  const mainEntity = items.map(block => {
    const q = decode((block.match(/<summary>\s*<span>([\s\S]*?)<\/span>/) || [])[1] || '');
    const ps = [...block.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => decode(m[1])).filter(Boolean);
    if (!q || !ps.length) throw new Error('Could not parse a FAQ item: ' + block.slice(0, 80));
    return { '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: ps.join(' ') } };
  });
  if (!mainEntity.length) throw new Error('No FAQ items found — check the accordion markup.');
  const json = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }, null, 2);
  return { block: '<script type="application/ld+json" id="faq-schema">\n' + json + '\n</script>\n', count: mainEntity.length };
}

const targets = ['faq/index.html', 'dist/faq/index.html']
  .map(p => path.join(process.cwd(), p))
  .filter(p => fs.existsSync(p));

for (const file of targets) {
  let html = fs.readFileSync(file, 'utf8');
  const { block, count } = build(html);
  html = MARKER.test(html) ? html.replace(MARKER, block) : html.replace('</body>', block + '</body>');
  fs.writeFileSync(file, html);
  console.log('FAQPage schema: ' + count + ' questions -> ' + path.relative(process.cwd(), file));
}
