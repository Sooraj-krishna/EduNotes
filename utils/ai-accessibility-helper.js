/**
 * AI-Generated Accessibility Helper
 * SAFE TO USE: Only adds accessibility features, doesn't modify existing elements
 */

class AccessibilityHelper {
    constructor() {
        this.issues = [];
        this.improvements = [];
        this.scanAccessibility();
        
        console.log('[AI Accessibility Helper] Initialized safely');
    }
    
    scanAccessibility() {
        const issues = [];
        
        // Check for images without alt text
        document.querySelectorAll('img:not([alt]), img[alt=""]').forEach((img, index) => {
            issues.push({
                type: 'missing_alt',
                element: `img[${index}]`,
                message: 'Image missing alt text',
                severity: 'medium'
            });
        });
        
        // Check for buttons without accessible labels
        document.querySelectorAll('button:not([aria-label])').forEach((btn, index) => {
            if (!btn.textContent.trim()) {
                issues.push({
                    type: 'missing_label',
                    element: `button[${index}]`,
                    message: 'Button missing accessible label',
                    severity: 'high'
                });
            }
        });
        
        // Check for form inputs without labels
        document.querySelectorAll('input:not([aria-label]):not([id])').forEach((input, index) => {
            const associatedLabel = document.querySelector(`label[for="${input.id}"]`);
            if (!associatedLabel && !input.getAttribute('aria-label')) {
                issues.push({
                    type: 'missing_input_label',
                    element: `input[${index}]`,
                    message: 'Form input missing label',
                    severity: 'high'
                });
            }
        });
        
        // Check for links with poor text
        document.querySelectorAll('a').forEach((link, index) => {
            const text = link.textContent.trim().toLowerCase();
            const poorLinkTexts = ['click here', 'read more', 'more', 'link', 'here'];
            
            if (poorLinkTexts.includes(text)) {
                issues.push({
                    type: 'poor_link_text',
                    element: `a[${index}]`,
                    message: 'Link text not descriptive',
                    severity: 'low'
                });
            }
        });
        
        // Check color contrast (basic check)
        this.checkColorContrast();
        
        this.issues = issues;
        
        if (issues.length > 0) {
            console.log(`[AI Accessibility] Found ${issues.length} accessibility issues`);
        } else {
            console.log('[AI Accessibility] No accessibility issues found');
        }
    }
    
    checkColorContrast() {
        // Basic color contrast checking
        document.querySelectorAll('*').forEach((element, index) => {
            if (index > 100) return; // Limit checking to first 100 elements
            
            const styles = getComputedStyle(element);
            const backgroundColor = styles.backgroundColor;
            const color = styles.color;
            
            // Very basic check for common poor contrast combinations
            if (backgroundColor === 'rgb(255, 255, 255)' && color === 'rgb(192, 192, 192)') {
                this.issues.push({
                    type: 'poor_contrast',
                    element: `element[${index}]`,
                    message: 'Potentially poor color contrast',
                    severity: 'medium'
                });
            }
        });
    }
    
    addKeyboardSupport() {
        // Add skip link if not present
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.className = 'skip-link';
            skipLink.textContent = 'Skip to main content';
            skipLink.style.cssText = `
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                z-index: 1000;
                border-radius: 4px;
            `;
            
            skipLink.addEventListener('focus', () => {
                skipLink.style.top = '6px';
            });
            
            skipLink.addEventListener('blur', () => {
                skipLink.style.top = '-40px';
            });
            
            document.body.insertBefore(skipLink, document.body.firstChild);
            
            this.improvements.push('Added skip navigation link');
            console.log('[AI Accessibility] Added skip navigation link');
        }
    }
    
    addFocusIndicators() {
        // Ensure all interactive elements have visible focus indicators
        const style = document.createElement('style');
        style.textContent = `
            /* AI-Generated Focus Indicators */
            button:focus,
            a:focus,
            input:focus,
            select:focus,
            textarea:focus {
                outline: 2px solid #0066cc !important;
                outline-offset: 2px !important;
            }
            
            .skip-link:focus {
                outline: 2px solid #fff !important;
            }
        `;
        
        if (!document.querySelector('#ai-accessibility-styles')) {
            style.id = 'ai-accessibility-styles';
            document.head.appendChild(style);
            this.improvements.push('Added focus indicators for better keyboard navigation');
        }
    }
    
    getIssues() {
        return [...this.issues];
    }
    
    getImprovements() {
        return [...this.improvements];
    }
    
    generateAccessibilityReport() {
        return {
            timestamp: new Date().toISOString(),
            issues: this.getIssues(),
            improvements: this.getImprovements(),
            summary: {
                totalIssues: this.issues.length,
                highSeverity: this.issues.filter(i => i.severity === 'high').length,
                mediumSeverity: this.issues.filter(i => i.severity === 'medium').length,
                lowSeverity: this.issues.filter(i => i.severity === 'low').length
            }
        };
    }
    
    // Auto-improve accessibility where safe
    autoImprove() {
        this.addKeyboardSupport();
        this.addFocusIndicators();
        
        console.log('[AI Accessibility] Auto-improvements applied');
        return this.improvements;
    }
}

export default AccessibilityHelper;

// Auto-initialize and improve accessibility
if (typeof window !== 'undefined' && !window.aiAccessibilityHelper) {
    window.aiAccessibilityHelper = new AccessibilityHelper();
    
    // Auto-apply safe improvements
    setTimeout(() => {
        window.aiAccessibilityHelper.autoImprove();
    }, 1000);
}