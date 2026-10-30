// Theme Toggle System
// Switches between Matrix (retro/neon) and Plain (B&W Helvetica) themes

(function() {
  const THEME_KEY = 'eoyr-theme';
  const MATRIX_THEME = 'matrix';
  const PLAIN_THEME = 'plain';
  
  // Get current theme from localStorage or default to matrix
  function getCurrentTheme() {
    return localStorage.getItem(THEME_KEY) || MATRIX_THEME;
  }
  
  // Apply theme to page
  function applyTheme(theme) {
    console.log('🎨 Applying theme:', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
    console.log('✅ Body data-theme set to:', document.body.getAttribute('data-theme'));
    console.log('✅ LocalStorage updated:', localStorage.getItem(THEME_KEY));
    
    // Update toggle button if it exists
    updateToggleButton(theme);
  }
  
  // Toggle between themes
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    console.log('🔄 Toggle clicked! Current theme:', currentTheme);
    const newTheme = currentTheme === MATRIX_THEME ? PLAIN_THEME : MATRIX_THEME;
    console.log('🔄 Switching to:', newTheme);
    applyTheme(newTheme);
  }
  
  // Update toggle button appearance
  function updateToggleButton(theme) {
    document.querySelectorAll('.theme-quick-toggle').forEach(btn => {
      const label = btn.querySelector('.tq-label');
      if (label) label.textContent = theme === MATRIX_THEME ? 'Matrix' : 'Paper';
      btn.setAttribute('data-theme', theme);
      btn.setAttribute('aria-pressed', String(theme === PLAIN_THEME));
    });

    const toggleButton = document.getElementById('theme-toggle');
    console.log('🔘 Updating toggle button, found element:', !!toggleButton);
    if (!toggleButton) {
      console.warn('⚠️ Toggle button not found!');
      return;
    }
    
    const statusText = toggleButton.querySelector('.toggle-status');
    console.log('🔘 Status text element found:', !!statusText);
    if (statusText) {
      const newText = theme === MATRIX_THEME ? 'Matrix Mode' : 'Paper Mode';
      statusText.textContent = newText;
      console.log('✅ Status text updated to:', newText);
    }
    
    toggleButton.setAttribute('data-theme', theme);
    console.log('✅ Toggle button data-theme set to:', theme);
  }
  
  // Initialize theme on page load (before DOM ready to avoid flash)
  const initialTheme = getCurrentTheme();
  if (document.body) {
    applyTheme(initialTheme);
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      applyTheme(initialTheme);
    });
  }
  
  // Make toggle function globally available
  window.toggleTheme = toggleTheme;
  window.getCurrentTheme = getCurrentTheme;
  
  // Auto-initialize if toggle button exists
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-quick-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      });
    });
    updateToggleButton(getCurrentTheme());

    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTheme();
      });
      
      // Set initial state
      updateToggleButton(getCurrentTheme());
    }
  });
})();

