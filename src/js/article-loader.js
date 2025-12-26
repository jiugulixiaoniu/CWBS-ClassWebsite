
async function loadAndRenderArticle(articleId, container) {
    try {
        // 构建Markdown文件路径
        const mdPath = `../article/md/${articleId}.md`;
        
        // 加载Markdown文件
        const response = await fetch(mdPath);
        if (!response.ok) {
            throw new Error(`无法加载文章: ${response.status} ${response.statusText}`);
        }
        
        const markdownContent = await response.text();
        
        // 渲染Markdown内容
        const htmlContent = renderMarkdown(markdownContent, {
            enableToc: true,
            enableCodeHighlight: true,
            enableImageLazyLoad: true,
            enableTableResponsive: true,
            enableTaskLists: true,
            enableEmoji: true,
            enableMath: false,
            enableAlerts: true,
            enableBadges: true,
            enableDetails: true,
            enableFootnotes: true
        });
        
        // 将渲染后的内容插入容器
        container.innerHTML = htmlContent;
        
        // 执行后处理（代码高亮等）
        postProcessRenderedContent(container);
        
        // 提取标题并设置页面标题
        extractAndSetTitle(markdownContent);
        
    } catch (error) {
        console.error('加载文章失败:', error);
        container.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-triangle text-red-500 text-2xl mb-3"></i>
                <h3 class="text-lg font-semibold text-red-800 mb-2">加载失败</h3>
                <p class="text-red-600">无法加载文章内容，请稍后重试。</p>
                <p class="text-sm text-red-500 mt-2">错误信息: ${error.message}</p>
            </div>
        `;
    }
}


function postProcessRenderedContent(container) {
    // 代码高亮
    if (typeof hljs !== 'undefined') {
        container.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
        });
    }
    
    // 图片懒加载
    container.querySelectorAll('img').forEach(img => {
        img.loading = 'lazy';
    });
    
    // 表格响应式处理
    container.querySelectorAll('table').forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.className = 'table-responsive overflow-x-auto';
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // 初始化AOS动画
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}


function extractAndSetTitle(markdownContent) {
    // 提取第一个一级标题
    const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
    if (titleMatch && titleMatch[1]) {
        const title = titleMatch[1].trim();
        
        // 设置页面标题
        document.title = `${title} - 九（2）班 班级网站`;
        
        // 设置页面内的标题元素
        const titleElement = document.getElementById('page-title');
        if (titleElement) {
            titleElement.textContent = title;
        }
    }
}


function loadArticleFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        const contentContainer = document.getElementById('content');
        if (contentContainer) {
            loadAndRenderArticle(articleId, contentContainer);
        }
    } else {
        console.error('未找到文章ID参数');
    }
}


function initArticleLoader() {
    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadArticleFromURL);
    } else {
        loadArticleFromURL();
    }
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        loadAndRenderArticle,
        loadArticleFromURL,
        initArticleLoader
    };
}