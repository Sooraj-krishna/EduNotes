/**
 * AI-Generated User Engagement Utility
 * SAFE TO USE: This only adds features, never removes existing functionality
 */

class EngagementBooster {
    constructor(options = {}) {
        this.config = {
            showTips: options.showTips !== false,
            tipDelay: options.tipDelay || 15000, // 15 seconds
            maxTips: options.maxTips || 3,
            respectUserPreferences: true
        };
        
        this.tipsShown = 0;
        this.isActive = true;
        this.userInteracted = false;
        
        // Only initialize if not already running
        if (!window.aiEngagementActive) {
            this.init();
            window.aiEngagementActive = true;
        }
    }
    
    init() {
        // Safe initialization that doesn't interfere with existing code
        this.trackUserInteraction();
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startEngagement());
        } else {
            this.startEngagement();
        }
        
        console.log('[AI Engagement] Booster initialized safely');
    }
    
    trackUserInteraction() {
        // Track if user is actively engaging
        ['click', 'scroll', 'keydown', 'touchstart'].forEach(eventType => {
            document.addEventListener(eventType, () => {
                this.userInteracted = true;
            }, { once: true, passive: true });
        });
    }
    
    startEngagement() {
        // Only start if user hasn't interacted yet (they might need guidance)
        setTimeout(() => {
            if (this.isActive && this.tipsShown < this.config.maxTips && !this.userInteracted) {
                this.showEngagementTip();
            }
        }, this.config.tipDelay);
    }
    
    showEngagementTip() {
        if (this.tipsShown >= this.config.maxTips || this.userInteracted) return;
        
        const tip = this.createTipElement();
        document.body.appendChild(tip);
        this.tipsShown++;
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (tip.parentNode) {
                tip.parentNode.removeChild(tip);
            }
        }, 10000);
        
        console.log(`[AI Engagement] Tip ${this.tipsShown} shown`);
    }
    
    createTipElement() {
        const tipMessages = [
            "💡 Welcome! Explore the features to get the most out of this site.",
            "🔍 Try searching or browsing the content sections.",
            "⭐ Found something interesting? Don't forget to bookmark it!"
        ];
        
        const message = tipMessages[this.tipsShown % tipMessages.length];
        
        const tip = document.createElement('div');
        tip.innerHTML = `
            <div style="position: fixed; bottom: 20px; right: 20px; 
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; padding: 15px 20px; 
                        border-radius: 12px; max-width: 320px; z-index: 9999;
                        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
                        font-size: 14px; line-height: 1.4;
                        animation: slideIn 0.3s ease-out;">
                <p style="margin: 0 0 10px 0;">${message}</p>
                <button onclick="this.parentElement.parentElement.remove(); window.aiEngagementActive = false;" 
                        style="background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); 
                               color: white; padding: 6px 12px; border-radius: 6px; 
                               cursor: pointer; float: right; font-size: 12px;">Got it!</button>
                <div style="clear: both;"></div>
            </div>
            <style>
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            </style>
        `;
        return tip;
    }
    
    disable() {
        this.isActive = false;
        console.log('[AI Engagement] Booster disabled');
    }
    
    getStats() {
        return {
            tipsShown: this.tipsShown,
            userInteracted: this.userInteracted,
            isActive: this.isActive
        };
    }
}

// Safe global export
export default EngagementBooster;

// Auto-initialize with user preference respect
if (typeof window !== 'undefined' && !window.aiEngagementBooster) {
    // Only auto-initialize if user hasn't been here before
    const hasVisited = localStorage.getItem('ai-engagement-seen');
    if (!hasVisited) {
        window.aiEngagementBooster = new EngagementBooster();
        localStorage.setItem('ai-engagement-seen', 'true');
    }
}