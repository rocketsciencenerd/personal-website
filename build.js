#!/usr/bin/env node
const fs = require('fs');

const nav = fs.readFileSync('_partials/nav.html', 'utf8');
const footer = fs.readFileSync('_partials/footer.html', 'utf8');

const pages = [
  { src: '_pages/index.html',       out: 'index.html',       active: 'index',       navClass: 'nav-overlay' },
  { src: '_pages/portfolio.html',   out: 'portfolio.html',   active: 'portfolio',   navClass: 'nav-overlay' },
  { src: '_pages/resume.html',      out: 'resume.html',      active: 'resume',      navClass: '' },
  { src: '_pages/giving-back.html', out: 'giving-back.html', active: 'giving-back', navClass: 'nav-overlay' },
  { src: '_pages/contact.html',     out: 'contact.html',     active: 'contact',     navClass: '' },
];

for (const page of pages) {
  const src = fs.readFileSync(page.src, 'utf8');

  // Set active link and nav overlay class
  const builtNav = nav
    .replace(`data-page="${page.active}"`, `data-page="${page.active}" class="active"`)
    .replace('{{NAV_CLASS}}', page.navClass);

  const html = src
    .replace('{{NAV}}', builtNav)
    .replace('{{FOOTER}}', footer);

  fs.writeFileSync(page.out, html);
  console.log(`✓ ${page.out}`);
}
