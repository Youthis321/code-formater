<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# CodeToPrint - Universal Code Formatter

## Project Overview
This is a web application built with Elysia.js that formats and displays code from multiple programming languages in a print-friendly format.

## Technology Stack
- **Backend**: Elysia.js (TypeScript)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Syntax Highlighting**: Prism.js
- **Runtime**: Bun

## Supported Languages
- Python (.py)
- JavaScript (.js, .jsx)
- TypeScript (.ts, .tsx)
- HTML (.html, .htm)
- CSS (.css)
- Java (.java)
- JSON (.json)
- PHP (.php)
- C++ (.cpp)
- C# (.cs)
- And more...

## Key Features
- File upload support for multiple code file types
- Syntax highlighting with Prism.js
- Print-friendly formatting
- Dark/Light theme toggle
- Customizable display settings (font size, line height, max width)
- Line numbers toggle
- Word wrap option
- Copy to clipboard functionality
- Drag and drop file upload
- Keyboard shortcuts

## Code Style Guidelines
- Use TypeScript for backend development
- Follow modern ES6+ syntax
- Use async/await for asynchronous operations
- Implement proper error handling
- Use semantic HTML structure
- Follow responsive design principles
- Use CSS Grid and Flexbox for layouts
- Implement proper accessibility features

## File Structure
- `/public/` - Static files (HTML, CSS, JS)
- `/src/` - Source code (if needed for additional utilities)
- `index.ts` - Main Elysia.js server file
- `package.json` - Project dependencies and scripts

## Development Notes
- The application uses Bun as the runtime
- Elysia.js serves static files and provides API endpoints
- Frontend is vanilla JavaScript for simplicity and performance
- Prism.js handles syntax highlighting for multiple languages
- Print styles are optimized for code printing

## API Endpoints
- `GET /` - Main application page
- `POST /api/format` - Code formatting endpoint (for future enhancements)
- Static files served from `/static/` prefix

## Customization
- Theme system supports light and dark modes
- Settings panel allows real-time preview adjustments
- Extensible language support through Prism.js plugins
- Responsive design works on mobile and desktop
