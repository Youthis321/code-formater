const { readFileSync } = require('fs');
const { join } = require('path');

module.exports = (req, res) => {
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
