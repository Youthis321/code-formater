import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;

  try {
    // Handle static files
    if (url.startsWith('/static/')) {
      const filePath = url.replace('/static/', '');
      const fullPath = join(__dirname, '..', 'public', filePath);
      
      try {
        const content = readFileSync(fullPath);
        const ext = filePath.split('.').pop()?.toLowerCase();
        
        const contentTypes = {
          'css': 'text/css',
          'js': 'application/javascript',
          'html': 'text/html',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'ico': 'image/x-icon'
        };
        
        const contentType = contentTypes[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.status(200).send(content);
        return;
      } catch (error) {
        res.status(404).json({ error: 'File not found' });
        return;
      }
    }

    // Handle Service Worker
    if (url === '/sw.js') {
      try {
        const swPath = join(__dirname, '..', 'public', 'sw.js');
        const swContent = readFileSync(swPath, 'utf-8');
        res.setHeader('Content-Type', 'application/javascript');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Service-Worker-Allowed', '/');
        res.status(200).send(swContent);
        return;
      } catch (error) {
        res.status(404).json({ error: 'Service Worker not found' });
        return;
      }
    }

    // Handle Web App Manifest
    if (url === '/manifest.json') {
      try {
        const manifestPath = join(__dirname, '..', 'public', 'manifest.json');
        const manifestContent = readFileSync(manifestPath, 'utf-8');
        res.setHeader('Content-Type', 'application/manifest+json');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.status(200).send(manifestContent);
        return;
      } catch (error) {
        res.status(404).json({ error: 'Manifest not found' });
        return;
      }
    }

    // Handle PWA icons
    if (url.startsWith('/icons/')) {
      const iconPath = url.replace('/icons/', '');
      const fullPath = join(__dirname, '..', 'public', 'icons', iconPath);
      
      try {
        const content = readFileSync(fullPath);
        const ext = iconPath.split('.').pop()?.toLowerCase();
        
        const contentType = ext === 'svg' ? 'image/svg+xml' : 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=31536000');
        res.status(200).send(content);
        return;
      } catch (error) {
        res.status(404).json({ error: 'Icon not found' });
        return;
      }
    }

    // Handle PWA test pages
    if (url === '/pwa-test.html' || url === '/install-test' || url === '/android-ready') {
      let fileName = '';
      if (url === '/pwa-test.html') fileName = 'pwa-test.html';
      else if (url === '/install-test') fileName = 'install-test.html';
      else if (url === '/android-ready') fileName = 'android-ready.html';
      
      try {
        const testPath = join(__dirname, '..', 'public', fileName);
        const htmlContent = readFileSync(testPath, 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);
        return;
      } catch (error) {
        res.status(404).json({ error: `${fileName} not found` });
        return;
      }
    }

    // Handle other HTML files in public directory
    if (url.endsWith('.html')) {
      const fileName = url.substring(1); // Remove leading slash
      try {
        const filePath = join(__dirname, '..', 'public', fileName);
        const htmlContent = readFileSync(filePath, 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);
        return;
      } catch (error) {
        res.status(404).json({ error: 'HTML file not found' });
        return;
      }
    }

    // Handle other static files from public directory
    if (url !== '/' && !url.startsWith('/api/')) {
      const fileName = url.substring(1); // Remove leading slash
      const fullPath = join(__dirname, '..', 'public', fileName);
      
      try {
        const content = readFileSync(fullPath);
        const ext = fileName.split('.').pop()?.toLowerCase();
        
        const contentTypes = {
          'css': 'text/css',
          'js': 'application/javascript',
          'html': 'text/html',
          'png': 'image/png',
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'svg': 'image/svg+xml',
          'ico': 'image/x-icon',
          'txt': 'text/plain',
          'xml': 'application/xml'
        };
        
        const contentType = contentTypes[ext] || 'application/octet-stream';
        res.setHeader('Content-Type', contentType);
        
        // Set appropriate cache headers
        if (['css', 'js', 'svg', 'png', 'jpg', 'jpeg', 'ico'].includes(ext)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
        
        res.status(200).send(content);
        return;
      } catch (error) {
        // Continue to next handler
      }
    }

    // Handle API routes
    if (url.startsWith('/api/format') && method === 'POST') {
      let body = '';
      
      req.on('data', chunk => {
        body += chunk.toString();
      });
      
      req.on('end', () => {
        try {
          const { code, language, settings } = JSON.parse(body);
          
          const formattedCode = {
            original: code,
            language: language,
            lines: code.split('\n').length,
            formatted: code,
            settings: settings,
            timestamp: new Date().toISOString()
          };
          
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json({
            success: true,
            data: formattedCode
          });
        } catch (error) {
          res.status(500).json({
            success: false,
            error: 'Failed to format code'
          });
        }
      });
      return;
    }

    // Handle main page
    if (url === '/' || url === '/index.html') {
      try {
        const indexPath = join(__dirname, '..', 'public', 'index.html');
        const htmlContent = readFileSync(indexPath, 'utf-8');
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(htmlContent);
        return;
      } catch (error) {
        res.status(404).json({ error: 'Page not found' });
        return;
      }
    }

    // Default 404
    res.status(404).json({ error: 'Not found' });
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
