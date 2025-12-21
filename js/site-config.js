
class SiteConfig {
  constructor() {
    this.config = null;
    this.loaded = false;
    this.initPromise = this.init();
  }

  
  async init() {
    try {
      const response = await fetch('https://jiugulixiaoniu.github.io/CWBS-ClassWebsite/config/site-config.json');
      this.config = await response.json();
      console.log('配置文件加载完成:', this.config);
      // 设置加载完成标志
      this.loaded = true;
      // 触发配置加载完成事件
      window.dispatchEvent(new CustomEvent('site.config.loaded'));
    } catch (error) {
      console.error('加载配置文件失败:', error);
      // 使用默认配置
      this.config = {
        site: {
          name: "九（2）班",
          title: "九（2）班班级网站",
          description: "专业的语文积分管理与评估系统",
          uiStyle: "win11" // 确保默认配置也有uiStyle
        },
        pages: {
          index: { title: "九（2）班 - 首页", heroTitle: "欢迎来到九（2）班" },
          about: { title: "关于九（2）班", heroTitle: "了解我们的班级" },
          rules: { title: "班级规则", heroTitle: "班级管理规则" },
          notice: { title: "通知公告", heroTitle: "班级通知" },
          treasurebox: { title: "班级宝库", heroTitle: "学习资源" },
          classstyle: { title: "班级风采", heroTitle: "我们的风采" },
          article: { title: "文章详情"}
        },
        navigation: {
          home: "首页", about: "关于", rules: "规则",
          notice: "通知", treasurebox: "宝库", classstyle: "风采"
        },
        footer: {
          copyright: "© 2025 九（2）班. 保留所有权利。",
          description: "专业的语文积分管理与评估系统，助力学习成长与团队协作。"
        }
      };
      // 即使加载失败，也要设置加载完成标志
      this.loaded = true;
      window.dispatchEvent(new CustomEvent('site.config.loaded'));
    }
    return Promise.resolve();
  }

  
  getConfig() {
    return this.config;
  }

  
  getSiteInfo() {
    return this.config?.site || {};
  }

  
  getUIStyle() {
    console.log('获取UI风格:', this.config?.site?.uiStyle || 'win11');
    return this.config?.site?.uiStyle || 'win11';
  }

  
  getPageConfig(pageKey) {
    return this.config?.pages?.[pageKey] || {};
  }

  
  getNavigationConfig() {
    return this.config?.navigation || {};
  }

  
  getFooterConfig() {
    return this.config?.footer || {};
  }

  
  applyPageConfig(pageKey) {
    if (!this.config) return;

    const pageConfig = this.getPageConfig(pageKey);
    const siteInfo = this.getSiteInfo();

    // 设置页面标题
    if (pageConfig.title) {
      document.title = pageConfig.title;
    }

    // 设置网站名称（如果有对应元素）
    const siteNameElements = document.querySelectorAll('.site-name');
    siteNameElements.forEach(el => {
      if (siteInfo.name) el.textContent = siteInfo.name;
    });

    // 设置英雄区域标题（如果有对应元素）
    const heroTitleElements = document.querySelectorAll('.hero-title, #page-title');
    heroTitleElements.forEach(el => {
      if (pageConfig.heroTitle) el.textContent = pageConfig.heroTitle;
    });

    // 设置英雄区域副标题（如果有对应元素）
    const heroSubtitleElements = document.querySelectorAll('.hero-subtitle');
    heroSubtitleElements.forEach(el => {
      if (pageConfig.heroSubtitle) el.textContent = pageConfig.heroSubtitle;
    });

    // 设置导航栏（如果有对应元素）
    const navConfig = this.getNavigationConfig();
    const navHome = document.querySelector('.nav-home');
    if (navHome && navConfig.home) navHome.textContent = navConfig.home;
    
    const navAbout = document.querySelector('.nav-about');
    if (navAbout && navConfig.about) navAbout.textContent = navConfig.about;
    
    const navRules = document.querySelector('.nav-rules');
    if (navRules && navConfig.rules) navRules.textContent = navConfig.rules;
    
    const navNotice = document.querySelector('.nav-notice');
    if (navNotice && navConfig.notice) navNotice.textContent = navConfig.notice;
    
    const navTreasurebox = document.querySelector('.nav-treasurebox');
    if (navTreasurebox && navConfig.treasurebox) navTreasurebox.textContent = navConfig.treasurebox;
    
    const navClassstyle = document.querySelector('.nav-classstyle');
    if (navClassstyle && navConfig.classstyle) navClassstyle.textContent = navConfig.classstyle;

    // 设置页脚（如果有对应元素）
    const footerConfig = this.getFooterConfig();
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright && footerConfig.copyright) footerCopyright.textContent = footerConfig.copyright;
    
    const footerDescription = document.querySelector('.footer-description');
    if (footerDescription && footerConfig.description) footerDescription.textContent = footerConfig.description;
  }
}


function logClassWebSiteASCII() {
    console.log('欢迎访问九二班班级网站！');

}

// 创建全局配置实例
const siteConfigInstance = new SiteConfig();
window.siteConfig = siteConfigInstance;
// 导出Promise供其他模块等待配置加载完成
window.siteConfigLoaded = siteConfigInstance.initPromise;

// 导出实例供其他模块使用（如果支持模块系统）
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = siteConfigInstance;
}

// 当DOM加载完成后应用配置
document.addEventListener('DOMContentLoaded', () => {
  // 输出ClassWebSite的ASCII艺术字
  logClassWebSiteASCII();
  
  // 获取当前页面类型
  const path = window.location.pathname;
  const href = window.location.href;
  let pageKey = 'index'; // 默认为首页

  // 改进的页面检测逻辑，同时检查路径和URL
  if (path.includes('about') || href.includes('about')) pageKey = 'about';
  else if (path.includes('rules') || href.includes('Rules')) pageKey = 'rules';
  else if (path.includes('notice') || href.includes('notice')) pageKey = 'notice';
  else if (path.includes('treasurebox') || href.includes('treasurebox')) pageKey = 'treasurebox';
  else if (path.includes('classstyle') || href.includes('ClassStyle')) pageKey = 'classstyle';
  else if (path.includes('article') || href.includes('article')) pageKey = 'article';
  // 等待配置加载完成后应用
  setTimeout(() => {
    window.siteConfig.applyPageConfig(pageKey);
  }, 100);

});






