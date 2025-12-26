

class ThemeLoader {
    // 添加静态默认主题变量
    static DEFAULT_THEME = 'win11';
    
    constructor() {
        this.siteConfig = null;
        this.currentTheme = ThemeLoader.DEFAULT_THEME; // 使用静态变量作为默认主题
        this.loadingComplete = false;
    }

    
    async initialize() {
        try {
            // 等待site-config.js加载完成
            await this.waitForSiteConfig();
            
            // 从配置中获取主题设置
            this.loadThemeFromConfig();
            
            // 加载对应的CSS文件
            this.loadThemeCSS();
            
            // 应用主题类名
            this.applyThemeClass();
            
            this.loadingComplete = true;
            console.log(`主题加载完成: ${this.currentTheme}`);
            
            // 触发主题加载完成事件
            this.triggerThemeLoadedEvent();
        } catch (error) {
            console.error('主题加载失败:', error);
            // 加载失败时使用默认主题
            this.fallbackToDefaultTheme();
        }
    }

    
    async waitForSiteConfig() {
        // 先检查window.siteConfigLoaded Promise是否存在
        if (window.siteConfigLoaded && typeof window.siteConfigLoaded.then === 'function') {
            console.log('等待配置Promise解析...');
            try {
                await window.siteConfigLoaded;
                if (window.siteConfig) {
                    this.siteConfig = window.siteConfig;
                    console.log('配置Promise已解析，配置已加载');
                    return;
                } else {
                    throw new Error('配置Promise解析但配置对象不存在');
                }
            } catch (error) {
                console.error('配置Promise拒绝:', error);
                throw error;
            }
        } 
        // 同时监听site.config.loaded事件作为备选方案
        else {
            console.log('监听配置加载完成事件...');
            return new Promise((resolve, reject) => {
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
                const maxAttempts = 50;
                let attempts = 0;
                
                const checkConfig = () => {
                    attempts++;
                    
                    if (window.siteConfig && window.siteConfig.loaded) {
                        this.siteConfig = window.siteConfig;
                        console.log('配置已加载（轮询方式）');
                        window.removeEventListener('site.config.loaded', handleConfigLoaded);
                        resolve();
                    } else if (attempts >= maxAttempts) {
                        window.removeEventListener('site.config.loaded', handleConfigLoaded);
                        reject(new Error('无法加载site-config.js'));
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
            });
        }
    }

    
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
                    console.warn(`无效的主题设置: ${configTheme}，使用默认主题 ${ThemeLoader.DEFAULT_THEME}`);
                    this.currentTheme = ThemeLoader.DEFAULT_THEME;
                }
            } else if (this.siteConfig && this.siteConfig.site && this.siteConfig.site.uiStyle) {
                // 兼容旧版本访问方式
                const configTheme = this.siteConfig.site.uiStyle.toLowerCase();
                console.log('通过site.uiStyle获取主题:', configTheme);
                if (['win10', 'win11'].includes(configTheme)) {
                    this.currentTheme = configTheme;
                    console.log('主题设置已更新为:', this.currentTheme);
                } else {
                    console.warn(`无效的主题设置: ${configTheme}，使用默认主题 ${ThemeLoader.DEFAULT_THEME}`);
                    this.currentTheme = ThemeLoader.DEFAULT_THEME;
                }
            } else {
                console.warn('未找到UI主题配置，使用默认主题', ThemeLoader.DEFAULT_THEME);
                this.currentTheme = ThemeLoader.DEFAULT_THEME;
            }
        } catch (error) {
            console.error('从配置加载主题失败:', error);
            console.warn('使用默认主题', ThemeLoader.DEFAULT_THEME);
            this.currentTheme = ThemeLoader.DEFAULT_THEME;
        }
        console.log('最终主题设置:', this.currentTheme);
    }

    
    loadThemeCSS() {
        // 先确保基础CSS已加载
        this.ensureBaseCSSLoaded();
        
        // 移除可能存在的旧主题CSS
        this.removeExistingThemeCSS();
        
        // 加载新主题CSS
        const themeCSS = document.createElement('link');
        themeCSS.id = 'theme-css';
        themeCSS.rel = 'stylesheet';
        themeCSS.href = `css/${this.currentTheme}.css`;
        themeCSS.async = false;
        
        document.head.appendChild(themeCSS);
        
        // 监听CSS加载完成事件
        themeCSS.onload = () => {
            console.log(`主题CSS加载完成: ${this.currentTheme}.css`);
            
            // 确保主题类名已应用
            this.applyThemeClass();
            
            // 通知页面可以开始渲染
            this.notifyRenderReady();
            
            // 标记加载完成
            this.loadingComplete = true;
        };
        
        themeCSS.onerror = () => {
            console.error(`主题CSS加载失败: ${this.currentTheme}.css`);
            this.fallbackToDefaultTheme();
        };
    }

    
    ensureBaseCSSLoaded() {
        let baseCSS = document.getElementById('base-css');
        
        if (!baseCSS) {
            baseCSS = document.createElement('link');
            baseCSS.id = 'base-css';
            baseCSS.rel = 'stylesheet';
            baseCSS.href = 'css/base.css';
            baseCSS.async = false;
            document.head.appendChild(baseCSS);
        }
    }

    /**
     * 移除现有的主题CSS
     */
    removeExistingThemeCSS() {
        const existingThemeCSS = document.getElementById('theme-css');
        if (existingThemeCSS) {
            existingThemeCSS.remove();
        }
    }

    
    applyThemeClass() {
        // 移除所有主题类名
        document.body.classList.remove('win10', 'win11');
        
        // 添加当前主题类名
        document.body.classList.add(this.currentTheme);
        
        // 更新导航栏类名
        const navbar = document.getElementById('navbar');
        if (navbar) {
            // 移除所有导航栏主题类名
            navbar.classList.remove('win10-navbar', 'win11-navbar');
            // 添加当前主题的导航栏类名
            navbar.classList.add(`${this.currentTheme}-navbar`);
            console.log(`导航栏主题已更新为: ${this.currentTheme}-navbar`);
        }
        
        // 替换所有元素中的主题相关类名
        this.replaceThemeClassNames();
    }
    
    
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

    
    fallbackToDefaultTheme() {
        console.log(`回退到默认主题 ${ThemeLoader.DEFAULT_THEME}`);
        this.currentTheme = ThemeLoader.DEFAULT_THEME;
        this.loadThemeCSS();
        this.applyThemeClass();
    }

    
    notifyRenderReady() {
        // 创建自定义事件
        const renderReadyEvent = new CustomEvent('theme.render.ready', {
            detail: {
                theme: this.currentTheme
            }
        });
        
        // 触发事件
        window.dispatchEvent(renderReadyEvent);
    }

    
    triggerThemeLoadedEvent() {
        const themeLoadedEvent = new CustomEvent('theme.loaded', {
            detail: {
                theme: this.currentTheme,
                timestamp: Date.now()
            }
        });
        
        window.dispatchEvent(themeLoadedEvent);
    }

    
    getCurrentTheme() {
        return this.currentTheme;
    }

    
    switchTheme(newTheme) {
        if (['win10', 'win11'].includes(newTheme) && newTheme !== this.currentTheme) {
            this.currentTheme = newTheme;
            this.loadThemeCSS();
            this.applyThemeClass();
            
            // 触发主题切换事件
            const themeSwitchedEvent = new CustomEvent('theme.switched', {
                detail: {
                    theme: newTheme
                }
            });
            window.dispatchEvent(themeSwitchedEvent);
            
            console.log(`主题已切换至: ${newTheme}`);
        }
    }
}

// 创建单例实例
const themeLoader = new ThemeLoader();

// 自动初始化（如果支持立即执行）
function initThemeLoader() {
    // 等待配置加载完成后再初始化
    if (window.siteConfigLoaded) {
        console.log('等待配置加载完成后初始化主题加载器...');
        window.siteConfigLoaded.then(() => {
            // 应用主题类名到body
            const configTheme = window.siteConfig?.getUIStyle?.() || ThemeLoader.DEFAULT_THEME;
            console.log('初始化时应用主题类名:', configTheme);
            document.body.classList.add(configTheme);
            
            // 初始化主题加载器
            themeLoader.initialize();
        }).catch(error => {
            console.error('配置加载失败，使用默认主题初始化:', error);
            document.body.classList.add(ThemeLoader.DEFAULT_THEME);
            themeLoader.initialize();
        });
    } else {
        // 回退到原来的方式
        console.log('使用回退方式初始化主题加载器');
        const configTheme = window.siteConfig?.getUIStyle?.() || ThemeLoader.DEFAULT_THEME;
        document.body.classList.add(configTheme);
        themeLoader.initialize();
    }
}

// 确保DOM内容已加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeLoader);
} else {
    initThemeLoader();
}

// 为了兼容不使用模块的页面，将主题加载器挂载到window对象
window.themeLoader = themeLoader;