import { Elysia } from 'elysia';
import { staticPlugin } from '@elysiajs/static';
import { html } from '@elysiajs/html';

const app = new Elysia()
  .use(html())
  .use(staticPlugin({
    assets: 'public',
    prefix: '/static'
  }))
  .get('/', () => {
    return Bun.file('public/index.html');
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
        settings: settings
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
  })
  .listen(3000);

console.log('🚀 CodeToPrint server is running on http://localhost:3000');