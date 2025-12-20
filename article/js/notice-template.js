/**
 * 通知模板页面JavaScript功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航栏交互
    initNavbar();
    
    // 获取URL参数
    const urlParams = new URLSearchParams(window.location.search);
    const mdFile = urlParams.get('md');
    
    if (mdFile) {
        // 加载Markdown文件
        loadMarkdownFile(mdFile);
    } else {
        // 显示错误信息
        showErrorMessage('未指定文章文件');
    }
});

// 加载Markdown文件
async function loadMarkdownFile(mdFile) {
    try {
        const response = await fetch(mdFile);
        if (!response.ok) {
            throw new Error(`文件加载失败: ${response.status} ${response.statusText}`);
        }
        
        const markdownText = await response.text();
        
        // 解析Front Matter
        const { metadata, content } = parseFrontMatter(markdownText);
        
        // 更新页面元数据
        updatePageMetadata(metadata);
        
        // 渲染Markdown内容
        renderMarkdownContent(content);
        
    } catch (error) {
        console.error('加载Markdown文件失败:', error);
        showErrorMessage(error.message);
    }
}

// 解析Front Matter
function parseFrontMatter(markdownText) {
    // 检查是否有Front Matter
    if (!markdownText.startsWith('---')) {
        // 如果没有Front Matter，尝试解析我们当前的Markdown格式
        return parseSimpleMarkdownFormat(markdownText);
    }
    
    // 分割Front Matter和内容
    const parts = markdownText.split('---');
    if (parts.length < 3) {
        return { metadata: {}, content: markdownText };
    }
    
    // 解析Front Matter
    const frontMatterText = parts[1];
    const content = parts.slice(2).join('---').trim();
    
    const metadata = {};
    const lines = frontMatterText.split('\n');
    
    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // 移除引号
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            metadata[key] = value;
        }
    }
    
    return { metadata, content };
}

// 解析简单的Markdown格式（没有Front Matter）
function parseSimpleMarkdownFormat(markdownText) {
    const metadata = {};
    const lines = markdownText.split('\n');
    let contentStartIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // 提取标题（第一行的#标题）
        if (i === 0 && line.startsWith('# ')) {
            metadata.title = line.slice(2).trim();
            contentStartIndex = i + 1;
        }
        // 提取发布日期
        else if (line.includes('发布日期：')) {
            metadata.date = line.replace('> 发布日期：', '').trim();
        }
        // 提取发布人
        else if (line.includes('发布人：')) {
            metadata.author = line.replace('> 发布人：', '').trim();
        }
        // 找到分隔线，确定内容开始位置
        else if (line.trim() === '---') {
            contentStartIndex = i + 1;
            break;
        }
    }
    
    // 提取内容（从分隔线后开始）
    const content = lines.slice(contentStartIndex).join('\n').trim();
    
    return { metadata, content };
}

// 更新页面元数据
function updatePageMetadata(metadata) {
    // 更新页面标题
    if (metadata.title) {
        document.title = `${metadata.title} - 九（2）班 班级网站`;
        const titleElement = document.getElementById('article-title');
        if (titleElement) {
            titleElement.textContent = metadata.title;
        }
    }
    
    // 更新通知级别
    if (metadata.level) {
        const levelMetadata = getLevelMetadata(metadata.level);
        const levelElement = document.getElementById('notice-level');
        if (levelElement) {
            levelElement.innerHTML = `
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white" style="${levelMetadata.style}">
                    <i class="fas ${levelMetadata.icon} mr-1"></i>
                    ${levelMetadata.name}
                </span>
            `;
        }
    }
    
    // 更新日期
    if (metadata.date) {
        const dateElement = document.getElementById('notice-date');
        if (dateElement) {
            dateElement.textContent = formatDate(metadata.date);
        }
    }
    
    // 更新作者
    if (metadata.author) {
        const authorElement = document.getElementById('notice-author');
        if (authorElement) {
            authorElement.textContent = metadata.author;
        }
    }
}

// 渲染Markdown内容
function renderMarkdownContent(markdownText) {
    const contentElement = document.getElementById('article-content');
    if (!contentElement) return;
    
    try {
        // 使用marked库转换Markdown为HTML
        let rawHtml = marked.parse(markdownText);
        
        // 应用自定义样式替换
        
        /* ---------- 1. 段落样式 ---------- */
        rawHtml = rawHtml
            .replace(/<p>/g, '<p class="mb-6 text-gray-700 leading-relaxed">')
            .replace(/<\/p>/g, '</p>');

        /* ---------- 2. 强调文本样式 ---------- */
        rawHtml = rawHtml
            .replace(/<strong>/g, '<strong class="font-bold text-dark">')
            .replace(/<em>/g, '<em class="italic text-primary">');

        /* ---------- 3. 链接样式 ---------- */
        rawHtml = rawHtml
            .replace(/<a([^>]+)>/g, '<a$1 class="text-primary hover:text-accent underline transition-colors duration-200">');

        /* ---------- 4. 列表样式 ---------- */
        // 无序列表
        rawHtml = rawHtml
            .replace(/<ul>/g, '<ul class="space-y-2 mb-6 pl-5">')
            .replace(/<li>/g, '<li class="flex items-start">')
            .replace(/<\/li>/g, '</li>');

        // 有序列表
        rawHtml = rawHtml
            .replace(/<ol>/g, '<ol class="space-y-2 mb-6 pl-5 list-decimal">')
            .replace(/<li>/g, '<li class="flex items-start">');

        /* ---------- 5. 引用样式 ---------- */
        rawHtml = rawHtml
            .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary pl-4 py-2 my-6 bg-light italic text-gray-700">')
            .replace(/<\/blockquote>/g, '</blockquote>');

        /* ---------- 6. 标题样式 ---------- */
        rawHtml = rawHtml
            .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-dark mb-4 pb-2 border-b-2 border-primary">')
            .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-dark mb-3 mt-8">')
            .replace(/<h3>/g, '<h3 class="text-xl font-semibold text-dark mb-2 mt-6">')
            .replace(/<h4>/g, '<h4 class="text-lg font-semibold text-dark mb-2 mt-4">')
            .replace(/<h5>/g, '<h5 class="text-base font-semibold text-dark mb-2 mt-4">')
            .replace(/<h6>/g, '<h6 class="text-sm font-semibold text-dark mb-2 mt-4">');

        /* ---------- 7. 行内代码样式 ---------- */
        rawHtml = rawHtml
            .replace(/<code>/g, '<code class="bg-gray-100 text-red-600 px-2 py-1 rounded text-sm font-mono">')
            .replace(/<\/code>/g, '</code>');

        /* ---------- 8. 代码块样式 ---------- */
        rawHtml = rawHtml
            .replace(/<pre><code/g, '<pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code')
            .replace(/<\/code><\/pre>/g, '</code></pre>');

        /* ---------- 9. 表格样式 ---------- */
        // 外层容器
        rawHtml = rawHtml.replace(/<table[^>]*>/gi,
            '<div class="overflow-x-auto py-2"><div class="min-w-[600px] space-y-2">');
        rawHtml = rawHtml.replace(/<\/table>/gi, '</div></div>');

        // 表头：只在大屏显示
        rawHtml = rawHtml.replace(/<thead[^>]*>(.*?)<\/thead>/gis, (_, thead) => {
            const heads = [...thead.matchAll(/<th[^>]*>(.*?)<\/th>/gi)].map(m => m[1]);
            return `
                <div class="hidden md:grid md:grid-cols-${heads.length} gap-4 px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-lg">
                    ${heads.map(h => `<div class="font-medium">${h}</div>`).join('')}
                </div>`;
        });

        // 每一行：圆角卡片 + 阴影 + 行间距
        rawHtml = rawHtml.replace(/<tbody[^>]*>(.*?)<\/tbody>/gis, (_, tbody) => {
            const rows = [...tbody.matchAll(/<tr[^>]*>(.*?)<\/tr>/gis)];
            const heads = [...rawHtml.matchAll(/<th[^>]*>(.*?)<\/th>/gi)].map(m => m[1]);
            return rows.map(r => {
                const cells = [...r[1].matchAll(/<td[^>]*>(.*?)<\/td>/gi)].map(m => m[1]);
                return `
                    <div class="grid grid-cols-1 md:grid-cols-${cells.length} gap-4 px-4 py-3 bg-white rounded-xl shadow-sm border border-gray-100 text-sm text-gray-900 hover:shadow-md transition-shadow">
                        ${cells.map((c, i) => `
                            <div class="flex md:block">
                                <span class="md:hidden w-24 font-medium text-gray-500">${heads[i] || ''}：</span>
                                <span>${c}</span>
                            </div>`).join('')}
                    </div>`;
            }).join('');
        });

        // 清理残留标签
        rawHtml = rawHtml
            .replace(/<\/?(tr|td|th|tbody|thead)[^>]*>/gi, '');

        /* ---------- 10. 分隔线样式 ---------- */
        rawHtml = rawHtml
            .replace(/<hr>/g, '<hr class="my-8 border-0 border-t-2 border-gray-200">');

        /* ---------- 11. 图片样式 ---------- */
        rawHtml = rawHtml
            .replace(/<img([^>]+)>/g, '<img$1 class="max-w-full h-auto rounded-lg shadow-md my-4">');

        /* ---------- 12. 任务列表样式 ---------- */
        rawHtml = rawHtml
            .replace(/<input type="checkbox"[^>]*>/g, 
                '<input type="checkbox" class="mr-2 h-4 w-4 text-primary rounded focus:ring-primary">');

        /* ---------- 13. 定义列表样式 ---------- */
        rawHtml = rawHtml
            .replace(/<dt>/g, '<dt class="font-semibold text-dark mt-4">')
            .replace(/<dd>/g, '<dd class="ml-4 mb-2 text-gray-600">');

        /* ---------- 14. 上标和下标样式 ---------- */
        rawHtml = rawHtml
            .replace(/<sup>/g, '<sup class="text-xs text-gray-500">')
            .replace(/<sub>/g, '<sub class="text-xs text-gray-500">');

        /* ---------- 15. 键盘按键样式 ---------- */
        rawHtml = rawHtml
            .replace(/<kbd>/g, '<kbd class="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded">');

        /* ---------- 16. 标记样式 ---------- */
        rawHtml = rawHtml
            .replace(/<mark>/g, '<mark class="px-1 py-0.5 bg-yellow-200 text-gray-800 rounded">');

        /* ---------- 17. 缩写样式 ---------- */
        rawHtml = rawHtml
            .replace(/<abbr([^>]+)>/g, '<abbr$1 class="border-b border-dotted border-gray-500 cursor-help">');

        /* ---------- 18. 引文样式 ---------- */
        rawHtml = rawHtml
            .replace(/<cite>/g, '<cite class="italic text-gray-600">');

        /* ---------- 19. 时间样式 ---------- */
        rawHtml = rawHtml
            .replace(/<time([^>]+)>/g, '<time$1 class="text-sm text-gray-500">');

        /* ---------- 20. 自定义注释样式 ---------- */
        // 把 <!--top--> 换成皇冠图标
        rawHtml = rawHtml
            .replace(/<!--top-->/gi,
                '<i class="fas fa-crown text-yellow-500 ml-2" title="第一名"></i>');
        
        // 更新内容区域
        contentElement.innerHTML = `
                <div class="text-gray-700 leading-relaxed">
                    ${rawHtml}
                </div>
            `;
    } catch (error) {
        console.error('渲染Markdown内容失败:', error);
        contentElement.innerHTML = `
            <div class="text-center py-12">
                <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
                <p class="text-lg text-gray-700">渲染文章内容失败</p>
                <p class="text-sm text-gray-500 mt-2">${error.message}</p>
            </div>
        `;
    }
    
    // 重新初始化AOS动画
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// 显示错误信息
function showErrorMessage(message) {
    const contentElement = document.getElementById('article-content');
    if (!contentElement) return;
    
    contentElement.innerHTML = `
        <div class="text-center py-12">
            <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-4"></i>
            <p class="text-lg text-gray-700">加载文章失败</p>
            <p class="text-sm text-gray-500 mt-2">${message}</p>
            <div class="mt-6">
                <a href="../Sidebar/notice.html" class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200">
                    <i class="fas fa-arrow-left mr-2"></i>
                    返回通知列表
                </a>
            </div>
        </div>
    `;
}

// 获取级别元信息
function getLevelMetadata(level) {
    // 获取当前主题
    const theme = getComputedStyle(document.documentElement).getPropertyValue('--theme') || 'win11';
    
    // 根据主题返回适当的CSS类名
    if (theme === 'win10') {
        const metadata = {
            1: { 
                name: '普通', 
                className: 'notice-level-badge notice-level-primary',
                icon: 'fa-file-text' 
            },
            2: { 
                name: '报告', 
                className: 'notice-level-badge notice-level-success',
                icon: 'fa-chart-bar' 
            },
            3: { 
                name: '活动/表彰', 
                className: 'notice-level-badge notice-level-purple',
                icon: 'fa-trophy' 
            }
        };
        return metadata[level] || metadata[1];
    } else {
        // win11/flutter主题
        const metadata = {
            1: { 
                name: '普通', 
                className: 'notice-level-badge notice-level-primary',
                icon: 'fa-file-text' 
            },
            2: { 
                name: '报告', 
                className: 'notice-level-badge notice-level-success',
                icon: 'fa-chart-bar' 
            },
            3: { 
                name: '活动/表彰', 
                className: 'notice-level-badge notice-level-secondary',
                icon: 'fa-trophy' 
            }
        };
        return metadata[level] || metadata[1];
    }
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

// 初始化导航栏交互
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('back-to-top');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // 滚动事件处理
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('shadow-sm');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.add('shadow-sm');
        }

        if (window.scrollY > 300) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100', 'visible');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
            backToTop.classList.remove('opacity-100', 'visible');
        }
    });

    // 返回顶部按钮
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 移动端菜单
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}