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

// State
let currentCode = '';
let currentLanguage = 'python';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateSettingsDisplay();
    loadExampleCode();
});

function setupEventListeners() {
    // File upload
    codeFileInput.addEventListener('change', handleFileUpload);
    
    // Language selection
    languageSelect.addEventListener('change', function() {
        currentLanguage = this.value;
        updatePreview();
    });
    
    // Theme selection
    themeSelect.addEventListener('change', function() {
        toggleTheme(this.value);
    });
    
    // Code input
    codeInput.addEventListener('input', function() {
        currentCode = this.value;
    });
    
    // Buttons
    formatBtn.addEventListener('click', formatCode);
    clearBtn.addEventListener('click', clearCode);
    printBtn.addEventListener('click', printCode);
    copyBtn.addEventListener('click', copyCode);
    
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
    }
    
    // Read file content
    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        codeInput.value = content;
        currentCode = content;
        
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
    const code = codeInput.value.trim();
    
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
    codeInput.value = '';
    currentCode = '';
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
    
    codeInput.value = exampleCode;
    currentCode = exampleCode;
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
    }
});

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
