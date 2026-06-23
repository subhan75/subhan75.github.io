import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distClient = path.join(projectRoot, 'dist', 'client');
const assetsDir = path.join(distClient, 'assets');

// Read all files in the assets directory
const files = fs.readdirSync(assetsDir);

// Find the main JS and CSS files
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));

if (!jsFile || !cssFile) {
  console.error('Could not find built assets!');
  process.exit(1);
}

// Create the HTML content
const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Subhan Shaikh — AI Engineer</title>
    <meta
      name="description"
      content="Subhan Shaikh — AI Engineer building production LLM systems: RAG pipelines, multi-agent architectures, and evaluation infrastructure."
    />
    <link rel="stylesheet" href="/assets/${cssFile}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
  </body>
</html>
`;

// Write the HTML file to dist/client
fs.writeFileSync(path.join(distClient, 'index.html'), html);
console.log('✓ Generated index.html with asset references');
