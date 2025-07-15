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
  .get('/static/*', ({ params }) => {
    try {
      const filePath = join(process.cwd(), 'public', params['*']);
      const content = readFileSync(filePath);
      
      // Determine content type
      const ext = filePath.split('.').pop()?.toLowerCase();
      const contentTypes: Record<string, string> = {
        'css': 'text/css',
        'js': 'application/javascript',
        'html': 'text/html',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'svg': 'image/svg+xml',
        'ico': 'image/x-icon'
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