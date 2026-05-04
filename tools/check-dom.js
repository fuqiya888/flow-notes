const fs = require('fs');
const html = fs.readFileSync('C:/Users/tianq/flow-notes/index.html', 'utf8');
const js = fs.readFileSync('C:/Users/tianq/flow-notes/js/app.js', 'utf8');

const refs = [...js.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]);
const missing = refs.filter(id => {
  const re = new RegExp('id="' + id + '"');
  return !re.test(html);
});

console.log('Total DOM refs:', refs.length);
console.log('Missing:', missing.length ? missing : 'None (all good)');
