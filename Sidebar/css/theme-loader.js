// 侧边栏主题加载器 - 为侧边栏页面动态加载UI主题

class SidebarThemeLoader {
    constructor() {
        this.siteConfig = null;
        this.currentTheme = 'win11'; // 默认主题
        this.loadingComplete = false;
        this.pageType = this.detectPageType();
    }

    /**
     * 初始化主题加载器
     */
    async initialize() {
        try {
            console.log('侧边栏主题加载器初始化中...');
            
            // 等待site-config.js加载完成
            await this.waitForSiteConfig();
            
            // 从配置中获取主题设置
            this.loadThemeFromConfig();
            
            // 加载基础主题CSS
            this.loadBaseThemeCSS();
            
            // 加载页面特定的主题CSS
            this.loadPageSpecificThemeCSS();
            
            // 应用主题类名
            this.applyThemeClass();
            
            this.loadingComplete = true;
            console.log(`侧边栏主题加载完成: ${this.currentTheme}, 页面类型: ${this.pageType}`);
            
            // 触发主题加载完成事件
            this.triggerThemeLoadedEvent();
        } catch (error) {
            console.error('侧边栏主题加载失败:', error);
            // 加载失败时使用默认主题
            this.fallbackToDefaultTheme();
            
            // 确保在失败情况下也通知渲染准备就绪
            this.notifyRenderReady();
        }
    }

    /**
     * 检测当前页面类型
     */
    detectPageType() {
        const pathname = window.location.pathname;
        
        if (pathname.includes('about.html')) return 'about';
        if (pathname.includes('notice.html')) return 'notice';
        if (pathname.includes('Rules.html')) return 'rules';
        if (pathname.includes('treasurebox.html')) return 'treasurebox';
        
        return 'default';
    }

    /**
     * 等待site-config.js加载完成
     */
    async waitForSiteConfig() {
        return new Promise((resolve, reject) => {
            // 先检查window.siteConfigLoaded Promise是否存在
            if (window.siteConfigLoaded && typeof window.siteConfigLoaded.then === 'function') {
                console.log('等待配置Promise解析...');
                window.siteConfigLoaded.then(() => {
                    if (window.siteConfig) {
                        this.siteConfig = window.siteConfig;
                        console.log('配置Promise已解析，配置已加载');
                        resolve();
                    } else {
                        reject(new Error('配置Promise解析但配置对象不存在'));
                    }
                }).catch(error => {
                    console.error('配置Promise拒绝:', error);
                    reject(error);
                });
            } 
            // 同时监听site.config.loaded事件作为备选方案
            else {
                console.log('监听配置加载完成事件...');
                const handleConfigLoaded = () => {
                    if (window.siteConfig) {
                        this.siteConfig = window.siteConfig;
                        console.log('配置加载完成事件已触发');
                        window.removeEventListener('site.config.loaded', handleConfigLoaded);
                        resolve();
                    }
                };
                
                window.addEventListener('site.config.loaded', handleConfigLoaded);
                
                // 传统的轮询方式作为最后备选
                const maxAttempts = 20; // 减少轮询次数，避免长时间等待
                let attempts = 0;
                
                const checkConfig = () => {
                    attempts++;
                    
                    if (window.siteConfig && window.siteConfig.loaded) {
                        this.siteConfig = window.siteConfig;
                        console.log('配置已加载（轮询方式）');
                        window.removeEventListener('site.config.loaded', handleConfigLoaded);
                        resolve();
                    } else if (attempts >= maxAttempts) {
                        console.warn('配置加载超时，使用默认主题');
                        window.removeEventListener('site.config.loaded', handleConfigLoaded);
                        // 超时时直接使用默认主题，不拒绝Promise
                        resolve();
                    } else {
                        setTimeout(checkConfig, 100);
                    }
                };
                
                // 如果配置已经加载完成，直接处理
                if (window.siteConfig && window.siteConfig.loaded) {
                    handleConfigLoaded();
                } else {
                    checkConfig();
                }
            }
        });
    }

    /**
     * 从配置中加载主题设置
     */
    loadThemeFromConfig() {
        try {
            console.log('开始从配置加载主题设置...');
            
            // 使用getUIStyle方法获取主题配置
            if (this.siteConfig && typeof this.siteConfig.getUIStyle === 'function') {
                const configTheme = this.siteConfig.getUIStyle().toLowerCase();
                console.log('通过getUIStyle获取主题:', configTheme);
                
                // 验证主题值是否有效
                if (['win10', 'win11'].includes(configTheme)) {
                    this.currentTheme = configTheme;
                    console.log('主题设置已更新为:', this.currentTheme);
                } else {
                    console.warn(`无效的主题设置: ${configTheme}，使用默认主题 win11`);
                    this.currentTheme = 'win11';
                }
            } else if (this.siteConfig && this.siteConfig.site && this.siteConfig.site.uiStyle) {
                // 兼容旧版本访问方式
                const configTheme = this.siteConfig.site.uiStyle.toLowerCase();
                console.log('通过site.uiStyle获取主题:', configTheme);
                if (['win10', 'win11'].includes(configTheme)) {
                    this.currentTheme = configTheme;
                    console.log('主题设置已更新为:', this.currentTheme);
                } else {
                    console.warn(`无效的主题设置: ${configTheme}，使用默认主题 win11`);
                    this.currentTheme = 'win11';
                }
            } else {
                console.warn('未找到UI主题配置，使用默认主题 win11');
                this.currentTheme = 'win11';
            }
        } catch (error) {
            console.error('从配置加载主题失败:', error);
            console.warn('使用默认主题 win11');
        }
        console.log('最终主题设置:', this.currentTheme);
    }

    /**
     * 加载基础主题CSS
     */
    loadBaseThemeCSS() {
        // 确保基础CSS已加载
        this.ensureBaseCSSLoaded();
        
        // 移除可能存在的旧主题CSS
        this.removeExistingBaseThemeCSS();
        
        // 加载侧边栏基础主题CSS
        const themeCSS = document.createElement('link');
        themeCSS.id = 'sidebar-theme-css';
        themeCSS.rel = 'stylesheet';
        themeCSS.href = `../css/${this.currentTheme}.css`;
        themeCSS.async = false;
        
        document.head.appendChild(themeCSS);
        
        // 监听CSS加载完成事件
        themeCSS.onload = () => {
            console.log(`侧边栏基础主题CSS加载完成: ${this.currentTheme}.css`);
            
            // 确保主题类名已应用
            this.applyThemeClass();
        };
        
        themeCSS.onerror = () => {
            console.error(`侧边栏基础主题CSS加载失败: ${this.currentTheme}.css`);
            // 不立即回退，因为页面特定CSS可能还能加载
        };
    }

    /**
     * 加载页面特定的主题CSS
     */
    loadPageSpecificThemeCSS() {
        if (this.pageType === 'default') {
            // 对于默认页面类型，直接通知渲染准备就绪
            console.log('默认页面类型，直接通知渲染准备就绪');
            this.notifyRenderReady();
            return;
        }
        
        // 移除可能存在的旧页面主题CSS
        const existingPageCSS = document.getElementById(`sidebar-${this.pageType}-theme-css`);
        if (existingPageCSS) {
            existingPageCSS.remove();
        }
        
        // 加载页面特定主题CSS
        const pageCSS = document.createElement('link');
        pageCSS.id = `sidebar-${this.pageType}-theme-css`;
        pageCSS.rel = 'stylesheet';
        // 修复路径：确保正确加载 css/treasurebox/win11.css 格式的文件
        pageCSS.href = `css/${this.pageType}/${this.currentTheme}.css`;
        pageCSS.async = false;
        
        document.head.appendChild(pageCSS);
        
        // 监听CSS加载完成事件
        pageCSS.onload = () => {
            console.log(`侧边栏页面主题CSS加载完成: ${this.pageType}/${this.currentTheme}.css`);
            
            // 应用页面特定的主题类名
            this.applyPageSpecificThemeClass();
            
            // 通知页面可以开始渲染
            this.notifyRenderReady();
        };
        
        pageCSS.onerror = () => {
            console.error(`侧边栏页面主题CSS加载失败: ${this.pageType}/${this.currentTheme}.css`);
            // 即使页面CSS加载失败，也尝试通知渲染准备就绪
            this.notifyRenderReady();
        };
    }

    /**
     * 确保基础CSS已加载
     */
    ensureBaseCSSLoaded() {
        let baseCSS = document.getElementById('sidebar-base-css');
        
        if (!baseCSS) {
            baseCSS = document.createElement('link');
            baseCSS.id = 'sidebar-base-css';
            baseCSS.rel = 'stylesheet';
            baseCSS.href = '../css/base.css';
            baseCSS.async = false;
            document.head.appendChild(baseCSS);
        }
    }

    /**
     * 移除现有的基础主题CSS
     */
    removeExistingBaseThemeCSS() {
        const existingThemeCSS = document.getElementById('sidebar-theme-css');
        if (existingThemeCSS) {
            existingThemeCSS.remove();
        }
    }

    /**
     * 应用主题类名到body、导航栏和所有相关元素
     */
    applyThemeClass() {
        // 移除所有主题类名
        document.body.classList.remove('win10', 'win11', 'win10-sidebar', 'win11-sidebar');
        
        // 添加当前主题类名（同时添加侧边栏特定类名）
        document.body.classList.add(this.currentTheme);
        document.body.classList.add(`${this.currentTheme}-sidebar`);
        
        // 更新导航栏类名
        const navbar = document.getElementById('navbar');
        if (navbar) {
            // 移除所有导航栏主题类名
            navbar.classList.remove('win10-navbar', 'win11-navbar', 'win10-sidebar-navbar', 'win11-sidebar-navbar');
            // 添加当前主题的导航栏类名
            navbar.classList.add(`${this.currentTheme}-navbar`);
            navbar.classList.add(`${this.currentTheme}-sidebar-navbar`);
            console.log(`导航栏主题已更新为: ${this.currentTheme}-navbar, ${this.currentTheme}-sidebar-navbar`);
        }
        
        // 替换所有元素中的主题相关类名
        this.replaceThemeClassNames();
    }
    
    /**
     * 应用页面特定的主题类名
     */
    applyPageSpecificThemeClass() {
        if (this.pageType === 'treasurebox') {
            // 为百宝箱特定元素添加主题类名
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.classList.remove('win10-hero', 'win11-hero');
                heroSection.classList.add(`${this.currentTheme}-hero`);
            }
            
            const toolCards = document.querySelectorAll('.tool-card');
            toolCards.forEach(card => {
                card.classList.remove('win10-tool-card', 'win11-tool-card');
                card.classList.add(`${this.currentTheme}-tool-card`);
            });
        }
    }

    /**
     * 替换页面上所有的主题相关类名
     */
    replaceThemeClassNames() {
        const fromTheme = this.currentTheme === 'win10' ? 'win11' : 'win10';
        const toTheme = this.currentTheme;
        
        // 获取所有带有主题前缀的类名元素
        const elements = document.querySelectorAll(`[class*="${fromTheme}-"]`);
        let replacedCount = 0;
        
        elements.forEach(element => {
            const classes = element.className.split(' ');
            const newClasses = classes.map(cls => {
                // 替换主题前缀
                if (cls.startsWith(`${fromTheme}-`)) {
                    replacedCount++;
                    return cls.replace(`${fromTheme}-`, `${toTheme}-`);
                }
                return cls;
            });
            
            // 应用新的类名
            element.className = newClasses.join(' ');
        });
        
        console.log(`已替换 ${replacedCount} 个主题相关类名，从 ${fromTheme} 切换到 ${toTheme}`);
    }

    /**
     * 回退到默认主题
     */
    fallbackToDefaultTheme() {
        console.log('回退到默认主题 win11');
        this.currentTheme = 'win11';
        this.loadBaseThemeCSS();
        this.loadPageSpecificThemeCSS();
        this.applyThemeClass();
    }

    /**
     * 通知页面渲染准备就绪
     */
    notifyRenderReady() {
        // 创建自定义事件
        const renderReadyEvent = new CustomEvent('sidebar.theme.render.ready', {
            detail: {
                theme: this.currentTheme,
                pageType: this.pageType
            }
        });
        
        // 触发事件
        window.dispatchEvent(renderReadyEvent);
    }

    /**
     * 触发主题加载完成事件
     */
    triggerThemeLoadedEvent() {
        const themeLoadedEvent = new CustomEvent('sidebar.theme.loaded', {
            detail: {
                theme: this.currentTheme,
                pageType: this.pageType,
                timestamp: Date.now()
            }
        });
        
        window.dispatchEvent(themeLoadedEvent);
    }

    /**
     * 获取当前主题
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * 获取当前页面类型
     */
    getPageType() {
        return this.pageType;
    }

    /**
     * 动态切换主题
     */

}

// 创建单例实例
const sidebarThemeLoader = new SidebarThemeLoader();

// 自动初始化函数
function initSidebarThemeLoader() {
    console.log('初始化侧边栏主题加载器...');
    
    // 先尝试从配置获取主题
    let initialTheme = 'win11';
    try {
        initialTheme = window.siteConfig?.getUIStyle?.() || window.siteConfig?.site?.uiStyle || 'win11';
        initialTheme = initialTheme.toLowerCase();
        if (!['win10', 'win11'].includes(initialTheme)) {
            initialTheme = 'win11';
        }
    } catch (error) {
        console.warn('获取初始主题失败，使用默认主题:', error);
    }
    
    console.log('初始主题设置:', initialTheme);
    
    // 先应用基础类名，确保页面加载时不会出现样式闪烁
    document.body.classList.add(initialTheme);
    document.body.classList.add(`${initialTheme}-sidebar`);
    
    // 初始化主题加载器
    sidebarThemeLoader.initialize();
}

// 确保DOM内容已加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSidebarThemeLoader, 0); // 在下一个事件循环初始化
    });
} else {
    setTimeout(initSidebarThemeLoader, 0); // 在下一个事件循环初始化
}

// 为了兼容不使用模块的页面，将主题加载器挂载到window对象
window.sidebarThemeLoader = sidebarThemeLoader;
window.themeLoader = sidebarThemeLoader; // 兼容旧的引用方式