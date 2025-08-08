/**
 * AI-Generated Security Helper Utility
 * SAFE TO USE: Only adds security validations, doesn't modify existing functionality
 */

class SecurityHelper {
    constructor() {
        this.suspiciousPatterns = [
            /<script[^>]*>.*?<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /data:text\/html/gi,
            /vbscript:/gi
        ];
        
        this.violations = [];
        this.init();
        
        console.log('[AI Security Helper] Initialized safely');
    }
    
    init() {
        // Set up Content Security Policy monitoring if available
        if ('SecurityPolicyViolationEvent' in window) {
            document.addEventListener('securitypolicyviolation', (e) => {
                this.logViolation({
                    type: 'csp',
                    violatedDirective: e.violatedDirective,
                    blockedURI: e.blockedURI,
                    timestamp: new Date().toISOString()
                });
            });
        }
    }
    
    // Safe input sanitization helper
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        // Basic XSS prevention
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;');
    }
    
    // Check for suspicious content
    validateContent(content) {
        if (typeof content !== 'string') return { isValid: true, issues: [] };
        
        const issues = [];
        
        this.suspiciousPatterns.forEach((pattern, index) => {
            const matches = content.match(pattern);
            if (matches) {
                issues.push({
                    pattern: `Suspicious pattern ${index + 1}`,
                    matches: matches.slice(0, 3), // Limit to first 3 matches
                    severity: 'medium'
                });
            }
        });
        
        return {
            isValid: issues.length === 0,
            issues: issues
        };
    }
    
    // Safe URL validation
    isValidUrl(url) {
        try {
            const urlObj = new URL(url);
            const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
            return allowedProtocols.includes(urlObj.protocol);
        } catch {
            return false;
        }
    }
    
    // Generate simple CSRF token
    generateCSRFToken() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Check if running over HTTPS
    isSecureContext() {
        return location.protocol === 'https:' || location.hostname === 'localhost';
    }
    
    // Validate form data before submission
    validateFormData(formData) {
        const issues = [];
        
        for (let [key, value] of formData.entries()) {
            if (typeof value === 'string') {
                const validation = this.validateContent(value);
                if (!validation.isValid) {
                    issues.push({
                        field: key,
                        issues: validation.issues
                    });
                }
            }
        }
        
        return {
            isValid: issues.length === 0,
            fieldIssues: issues
        };
    }
    
    // Log security violations
    logViolation(violation) {
        this.violations.push({
            ...violation,
            timestamp: violation.timestamp || new Date().toISOString()
        });
        
        // Keep only recent violations
        if (this.violations.length > 50) {
            this.violations = this.violations.slice(-50);
        }
        
        console.warn('[AI Security Helper] Security violation logged:', violation);
    }
    
    // Get security report
    getSecurityReport() {
        return {
            timestamp: new Date().toISOString(),
            isSecureContext: this.isSecureContext(),
            violations: [...this.violations],
            recommendations: this.getSecurityRecommendations()
        };
    }
    
    getSecurityRecommendations() {
        const recommendations = [];
        
        if (!this.isSecureContext()) {
            recommendations.push('Consider using HTTPS for better security');
        }
        
        if (this.violations.length > 0) {
            recommendations.push('Review and address security policy violations');
        }
        
        if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            recommendations.push('Consider implementing Content Security Policy');
        }
        
        return recommendations;
    }
}

export default SecurityHelper;

// Auto-initialize security monitoring
if (typeof window !== 'undefined' && !window.aiSecurityHelper) {
    window.aiSecurityHelper = new SecurityHelper();
}