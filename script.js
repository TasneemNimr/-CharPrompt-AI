
const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById('themeToggle');
const langToggleBtn = document.getElementById('langToggle');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const finalPromptArea = document.getElementById('finalPrompt');

const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    
    themeToggleBtn.style.transform = 'scale(0.8)';
    setTimeout(() => themeToggleBtn.style.transform = 'scale(1)', 150);

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeToggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}


let currentLang = localStorage.getItem('lang') || 'ar';
applyLanguage(currentLang);

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    
   
    langToggleBtn.style.transform = 'scale(0.8)';
    setTimeout(() => langToggleBtn.style.transform = 'scale(1)', 150);
    
    applyLanguage(currentLang);
    localStorage.setItem('lang', currentLang);
});

function applyLanguage(lang) {
   
    htmlElement.setAttribute('lang', lang);
    htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    langToggleBtn.textContent = lang === 'ar' ? 'EN' : 'عربي';

   
    const translatableElements = document.querySelectorAll('[data-ar][data-en]');
    
    translatableElements.forEach(el => {
       
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      
        } else {
           
            el.textContent = el.getAttribute(`data-${lang}`);
        }
    });
}

let isTyping = false; 

if (generateBtn) {
    generateBtn.addEventListener('click', () => {
        if (isTyping) return;

    
        const charName = document.getElementById('charName').value.trim() || 'The Character';
        const artStyle = document.getElementById('artStyle').value;
        const appearance = document.getElementById('appearance').value.trim();
        const action = document.getElementById('action').value.trim();

        if (!appearance || !action) {
            const warningMsg = currentLang === 'ar' ? 
                "يرجى تعبئة حقلي 'المظهر الثابت' و 'الحدث والمشهد' أولاً!" : 
                "Please fill in the 'Appearance' and 'Action' fields first!";
            alert(warningMsg);
            return;
        }

        generateBtn.style.transform = 'scale(0.95)';
        setTimeout(() => generateBtn.style.transform = 'scale(1)', 150);

        const promptTemplate = `${artStyle}. Subject: ${charName}. EXACT CHARACTER CONSISTENCY REQUIRED: (${appearance}). Current scene and action: ${action}. Masterpiece, highly detailed, maintaining consistent facial features, hairstyle, outfit, and overall design throughout the frame.`;

        // تصفير مربع النتيجة وبدء تأثير الكتابة
        finalPromptArea.value = '';
        typeWriterEffect(promptTemplate, 0);
    });
}

function typeWriterEffect(text, index) {
    isTyping = true;
    if (index < text.length) {
        finalPromptArea.value += text.charAt(index);
        
        
        finalPromptArea.scrollTop = finalPromptArea.scrollHeight;
        
     
        setTimeout(() => typeWriterEffect(text, index + 1), 15);
    } else {
        isTyping = false;
    }
}



if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const textToCopy = finalPromptArea.value;
        
        if (!textToCopy) return; 

       
        navigator.clipboard.writeText(textToCopy).then(() => {
      
            const originalText = copyBtn.textContent;
            const originalBg = copyBtn.style.backgroundColor;
            const originalColor = copyBtn.style.color;
            const originalBorder = copyBtn.style.borderColor;

        
            copyBtn.textContent = currentLang === 'ar' ? 'تم النسخ بنجاح! ✅' : 'Copied! ✅';
            copyBtn.style.backgroundColor = '#10b981';
            copyBtn.style.color = '#ffffff';
            copyBtn.style.borderColor = '#10b981';
            copyBtn.style.transform = 'translateY(-3px) scale(1.02)';

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = originalBg;
                copyBtn.style.color = originalColor;
                copyBtn.style.borderColor = originalBorder;
                copyBtn.style.transform = 'translateY(0) scale(1)';
            }, 2000);
        });
    });
}