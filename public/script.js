// Prism.js language mapping
const LANGUAGE_MAP = {
    'py': 'python',
    'js': 'javascript',
    'jsx': 'jsx',
    'ts': 'typescript',
    'tsx': 'tsx',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'java': 'java',
    'json': 'json',
    'xml': 'xml',
    'php': 'php',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'go': 'go',
    'rb': 'ruby',
    'swift': 'swift',
    'kt': 'kotlin'
};

// DOM Elements
const codeFileInput = document.getElementById('codeFile');
const languageSelect = document.getElementById('languageSelect');
const themeSelect = document.getElementById('themeSelect');
const codeInput = document.getElementById('codeInput');
const formatBtn = document.getElementById('formatBtn');
const clearBtn = document.getElementById('clearBtn');
const printBtn = document.getElementById('printBtn');
const copyBtn = document.getElementById('copyBtn');
const copyInputBtn = document.getElementById('copyInputBtn');
const pasteInputBtn = document.getElementById('pasteInputBtn');
const previewCodeBtn = document.getElementById('previewCodeBtn');
const downloadImageBtn = document.getElementById('downloadImageBtn');
const previewModal = document.getElementById('previewModal');
const closeModal = document.getElementById('closeModal');
const closePreview = document.getElementById('closePreview');
const downloadFromPreview = document.getElementById('downloadFromPreview');
const previewTitle = document.getElementById('previewTitle');
const previewFormattedCode = document.getElementById('previewFormattedCode');
const previewSection = document.getElementById('previewSection');
const formattedCode = document.getElementById('formattedCode');
const codeInfo = document.getElementById('codeInfo');

// Settings
const fontSizeSlider = document.getElementById('fontSize');
const lineHeightSlider = document.getElementById('lineHeight');
const maxWidthSlider = document.getElementById('maxWidth');
const showLineNumbersCheck = document.getElementById('showLineNumbers');
const wrapCodeCheck = document.getElementById('wrapCode');

// Value displays
const fontSizeValue = document.getElementById('fontSizeValue');
const lineHeightValue = document.getElementById('lineHeightValue');
const maxWidthValue = document.getElementById('maxWidthValue');

// CodeMirror elements
const codeEditor = document.getElementById('codeEditor');
const codeEditorContainer = document.getElementById('codeEditorContainer');
const codeInputSection = document.getElementById('codeInputSection');
const fullscreenBtn = document.getElementById('fullscreenBtn');

// State
let currentCode = '';
let currentLanguage = 'python';
let currentTheme = 'light';
let editorView = null; // CodeMirror editor instance
let isFullscreen = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateSettingsDisplay();
    loadExampleCode();
    initializeToggleFunctionality(); // Add toggle functionality
});

// Wait for Ace Editor to load
window.addEventListener('ace-ready', function() {
    initializeAceEditor();
});

// Initialize Ace Editor
function initializeAceEditor() {
    try {
        console.log('Initializing Ace Editor...');
        
        // Setup Ace Editor
        editorView = ace.edit("codeEditor");
        
        // Configure editor
        editorView.setTheme("ace/theme/github");
        editorView.session.setMode("ace/mode/python");
        editorView.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, Courier New, monospace',
            showPrintMargin: false,
            wrap: false,
            tabSize: 4,
            useSoftTabs: true
        });

        // Set initial content
        const initialContent = codeInput.value || `# Contoh Kode Python - Kalkulator Sederhana
def kalkulator():
    print("=== KALKULATOR SEDERHANA ===")
    print("Operasi yang tersedia:")
    print("1. Penjumlahan (+)")
    print("2. Pengurangan (-)")
    print("3. Perkalian (*)")
    print("4. Pembagian (/)")
    
    try:
        # Input angka pertama
        angka1 = float(input("Masukkan angka pertama: "))
        
        # Input operasi
        operasi = input("Masukkan operasi (+, -, *, /): ")
        
        # Input angka kedua
        angka2 = float(input("Masukkan angka kedua: "))
        
        # Proses perhitungan
        if operasi == '+':
            hasil = angka1 + angka2
            print(f"Hasil: {angka1} + {angka2} = {hasil}")
        elif operasi == '-':
            hasil = angka1 - angka2
            print(f"Hasil: {angka1} - {angka2} = {hasil}")
        elif operasi == '*':
            hasil = angka1 * angka2
            print(f"Hasil: {angka1} * {angka2} = {hasil}")
        elif operasi == '/':
            if angka2 != 0:
                hasil = angka1 / angka2
                print(f"Hasil: {angka1} / {angka2} = {hasil}")
            else:
                print("Error: Pembagian dengan nol tidak diperbolehkan!")
        else:
            print("Error: Operasi tidak valid!")
            
    except ValueError:
        print("Error: Input harus berupa angka!")
    except Exception as e:
        print(f"Error tidak terduga: {e}")

# Menjalankan program
if __name__ == "__main__":
    kalkulator()`;
        
        editorView.setValue(initialContent);
        editorView.clearSelection();
        currentCode = initialContent;

        // Listen to changes
        editorView.on('change', function() {
            currentCode = editorView.getValue();
            codeInput.value = currentCode;
        });

        // Hide textarea, show editor
        codeInput.style.display = 'none';
        codeEditor.style.display = 'block';

        // Add keyboard shortcuts
        editorView.commands.addCommand({
            name: 'toggleFullscreen',
            bindKey: { win: 'F11', mac: 'F11' },
            exec: function(editor) {
                toggleFullscreen();
            }
        });

        editorView.commands.addCommand({
            name: 'exitFullscreen',
            bindKey: { win: 'Escape', mac: 'Escape' },
            exec: function(editor) {
                if (isFullscreen) {
                    toggleFullscreen();
                }
            }
        });

        console.log('Ace Editor initialized successfully');

    } catch (error) {
        console.error('Failed to initialize Ace Editor:', error);
        // Fallback to textarea
        codeInput.style.display = 'block';
        codeEditor.style.display = 'none';
    }
}

// Update Ace Editor language
function updateCodeMirrorLanguage(language) {
    if (!editorView || typeof ace === 'undefined') {
        console.log('Ace Editor not available for language update');
        return;
    }

    try {
        // Map languages to Ace modes
        const langMap = {
            'javascript': 'ace/mode/javascript',
            'python': 'ace/mode/python',
            'html': 'ace/mode/html',
            'css': 'ace/mode/css',
            'java': 'ace/mode/java',
            'json': 'ace/mode/json',
            'php': 'ace/mode/php',
            'cpp': 'ace/mode/c_cpp',
            'typescript': 'ace/mode/typescript'
        };

        const mode = langMap[language] || 'ace/mode/text';
        editorView.session.setMode(mode);
        console.log('Language updated to:', language);

    } catch (error) {
        console.error('Failed to update language:', error);
    }
}

// Update Ace Editor theme
function updateCodeMirrorTheme(theme) {
    currentTheme = theme;
    
    // Update body class for CSS styling
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }

    // Update Ace Editor theme if editor exists
    if (editorView && typeof ace !== 'undefined') {
        try {
            const aceTheme = theme === 'dark' ? 'ace/theme/monokai' : 'ace/theme/github';
            editorView.setTheme(aceTheme);
        } catch (error) {
            console.error('Failed to update theme:', error);
        }
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    isFullscreen = !isFullscreen;
    
    if (isFullscreen) {
        codeInputSection.classList.add('fullscreen');
        fullscreenBtn.innerHTML = '🔲 Exit Fullscreen';
        fullscreenBtn.title = 'Exit Fullscreen (Escape or F11)';
        
        // Focus editor
        if (editorView && typeof ace !== 'undefined') {
            editorView.focus();
        }
    } else {
        codeInputSection.classList.remove('fullscreen');
        fullscreenBtn.innerHTML = '🔳 Fullscreen';
        fullscreenBtn.title = 'Toggle Fullscreen Editor (F11)';
    }

    // Resize Ace Editor if available
    if (editorView && typeof ace !== 'undefined') {
        setTimeout(() => {
            editorView.resize();
        }, 100);
    }
}

// Set editor content
function setEditorContent(content) {
    if (editorView && typeof ace !== 'undefined') {
        try {
            editorView.setValue(content);
            editorView.clearSelection();
        } catch (error) {
            console.error('Failed to update editor content:', error);
            // Fallback to textarea
            codeInput.value = content;
        }
    } else {
        // Fallback to textarea
        codeInput.value = content;
    }
    currentCode = content;
}

// Get editor content
function getEditorContent() {
    if (editorView && typeof ace !== 'undefined') {
        try {
            return editorView.getValue();
        } catch (error) {
            console.error('Failed to get editor content:', error);
            return codeInput.value;
        }
    }
    return codeInput.value;
}

function setupEventListeners() {
    // File upload
    codeFileInput.addEventListener('change', handleFileUpload);
    
    // Language selection
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updateCodeMirrorLanguage(currentLanguage);
        updatePreview();
    });
    
    // Theme selection
    themeSelect.addEventListener('change', function() {
        updateCodeMirrorTheme(this.value);
        toggleTheme(this.value);
    });
    
    // Code input (fallback for textarea)
    codeInput.addEventListener('input', function() {
        if (!editorView) {
            currentCode = this.value;
        }
    });
    
    // Fullscreen button
    fullscreenBtn.addEventListener('click', toggleFullscreen);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        } else if (e.key === 'Escape' && isFullscreen) {
            e.preventDefault();
            toggleFullscreen();
        }
    });
    
    // Buttons
    formatBtn.addEventListener('click', formatCode);
    clearBtn.addEventListener('click', clearCode);
    printBtn.addEventListener('click', printCode);
    copyBtn.addEventListener('click', copyCode);
    copyInputBtn.addEventListener('click', copyInputCode);
    pasteInputBtn.addEventListener('click', pasteToInput);
    previewCodeBtn.addEventListener('click', showPreviewModal);
    downloadImageBtn.addEventListener('click', downloadAsImage);
    
    // Download formatted button (with line numbers and word wrap)
    const downloadFormattedBtn = document.getElementById('downloadFormattedBtn');
    downloadFormattedBtn.addEventListener('click', downloadAsImageFormatted);
    
    // Modal events
    closeModal.addEventListener('click', hidePreviewModal);
    closePreview.addEventListener('click', hidePreviewModal);
    downloadFromPreview.addEventListener('click', downloadFromPreviewModal);
    
    // Download formatted from preview
    const downloadFormattedFromPreview = document.getElementById('downloadFormattedFromPreview');
    downloadFormattedFromPreview.addEventListener('click', downloadFormattedFromPreviewModal);
    
    // Settings sliders
    fontSizeSlider.addEventListener('input', updateFontSize);
    lineHeightSlider.addEventListener('input', updateLineHeight);
    maxWidthSlider.addEventListener('input', updateMaxWidth);
    showLineNumbersCheck.addEventListener('change', updateLineNumbers);
    wrapCodeCheck.addEventListener('change', updateWordWrap);
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Detect language from file extension
    const extension = file.name.split('.').pop().toLowerCase();
    const detectedLanguage = LANGUAGE_MAP[extension] || 'text';
    
    // Update language selector
    if (document.querySelector(`#languageSelect option[value="${detectedLanguage}"]`)) {
        languageSelect.value = detectedLanguage;
        currentLanguage = detectedLanguage;
        updateCodeMirrorLanguage(detectedLanguage);
    }
    
    // Read file content
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        setEditorContent(content);
        
        // Show success message
        showNotification(`✅ File "${file.name}" berhasil dimuat!`, 'success');
        
        // Auto format if there's content
        if (content.trim()) {
            formatCode();
        }
    };
    
    reader.onerror = function() {
        showNotification('❌ Gagal membaca file!', 'error');
    };
    
    reader.readAsText(file);
}

async function formatCode() {
    const code = getEditorContent().trim();
    
    if (!code) {
        showNotification('⚠️ Silakan masukkan kode terlebih dahulu!', 'warning');
        return;
    }
    
    // Show loading state
    formatBtn.classList.add('loading');
    formatBtn.textContent = '⏳ Memformat...';
    
    try {
        // Simulate API call (replace with actual API when backend is ready)
        await new Promise(resolve => setTimeout(resolve, 500));
        
        currentCode = code;
        updatePreview();
        
        // Show preview section
        previewSection.style.display = 'block';
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        showNotification('✅ Kode berhasil diformat!', 'success');
        
    } catch (error) {
        console.error('Format error:', error);
        showNotification('❌ Gagal memformat kode!', 'error');
    } finally {
        // Reset button
        formatBtn.classList.remove('loading');
        formatBtn.textContent = '🎯 Format Kode';
    }
}

function updatePreview() {
    if (!currentCode) return;
    
    // Update code info
    const lines = currentCode.split('\n').length;
    const chars = currentCode.length;
    const words = currentCode.trim().split(/\s+/).length;
    
    codeInfo.textContent = `📊 ${lines} baris • ${chars} karakter • ${words} kata • Bahasa: ${currentLanguage.toUpperCase()}`;
    
    // Apply syntax highlighting
    formattedCode.textContent = currentCode;
    formattedCode.className = `language-${currentLanguage}`;
    
    // Apply line numbers if enabled
    if (showLineNumbersCheck.checked) {
        formattedCode.parentElement.classList.add('line-numbers');
    } else {
        formattedCode.parentElement.classList.remove('line-numbers');
    }
    
    // Re-highlight with Prism
    Prism.highlightElement(formattedCode);
    
    // Apply current settings
    applyCurrentSettings();
}

function applyCurrentSettings() {
    const preview = document.querySelector('.code-preview');
    if (!preview) return;
    
    const fontSize = fontSizeSlider.value + 'px';
    const lineHeight = lineHeightSlider.value;
    const maxWidth = maxWidthSlider.value + 'px';
    const wordWrap = wrapCodeCheck.checked ? 'break-word' : 'nowrap';
    
    preview.style.fontSize = fontSize;
    preview.style.lineHeight = lineHeight;
    preview.style.maxWidth = maxWidth;
    preview.style.wordWrap = wordWrap;
    preview.style.overflowWrap = wordWrap;
}

function clearCode() {
    setEditorContent('');
    previewSection.style.display = 'none';
    codeFileInput.value = '';
    showNotification('🗑️ Kode berhasil dihapus!', 'info');
}

function printCode() {
    if (!currentCode) {
        showNotification('⚠️ Tidak ada kode untuk dicetak!', 'warning');
        return;
    }
    
    // Update preview before printing
    updatePreview();
    
    // Add print title
    const originalTitle = document.title;
    document.title = `CodeToPrint - ${currentLanguage.toUpperCase()} Code`;
    
    // Print
    window.print();
    
    // Restore title
    document.title = originalTitle;
    
    showNotification('🖨️ Dialog cetak dibuka!', 'info');
}

async function copyCode() {
    if (!currentCode) {
        showNotification('⚠️ Tidak ada kode untuk disalin!', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(currentCode);
        showNotification('📋 Kode berhasil disalin!', 'success');
        
        // Visual feedback
        copyBtn.textContent = '✅ Tersalin!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy Code';
        }, 2000);
        
    } catch (error) {
        console.error('Copy failed:', error);
        
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = currentCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification('📋 Kode berhasil disalin!', 'success');
    }
}

function toggleTheme(theme) {
    const body = document.body;
    const themeLight = document.querySelector('link[href*="prism.min.css"]');
    const themeDark = document.getElementById('theme-dark');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        themeLight.disabled = true;
        themeDark.disabled = false;
    } else {
        body.classList.remove('dark-theme');
        themeLight.disabled = false;
        themeDark.disabled = true;
    }
    
    // Re-highlight code if exists
    if (currentCode) {
        setTimeout(() => {
            Prism.highlightElement(formattedCode);
        }, 100);
    }
}

// Settings handlers
function updateFontSize() {
    const value = fontSizeSlider.value;
    fontSizeValue.textContent = value + 'px';
    applyCurrentSettings();
}

function updateLineHeight() {
    const value = lineHeightSlider.value;
    lineHeightValue.textContent = value;
    applyCurrentSettings();
}

function updateMaxWidth() {
    const value = maxWidthSlider.value;
    maxWidthValue.textContent = value + 'px';
    applyCurrentSettings();
}

function updateLineNumbers() {
    updatePreview();
}

function updateWordWrap() {
    applyCurrentSettings();
}

function updateSettingsDisplay() {
    fontSizeValue.textContent = fontSizeSlider.value + 'px';
    lineHeightValue.textContent = lineHeightSlider.value;
    maxWidthValue.textContent = maxWidthSlider.value + 'px';
}

function loadExampleCode() {
    const exampleCode = `# Contoh Kode Python - Kalkulator Sederhana
def kalkulator():
    """
    Program kalkulator sederhana dengan operasi dasar
    Dibuat untuk demonstrasi CodeToPrint
    """
    print("=== KALKULATOR SEDERHANA ===")
    print("Operasi yang tersedia:")
    print("1. Penjumlahan (+)")
    print("2. Pengurangan (-)")
    print("3. Perkalian (*)")
    print("4. Pembagian (/)")
    
    try:
        # Input angka pertama
        angka1 = float(input("Masukkan angka pertama: "))
        
        # Input operator
        operator = input("Pilih operator (+, -, *, /): ")
        
        # Input angka kedua
        angka2 = float(input("Masukkan angka kedua: "))
        
        # Proses perhitungan
        if operator == '+':
            hasil = angka1 + angka2
            print(f"Hasil: {angka1} + {angka2} = {hasil}")
        elif operator == '-':
            hasil = angka1 - angka2
            print(f"Hasil: {angka1} - {angka2} = {hasil}")
        elif operator == '*':
            hasil = angka1 * angka2
            print(f"Hasil: {angka1} * {angka2} = {hasil}")
        elif operator == '/':
            if angka2 != 0:
                hasil = angka1 / angka2
                print(f"Hasil: {angka1} / {angka2} = {hasil}")
            else:
                print("Error: Pembagian dengan nol tidak diperbolehkan!")
        else:
            print("Error: Operator tidak valid!")
            
    except ValueError:
        print("Error: Input harus berupa angka!")
    except Exception as e:
        print(f"Error tidak terduga: {e}")

# Menjalankan program
if __name__ == "__main__":
    kalkulator()`;
    
    setEditorContent(exampleCode);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 600;
        font-size: 14px;
        z-index: 10000;
        max-width: 300px;
        word-wrap: break-word;
        animation: slideIn 0.3s ease;
    `;
    
    // Color based on type
    const colors = {
        success: '#51cf66',
        error: '#ff6b6b',
        warning: '#ffc107',
        info: '#4facfe'
    };
    
    notification.style.background = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationCSS = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to format
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        formatCode();
    }
    
    // Ctrl/Cmd + P to print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p' && currentCode) {
        e.preventDefault();
        printCode();
    }
    
    // Escape to clear
    if (e.key === 'Escape') {
        clearCode();
        hidePreviewModal();
    }
});

// Close modal when clicking outside
previewModal.addEventListener('click', function(e) {
    if (e.target === previewModal) {
        hidePreviewModal();
    }
});

// Add touch support for mobile
previewModal.addEventListener('touchstart', function(e) {
    if (e.target === previewModal) {
        hidePreviewModal();
    }
});

// Prevent modal close when clicking inside modal content
const modalContent = previewModal.querySelector('.modal-content');
if (modalContent) {
    modalContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    modalContent.addEventListener('touchstart', function(e) {
        e.stopPropagation();
    });
}

// Drag and drop functionality
document.addEventListener('dragover', function(e) {
    e.preventDefault();
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
});

document.addEventListener('dragleave', function(e) {
    e.preventDefault();
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
});

document.addEventListener('drop', function(e) {
    e.preventDefault();
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        
        // Simulate file input change
        const fileInput = document.getElementById('codeFile');
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;
        
        // Trigger file upload handler
        handleFileUpload({ target: { files: [file] } });
    }
});

// Copy input code function
async function copyInputCode() {
    const code = getEditorContent().trim();
    
    if (!code) {
        showNotification('⚠️ Tidak ada kode untuk disalin!', 'warning');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(code);
        showNotification('📋 Kode input berhasil disalin!', 'success');
        
        // Visual feedback
        copyInputBtn.textContent = '✅ Tersalin!';
        setTimeout(() => {
            copyInputBtn.textContent = '📋 Copy';
        }, 2000);
        
    } catch (error) {
        console.error('Copy failed:', error);
        
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showNotification('📋 Kode input berhasil disalin!', 'success');
    }
}

// Paste to input function
async function pasteToInput() {
    try {
        const text = await navigator.clipboard.readText();
        
        if (!text.trim()) {
            showNotification('⚠️ Clipboard kosong!', 'warning');
            return;
        }
        
        setEditorContent(text);
        
        // Auto-detect language from content
        autoDetectLanguage(text);
        
        showNotification('📥 Kode berhasil di-paste!', 'success');
        
        // Visual feedback
        pasteInputBtn.textContent = '✅ Dipaste!';
        setTimeout(() => {
            pasteInputBtn.textContent = '📥 Paste';
        }, 2000);
        
    } catch (error) {
        console.error('Paste failed:', error);
        showNotification('❌ Gagal paste! Pastikan browser mendukung clipboard API.', 'error');
    }
}

// Auto detect language from code content
function autoDetectLanguage(code) {
    const trimmedCode = code.trim();
    
    // Python detection
    if (trimmedCode.includes('def ') || trimmedCode.includes('import ') || 
        trimmedCode.includes('from ') || trimmedCode.includes('print(')) {
        languageSelect.value = 'python';
        currentLanguage = 'python';
        showNotification('🐍 Bahasa Python terdeteksi!', 'info');
        return;
    }
    
    // JavaScript detection
    if (trimmedCode.includes('function ') || trimmedCode.includes('const ') || 
        trimmedCode.includes('let ') || trimmedCode.includes('var ') ||
        trimmedCode.includes('console.log')) {
        languageSelect.value = 'javascript';
        currentLanguage = 'javascript';
        showNotification('🟨 Bahasa JavaScript terdeteksi!', 'info');
        return;
    }
    
    // HTML detection
    if (trimmedCode.includes('<!DOCTYPE') || trimmedCode.includes('<html') ||
        trimmedCode.includes('<div') || trimmedCode.includes('<body')) {
        languageSelect.value = 'html';
        currentLanguage = 'html';
        showNotification('🌐 Bahasa HTML terdeteksi!', 'info');
        return;
    }
    
    // CSS detection
    if (trimmedCode.includes('{') && trimmedCode.includes('}') && 
        (trimmedCode.includes(':') || trimmedCode.includes('px') || trimmedCode.includes('%'))) {
        languageSelect.value = 'css';
        currentLanguage = 'css';
        showNotification('🎨 Bahasa CSS terdeteksi!', 'info');
        return;
    }
    
    // Java detection
    if (trimmedCode.includes('public class') || trimmedCode.includes('public static void main') ||
        trimmedCode.includes('System.out.println')) {
        languageSelect.value = 'java';
        currentLanguage = 'java';
        showNotification('☕ Bahasa Java terdeteksi!', 'info');
        return;
    }
    
    // JSON detection
    if ((trimmedCode.startsWith('{') && trimmedCode.endsWith('}')) ||
        (trimmedCode.startsWith('[') && trimmedCode.endsWith(']'))) {
        try {
            JSON.parse(trimmedCode);
            languageSelect.value = 'json';
            currentLanguage = 'json';
            showNotification('📄 Format JSON terdeteksi!', 'info');
            return;
        } catch (e) {
            // Not valid JSON
        }
    }
    
    showNotification('🔍 Bahasa tidak terdeteksi, silakan pilih manual.', 'info');
}

// Show preview modal
function showPreviewModal() {
    const code = codeInput.value.trim();
    
    if (!code) {
        showNotification('⚠️ Tidak ada kode untuk di-preview!', 'warning');
        return;
    }
    
    // Set preview title based on language
    const extensions = {
        'python': 'python.py',
        'javascript': 'script.js',
        'html': 'index.html',
        'css': 'styles.css',
        'java': 'Main.java',
        'json': 'data.json',
        'php': 'index.php',
        'cpp': 'main.cpp',
        'csharp': 'Program.cs',
        'typescript': 'app.ts'
    };
    
    previewTitle.textContent = extensions[currentLanguage] || 'code.txt';
    
    // Set preview code
    previewFormattedCode.textContent = code;
    previewFormattedCode.className = `language-${currentLanguage}`;
    
    // Apply syntax highlighting
    Prism.highlightElement(previewFormattedCode);
    
    // Show modal
    previewModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Prevent body scroll on mobile
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
    
    showNotification('👁️ Preview modal dibuka!', 'info');
}

// Hide preview modal
function hidePreviewModal() {
    previewModal.style.display = 'none';
    
    // Restore body scroll
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflow = 'auto';
    
    if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
}

// Download as image directly - Updated version
async function downloadAsImage() {
    const code = codeInput.value.trim();
    
    if (!code) {
        showNotification('⚠️ Tidak ada kode untuk di-download!', 'warning');
        return;
    }
    
    try {
        downloadImageBtn.textContent = '⏳ Generating...';
        downloadImageBtn.disabled = true;
        
        console.log('Standard download started...'); // Debug
        
        // Use universal download function with standard options
        await downloadCodeAsImage(code, {
            showLineNumbers: false,
            enableWordWrap: false,
            width: 800
        });
        
        showNotification('📷 Standard image berhasil di-download!', 'success');
        
    } catch (error) {
        console.error('Download failed:', error);
        showNotification(`❌ Gagal download image: ${error.message}`, 'error');
    } finally {
        downloadImageBtn.textContent = '📷 Download Standard';
        downloadImageBtn.disabled = false;
    }
}

// Download as formatted image (with line numbers and word wrap)
async function downloadAsImageFormatted() {
    const code = codeInput.value.trim();
    
    if (!code) {
        showNotification('⚠️ Tidak ada kode untuk di-download!', 'warning');
        return;
    }
    
    try {
        const downloadFormattedBtn = document.getElementById('downloadFormattedBtn');
        downloadFormattedBtn.textContent = '⏳ Generating...';
        downloadFormattedBtn.disabled = true;
        
        console.log('Formatted download started...'); // Debug
        
        // Use universal download function with formatting options
        await downloadCodeAsImage(code, {
            showLineNumbers: true,
            enableWordWrap: true,
            width: 900
        });
        
        showNotification('📄 Formatted image berhasil di-download!', 'success');
        
    } catch (error) {
        console.error('Formatted download failed:', error);
        showNotification(`❌ Gagal download formatted image: ${error.message}`, 'error');
    } finally {
        const downloadFormattedBtn = document.getElementById('downloadFormattedBtn');
        downloadFormattedBtn.textContent = '📄 Download Formatted';
        downloadFormattedBtn.disabled = false;
    }
}

// Download from preview modal - Updated version
async function downloadFromPreviewModal() {
    try {
        downloadFromPreview.textContent = '⏳ Generating...';
        downloadFromPreview.disabled = true;
        
        console.log('Modal standard download started...'); // Debug
        
        // Use universal download function with standard options
        await downloadCodeAsImage(null, {
            showLineNumbers: false,
            enableWordWrap: false,
            width: 800
        });
        
        showNotification('📷 Standard image berhasil di-download!', 'success');
        
    } catch (error) {
        console.error('Download from preview failed:', error);
        showNotification(`❌ Gagal download preview image: ${error.message}`, 'error');
    } finally {
        downloadFromPreview.textContent = '📷 Download Standard';
        downloadFromPreview.disabled = false;
    }
}

// Download formatted from preview modal
async function downloadFormattedFromPreviewModal() {
    try {
        const downloadFormattedFromPreview = document.getElementById('downloadFormattedFromPreview');
        downloadFormattedFromPreview.textContent = '⏳ Generating...';
        downloadFormattedFromPreview.disabled = true;
        
        console.log('Modal formatted download started...'); // Debug
        
        // Use universal download function with formatting options
        await downloadCodeAsImage(null, {
            showLineNumbers: true,
            enableWordWrap: true,
            width: 900
        });
        
        showNotification('📄 Formatted image berhasil di-download!', 'success');
        
    } catch (error) {
        console.error('Download formatted from preview failed:', error);
        showNotification(`❌ Gagal download formatted image: ${error.message}`, 'error');
    } finally {
        const downloadFormattedFromPreview = document.getElementById('downloadFormattedFromPreview');
        downloadFormattedFromPreview.textContent = '📄 Download Formatted';
        downloadFormattedFromPreview.disabled = false;
    }
}

// Universal download function that works from anywhere
async function downloadCodeAsImage(sourceCode = null, options = {}) {
    try {
        let code = sourceCode;
        
        // If no source code provided, try to get it from different sources
        if (!code) {
            // Try to get from input
            code = codeInput.value.trim();
            
            // If still no code, try from preview modal
            if (!code) {
                const previewCodeElement = document.getElementById('previewFormattedCode');
                if (previewCodeElement && previewCodeElement.textContent.trim()) {
                    code = previewCodeElement.textContent;
                }
            }
            
            // If still no code, try from main preview
            if (!code) {
                const mainPreviewCode = document.getElementById('formattedCode');
                if (mainPreviewCode && mainPreviewCode.textContent.trim()) {
                    code = mainPreviewCode.textContent;
                }
            }
        }
        
        if (!code) {
            throw new Error('No code found to download');
        }
        
        console.log('Universal download - Code found:', code.substring(0, 50) + '...'); // Debug
        
        // Create temporary preview element with options
        const tempPreview = createTempPreviewElement(code, options);
        document.body.appendChild(tempPreview);
        
        // Wait for rendering
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Use proven settings
        const canvas = await html2canvas(tempPreview, {
            backgroundColor: '#1a202c',
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: false,
            width: tempPreview.offsetWidth,
            height: tempPreview.offsetHeight,
            scrollX: 0,
            scrollY: 0
        });
        
        console.log('Universal download - Canvas created:', canvas.width, 'x', canvas.height); // Debug
        
        const downloadType = options.showLineNumbers || options.enableWordWrap ? 'formatted' : 'standard';
        const link = document.createElement('a');
        link.download = `code-${downloadType}-${currentLanguage}-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        
        // Cleanup
        if (document.body.contains(tempPreview)) {
            document.body.removeChild(tempPreview);
        }
        
        return true;
    } catch (error) {
        console.error('Universal download failed:', error);
        throw error;
    }
}

// Create temporary preview element for download
function createTempPreviewElement(code, options = {}) {
    const {
        showLineNumbers = false,
        enableWordWrap = false,
        width = 800
    } = options;
    
    const tempDiv = document.createElement('div');
    tempDiv.style.cssText = `
        position: fixed;
        top: -9999px;
        left: -9999px;
        background: #2d3748;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        width: ${width}px;
        min-height: 200px;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-size: 14px;
        font-weight: 400;
        z-index: 10000;
    `;
    
    const extensions = {
        'python': 'python.py',
        'javascript': 'script.js',
        'html': 'index.html',
        'css': 'styles.css',
        'java': 'Main.java',
        'json': 'data.json',
        'php': 'index.php',
        'cpp': 'main.cpp',
        'csharp': 'Program.cs',
        'typescript': 'app.ts'
    };
    
    const lineNumbersClass = showLineNumbers ? 'line-numbers' : '';
    const wordWrapStyle = enableWordWrap ? 'white-space: pre-wrap; word-wrap: break-word;' : 'white-space: pre;';
    
    tempDiv.innerHTML = `
        <div style="background: #4a5568; padding: 15px 20px; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid #2d3748;">
            <div style="display: flex; gap: 8px;">
                <span style="width: 14px; height: 14px; border-radius: 50%; background: #ff5f56; display: block;"></span>
                <span style="width: 14px; height: 14px; border-radius: 50%; background: #ffbd2e; display: block;"></span>
                <span style="width: 14px; height: 14px; border-radius: 50%; background: #27ca3f; display: block;"></span>
            </div>
            <div style="color: #e2e8f0; font-size: 14px; font-weight: 500; font-family: 'Consolas', 'Monaco', 'Courier New', monospace;">${extensions[currentLanguage] || 'code.txt'}</div>
        </div>
        <div style="background: #1a202c; padding: 25px; color: #e2e8f0; font-size: 14px; line-height: 1.6; min-height: 150px;">
            <pre class="${lineNumbersClass}" style="margin: 0; background: transparent; font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 14px; font-weight: 400; ${wordWrapStyle} color: #e2e8f0;"><code class="language-${currentLanguage}" style="font-family: 'Consolas', 'Monaco', 'Courier New', monospace; font-size: 14px; font-weight: 400; color: #e2e8f0;"></code></pre>
        </div>
    `;
    
    const codeElement = tempDiv.querySelector('code');
    codeElement.textContent = code;
    
    // Apply syntax highlighting
    Prism.highlightElement(codeElement);
    
    return tempDiv;
}

// Initialize toggle functionality for sections
function initializeToggleFunctionality() {
    const toggleButtons = document.querySelectorAll('.section-toggle');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('.toggle-icon');
            const content = this.nextElementSibling;
            
            // Toggle collapsed class
            content.classList.toggle('collapsed');
            
            // Update icon rotation
            if (content.classList.contains('collapsed')) {
                icon.style.transform = 'rotate(-90deg)';
                this.setAttribute('aria-expanded', 'false');
            } else {
                icon.style.transform = 'rotate(0deg)';
                this.setAttribute('aria-expanded', 'true');
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}
