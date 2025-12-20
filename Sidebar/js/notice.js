// 通知页面功能实现

// 从article/md/目录读取Markdown文章
let notifications = [];

// 解析Markdown文章信息
async function parseMarkdownArticle(filename) {
    try {
        const response = await fetch(`../article/md/${filename}`);
        if (!response.ok) return null;
        
        const content = await response.text();
        const lines = content.split('\n');
        
        // 提取标题（第一行的#标题）
        let title = filename.replace('.md', '');
        let date = '';
        let author = 'JGL STUDIO';
        let level = 1; // 默认普通通知
        
        for (const line of lines) {
            if (line.startsWith('# ')) {
                title = line.slice(2).trim();
            } else if (line.includes('发布日期：')) {
                date = line.replace('> 发布日期：', '').trim();
            } else if (line.includes('发布人：')) {
                author = line.replace('> 发布人：', '').trim();
            }
        }
        
        // 提取内容摘要（前100个字符）
        let contentText = '';
        for (const line of lines) {
            if (!line.startsWith('#') && !line.startsWith('>') && line.trim() !== '---' && line.trim() !== '') {
                contentText += line + ' ';
                if (contentText.length > 50) break;
            }
        }
        
        // 根据标题判断通知级别
        if (title.includes('分数') || title.includes('成绩')) {
            level = 2; // 报告/公示
        } else if (title.includes('活动') || title.includes('表彰')) {
            level = 3; // 活动/表彰
        }
        
        return {
            id: filename.replace('.md', ''),
            title: title,
            content: contentText.trim() + '...',
            date: date,
            level: level,
            author: author,
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
                const configResponse = await fetch('../config/article.json');
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
            return articles;
        } catch (error) {
            console.error('加载Markdown文章失败:', error);
            return [];
        }
    }

// 获取等级元数据
function getLevelMetadata(level) {
    const metadata = {
        1: { name: "普通通知", icon: "fa-file-text", color: "blue" },
        2: { name: "报告/公示", icon: "fa-file-alt", color: "green" },
        3: { name: "活动/表彰", icon: "fa-star", color: "yellow" }
    };
    return metadata[level] || metadata[1];
}

// 按日期排序
function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
}

// 渲染通知列表
function renderNotifications(filter = 'all') {
    const container = document.getElementById('notifications-container');
    if (!container) return;
    
    // 检测当前主题
    const isWin10Theme = document.body.classList.contains('win10');
    
    // 过滤通知
    const filteredNotifications = notifications.filter(notification => {
        if (filter === 'all') return true;
        return notification.level.toString() === filter;
    });
    
    // 按日期排序
    filteredNotifications.sort(sortByDate);
    
    // 清空容器
    container.innerHTML = '';
    
    // 渲染通知项
    filteredNotifications.forEach((notification, index) => {
        const levelMeta = getLevelMetadata(notification.level);
        const cardClass = isWin10Theme ? 'notification-card' : 'notice-card';
        
        const notificationElement = document.createElement('div');
        notificationElement.className = `${cardClass} ${isWin10Theme ? 'priority-' + notification.level : ''}`;
        notificationElement.setAttribute('data-aos', 'fade-up');
        notificationElement.setAttribute('data-aos-delay', (index * 100).toString());
        
        notificationElement.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: var(--win11-${levelMeta.color}-light-bg, rgba(0, 120, 212, 0.1));">
                        <i class="fas ${levelMeta.icon}" style="color: var(--win11-${levelMeta.color}, var(--win11-primary));"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold" style="color: var(--win11-text-primary);">${notification.title}</h3>
                        <div class="flex items-center space-x-2 text-sm" style="color: var(--win11-text-secondary);">
                            <span>${notification.author}</span>
                            <span>•</span>
                            <span>${notification.date}</span>
                        </div>
                    </div>
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style="background-color: var(--win11-${levelMeta.color}-light-bg, rgba(0, 120, 212, 0.1)); color: var(--win11-${levelMeta.color}, var(--win11-primary));">
                    ${levelMeta.name}
                </span>
            </div>
            <p class="mb-4 leading-relaxed" style="color: var(--win11-text-primary);">${notification.content}</p>
            <div class="flex items-center justify-between text-sm">
                <div class="flex items-center space-x-4">
                </div>
                <button class="font-medium transition-colors duration-200 px-4 py-2 rounded" style="background-color: var(--win11-primary); color: var(--win11-text-white);" onclick="openArticle('${notification.id}')">
                    查看详情 <i class="fas fa-arrow-right ml-1"></i>
                </button>
            </div>
        `;
        
        container.appendChild(notificationElement);
    });
    
    // 更新统计数字
    updateStatistics(filteredNotifications.length);
}

// 更新统计数字
function updateStatistics(count) {
    const countElement = document.getElementById('notification-count');
    if (countElement) {
        animateNumber(countElement, parseInt(countElement.textContent) || 0, count);
    }
}

// 数字动画效果
function animateNumber(element, start, end, duration = 500) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 缓动函数
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// 查看通知详情
function viewNotificationDetail(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        // 这里可以打开模态框显示详细内容
        alert(`通知详情：\n标题：${notification.title}\n内容：${notification.content}\n日期：${notification.date}\n发布人：${notification.author}`);
    }
}

// 打开文章页面
function openArticle(articleId) {
    // 跳转到notice-template.html页面，并传递Markdown文件名
    window.location.href = `../article/notice-template.html?md=md/${articleId}.md`;
}

// 初始化通知页面
async function initNoticePage() {
    // 初始化AOS动画
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }
    
    // 加载Markdown文章
    await loadMarkdownArticles();
    
    // 初始化筛选按钮
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 为每个按钮设置对应的颜色样式
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        
        // 根据不同的筛选条件设置不同的颜色
        let colorClass = 'primary';
        let textColorClass = 'text-primary/80';
        let bgColorClass = 'bg-primary/10';
        
        if (filter === '1') {
            colorClass = 'blue';
            textColorClass = 'text-blue-700';
            bgColorClass = 'bg-blue-100';
        } else if (filter === '2') {
            colorClass = 'green';
            textColorClass = 'text-green-700';
            bgColorClass = 'bg-green-100';
        } else if (filter === '3') {
            colorClass = 'yellow';
            textColorClass = 'text-yellow-700';
            bgColorClass = 'bg-yellow-100';
        }
        
        // 设置按钮的默认样式
        button.classList.add(textColorClass, bgColorClass, 'transition-all', 'duration-300');
        button.classList.remove('bg-gray-200', 'text-gray-700');
        
        button.addEventListener('click', function() {
            // 移除所有按钮的激活状态并恢复默认样式
            filterButtons.forEach(btn => {
                const btnFilter = btn.getAttribute('data-filter');
                let btnColorClass, btnTextColorClass, btnBgColorClass;
                
                if (btnFilter === '1') {
                    btnColorClass = 'blue';
                    btnTextColorClass = 'text-blue-700';
                    btnBgColorClass = 'bg-blue-100';
                } else if (btnFilter === '2') {
                    btnColorClass = 'green';
                    btnTextColorClass = 'text-green-700';
                    btnBgColorClass = 'bg-green-100';
                } else if (btnFilter === '3') {
                    btnColorClass = 'yellow';
                    btnTextColorClass = 'text-yellow-700';
                    btnBgColorClass = 'bg-yellow-100';
                } else {
                    btnColorClass = 'primary';
                    btnTextColorClass = 'text-primary/80';
                    btnBgColorClass = 'bg-primary/10';
                }
                
                btn.classList.remove(`bg-${btnColorClass}`, 'text-white');
                btn.classList.add(btnTextColorClass, btnBgColorClass);
            });
            
            // 设置当前按钮为激活状态
            this.classList.remove(textColorClass, bgColorClass);
            this.classList.add(`bg-${colorClass}`, 'text-white');
            
            // 渲染对应筛选结果
            renderNotifications(filter);
        });
    });
    
    // 初始渲染全部通知
    renderNotifications('all');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 等待主题渲染完成
    if (document.body.classList.contains('theme-rendering')) {
        window.addEventListener('sidebar.theme.render.ready', function() {
            initNoticePage();
        });
    } else {
        initNoticePage();
    }
});

// 文章模态框相关函数
function openArticleModal(articleId) {
    // 这里可以实现文章模态框的打开逻辑
    console.log('打开文章模态框:', articleId);
}

function closeArticleModal() {
    // 这里可以实现文章模态框的关闭逻辑
    console.log('关闭文章模态框');
}