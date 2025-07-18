import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';
import { readFileSync } from 'fs';
import { join } from 'path';

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: 'public',
    prefix: '/static'
  }))
  .get('/', () => {
    try {
      const indexPath = join(process.cwd(), 'public', 'index.html');
      const htmlContent = readFileSync(indexPath, 'utf-8');
      return new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html' }
      });
    } catch (error) {
      return new Response('File not found', { status: 404 });
    }
  })
  // Handle install test page
  .get('/install-test', () => {
    try {
      const testPath = join(process.cwd(), 'public', 'install-test.html');
      const htmlContent = readFileSync(testPath, 'utf-8');
      return new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html' }
      });
    } catch (error) {
      return new Response('Install test page not found', { status: 404 });
    }
  })
  // Handle android ready page
  .get('/android-ready', () => {
    try {
      const readyPath = join(process.cwd(), 'public', 'android-ready.html');
      const htmlContent = readFileSync(readyPath, 'utf-8');
      return new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html' }
      });
    } catch (error) {
      return new Response('Android ready page not found', { status: 404 });
    }
  })
  // Handle all HTML files in public directory
  .get('/*.html', ({ params }: { params: Record<string, string> }) => {
    try {
      const fileName = params['*'] + '.html';
      const filePath = join(process.cwd(), 'public', fileName);
      const htmlContent = readFileSync(filePath, 'utf-8');
      return new Response(htmlContent, {
        headers: { 'Content-Type': 'text/html' }
      });
    } catch (error) {
      return new Response('File not found', { status: 404 });
    }
  })
  // Handle manifest.json and other JSON files
  .get('/manifest.json', () => {
    try {
      const manifestPath = join(process.cwd(), 'public', 'manifest.json');
      const manifestContent = readFileSync(manifestPath, 'utf-8');
      return new Response(manifestContent, {
        headers: { 'Content-Type': 'application/manifest+json' }
      });
    } catch (error) {
      return new Response('Manifest not found', { status: 404 });
    }
  })
  // Handle service worker
  .get('/sw.js', () => {
    try {
      const swPath = join(process.cwd(), 'public', 'sw.js');
      const swContent = readFileSync(swPath, 'utf-8');
      return new Response(swContent, {
        headers: { 
          'Content-Type': 'application/javascript',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Service-Worker-Allowed': '/'
        }
      });
    } catch (error) {
      return new Response('Service worker not found', { status: 404 });
    }
  })
  // Handle CSS files
  .get('/*.css', ({ params }: { params: Record<string, string> }) => {
    try {
      const fileName = params['*'] + '.css';
      const filePath = join(process.cwd(), 'public', fileName);
      const cssContent = readFileSync(filePath, 'utf-8');
      return new Response(cssContent, {
        headers: { 'Content-Type': 'text/css' }
      });
    } catch (error) {
      return new Response('CSS file not found', { status: 404 });
    }
  })
  // Handle JS files
  .get('/*.js', ({ params }: { params: Record<string, string> }) => {
    try {
      const fileName = params['*'] + '.js';
      const filePath = join(process.cwd(), 'public', fileName);
      const jsContent = readFileSync(filePath, 'utf-8');
      return new Response(jsContent, {
        headers: { 'Content-Type': 'application/javascript' }
      });
    } catch (error) {
      return new Response('JS file not found', { status: 404 });
    }
  })
  // Handle icons and SVG files
  .get('/icons/*', ({ params }: { params: Record<string, string> }) => {
    try {
      const filePath = join(process.cwd(), 'public', 'icons', params['*']);
      const content = readFileSync(filePath);
      
      const ext = filePath.split('.').pop()?.toLowerCase();
      const contentType = ext === 'svg' ? 'image/svg+xml' : 'image/png';
      
      return new Response(content, {
        headers: { 'Content-Type': contentType }
      });
    } catch (error) {
      return new Response('Icon not found', { status: 404 });
    }
  })
  // Handle other static files
  .get('/*', ({ params }: { params: Record<string, string> }) => {
    try {
      const fileName = params['*'];
      const filePath = join(process.cwd(), 'public', fileName);
      const content = readFileSync(filePath);
      
      // Determine content type
      const ext = filePath.split('.').pop()?.toLowerCase();
      const contentTypes: Record<string, string> = {
        'css': 'text/css',
        'js': 'application/javascript',
        'html': 'text/html',
        'json': 'application/json',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon',
        'txt': 'text/plain',
        'xml': 'application/xml'
      };
      
      const contentType = contentTypes[ext || ''] || 'application/octet-stream';
      
      return new Response(content, {
        headers: { 'Content-Type': contentType }
      });
    } catch (error) {
      return new Response('File not found', { status: 404 });
    }
  })
  .post('/api/format', async ({ body }: { body: any }) => {
    try {
      const { code, language, settings } = body;
      
      // Basic formatting logic
      const formattedCode = {
        original: code,
        language: language,
        lines: code.split('\n').length,
        formatted: code,
        settings: settings,
        timestamp: new Date().toISOString()
      };
      
      return {
        success: true,
        data: formattedCode
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to format code'
      };
    }
  });

// For Vercel deployment
const port = process.env.PORT || 3000;

// Export for Vercel
export default app;

// Start server for local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port);
  console.log(`🚀 CodeToPrint server is running on http://localhost:${port}`);
} else {
  console.log('🚀 CodeToPrint is running in production mode');
}