/**
 * 首页JavaScript功能
 */

// 统计数字动画
function animateNumbers() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = +el.dataset.target;
        if (!target) return;
        const duration = 2000, stepTime = 20;
        const totalSteps = duration / stepTime;
        const stepSize = target / totalSteps;
        let cur = 0;
        const timer = setInterval(() => {
            cur += stepSize;
            if (cur >= target) { cur = target; clearInterval(timer); }
            el.textContent = target > 1000 ? Math.floor(cur).toLocaleString() : Math.floor(cur);
        }, stepTime);
    });
}

// 主题加载完成后初始化页面
function initializePage() {
    console.log('主题加载完成，开始初始化页面组件...');
    
    // 初始化AOS动画库
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');

    if (navbar && backToTop) {
        window.addEventListener('scroll', () => {
            const currentTheme = document.body.classList.contains('win10') ? 'win10' : 'win11';
            
            if (window.scrollY > 50) {
                const shadowPrefix = currentTheme;
                navbar.classList.add(`${shadowPrefix}-shadow-md`);
                navbar.classList.remove(`${shadowPrefix}-shadow-sm`);
            } else {
                const shadowPrefix = currentTheme;
                navbar.classList.remove(`${shadowPrefix}-shadow-md`);
                navbar.classList.add(`${shadowPrefix}-shadow-sm`);
            }

            if (window.scrollY > 300) {
                backToTop.classList.remove('opacity-0', 'invisible');
                backToTop.classList.add('opacity-100', 'visible');
            } else {
                backToTop.classList.add('opacity-0', 'invisible');
                backToTop.classList.remove('opacity-100', 'visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 移动端菜单
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 执行动画
    animateNumbers();
    // 注意：renderNotifications()不再在这里调用，而是在loadNotifications()完成后调用
}

// 监听主题加载完成事件
  window.addEventListener('theme.render.ready', () => {
      initializePage();
      loadMarkdownArticles(); // 初始化页面后加载通知数据
  });
  
  // 备用方案：如果主题加载器没有正确触发事件，使用延迟初始化
  setTimeout(() => {
      if (!document.body.classList.contains('win10') && !document.body.classList.contains('win11')) {
          console.warn('主题加载器没有正确初始化，使用备用初始化方案');
          // 尝试获取当前主题
          const currentTheme = window.siteConfig?.getUIStyle?.() || 'win11';
          document.body.classList.add(currentTheme);
          initializePage();
          loadMarkdownArticles(); // 初始化页面后加载通知数据
      }
  }, 3000); // 3秒后检查

    // 通知数据变量
    let notifications = [];

    // 解析Markdown文章信息
    async function parseMarkdownArticle(filename) {
        try {
            const response = await fetch(`article/md/${filename}`);
            if (!response.ok) return null;
            
            const content = await response.text();
            const lines = content.split('\n');
            
            // 提取标题（第一行的#标题）
            let title = filename.replace('.md', '');
            let date = '';
            let level = 1; // 默认普通通知
            
            for (const line of lines) {
                if (line.startsWith('# ')) {
                    title = line.slice(2).trim();
                } else if (line.includes('发布日期：')) {
                    date = line.replace('> 发布日期：', '').trim();
                }
            }
            
            // 根据标题判断通知级别
            if (title.includes('分数') || title.includes('成绩')) {
                level = 2; // 报告/公示
            } else if (title.includes('活动') || title.includes('表彰') || title.includes('运动会')) {
                level = 3; // 活动/表彰
            }
            
            return {
                id: filename.replace('.md', ''),
                title: title,
                date: date,
                level: level,
                path: `article/notice-template.html?md=md/${filename}`
            };
        } catch (error) {
            console.error('解析Markdown文章失败:', error);
            return null;
        }
    }

    // 获取所有Markdown文章
    async function loadMarkdownArticles() {
        try {
            // 从配置文件读取文章列表
            let articleFiles;
            try {
                const configResponse = await fetch('config/article.json');
                if (!configResponse.ok) throw new Error('Failed to fetch article.json');
                const config = await configResponse.json();
                articleFiles = config.articles?.noticeFiles || [];
            } catch (error) {
                console.error('加载配置文件失败，使用备用列表:', error);
                // 备用列表，防止文件加载失败
                articleFiles = [
                    '202510122130.md',
                    '202510122239.md'
                ];
            }

            const articles = [];
            for (const file of articleFiles) {
                const article = await parseMarkdownArticle(file);
                if (article) {
                    articles.push(article);
                }
            }

            // 按日期排序（最新的在前）
            articles.sort((a, b) => {
                const dateA = new Date(a.date.replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, ''));
                const dateB = new Date(b.date.replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, ''));
                return dateB - dateA;
            });

            notifications = articles;
            renderNotifications();
        } catch (error) {
            console.error('加载Markdown文章失败:', error);
            // 使用备用数据
            notifications = [
                {
                    title: '关于2025-2026学年秋季运动会的通知',
                    date: '2025-10-06',
                    level: 3,
                    path: 'article/notice-template.html?md=md/202510061035.md'
                },
                {
                    title: '25-26 学年九上第一次质量检测（语文）统分通知',
                    date: '2025-10-12',
                    level: 2,
                    path: 'article/notice-template.html?md=md/202510122130.md'
                }
            ];
            renderNotifications();
        }
    }

    // 按日期排序（倒序）
    function sortByDateDesc(arr) {
        return arr.sort((a, b) => {
            const dateA = new Date(a.date.replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, ''));
            const dateB = new Date(b.date.replace(/年/g, '-').replace(/月/g, '-').replace(/日/g, ''));
            return dateB - dateA;
        });
    }

    // 获取等级元数据
    function getLevelMeta(level) {
        const metadata = {
            1: { icon: "fa-file-text", color: "text-blue-500 bg-blue-100" },
            2: { icon: "fa-file-alt", color: "text-green-500 bg-green-100" },
            3: { icon: "fa-star", color: "text-yellow-500 bg-yellow-100" }
        };
        return metadata[level] || metadata[1];
    }

    // 通知渲染函数
    function renderNotifications() {
        const container = document.getElementById('notifications-container');
        if (!container) return;

        container.innerHTML = '';
        const sorted = sortByDateDesc([...notifications]); // 拷贝后排序
        
        // 获取当前主题
        const currentTheme = document.body.classList.contains('win10') ? 'win10' : 'win11';
        
        // 只显示前6个通知
        sorted.slice(0, 6).forEach((item, index) => {
            const meta = getLevelMeta(item.level);
            const div = document.createElement('div');
            
            // 根据当前主题应用不同的卡片类名
            if (currentTheme === 'win10') {
                div.className = 'notification-card';
            } else {
                div.className = 'win11-card rounded-2xl p-6 card-hover glass-card';
            }
            
            div.setAttribute('data-aos', 'fade-up');
            div.setAttribute('data-aos-delay', (index * 100).toString());
            
            // 根据主题生成不同的HTML结构
            if (currentTheme === 'win10') {
                // Windows 10 风格卡片
                div.innerHTML = `
                    <h3 class="notification-title">${item.title}</h3>
                    <span class="notification-date">${item.date}</span>
                    <div class="notification-content">
                        <i class="fas ${meta.icon}"></i>
                    </div>
                    <a href="${item.path}" class="notification-link">
                        点击查看
                    </a>
                `;
            } else {
                // Windows 11 风格卡片（保留原有样式）
                div.innerHTML = `
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex items-center">
                            <div class="w-12 h-12 rounded-xl ${meta.color} flex items-center justify-center mr-4">
                                <i class="fas ${meta.icon}"></i>
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900">${item.title}</h3>
                                <p class="text-sm text-gray-500 mt-1">${item.date}</p>
                            </div>
                        </div>
                    </div>
                    <a href="${item.path}" class="inline-flex items-center text-primary hover:text-primary/80 font-medium">
                        点击查看 <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                `;
            }
            
            container.appendChild(div);
        });
    }