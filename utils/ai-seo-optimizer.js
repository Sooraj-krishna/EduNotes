/**
 * AI-Generated SEO Optimization Utility
 * Generated: 2025-08-08T12:39:20.520585
 * SAFE TO USE: Only adds SEO helpers, doesn't modify existing content
 */

class SEOOptimizer {
    constructor() {
        this.recommendations = [];
        this.analyzePage();
        
        console.log('[AI SEO Optimizer] Initialized safely');
    }
    
    analyzePage() {
        const recommendations = [];
        
        // Check for missing meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc || !metaDesc.content || metaDesc.content.length < 120) {
            recommendations.push({
                type: 'meta-description',
                issue: 'Missing or short meta description',
                suggestion: 'Add a meta description of 150-160 characters'
            });
        }
        
        // Check for missing or poor title
        if (!document.title || document.title.length < 30) {
            recommendations.push({
                type: 'title',
                issue: 'Page title is missing or too short',
                suggestion: 'Add a descriptive title of 30-60 characters'
            });
        }
        
        // Check for images without alt text
        const imagesWithoutAlt = document.querySelectorAll('img:not([alt]), img[alt=""]');
        if (imagesWithoutAlt.length > 0) {
            recommendations.push({
                type: 'alt-text',
                issue: `${imagesWithoutAlt.length} images missing alt text`,
                suggestion: 'Add descriptive alt text to all images'
            });
        }
        
        // Check heading structure
        const h1Count = document.querySelectorAll('h1').length;
        if (h1Count === 0) {
            recommendations.push({
                type: 'headings',
                issue: 'No H1 heading found',
                suggestion: 'Add one H1 heading to the page'
            });
        } else if (h1Count > 1) {
            recommendations.push({
                type: 'headings',
                issue: `Multiple H1 headings (${h1Count}) found`,
                suggestion: 'Use only one H1 per page'
            });
        }
        
        this.recommendations = recommendations;
        
        if (recommendations.length > 0) {
            console.log('[AI SEO Optimizer] SEO recommendations:', recommendations);
        } else {
            console.log('[AI SEO Optimizer] No SEO issues found');
        }
    }
    
    getRecommendations() {
        return [...this.recommendations];
    }
    
    // Generate meta description suggestion
    suggestMetaDescription(content) {
        if (typeof content !== 'string') return '';
        
        // Extract first meaningful sentence
        const sentences = content.split('.').filter(s => s.trim().length > 20);
        const suggestion = sentences[0] ? sentences[0].trim() : '';
        
        // Truncate to SEO-friendly length
        return suggestion.length > 160 ? suggestion.substring(0, 157) + '...' : suggestion;
    }
    
    // Check page loading speed factors
    checkPageSpeed() {
        const recommendations = [];
        
        // Check for large images
        document.querySelectorAll('img').forEach(img => {
            if (img.naturalWidth > 1920 || img.naturalHeight > 1080) {
                recommendations.push('Consider optimizing large images for web');
            }
        });
        
        // Check for inline styles (affects loading)
        const inlineStyles = document.querySelectorAll('[style]').length;
        if (inlineStyles > 10) {
            recommendations.push('Consider moving inline styles to CSS files');
        }
        
        return recommendations;
    }
    
    generateSEOReport() {
        return {
            timestamp: new Date().toISOString(),
            recommendations: this.getRecommendations(),
            pageSpeedSuggestions: this.checkPageSpeed(),
            pageInfo: {
                title: document.title,
                metaDescription: document.querySelector('meta[name="description"]')?.content || 'Not found',
                h1Count: document.querySelectorAll('h1').length,
                imageCount: document.querySelectorAll('img').length,
                imagesWithoutAlt: document.querySelectorAll('img:not([alt]), img[alt=""]').length
            }
        };
    }
}

export default SEOOptimizer;

// Auto-initialize SEO analysis
if (typeof window !== 'undefined' && !window.aiSEOOptimizer) {
    window.aiSEOOptimizer = new SEOOptimizer();
}