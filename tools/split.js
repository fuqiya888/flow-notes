// 拆分 index.html 的 CSS 和 JS 到独立文件
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

// 提取 CSS (<style>...</style>)
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) { console.log('No <style> found'); process.exit(1); }
const css = styleMatch[1].replace(/^\n/, '').trim();

// 提取 JS (<script>...</script>)  
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) { console.log('No <script> found'); process.exit(1); }
const js = scriptMatch[1].replace(/^\n/, '').trim();

// 写 CSS
fs.writeFileSync(path.join(__dirname, '..', 'css', 'style.css'), css);
console.log('css/style.css written (' + css.length + ' chars)');

// 写 JS
fs.writeFileSync(path.join(__dirname, '..', 'js', 'app.js'), js);
console.log('js/app.js written (' + js.length + ' chars)');

// 替换 HTML：<style> → <link>, <script> → <script src>
let newHtml = html
  .replace(/<style>[\s\S]*?<\/style>/, '<link rel="stylesheet" href="/css/style.css">')
  .replace(/<script>[\s\S]*?<\/script>/, '<script src="/js/app.js"></script>');

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), newHtml);
console.log('index.html updated (' + newHtml.length + ' chars)');
