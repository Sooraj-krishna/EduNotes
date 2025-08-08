/**
 * AI-Generated Dependency Security Utility
 * Generated: 2025-08-08T11:19:11.698891
 * SAFE TO USE: Only scans for security issues, doesn't modify dependencies
 */

class DependencySecurityScanner {
    constructor() {
        this.vulnerabilities = [];
        this.recommendations = [];
        this.init();
        
        console.log('[AI Dependency Security Scanner] Initialized safely');
    }
    
    init() {
        this.scanScripts();
        this.scanExternalResources();
        this.generateRecommendations();
    }
    
    scanScripts() {
        const scripts = document.querySelectorAll('script[src]');
        const externalScripts = [];
        
        scripts.forEach(script => {
            const src = script.src;
            if (src && !src.startsWith(window.location.origin)) {
                externalScripts.push({
                    src: src,
                    integrity: script.integrity || 'none',
                    crossorigin: script.crossorigin || 'none',
                    risk: this.assessRisk(src)
                });
            }
        });
        
        this.vulnerabilities.push({
            type: 'external_scripts',
            count: externalScripts.length,
            scripts: externalScripts
        });
    }
    
    scanExternalResources() {
        const externalResources = [];
        
        // Check for external CSS
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            if (link.href && !link.href.startsWith(window.location.origin)) {
                externalResources.push({
                    type: 'css',
                    url: link.href,
                    integrity: link.integrity || 'none'
                });
            }
        });
        
        // Check for external images
        document.querySelectorAll('img[src]').forEach(img => {
            if (img.src && !img.src.startsWith(window.location.origin)) {
                externalResources.push({
                    type: 'image',
                    url: img.src
                });
            }
        });
        
        if (externalResources.length > 0) {
            this.vulnerabilities.push({
                type: 'external_resources',
                count: externalResources.length,
                resources: externalResources
            });
        }
    }
    
    assessRisk(url) {
        const riskFactors = [];
        
        // Check for HTTP (non-HTTPS)
        if (url.startsWith('http://')) {
            riskFactors.push('non-https');
        }
        
        // Check for common CDN domains
        const trustedCDNs = [
            'cdnjs.cloudflare.com',
            'unpkg.com',
            'jsdelivr.net',
            'googleapis.com',
            'gstatic.com'
        ];
        
        const domain = new URL(url).hostname;
        if (!trustedCDNs.some(cdn => domain.includes(cdn))) {
            riskFactors.push('unknown-domain');
        }
        
        return riskFactors.length > 0 ? riskFactors : ['low-risk'];
    }
    
    generateRecommendations() {
        this.vulnerabilities.forEach(vuln => {
            if (vuln.type === 'external_scripts') {
                vuln.scripts.forEach(script => {
                    if (script.risk.includes('non-https')) {
                        this.recommendations.push({
                            type: 'security',
                            priority: 'high',
                            message: `Use HTTPS for external script: ${script.src}`,
                            action: 'Update script URL to use HTTPS'
                        });
                    }
                    
                    if (script.integrity === 'none') {
                        this.recommendations.push({
                            type: 'security',
                            priority: 'medium',
                            message: `Add integrity check for script: ${script.src}`,
                            action: 'Add integrity attribute to script tag'
                        });
                    }
                });
            }
        });
    }
    
    getVulnerabilities() {
        return [...this.vulnerabilities];
    }
    
    getRecommendations() {
        return [...this.recommendations];
    }
    
    generateSecurityReport() {
        return {
            timestamp: new Date().toISOString(),
            vulnerabilities: this.getVulnerabilities(),
            recommendations: this.getRecommendations(),
            summary: {
                totalVulnerabilities: this.vulnerabilities.length,
                highPriorityRecommendations: this.recommendations.filter(r => r.priority === 'high').length,
                mediumPriorityRecommendations: this.recommendations.filter(r => r.priority === 'medium').length
            }
        };
    }
    
    // Check if a specific URL is secure
    isSecureUrl(url) {
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    }
    
    // Validate script integrity
    validateScriptIntegrity(script) {
        if (!script.integrity || script.integrity === 'none') {
            return { valid: false, reason: 'No integrity check' };
        }
        
        return { valid: true, reason: 'Integrity check present' };
    }
}

export default DependencySecurityScanner;

// Auto-initialize dependency security scanner
if (typeof window !== 'undefined' && !window.aiDependencySecurityScanner) {
    window.aiDependencySecurityScanner = new DependencySecurityScanner();
}