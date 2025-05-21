document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const animationToggle = document.getElementById('animation-toggle');
    const themeColorPicker = document.getElementById('theme-color');
    const animateBtn = document.getElementById('animate-btn');
    const animatedBox = document.getElementById('animated-box');
    
    // Load saved preferences from localStorage
    loadPreferences();
    
    // Event listeners
    animationToggle.addEventListener('change', toggleAnimations);
    themeColorPicker.addEventListener('input', changeThemeColor);
    animateBtn.addEventListener('click', triggerAnimation);
    
    // Load user preferences from localStorage
    function loadPreferences() {
        // Check if animations are enabled
        const animationsEnabled = localStorage.getItem('animationsEnabled');
        if (animationsEnabled !== null) {
            animationToggle.checked = animationsEnabled === 'true';
            if (!animationToggle.checked) {
                document.body.classList.add('no-animations');
            }
        }
        
        // Load theme color
        const savedColor = localStorage.getItem('themeColor');
        if (savedColor) {
            themeColorPicker.value = savedColor;
            applyThemeColor(savedColor);
        }
    }
    
    // Toggle animations on/off
    function toggleAnimations() {
        const enabled = animationToggle.checked;
        localStorage.setItem('animationsEnabled', enabled);
        
        if (enabled) {
            document.body.classList.remove('no-animations');
            animateBtn.classList.add('pulse');
        } else {
            document.body.classList.add('no-animations');
            animateBtn.classList.remove('pulse');
        }
    }
    
    // Change and save theme color
    function changeThemeColor() {
        const color = themeColorPicker.value;
        localStorage.setItem('themeColor', color);
        applyThemeColor(color);
    }
    
    // Apply theme color to elements
    function applyThemeColor(color) {
        document.documentElement.style.setProperty('--primary-color', color);
        animateBtn.style.backgroundColor = color;
        animatedBox.style.backgroundColor = color;
        
        // Update toggle switch color
        document.querySelector('.toggle-switch input:checked + .slider').style.backgroundColor = color;
    }
    
    // Trigger random animation on the box
    function triggerAnimation() {
        if (!animationToggle.checked) return;
        
        // Remove any existing animation classes
        animatedBox.classList.remove('spin', 'bounce', 'fade-in');
        
        // Force reflow to restart animation
        void animatedBox.offsetWidth;
        
        // Randomly select an animation
        const animations = ['spin', 'bounce', 'fade-in'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        
        // Apply the animation
        animatedBox.classList.add(randomAnim);
        
        // Remove the class after animation completes
        setTimeout(() => {
            animatedBox.classList.remove(randomAnim);
        }, 2000);
    }
    
    // Initialize theme color
    applyThemeColor(themeColorPicker.value);
});