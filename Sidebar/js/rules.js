// 班级规则页面JavaScript

// 返回顶部按钮功能
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (!backToTopButton) return;
    
    // 滚动事件监听
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // 点击事件
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 平滑滚动到锚点
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 规则项目交互效果
function initRuleItemsInteraction() {
    const ruleItems = document.querySelectorAll('.rule-item');
    
    ruleItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('highlight');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('highlight');
        });
    });
}

// 移动端菜单交互
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.remove('show');
            }
        });
    }
}

// 页面加载完成后初始化
window.addEventListener('load', function() {
    initBackToTop();
    initSmoothScroll();
    initRuleItemsInteraction();
    initMobileMenu();
    
    // 检查主题加载完成事件
    if (window.sidebar && window.sidebar.theme && window.sidebar.theme.render && window.sidebar.theme.render.ready) {
        // 如果主题已经加载完成，立即初始化AOS
        AOS.init({
            duration: 1000,
            once: true
        });
    }
});