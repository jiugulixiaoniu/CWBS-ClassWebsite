// 百宝箱页面特定功能

// 工具模态框相关变量
let toolModal;
let toolTitle;
let toolContent;

// 页面初始化函数
function initTreasureBox() {
    // 获取模态框元素
    toolModal = document.getElementById('toolModal');
    toolTitle = document.getElementById('toolTitle');
    toolContent = document.getElementById('toolContent');

    // 初始化模态框关闭功能
    initModalClose();

    // 初始化回声洞功能
    initEchoHole();
}

// 模态框关闭功能
function initModalClose() {
    const closeBtn = document.getElementById('closeModal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeToolModal);
    }

    // 点击模态框背景关闭
    if (toolModal) {
        toolModal.addEventListener('click', function(e) {
            if (e.target === toolModal) {
                closeToolModal();
            }
        });
    }

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && toolModal && !toolModal.classList.contains('hidden')) {
            closeToolModal();
        }
    });
}

// 关闭工具模态框
function closeToolModal() {
    if (toolModal) {
        toolModal.classList.add('hidden');
    }
}

// 显示工具模态框
function showToolModal(title, content) {
    if (toolModal && toolTitle && toolContent) {
        // 设置标题和内容
        toolTitle.textContent = title;
        toolContent.innerHTML = content;

        // 移除隐藏类以显示模态框
        toolModal.classList.remove('hidden');

        // 应用当前主题样式
        const theme = document.documentElement.dataset.sidebarTheme || 'win11';
        toolModal.dataset.theme = theme;
    }
}

// 计算器工具 - 使用增强版本
function openCalculator() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    if (typeof openEnhancedCalculator === 'function') {
        openEnhancedCalculator();
    } else {
        // 根据主题选择样式类
        const bgColor = theme === 'win10' ? 'bg-gray-100' : 'bg-gray-50';
        const btnPrimary = theme === 'win10' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-500 hover:bg-orange-600';
        const btnSecondary = theme === 'win10' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-100 hover:bg-gray-200';
        const btnNumber = theme === 'win10' ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white hover:bg-gray-50 border border-gray-200';
        const btnClear = theme === 'win10' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600';
        const btnEquals = theme === 'win10' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600';
        const borderRadius = theme === 'win10' ? 'rounded-lg' : 'rounded-xl';
        const inputClass = theme === 'win10' ? 'text-2xl' : 'text-2xl font-medium';

        const calculatorContent = `
            <div class="space-y-4">
                <div class="p-4 ${bgColor} ${borderRadius}">
                    <input type="text" id="calcDisplay" class="w-full p-3 ${inputClass} text-right bg-transparent border-none outline-none" readonly value="0">
                </div>
                
                <div class="grid grid-cols-4 gap-3">
                    <button onclick="clearCalc()" class="calc-btn p-3 ${btnClear} text-white ${borderRadius} transition-colors">C</button>
                    <button onclick="appendToCalc('(')" class="calc-btn p-3 ${btnSecondary} ${borderRadius} transition-colors">(</button>
                    <button onclick="appendToCalc(')')" class="calc-btn p-3 ${btnSecondary} ${borderRadius} transition-colors">)</button>
                    <button onclick="appendToCalc('/')" class="calc-btn p-3 ${btnPrimary} text-white ${borderRadius} transition-colors">/</button>
                    
                    <button onclick="appendToCalc('7')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">7</button>
                    <button onclick="appendToCalc('8')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">8</button>
                    <button onclick="appendToCalc('9')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">9</button>
                    <button onclick="appendToCalc('*')" class="calc-btn p-3 ${btnPrimary} text-white ${borderRadius} transition-colors">×</button>
                    
                    <button onclick="appendToCalc('4')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">4</button>
                    <button onclick="appendToCalc('5')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">5</button>
                    <button onclick="appendToCalc('6')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">6</button>
                    <button onclick="appendToCalc('-')" class="calc-btn p-3 ${btnPrimary} text-white ${borderRadius} transition-colors">-</button>
                    
                    <button onclick="appendToCalc('1')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">1</button>
                    <button onclick="appendToCalc('2')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">2</button>
                    <button onclick="appendToCalc('3')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">3</button>
                    <button onclick="appendToCalc('+')" class="calc-btn p-3 ${btnPrimary} text-white ${borderRadius} transition-colors">+</button>
                    
                    <button onclick="appendToCalc('0')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors col-span-2">0</button>
                    <button onclick="appendToCalc('.')" class="calc-btn p-3 ${btnNumber} ${borderRadius} transition-colors">.</button>
                    <button onclick="calculate()" class="calc-btn p-3 ${btnEquals} text-white ${borderRadius} transition-colors">=</button>
                </div>
            </div>
        `;

        // 使用showToolModal函数显示模态框
        showToolModal('计算器', calculatorContent);

        // 初始化计算器
        calcDisplay = document.getElementById('calcDisplay');
        calcValue = '0';
    }
}

let calcDisplay;
let calcValue = '0';

function appendToCalc(value) {
    if (calcValue === '0' && value !== '.') {
        calcValue = value;
    } else {
        calcValue += value;
    }
    calcDisplay.value = calcValue;
}

function clearCalc() {
    calcValue = '0';
    calcDisplay.value = calcValue;
}

function calculate() {
    try {
        // 替换显示符号为计算符号
        let expression = calcValue.replace(/×/g, '*');
        const result = eval(expression);
        calcValue = result.toString();
        calcDisplay.value = calcValue;
    } catch (error) {
        calcValue = '错误';
        calcDisplay.value = calcValue;
    }
}

// 单位转换器工具 - 使用增强版本
function openConverter() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    if (typeof openEnhancedUnitConverter === 'function') {
        openEnhancedUnitConverter();
    } else {
        // 根据主题选择样式类
        const inputClass = theme === 'win10' ? `${theme}-input` : `${theme}-input`;
        const selectClass = theme === 'win10' ? `${theme}-select` : `${theme}-select`;
        const buttonClass = theme === 'win10' ? `${theme}-button` : `${theme}-button`;
        const resultClass = theme === 'win10' ? 'bg-gray-50 rounded-lg' : 'bg-gray-50 rounded-xl';
        const labelClass = theme === 'win10' ? 'text-sm font-medium text-gray-700' : 'text-sm font-medium text-gray-700';

        const converterContent = `
            <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block ${labelClass} mb-2">转换类型</label>
                        <select id="converterType" class="${selectClass}">
                            <option value="length">长度</option>
                            <option value="weight">重量</option>
                            <option value="temperature">温度</option>
                            <option value="area">面积</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block ${labelClass} mb-2">从单位</label>
                        <select id="fromUnit" class="${selectClass}">
                            <option value="meter">米</option>
                            <option value="centimeter">厘米</option>
                            <option value="kilometer">千米</option>
                            <option value="inch">英寸</option>
                        </select>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block ${labelClass} mb-2">输入值</label>
                        <input type="number" id="inputValue" class="${inputClass}" value="1">
                    </div>
                    
                    <div>
                        <label class="block ${labelClass} mb-2">到单位</label>
                        <select id="toUnit" class="${selectClass}">
                            <option value="centimeter">厘米</option>
                            <option value="meter">米</option>
                            <option value="kilometer">千米</option>
                            <option value="inch">英寸</option>
                        </select>
                    </div>
                </div>
                
                <button onclick="convertUnits()" class="${buttonClass} primary">转换</button>
                
                <div id="converterResult" class="p-4 ${resultClass} min-h-[60px] flex items-center justify-center">
                    <span class="text-gray-400">点击转换查看结果</span>
                </div>
            </div>
        `;

        // 使用showToolModal函数显示模态框
        showToolModal('单位转换器', converterContent);

        // 添加单位类型变化监听
        setTimeout(() => {
            const converterType = document.getElementById('converterType');
            if (converterType) {
                converterType.addEventListener('change', updateConverterUnits);
            }
        }, 100);
    }
}

function updateConverterUnits() {
    const type = document.getElementById('converterType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');

    let units = [];

    switch (type) {
        case 'length':
            units = ['meter', 'centimeter', 'kilometer', 'inch'];
            break;
        case 'weight':
            units = ['kilogram', 'gram', 'pound', 'ounce'];
            break;
        case 'temperature':
            units = ['celsius', 'fahrenheit', 'kelvin'];
            break;
        case 'area':
            units = ['square_meter', 'square_centimeter', 'square_kilometer', 'hectare'];
            break;
    }

    // 更新单位选项
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';

    units.forEach(unit => {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = getUnitName(unit);
        fromUnit.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = getUnitName(unit);
        toUnit.appendChild(option2);
    });
}

function getUnitName(unit) {
    const names = {
        'meter': '米', 'centimeter': '厘米', 'kilometer': '千米', 'inch': '英寸',
        'kilogram': '千克', 'gram': '克', 'pound': '磅', 'ounce': '盎司',
        'celsius': '摄氏度', 'fahrenheit': '华氏度', 'kelvin': '开尔文',
        'square_meter': '平方米', 'square_centimeter': '平方厘米',
        'square_kilometer': '平方千米', 'hectare': '公顷'
    };
    return names[unit] || unit;
}

function convertUnits() {
    const type = document.getElementById('converterType').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const inputValue = parseFloat(document.getElementById('inputValue').value);

    if (isNaN(inputValue)) {
        document.getElementById('converterResult').innerHTML = '<span class="text-danger">请输入有效数值</span>';
        return;
    }

    let result;

    switch (type) {
        case 'length':
            result = convertLength(inputValue, fromUnit, toUnit);
            break;
        case 'weight':
            result = convertWeight(inputValue, fromUnit, toUnit);
            break;
        case 'temperature':
            result = convertTemperature(inputValue, fromUnit, toUnit);
            break;
        case 'area':
            result = convertArea(inputValue, fromUnit, toUnit);
            break;
    }

    document.getElementById('converterResult').innerHTML = `
        <div class="text-center">
            <div class="text-2xl font-bold text-primary">${result}</div>
            <div class="text-sm text-gray-500 mt-2">${getUnitName(toUnit)}</div>
        </div>
    `;
}

function convertLength(value, from, to) {
    // 转换为米
    let meters = value;
    switch (from) {
        case 'centimeter': meters = value / 100; break;
        case 'kilometer': meters = value * 1000; break;
        case 'inch': meters = value * 0.0254; break;
    }

    // 从米转换为目标单位
    switch (to) {
        case 'meter': return meters;
        case 'centimeter': return meters * 100;
        case 'kilometer': return meters / 1000;
        case 'inch': return meters / 0.0254;
    }
    return value;
}

function convertWeight(value, from, to) {
    // 转换为千克
    let kg = value;
    switch (from) {
        case 'gram': kg = value / 1000; break;
        case 'pound': kg = value * 0.453592; break;
        case 'ounce': kg = value * 0.0283495; break;
    }

    // 从千克转换为目标单位
    switch (to) {
        case 'kilogram': return kg;
        case 'gram': return kg * 1000;
        case 'pound': return kg / 0.453592;
        case 'ounce': return kg / 0.0283495;
    }
    return value;
}

function convertTemperature(value, from, to) {
    let celsius = value;

    // 转换为摄氏度
    switch (from) {
        case 'fahrenheit': celsius = (value - 32) * 5/9; break;
        case 'kelvin': celsius = value - 273.15; break;
    }

    // 从摄氏度转换为目标单位
    switch (to) {
        case 'celsius': return celsius;
        case 'fahrenheit': return celsius * 9/5 + 32;
        case 'kelvin': return celsius + 273.15;
    }
    return value;
}

function convertArea(value, from, to) {
    // 转换为平方米
    let sqm = value;
    switch (from) {
        case 'square_centimeter': sqm = value / 10000; break;
        case 'square_kilometer': sqm = value * 1000000; break;
        case 'hectare': sqm = value * 10000; break;
    }

    // 从平方米转换为目标单位
    switch (to) {
        case 'square_meter': return sqm;
        case 'square_centimeter': return sqm * 10000;
        case 'square_kilometer': return sqm / 1000000;
        case 'hectare': return sqm / 10000;
    }
    return value;
}

// 计时器工具
let timerInterval;
let timerSeconds = 0;
let isTimerRunning = false;

function openTimer() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    // 根据主题选择样式类
    const buttonPrimary = theme === 'win10' ? 'bg-green-500 hover:bg-green-600' : 'bg-green-500 hover:bg-green-600 rounded-lg';
    const buttonSecondary = theme === 'win10' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-yellow-500 hover:bg-yellow-600 rounded-lg';
    const buttonDanger = theme === 'win10' ? 'bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600 rounded-lg';
    const buttonInfo = theme === 'win10' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600 rounded-lg';
    const inputClass = theme === 'win10' ? `${theme}-input` : `${theme}-input`;
    const borderRadius = theme === 'win10' ? 'rounded-lg' : 'rounded-xl';
    const borderColor = theme === 'win10' ? 'border-t border-gray-200' : 'border-t border-gray-100';
    const displayClass = theme === 'win10' ? 'text-4xl' : 'text-5xl';
    const countdownDisplayClass = theme === 'win10' ? 'text-2xl' : 'text-3xl';

    const timerContent = `
        <div class="space-y-6">
            <div class="text-center">
                <div id="timerDisplay" class="timer-display ${displayClass} font-mono font-bold text-primary mb-4">00:00:00</div>
                <div class="flex justify-center space-x-4">
                    <button id="timerStartBtn" onclick="startTimer()" class="px-6 py-2 ${buttonPrimary} text-white transition-colors">开始</button>
                    <button id="timerPauseBtn" onclick="pauseTimer()" class="px-6 py-2 ${buttonSecondary} text-white transition-colors" disabled>暂停</button>
                    <button onclick="resetTimer()" class="px-6 py-2 ${buttonDanger} text-white transition-colors">重置</button>
                </div>
            </div>
            
            <div class="${borderColor} pt-4">
                <h3 class="text-lg font-semibold mb-3">倒计时</h3>
                <div class="grid grid-cols-2 gap-4">
                    <input type="number" id="countdownInput" class="${inputClass}" placeholder="秒数" min="1">
                    <button onclick="startCountdown()" class="px-6 py-2 ${buttonInfo} text-white transition-colors">开始倒计时</button>
                </div>
                <div id="countdownDisplay" class="${countdownDisplayClass} font-mono font-bold text-secondary mt-4 text-center">00:00</div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('计时器', timerContent);

    // 重置计时器状态
    timerSeconds = 0;
    isTimerRunning = false;
    clearInterval(timerInterval);

    // 延迟执行updateTimerDisplay，确保DOM元素已加载
    setTimeout(updateTimerDisplay, 10);
}

function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        document.getElementById('timerStartBtn').disabled = true;
        document.getElementById('timerPauseBtn').disabled = false;

        timerInterval = setInterval(() => {
            timerSeconds++;
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (isTimerRunning) {
        isTimerRunning = false;
        document.getElementById('timerStartBtn').disabled = false;
        document.getElementById('timerPauseBtn').disabled = true;
        clearInterval(timerInterval);
    }
}

function resetTimer() {
    pauseTimer();
    timerSeconds = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const hours = Math.floor(timerSeconds / 3600);
    const minutes = Math.floor((timerSeconds % 3600) / 60);
    const seconds = timerSeconds % 60;

    const display =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    document.getElementById('timerDisplay').textContent = display;
}

let countdownInterval;
let countdownSeconds = 0;

function startCountdown() {
    const input = document.getElementById('countdownInput');
    countdownSeconds = parseInt(input.value);

    if (isNaN(countdownSeconds) || countdownSeconds <= 0) {
        input.value = '';
        return;
    }

    clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        countdownSeconds--;
        updateCountdownDisplay();

        if (countdownSeconds <= 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdownDisplay').textContent = '时间到！';
            document.getElementById('countdownDisplay').classList.add('text-danger');
        }
    }, 1000);

    updateCountdownDisplay();
}

function updateCountdownDisplay() {
    const minutes = Math.floor(countdownSeconds / 60);
    const seconds = countdownSeconds % 60;

    const display =
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    document.getElementById('countdownDisplay').textContent = display;
    document.getElementById('countdownDisplay').classList.remove('text-danger');
}

// 随机数生成器工具
// 初始化随机数历史数组，用于保存生成的随机数记录
let randomNumbers = [];

function openRandomGenerator() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';
    const themePrefix = theme;

    const randomGeneratorContent = `
        <div class="${themePrefix}-random-generator-container">
            <!-- 控制面板 -->
            <div class="${themePrefix}-random-control-card">
                <div class="${themePrefix}-random-card-title">
                    <i class="fas fa-sliders-h ${themePrefix}-random-card-icon"></i>
                    <h3>随机设置</h3>
                </div>
                
                <div class="${themePrefix}-random-input-group">
                    <div class="${themePrefix}-random-input-item">
                        <label class="${themePrefix}-random-label">最小值</label>
                        <input type="number" id="minValue" class="${themePrefix}-random-input" value="1">
                    </div>
                    
                    <div class="${themePrefix}-random-input-item">
                        <label class="${themePrefix}-random-label">最大值</label>
                        <input type="number" id="maxValue" class="${themePrefix}-random-input" value="100">
                    </div>
                </div>
                
                <div class="${themePrefix}-random-input-group">
                    <div class="${themePrefix}-random-input-item">
                        <label class="${themePrefix}-random-label">生成数量</label>
                        <input type="number" id="countValue" class="${themePrefix}-random-input" value="1" min="1" max="10">
                    </div>
                    
                    <div class="${themePrefix}-random-input-item">
                        <label class="${themePrefix}-random-label">随机模式</label>
                        <select id="randomMode" class="${themePrefix}-random-select">
                            <option value="integer">整数</option>
                            <option value="decimal">小数(2位)</option>
                        </select>
                    </div>
                </div>
                
                <!-- 快捷预设 -->
                <div class="${themePrefix}-random-presets">
                    <h4 class="${themePrefix}-random-presets-title">快捷预设</h4>
                    <div class="${themePrefix}-random-presets-grid">
                        <button class="${themePrefix}-random-preset-btn secondary" onclick="setRandomPreset(1, 10)">1-10</button>
                        <button class="${themePrefix}-random-preset-btn secondary" onclick="setRandomPreset(1, 100)">1-100</button>
                        <button class="${themePrefix}-random-preset-btn secondary" onclick="setRandomPreset(1, 1000)">1-1000</button>
                        <button class="${themePrefix}-random-preset-btn secondary" onclick="setRandomPreset(1, 6)">骰子(1-6)</button>
                        <button class="${themePrefix}-random-preset-btn secondary" onclick="setRandomPreset(1, 54)">扑克牌(1-54)</button>
                        <button class="${themePrefix}-random-preset-btn secondary" onclick="setRandomPreset(0, 100)">百分比(0-100)</button>
                    </div>
                </div>
                
                <button onclick="generateRandom()" class="${themePrefix}-random-generate-btn primary">
                    <i class="fas fa-random mr-2"></i>
                    生成随机数
                </button>
            </div>
            
            <!-- 结果展示 -->
            <div class="${themePrefix}-random-result-card">
                <div class="${themePrefix}-random-card-title">
                    <i class="fas fa-magic ${themePrefix}-random-card-icon"></i>
                    <h3>随机结果</h3>
                </div>
                
                <div id="randomResult" class="${themePrefix}-random-result-display min-h-[120px] flex items-center justify-center">
                    <span class="${themePrefix}-random-result-placeholder">点击生成随机数</span>
                </div>
                
                <!-- 统计信息 -->
                <div id="randomStats" class="${themePrefix}-random-stats" style="display: none;">
                    <div class="${themePrefix}-random-stat-item">
                        <span>范围:</span>
                        <span id="randomRange" class="${themePrefix}-random-stat-value"></span>
                    </div>
                    <div class="${themePrefix}-random-stat-item">
                        <span>平均值:</span>
                        <span id="randomAverage" class="${themePrefix}-random-stat-value"></span>
                    </div>
                    <div class="${themePrefix}-random-stat-item">
                        <span>最大值:</span>
                        <span id="randomMax" class="${themePrefix}-random-stat-value"></span>
                    </div>
                    <div class="${themePrefix}-random-stat-item">
                        <span>最小值:</span>
                        <span id="randomMin" class="${themePrefix}-random-stat-value"></span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('随机数生成器', randomGeneratorContent);
}

// 设置随机数预设
function setRandomPreset(min, max) {
    document.getElementById('minValue').value = min;
    document.getElementById('maxValue').value = max;
}

function generateRandom() {
    const min = parseFloat(document.getElementById('minValue').value);
    const max = parseFloat(document.getElementById('maxValue').value);
    const count = parseInt(document.getElementById('countValue').value);
    const mode = document.getElementById('randomMode').value;
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';
    const themePrefix = theme;

    if (isNaN(min) || isNaN(max) || isNaN(count) || min >= max || count < 1 || count > 10) {
        document.getElementById('randomResult').innerHTML = `<span class="${themePrefix}-random-error">请输入有效的参数</span>`;
        return;
    }

    const results = [];
    for (let i = 0; i < count; i++) {
        if (mode === 'integer') {
            results.push(Math.floor(Math.random() * (max - min + 1)) + min);
        } else {
            // 小数模式，保留2位小数
            results.push((Math.random() * (max - min) + min).toFixed(2));
        }
    }

    const resultElement = document.getElementById('randomResult');
    
    // 显示统计信息
    const statsElement = document.getElementById('randomStats');
    statsElement.style.display = 'flex';
    
    // 计算统计数据
    const numResults = results.map(r => parseFloat(r));
    const average = numResults.reduce((a, b) => a + b, 0) / numResults.length;
    const maxResult = Math.max(...numResults);
    const minResult = Math.min(...numResults);
    
    // 更新统计信息
    document.getElementById('randomRange').textContent = `${min}-${max}`;
    document.getElementById('randomAverage').textContent = average.toFixed(2);
    document.getElementById('randomMax').textContent = maxResult;
    document.getElementById('randomMin').textContent = minResult;

    // 添加数字滚动动画效果 - 增强版
    resultElement.innerHTML = `
        <div class="${themePrefix}-random-result-content text-center">
            <div class="${themePrefix}-random-result-numbers">
                ${results.map(result => `<span class="${themePrefix}-random-result-number">?</span>`).join(' ')}
            </div>
        </div>
    `;
    
    // 应用随机数生成动画 - 超级增强版本
    const numbers = resultElement.querySelectorAll(`.${themePrefix}-random-result-number`);
    
    // 添加背景光晕扩散效果
    resultElement.style.position = 'relative';
    const glowEffect = document.createElement('div');
    glowEffect.style.position = 'absolute';
    glowEffect.style.top = '50%';
    glowEffect.style.left = '50%';
    glowEffect.style.width = '0';
    glowEffect.style.height = '0';
    glowEffect.style.borderRadius = '50%';
    glowEffect.style.background = 'rgba(0, 120, 212, 0.3)';
    glowEffect.style.transform = 'translate(-50%, -50%)';
    glowEffect.style.transition = 'all 1s ease-out';
    glowEffect.style.zIndex = '0';
    resultElement.appendChild(glowEffect);
    
    // 触发背景光晕动画
    setTimeout(() => {
        glowEffect.style.width = '300px';
        glowEffect.style.height = '300px';
        glowEffect.style.opacity = '0';
    }, 100);
    
    // 为每个数字应用独特的动画
    numbers.forEach((num, index) => {
        // 设置初始状态 - 完全不可见且小
        num.style.opacity = '0';
        num.style.transform = 'scale(0) rotate(-180deg)';
        num.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        num.style.zIndex = 100 - index; // 确保数字堆叠顺序
        num.style.position = 'relative';
        
        // 延迟显示每个数字，创建逐个弹出的效果
        setTimeout(() => {
            // 主进入动画 - 强烈的弹出效果
            num.style.opacity = '1';
            num.style.transform = 'scale(1.4) rotate(360deg)';
            
            // 添加声音效果（如果浏览器支持）
            try {
                const audio = new Audio();
                audio.volume = 0.3;
                audio.play().catch(() => {});
            } catch (e) {}
            
            // 短暂停顿后缩小到正常大小
            setTimeout(() => {
                num.style.transform = 'scale(1) rotate(360deg)';
                
                // 数值滚动动画 - 增强版本
                const targetNum = parseFloat(results[index]);
                let displayNum = 0;
                const duration = 1000; // 更长的动画时间，更加明显
                const frameDuration = 16; // 约60fps
                const totalFrames = Math.round(duration / frameDuration);
                let frame = 0;
                
                // 添加闪烁效果
                num.style.filter = 'brightness(1.5) contrast(1.2)';
                
                setTimeout(() => {
                    num.style.filter = 'brightness(1) contrast(1)';
                }, 200);
                
                const animateNumber = () => {
                    frame++;
                    const progress = frame / totalFrames;
                    // 使用更加强劲的弹性缓动函数
                    const easeOutProgress = 1 - Math.pow(1 - progress, 5);
                    
                    if (mode === 'integer') {
                        displayNum = Math.floor(easeOutProgress * targetNum);
                    } else {
                        displayNum = (easeOutProgress * targetNum).toFixed(2);
                    }
                    
                    // 随机抖动效果，增加动感
                    const jitterX = (Math.random() - 0.5) * 4;
                    const jitterY = (Math.random() - 0.5) * 4;
                    num.style.transform = `translate(${jitterX}px, ${jitterY}px) scale(1)`;
                    
                    num.textContent = displayNum;
                    
                    // 数值变化时的缩放强调效果
                    if (frame % 2 === 0) {
                        num.style.transform = `translate(${jitterX}px, ${jitterY}px) scale(1.1)`;
                    }
                    
                    if (frame < totalFrames) {
                        requestAnimationFrame(animateNumber);
                    } else {
                        // 最终数字显示，确保以H2字号完全显示
                        num.textContent = results[index];
                        num.style.transform = 'scale(1.3)';
                        // 添加确保数字完全显示的样式
                        num.style.whiteSpace = 'nowrap';
                        num.style.display = 'inline-block';
                        num.style.wordBreak = 'keep-all';
                        // 明确设置字体大小为2rem
                        num.style.fontSize = '2rem';
                        
                        // 快速震动效果
                        let shakeCount = 0;
                        const shakeInterval = setInterval(() => {
                            if (shakeCount < 5) {
                                const shakeX = (shakeCount % 2 === 0 ? 5 : -5);
                                num.style.transform = `translateX(${shakeX}px) scale(1.3)`;
                                shakeCount++;
                            } else {
                                clearInterval(shakeInterval);
                                num.style.transform = 'scale(1)';
                                num.style.transition = 'all 0.3s ease';
                            }
                        }, 50);
                    }
                };
                
                requestAnimationFrame(animateNumber);
            }, 350);
            
        }, index * 400); // 更大的间隔，每个数字更加突出
    });
    
    // 添加结果卡片的强烈动画效果
    const resultCard = document.querySelector(`.${themePrefix}-random-result-card`);
    if (resultCard) {
        resultCard.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        resultCard.style.boxShadow = '0 15px 30px rgba(0, 120, 212, 0.3)';
        
        // 添加强烈的呼吸动画
        let scaleCount = 0;
        const breathingAnimation = setInterval(() => {
            if (scaleCount < 6) {
                const scale = scaleCount % 2 === 0 ? 1.03 : 1;
                resultCard.style.transform = `scale(${scale})`;
                scaleCount++;
            } else {
                clearInterval(breathingAnimation);
                resultCard.style.transform = 'scale(1)';
                resultCard.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
            }
        }, 300);
    }
    
    // 显示统计信息（在所有数字动画完成后）
    statsElement.style.opacity = '0';
    statsElement.style.transform = 'translateY(20px)';
    statsElement.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        statsElement.style.opacity = '1';
        statsElement.style.transform = 'translateY(0)';
    }, results.length * 300 + 500);
}

// 倒日历工具 - 使用增强版本
function openCountdown() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    if (typeof openEnhancedCountdown === 'function') {
        openEnhancedCountdown();
    } else {
        // 回退到基础版本，应用主题样式
        // 根据主题选择样式类
        const inputClass = theme === 'win10' ? `${theme}-input` : `${theme}-input`;
        const buttonClass = theme === 'win10' ? `${theme}-button` : `${theme}-button`;
        const resultClass = theme === 'win10' ? 'bg-gray-50 rounded-lg' : 'bg-gradient-to-br from-gray-50 to-green-50 rounded-xl shadow-sm';
        const labelClass = theme === 'win10' ? 'text-sm font-medium text-gray-700' : 'text-sm font-medium text-gray-700';

        const countdownContent = `
            <div class="space-y-4">
                <div>
                    <label class="block ${labelClass} mb-2">选择目标日期</label>
                    <input type="date" id="targetDate" class="${inputClass}">
                </div>
                
                <div>
                    <label class="block ${labelClass} mb-2">事件名称</label>
                    <input type="text" id="eventName" class="${inputClass}" placeholder="例如: 高考">
                </div>
                
                <button onclick="calculateCountdown()" class="${buttonClass} primary">计算剩余时间</button>
                
                <div id="countdownResult" class="p-6 ${resultClass} min-h-[120px] text-center flex flex-col items-center justify-center transition-all duration-300">
                    <span class="text-gray-400">选择日期并计算</span>
                </div>
            </div>
        `;

        // 使用showToolModal函数显示模态框
        showToolModal('倒日历', countdownContent);
    }
}

function calculateCountdown() {
    const targetDate = new Date(document.getElementById('targetDate').value);
    const eventName = document.getElementById('eventName').value || '目标日期';
    const today = new Date();
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    if (isNaN(targetDate.getTime())) {
        document.getElementById('countdownResult').innerHTML = '<span class="text-danger">请选择有效日期</span>';
        return;
    }

    const resultElement = document.getElementById('countdownResult');

    // 添加动画效果
    resultElement.classList.add('scale-105');
    setTimeout(() => {
        resultElement.classList.remove('scale-105');
    }, 300);

    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let result;

    // 根据主题选择样式类
    const titleClass = theme === 'win10' ? 'text-xl' : 'text-2xl';

    if (diffDays < 0) {
        result = `<div class="text-center">
            <div class="${titleClass} font-bold text-danger">${eventName} 已过去${Math.abs(diffDays)} 天</div>
        </div>`;
    } else if (diffDays === 0) {
        result = `<div class="text-center">
            <div class="${titleClass} font-bold text-primary">今天就是 ${eventName}</div>
        </div>`;
    } else {
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;

        let timeString = '';
        if (years > 0) timeString += `${years}年`;
        if (months > 0) timeString += `${months}个月 `;
        timeString += `${days}天`;

        result = `<div class="text-center">
            <div class="${titleClass} font-bold text-primary">距离 ${eventName} 还有</div>
            <div class="${titleClass} font-bold text-primary mt-2">${timeString}</div>
            <div class="text-sm text-gray-500 mt-2">总计 ${diffDays} 天</div>
        </div>`;
    }

    resultElement.innerHTML = result;
}

// BMI计算器工具
function openBMI() {
    const bmiContent = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">身高 (厘米)</label>
                <input type="number" id="height" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="例如: 170">
            </div>
            
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">体重 (千克)</label>
                <input type="number" id="weight" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="例如: 65">
            </div>
            
            <button onclick="calculateBMI()" class="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors primary">计算BMI</button>
            
            <div id="bmiResult" class="p-4 bg-gray-50 rounded-lg min-h-[100px] flex items-center justify-center">
                <span class="text-gray-400">输入身高体重并计算</span>
            </div>
            
            <div class="text-sm text-gray-600">
                <p class="font-medium mb-2">BMI参考标准：</p>
                <div class="space-y-1">
                    <div class="flex justify-between">
                        <span>偏瘦：</span>
                        <span>&lt; 18.5</span>
                    </div>
                    <div class="flex justify-between">
                        <span>正常：</span>
                        <span>18.5 - 23.9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>超重：</span>
                        <span>24 - 27.9</span>
                    </div>
                    <div class="flex justify-between">
                        <span>肥胖：</span>
                        <span>≥ 28</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('BMI计算器', bmiContent);
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById('bmiResult').innerHTML = '<span class="text-danger">请输入有效的身高和体重</span>';
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    let category, color;
    if (bmi < 18.5) {
        category = '偏瘦';
        color = 'text-blue-600';
    } else if (bmi < 24) {
        category = '正常';
        color = 'text-green-600';
    } else if (bmi < 28) {
        category = '超重';
        color = 'text-warning';
    } else {
        category = '肥胖';
        color = 'text-danger';
    }

    document.getElementById('bmiResult').innerHTML = `
        <div class="text-center">
            <div class="text-2xl font-bold ${color}">${bmi.toFixed(1)}</div>
            <div class="text-lg ${color}">${category}</div>
        </div>
    `;
}

// 回声洞功能
let echoInput;
let echoDisplay;
let echoMessages = [];

function initEchoHole() {
    echoInput = document.getElementById('echoInput');
    echoDisplay = document.getElementById('echoDisplay');

    if (echoInput && echoDisplay) {
        // 回车发送回声
        echoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendEcho();
            }
        });

        // 初始化显示
        displayEchoMessages();
    }
}

function sendEcho() {
    const message = echoInput.value.trim();
    if (!message) return;

    // 添加消息到数组
    echoMessages.push({
        text: message,
        timestamp: new Date().toLocaleTimeString()
    });

    // 清空输入框
    echoInput.value = '';

    // 显示消息
    displayEchoMessages();
}

function displayEchoMessages() {
    if (!echoDisplay) return;

    if (echoMessages.length === 0) {
        echoDisplay.innerHTML = '<div class="echo-placeholder">你的回声将在这里显示...</div>';
        
        // 添加点击事件，点击空白处显示随机回声
        echoDisplay.addEventListener('click', function(e) {
            // 检查点击的是否是空白区域（不是按钮或其他交互元素）
            if (e.target === echoDisplay || e.target.classList.contains('echo-placeholder')) {
                showRandomEcho();
            }
        });
        return;
    }

    let html = '';
    echoMessages.forEach((msg, index) => {
        html += `
            <div class="echo-message mb-3 p-3 bg-white rounded-lg shadow-sm">
                <div class="flex justify-between items-start mb-1">
                    <span class="text-xs text-gray-500">${msg.timestamp}</span>
                    <button onclick="deleteEcho(${index})" class="text-gray-400 hover:text-danger">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="typing-text" data-text="${msg.text}"></div>
            </div>
        `;
    });

    echoDisplay.innerHTML = html;

    // 启动打字效果
    setTimeout(() => {
        document.querySelectorAll('.typing-text').forEach(elem => {
            startTypingEffect(elem);
        });
    }, 100);
}

// 随机回声消息库
const randomEchoes = [
    "青春是一场回不去的旅行，珍惜当下，不负韶华。",
    "每一次努力都是未来的铺垫，坚持就是胜利。",
    "班级是我们共同的家，让我们一起守护这份温暖。",
    "知识改变命运，学习成就未来。",
    "今天的努力，是明天的实力。",
    "梦想不会逃跑，逃跑的永远是自己。",
    "成功的路上并不拥挤，因为坚持的人不多。",
    "每一次跌倒，都是为了更好地站起来。",
    "青春不散场，我们不分离。",
    "用汗水浇灌梦想，用时间证明自己。",
    "班级因你我而精彩，青春因奋斗而闪光。",
    "学习是灯，努力是油，要想灯亮，必须加油。",
    "今天的你，是昨天努力的成果；明天的你，是今天奋斗的结果。",
    "青春是用来奋斗的，不是用来挥霍的。",
    "在班级里，我们不仅是同学，更是战友。"
];

// 显示随机回声
function showRandomEcho() {
    const randomIndex = Math.floor(Math.random() * randomEchoes.length);
    const randomMessage = randomEchoes[randomIndex];
    
    // 清空显示区域
    echoDisplay.innerHTML = '';
    
    // 创建回声元素
    const echoElement = document.createElement('div');
    echoElement.className = 'echo-message mb-3 p-3 bg-white rounded-lg shadow-sm';
    echoElement.innerHTML = `
        <div class="flex justify-between items-start mb-1">
            <span class="text-xs text-gray-500">回声墙</span>
        </div>
        <div class="typing-text" data-text="${randomMessage}"></div>
    `;
    
    echoDisplay.appendChild(echoElement);
    
    // 启动打字效果
    setTimeout(() => {
        const typingElement = echoElement.querySelector('.typing-text');
        startTypingEffect(typingElement);
    }, 100);
}

function startTypingEffect(element) {
    const text = element.getAttribute('data-text');
    let index = 0;
    element.innerHTML = '';

    const typeInterval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
            element.classList.add('typing-cursor');
            setTimeout(() => {
                element.classList.remove('typing-cursor');
            }, 1000);
        }
    }, 50);
}

function deleteEcho(index) {
    echoMessages.splice(index, 1);
    displayEchoMessages();
}

// 番茄钟工具
let pomodoroTimer;
let pomodoroSeconds = 25 * 60; // 默认25分钟
let pomodoroIsWorking = true; // true为工作时间，false为休息时间
let pomodoroWorkTime = 25 * 60; // 工作时间25分钟
let pomodoroBreakTime = 5 * 60; // 休息时间5分钟
let pomodoroLongBreakTime = 15 * 60; // 长休息时间15分钟
let pomodoroSessionCount = 0; // 完成的番茄钟数量
let pomodoroTodayCount = parseInt(localStorage.getItem('pomodoroTodayCount') || '0');
let pomodoroTotalWorkTime = parseInt(localStorage.getItem('pomodoroTotalWorkTime') || '0');
let pomodoroLastResetDate = localStorage.getItem('pomodoroLastResetDate') || new Date().toDateString();

function openPomodoro() {
    // 检查是否需要重置每日统计
    if (pomodoroLastResetDate !== new Date().toDateString()) {
        pomodoroTodayCount = 0;
        localStorage.setItem('pomodoroTodayCount', '0');
        localStorage.setItem('pomodoroLastResetDate', new Date().toDateString());
    }

    const pomodoroContent = `
        <div class="pomodoro-timer-container">
            <div class="pomodoro-status working" id="pomodoroStatus">工作时间</div>
            <div class="pomodoro-progress-ring">
                <svg width="200" height="200">
                    <circle class="pomodoro-progress-ring-circle pomodoro-progress-ring-bg" 
                            cx="100" cy="100" r="90"></circle>
                    <circle class="pomodoro-progress-ring-circle pomodoro-progress-ring-progress" 
                            cx="100" cy="100" r="90"
                            stroke-dasharray="565.48" stroke-dashoffset="0"></circle>
                </svg>
                <div class="pomodoro-progress-text" id="pomodoroProgressText">25:00</div>
            </div>
            <div class="pomodoro-dots" id="pomodoroDots">
                <div class="pomodoro-dot"></div>
                <div class="pomodoro-dot"></div>
                <div class="pomodoro-dot"></div>
                <div class="pomodoro-dot"></div>
            </div>
        </div>
        
        <div class="pomodoro-controls">
            <button onclick="startPomodoro()" id="pomodoroStartBtn" class="pomodoro-control-btn start-btn">开始</button>
             <button onclick="pausePomodoro()" id="pomodoroPauseBtn" class="pomodoro-control-btn pause-btn" disabled>暂停</button>
             <button onclick="resetPomodoro()" class="pomodoro-control-btn reset-btn">重置</button>
        </div>
        
        <div class="pomodoro-presets">
            <button class="pomodoro-preset-btn active" data-preset="classic" onclick="applyPomodoroPreset('classic')">经典</button>
             <button class="pomodoro-preset-btn" data-preset="short" onclick="applyPomodoroPreset('short')">短时</button>
             <button class="pomodoro-preset-btn" data-preset="long" onclick="applyPomodoroPreset('long')">长时</button>
             <button class="pomodoro-preset-btn" data-preset="custom" onclick="applyPomodoroPreset('custom')">自定义</button>
        </div>
        
        <div class="pomodoro-settings" id="pomodoroSettings" style="display: none;">
            <div class="pomodoro-setting-group">
                <label class="pomodoro-setting-label">工作时间 (分钟)</label>
                <input type="number" id="workTime" class="pomodoro-setting-input" value="25" min="1" max="60">
            </div>
            <div class="pomodoro-setting-group">
                <label class="pomodoro-setting-label">短休息 (分钟)</label>
                <input type="number" id="shortBreak" class="pomodoro-setting-input" value="5" min="1" max="30">
            </div>
            <div class="pomodoro-setting-group">
                <label class="pomodoro-setting-label">长休息 (分钟)</label>
                <input type="number" id="longBreak" class="pomodoro-setting-input" value="15" min="1" max="60">
            </div>
            <div class="pomodoro-setting-group">
                <label class="pomodoro-setting-label">长休息间隔</label>
                <input type="number" id="longBreakInterval" class="pomodoro-setting-input" value="4" min="2" max="10">
            </div>
        </div>
        
        <div class="pomodoro-stats">
            <div>今日完成番茄数: <span id="todayPomodoros">${pomodoroTodayCount}</span></div>
            <div>总工作时间: <span id="totalWorkTime">${pomodoroTotalWorkTime}分钟</span></div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('番茄钟', pomodoroContent);

    // 初始化进度环
    updatePomodoroProgress();
}

// 预设配置
const pomodoroPresets = {
    classic: { work: 25, shortBreak: 5, longBreak: 15, interval: 4 },
    short: { work: 15, shortBreak: 3, longBreak: 10, interval: 4 },
    long: { work: 45, shortBreak: 10, longBreak: 20, interval: 6 },
    custom: { work: 25, shortBreak: 5, longBreak: 15, interval: 4 }
};

function applyPomodoroPreset(presetName) {
    const preset = pomodoroPresets[presetName];
    if (preset) {
        pomodoroWorkTime = preset.work * 60;
        pomodoroBreakTime = preset.shortBreak * 60;
        pomodoroLongBreakTime = preset.longBreak * 60;

        // 更新输入框
        document.getElementById('workTime').value = preset.work;
        document.getElementById('shortBreak').value = preset.shortBreak;
        document.getElementById('longBreak').value = preset.longBreak;
        document.getElementById('longBreakInterval').value = preset.interval;

        // 更新按钮状态
        document.querySelectorAll('.pomodoro-preset-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-preset="${presetName}"]`).classList.add('active');

        // 显示/隐藏设置
        document.getElementById('pomodoroSettings').style.display =
            presetName === 'custom' ? 'grid' : 'none';

        // 如果不在运行中，重置计时器
        if (!pomodoroTimer) {
            resetPomodoro();
        }
    }
}

function updatePomodoroProgress() {
    const totalTime = pomodoroIsWorking ? pomodoroWorkTime :
                     (pomodoroSessionCount % 4 === 0 && pomodoroSessionCount > 0) ? pomodoroLongBreakTime : pomodoroBreakTime;
    const progress = (totalTime - pomodoroSeconds) / totalTime;
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (progress * circumference);

    const progressCircle = document.querySelector('.pomodoro-progress-ring-progress');
    if (progressCircle) {
        progressCircle.style.strokeDashoffset = offset;
    }
}

function startPomodoro() {
    if (pomodoroTimer) return;

    // 更新设置
    if (document.getElementById('workTime')) {
        pomodoroWorkTime = parseInt(document.getElementById('workTime').value) * 60;
        pomodoroBreakTime = parseInt(document.getElementById('shortBreak').value) * 60;
        pomodoroLongBreakTime = parseInt(document.getElementById('longBreak').value) * 60;
    }

    // 如果是重置状态，设置初始时间
    if (pomodoroSeconds === 0 || (pomodoroIsWorking && pomodoroSeconds === pomodoroWorkTime) || (!pomodoroIsWorking && pomodoroSeconds === pomodoroBreakTime)) {
        pomodoroSeconds = pomodoroIsWorking ? pomodoroWorkTime : pomodoroBreakTime;
    }

    document.getElementById('pomodoroStartBtn').disabled = true;
    document.getElementById('pomodoroPauseBtn').disabled = false;

    updatePomodoroStatus();

    pomodoroTimer = setInterval(() => {
        pomodoroSeconds--;
        updatePomodoroDisplay();
        updatePomodoroProgress();

        if (pomodoroSeconds <= 0) {
            clearInterval(pomodoroTimer);
            pomodoroTimer = null;

            // 播放提示音
            playNotificationSound();

            if (pomodoroIsWorking) {
                // 工作时间结束，进入休息时间
                pomodoroSessionCount++;
                pomodoroTodayCount++;
                pomodoroTotalWorkTime += Math.floor(pomodoroWorkTime / 60);

                // 保存统计
                localStorage.setItem('pomodoroTodayCount', pomodoroTodayCount.toString());
                localStorage.setItem('pomodoroTotalWorkTime', pomodoroTotalWorkTime.toString());

                // 更新统计显示
                document.getElementById('todayPomodoros').textContent = pomodoroTodayCount;
                document.getElementById('totalWorkTime').textContent = pomodoroTotalWorkTime + '分钟';

                updatePomodoroDots();

                // 每4个番茄钟后长休息
                if (pomodoroSessionCount % 4 === 0) {
                    pomodoroSeconds = pomodoroLongBreakTime;
                    showNotification('番茄钟', '恭喜完成4个番茄钟！享受15分钟长休息吧！');
                } else {
                    pomodoroSeconds = pomodoroBreakTime;
                    showNotification('番茄钟', '工作时间结束！休息5分钟吧！');
                }
            } else {
                // 休息时间结束，进入工作时间
                pomodoroSeconds = pomodoroWorkTime;
                showNotification('番茄钟', '休息结束！开始新的番茄钟吧！');
            }

            pomodoroIsWorking = !pomodoroIsWorking;
            updatePomodoroStatus();
            updatePomodoroDisplay();
            updatePomodoroProgress();

            document.getElementById('pomodoroStartBtn').disabled = false;
            document.getElementById('pomodoroPauseBtn').disabled = true;
        }
    }, 1000);
}

function pausePomodoro() {
    if (pomodoroTimer) {
        clearInterval(pomodoroTimer);
        pomodoroTimer = null;
        document.getElementById('pomodoroStartBtn').disabled = false;
        document.getElementById('pomodoroPauseBtn').disabled = true;
    }
}

function resetPomodoro() {
    pausePomodoro();
    pomodoroIsWorking = true;
    pomodoroSeconds = pomodoroWorkTime;
    pomodoroSessionCount = 0;
    updatePomodoroDisplay();
    updatePomodoroStatus();
    updatePomodoroDots();
    updatePomodoroProgress();
    document.getElementById('pomodoroStartBtn').disabled = false;
    document.getElementById('pomodoroPauseBtn').disabled = true;
}

function updatePomodoroDisplay() {
    const minutes = Math.floor(pomodoroSeconds / 60);
    const seconds = pomodoroSeconds % 60;

    const display =
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    const displayElement = document.getElementById('pomodoroProgressText') || document.getElementById('pomodoroDisplay');
    if (displayElement) {
        displayElement.textContent = display;
    }
}

function updatePomodoroStatus() {
    const statusElement = document.getElementById('pomodoroStatus');
    if (statusElement) {
        if (pomodoroIsWorking) {
            statusElement.textContent = '工作时间';
            statusElement.className = 'pomodoro-status working';
        } else {
            if (pomodoroSessionCount % 4 === 0 && pomodoroSessionCount > 0) {
                statusElement.textContent = '长休息时间';
                statusElement.className = 'pomodoro-status long-break';
            } else {
                statusElement.textContent = '短休息时间';
                statusElement.className = 'pomodoro-status short-break';
            }
        }
    }
}

function updatePomodoroDots() {
    const dotsContainer = document.getElementById('pomodoroDots');
    if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.pomodoro-dot');
        dots.forEach((dot, index) => {
            if (index < (pomodoroSessionCount % 4)) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    } else {
        // 兼容旧版本
        for (let i = 1; i <= 4; i++) {
            const dot = document.getElementById(`pomodoroDot${i}`);
            if (dot) {
                if (i <= (pomodoroSessionCount % 4)) {
                    dot.className = 'w-3 h-3 rounded-full bg-primary';
                } else {
                    dot.className = 'w-3 h-3 rounded-full bg-gray-300';
                }
            }
        }
    }
}

// 待办事项列表工具
let todos = [];

function openTodoList() {
    // 从本地存储加载待办事项
    const savedTodos = localStorage.getItem('treasurebox_todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
    
    // 生成待办事项内容
    const todoListHtml = renderTodoListHtml();
    
    // 使用showToolModal函数显示模态框
    showToolModal('待办事项', todoListHtml);
    
    // 确保DOM加载后添加事件监听器
    setTimeout(() => {
        document.getElementById('newTodoInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
    }, 10);
}

// 渲染待办事项HTML内容
function renderTodoListHtml() {
    return `
        <div class="space-y-4">
            <div class="flex space-x-2">
                <input type="text" id="newTodoInput" placeholder="添加新的待办事项..." class="flex-1 p-2 border border-gray-300 rounded-lg">
                <button onclick="addTodo()" class="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors primary">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            
            <div class="flex space-x-2 mb-4">
                <button onclick="filterTodos('all')" class="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 secondary" id="filterAll">全部</button>
                <button onclick="filterTodos('active')" class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 secondary" id="filterActive">未完成</button>
                <button onclick="filterTodos('completed')" class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 secondary" id="filterCompleted">已完成</button>
            </div>
            
            <div id="todoList" class="space-y-2 max-h-96 overflow-y-auto">
                ${renderTodoItems()}
            </div>
            
            <div class="flex justify-between items-center text-sm text-gray-600">
                <span id="todoCount">0 个待办事项</span>
                <button onclick="clearCompleted()" class="text-red-600 hover:text-red-800">清除已完成</button>
            </div>
        </div>
    `;
}

function renderTodoList() {
    const todoListHtml = `
        <div class="space-y-4">
            <div class="flex space-x-2">
                <input type="text" id="newTodoInput" placeholder="添加新的待办事项..." class="flex-1 p-2 border border-gray-300 rounded-lg">
                <button onclick="addTodo()" class="p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors primary">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            
            <div class="flex space-x-2 mb-4">
                <button onclick="filterTodos('all')" class="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 secondary" id="filterAll">全部</button>
                <button onclick="filterTodos('active')" class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 secondary" id="filterActive">未完成</button>
                <button onclick="filterTodos('completed')" class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 secondary" id="filterCompleted">已完成</button>
            </div>
            
            <div id="todoList" class="space-y-2 max-h-96 overflow-y-auto">
                ${renderTodoItems()}
            </div>
            
            <div class="flex justify-between items-center text-sm text-gray-600">
                <span id="todoCount">0 个待办事项</span>
                <button onclick="clearCompleted()" class="text-red-600 hover:text-red-800">清除已完成</button>
            </div>
        </div>
    `;

    toolContent.innerHTML = todoListHtml;

    // 添加回车键监听
    document.getElementById('newTodoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    updateTodoCount();
}

function renderTodoItems(filter = 'all') {
    let filteredTodos = todos;

    if (filter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }

    if (filteredTodos.length === 0) {
        return '<div class="text-center text-gray-400 py-8">暂无待办事项</div>';
    }

    return filteredTodos.map((todo, index) => {
        const originalIndex = todos.indexOf(todo);
        return `
            <div class="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg ${todo.completed ? 'opacity-60' : ''}">
                <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${originalIndex})" class="w-4 h-4 text-primary">
                <span class="flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}">${todo.text}</span>
                <button onclick="deleteTodo(${originalIndex})" class="text-red-500 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
}

function addTodo() {
    const input = document.getElementById('newTodoInput');
    const text = input.value.trim();

    if (!text) return;

    todos.unshift({
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    });

    saveTodos();
    input.value = '';
    renderTodoItems();
    updateTodoCount();
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodoItems();
    updateTodoCount();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodoItems();
    updateTodoCount();
}

function filterTodos(filter) {
    // 更新按钮样式
    document.getElementById('filterAll').className = filter === 'all' ? 'px-3 py-1 text-sm rounded-full bg-primary text-white' : 'px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600';
    document.getElementById('filterActive').className = filter === 'active' ? 'px-3 py-1 text-sm rounded-full bg-primary text-white' : 'px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600';
    document.getElementById('filterCompleted').className = filter === 'completed' ? 'px-3 py-1 text-sm rounded-full bg-primary text-white' : 'px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600';

    // 更新列表
    document.getElementById('todoList').innerHTML = renderTodoItems(filter);
}

function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodoItems();
    updateTodoCount();
}

function saveTodos() {
    localStorage.setItem('treasurebox_todos', JSON.stringify(todos));
}

function updateTodoCount() {
    const activeTodos = todos.filter(todo => !todo.completed).length;
    document.getElementById('todoCount').textContent = `${activeTodos} 个待办事项`;
}

// 成绩计算器工具
function openGradeCalculator() {
    const gradeCalculatorHtml = `
        <div class="grade-calculator-container">
            <div class="grade-presets">
                <h3>快速设置</h3>
                <div class="preset-buttons">
                    <button class="preset-btn active" data-preset="default">我的设置</button>
                    <button class="preset-btn" data-preset="custom">自定义</button>
                </div>
            </div>
            
            <div class="grade-inputs" id="gradeInputs">
                <!-- 默认科目将在这里动态生成 -->
            </div>
            
            <div class="grade-actions">
                <button id="addSubjectBtn" class="add-subject-btn">添加科目</button>
                <button id="calculateBtn" class="calculate-btn">计算成绩</button>
                <button id="clearBtn" class="reset-btn">清空数据</button>
            </div>
            
            <div class="grade-results" id="gradeResults" style="display: none;">
                <h3>计算结果</h3>
                
                <div class="result-section">
                    <h4>原始成绩</h4>
                    <div class="result-item">
                        <span>总分：</span>
                        <span id="totalScore" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>平均分：</span>
                        <span id="arithmeticAverage" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>最高分科目：</span>
                        <span id="highestSubject" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>最低分科目：</span>
                        <span id="lowestSubject" class="result-value">-</span>
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>折分后成绩</h4>
                    <div class="result-item">
                        <span>折分总分：</span>
                        <span id="weightedTotalScore" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>折分平均分：</span>
                        <span id="weightedAverage" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>等级评定：</span>
                        <span id="gradeLevel" class="result-value">-</span>
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>成绩分析</h4>
                    <div class="result-item">
                        <span>优秀科目数：</span>
                        <span id="excellentCount" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>及格科目数：</span>
                        <span id="passCount" class="result-value">-</span>
                    </div>
                    <div class="result-item">
                        <span>不及格科目数：</span>
                        <span id="failCount" class="result-value">-</span>
                    </div>
                </div>
                
                <div class="grade-chart">
                    <h4>成绩分布</h4>
                    <div id="gradeBars" class="grade-bars">
                        <!-- 成绩条将在这里动态生成 -->
                    </div>
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('成绩计算器', gradeCalculatorHtml);

    // 成绩计算器状态
    let gradeState = {
        subjects: [
            { name: '语文', score: 0, percentage: 100 },
            { name: '数学', score: 0, percentage: 100 },
            { name: '英语', score: 0, percentage: 100 },
            { name: '物理', score: 0, percentage: 90 },
            { name: '化学', score: 0, percentage: 60 },
            { name: '生物', score: 0, percentage: 30 },
            { name: '政治', score: 0, percentage: 50 },
            { name: '历史', score: 0, percentage: 50 },
            { name: '地理', score: 0, percentage: 30 }
        ],
        preset: 'default'
    };

    // 预设配置
    const presets = {
        default: [
            { name: '语文', percentage: 100 },
            { name: '数学', percentage: 100 },
            { name: '英语', percentage: 100 },
            { name: '物理', percentage: 90 },
            { name: '化学', percentage: 60 },
            { name: '生物', percentage: 30 },
            { name: '政治', percentage: 50 },
            { name: '历史', percentage: 50 },
            { name: '地理', percentage: 30 }
        ]
    };

    // DOM元素
    const gradeInputs = document.getElementById('gradeInputs');
    const gradeResults = document.getElementById('gradeResults');
    const addSubjectBtn = document.getElementById('addSubjectBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const presetButtons = document.querySelectorAll('.preset-btn');

    // 渲染科目输入
    function renderSubjects() {
        gradeInputs.innerHTML = '';

        gradeState.subjects.forEach((subject, index) => {
            const subjectDiv = document.createElement('div');
            subjectDiv.className = 'grade-input-group';
            subjectDiv.innerHTML = `
                <label>科目 ${index + 1}:</label>
                <input type="text" class="grade-input grade-name" value="${subject.name}" placeholder="科目名称" data-index="${index}">
                <input type="number" class="grade-input grade-score" value="${subject.score}" placeholder="分数" min="0" max="100" data-index="${index}">
                <div class="grade-percentage-container">
                    <input type="number" class="grade-percentage" value="${subject.percentage}" placeholder="比重" min="0" max="100" data-index="${index}">
                    <span>%</span>
                </div>
                <button class="btn-remove" data-index="${index}">删除</button>
            `;
            gradeInputs.appendChild(subjectDiv);
        });

        // 添加事件监听器
        document.querySelectorAll('.grade-name').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                gradeState.subjects[index].name = e.target.value;
            });
        });

        document.querySelectorAll('.grade-score').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                gradeState.subjects[index].score = parseFloat(e.target.value) || 0;
            });
        });

        document.querySelectorAll('.grade-percentage').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.dataset.index);
                gradeState.subjects[index].percentage = parseFloat(e.target.value) || 0;
                checkTotalPercentage();
            });
        });

        document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                if (gradeState.subjects.length > 1) {
                    gradeState.subjects.splice(index, 1);
                    renderSubjects();
                }
            });
        });
    }

    // 检查总比重
    function checkTotalPercentage() {
        const total = gradeState.subjects.reduce((sum, subject) => sum + subject.percentage, 0);
        if (Math.abs(total - 100) > 0.01) {
            const warning = document.getElementById('percentageWarning');
            if (warning) {
                warning.style.display = 'block';
                warning.textContent = `注意：当前比重总和为${total}%，建议调整为100%`;
            } else {
                const warningDiv = document.createElement('div');
                warningDiv.id = 'percentageWarning';
                warningDiv.className = 'percentage-warning';
                warningDiv.textContent = `注意：当前比重总和为${total}%，建议调整为100%`;
                gradeInputs.appendChild(warningDiv);
            }
        } else {
            const warning = document.getElementById('percentageWarning');
            if (warning) {
                warning.style.display = 'none';
            }
        }
        return total;
    }

    // 应用预设
    function applyPreset(presetName) {
        if (presetName === 'custom') {
            // 自定义预设，不做任何更改
            return;
        }

        const preset = presets[presetName];
        if (preset) {
            gradeState.subjects = preset.map(item => ({
                name: item.name,
                score: 0,
                percentage: item.percentage
            }));
            gradeState.preset = presetName;
            renderSubjects();

            // 更新预设按钮状态
            presetButtons.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-preset') === presetName) {
                    btn.classList.add('active');
                }
            });
        }
    }

    // 计算成绩
    function calculateGrades() {
        const totalPercentage = checkTotalPercentage();

        // 计算原始成绩
        let totalScore = 0;
        let validSubjects = 0;
        let highestScore = 0;
        let lowestScore = 100;
        let highestSubject = '';
        let lowestSubject = '';

        // 计算折分后成绩
        let weightedSum = 0;

        // 成绩分析
        let excellentCount = 0;
        let passCount = 0;
        let failCount = 0;

        gradeState.subjects.forEach(subject => {
            if (subject.score > 0) {
                // 原始成绩计算
                totalScore += subject.score;
                validSubjects++;

                // 最高分和最低分
                if (subject.score > highestScore) {
                    highestScore = subject.score;
                    highestSubject = subject.name;
                }
                if (subject.score < lowestScore) {
                    lowestScore = subject.score;
                    lowestSubject = subject.name;
                }

                // 折分后成绩计算 - 修复计算逻辑
                weightedSum += subject.score * (subject.percentage / 100);

                // 成绩分析
                if (subject.score >= 90) {
                    excellentCount++;
                } else if (subject.score >= 60) {
                    passCount++;
                } else {
                    failCount++;
                }
            }
        });

        const arithmeticAverage = validSubjects > 0 ? totalScore / validSubjects : 0;
        const weightedAverage = weightedSum;
        // 修复折分总分计算逻辑 - 不再乘以科目数
        const weightedTotalScore = weightedSum;

        // 确定等级
        let gradeLevel = '';
        if (weightedAverage >= 90) {
            gradeLevel = '优秀';
        } else if (weightedAverage >= 80) {
            gradeLevel = '良好';
        } else if (weightedAverage >= 70) {
            gradeLevel = '中等';
        } else if (weightedAverage >= 60) {
            gradeLevel = '及格';
        } else {
            gradeLevel = '不及格';
        }

        // 显示原始成绩结果
        document.getElementById('totalScore').textContent = totalScore.toFixed(2);
        document.getElementById('arithmeticAverage').textContent = arithmeticAverage.toFixed(2);
        document.getElementById('highestSubject').textContent = highestSubject ? `${highestSubject} (${highestScore}分)` : '-';
        document.getElementById('lowestSubject').textContent = lowestSubject ? `${lowestSubject} (${lowestScore}分)` : '-';

        // 显示折分后成绩结果
        document.getElementById('weightedTotalScore').textContent = weightedTotalScore.toFixed(2);
        document.getElementById('weightedAverage').textContent = weightedAverage.toFixed(2);
        document.getElementById('gradeLevel').textContent = gradeLevel;

        // 显示成绩分析结果
        document.getElementById('excellentCount').textContent = excellentCount;
        document.getElementById('passCount').textContent = passCount;
        document.getElementById('failCount').textContent = failCount;

        // 生成成绩条
        const gradeBars = document.getElementById('gradeBars');
        gradeBars.innerHTML = '';

        gradeState.subjects.forEach(subject => {
            if (subject.score > 0) {
                const barContainer = document.createElement('div');
                barContainer.className = 'grade-bar-container';

                const bar = document.createElement('div');
                bar.className = 'grade-bar';

                // 根据分数设置颜色
                if (subject.score >= 90) {
                    bar.classList.add('grade-excellent');
                } else if (subject.score >= 80) {
                    bar.classList.add('grade-good');
                } else if (subject.score >= 70) {
                    bar.classList.add('grade-average');
                } else if (subject.score >= 60) {
                    bar.classList.add('grade-pass');
                } else {
                    bar.classList.add('grade-fail');
                }

                bar.style.width = `${subject.score}%`;

                const label = document.createElement('div');
                label.className = 'grade-bar-label';
                label.textContent = `${subject.name}: ${subject.score}分 (比重${subject.percentage}%)`;

                barContainer.appendChild(bar);
                barContainer.appendChild(label);
                gradeBars.appendChild(barContainer);
            }
        });

        gradeResults.style.display = 'block';
    }

    // 添加新科目
    function addSubject() {
        gradeState.subjects.push({
            name: `科目${gradeState.subjects.length + 1}`,
            score: 0,
            percentage: 0
        });
        renderSubjects();
    }

    // 清空数据
    function clearData() {
        gradeState.subjects.forEach(subject => {
            subject.score = 0;
        });
        renderSubjects();
        gradeResults.style.display = 'none';
    }

    // 事件监听器
    addSubjectBtn.addEventListener('click', addSubject);
    calculateBtn.addEventListener('click', calculateGrades);
    clearBtn.addEventListener('click', clearData);

    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const presetName = btn.getAttribute('data-preset');
            applyPreset(presetName);
        });
    });

    // 初始化
    renderSubjects();
}

function renderGradeInputs(grades) {
    return grades.map((grade, index) => `
        <div class="flex items-center space-x-2">
            <input type="text" value="${grade.subject}" onchange="updateGradeSubject(${index}, this.value)" class="w-20 p-2 border border-gray-300 rounded-lg text-sm">
            <input type="number" value="${grade.score}" onchange="updateGradeScore(${index}, this.value)" min="0" max="100" class="flex-1 p-2 border border-gray-300 rounded-lg text-sm" placeholder="成绩">
            <input type="number" value="${grade.credit}" onchange="updateGradeCredit(${index}, this.value)" min="0.5" max="10" step="0.5" class="w-16 p-2 border border-gray-300 rounded-lg text-sm" placeholder="学分">
            <button onclick="removeSubject(${index})" class="p-2 text-red-500 hover:text-red-700">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function updateGradeSubject(index, value) {
    const grades = getGradesFromInputs();
    grades[index].subject = value;
    saveGrades(grades);
}

function updateGradeScore(index, value) {
    const grades = getGradesFromInputs();
    grades[index].score = parseFloat(value) || 0;
    saveGrades(grades);
}

function updateGradeCredit(index, value) {
    const grades = getGradesFromInputs();
    grades[index].credit = parseFloat(value) || 1;
    saveGrades(grades);
}

function getGradesFromInputs() {
    const grades = [];
    const gradesList = document.getElementById('gradesList');
    const gradeItems = gradesList.querySelectorAll('div');

    gradeItems.forEach(item => {
        const inputs = item.querySelectorAll('input');
        grades.push({
            subject: inputs[0].value,
            score: parseFloat(inputs[1].value) || 0,
            credit: parseFloat(inputs[2].value) || 1
        });
    });

    return grades;
}

function saveGrades(grades) {
    localStorage.setItem('treasurebox_grades', JSON.stringify(grades));
}

function addSubject() {
    const grades = getGradesFromInputs();
    grades.push({ subject: '新科目', score: 0, credit: 1 });
    document.getElementById('gradesList').innerHTML = renderGradeInputs(grades);
    saveGrades(grades);
}

function removeSubject(index) {
    const grades = getGradesFromInputs();
    if (grades.length > 1) {
        grades.splice(index, 1);
        document.getElementById('gradesList').innerHTML = renderGradeInputs(grades);
        saveGrades(grades);
    }
}

function clearGrades() {
    const grades = getGradesFromInputs();
    grades.forEach(grade => {
        grade.score = 0;
    });
    document.getElementById('gradesList').innerHTML = renderGradeInputs(grades);
    saveGrades(grades);
    document.getElementById('gradeResult').classList.add('hidden');
}

function calculateGrades() {
    const grades = getGradesFromInputs();

    if (grades.length === 0) return;

    // 计算平均分
    const totalScore = grades.reduce((sum, grade) => sum + grade.score, 0);
    const averageScore = totalScore / grades.length;

    // 计算加权平均分
    const totalCredit = grades.reduce((sum, grade) => sum + grade.credit, 0);
    const weightedSum = grades.reduce((sum, grade) => sum + (grade.score * grade.credit), 0);
    const weightedAverage = totalCredit > 0 ? weightedSum / totalCredit : 0;

    // 找出最高分和最低分科目
    const highestGrade = grades.reduce((max, grade) => grade.score > max.score ? grade : max, grades[0]);
    const lowestGrade = grades.reduce((min, grade) => grade.score < min.score ? grade : min, grades[0]);

    // 计算成绩分布
    const distribution = {
        excellent: grades.filter(g => g.score >= 90).length,  // 优秀
        good: grades.filter(g => g.score >= 80 && g.score < 90).length,  // 良好
        average: grades.filter(g => g.score >= 70 && g.score < 80).length,  // 中等
        pass: grades.filter(g => g.score >= 60 && g.score < 70).length,  // 及格
        fail: grades.filter(g => g.score < 60).length  // 不及格
    };

    // 更新显示
    document.getElementById('averageScore').textContent = averageScore.toFixed(2);
    document.getElementById('weightedAverage').textContent = weightedAverage.toFixed(2);
    document.getElementById('highestSubject').textContent = `${highestGrade.subject} (${highestGrade.score}分)`;
    document.getElementById('lowestSubject').textContent = `${lowestGrade.subject} (${lowestGrade.score}分)`;
    document.getElementById('totalScore').textContent = totalScore.toFixed(2);

    // 显示成绩分布
    const distributionHtml = `
        <div class="flex items-center space-x-2">
            <div class="w-16 text-sm">优秀(≥90)</div>
            <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-green-500 h-full" style="width: ${(distribution.excellent / grades.length) * 100}%"></div>
            </div>
            <div class="text-sm w-8 text-right">${distribution.excellent}科</div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="w-16 text-sm">良好(80-89)</div>
            <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-blue-500 h-full" style="width: ${(distribution.good / grades.length) * 100}%"></div>
            </div>
            <div class="text-sm w-8 text-right">${distribution.good}科</div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="w-16 text-sm">中等(70-79)</div>
            <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-yellow-500 h-full" style="width: ${(distribution.average / grades.length) * 100}%"></div>
            </div>
            <div class="text-sm w-8 text-right">${distribution.average}科</div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="w-16 text-sm">及格(60-69)</div>
            <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-orange-500 h-full" style="width: ${(distribution.pass / grades.length) * 100}%"></div>
            </div>
            <div class="text-sm w-8 text-right">${distribution.pass}科</div>
        </div>
        <div class="flex items-center space-x-2">
            <div class="w-16 text-sm">不及格(<60)</div>
            <div class="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="bg-red-500 h-full" style="width: ${(distribution.fail / grades.length) * 100}%"></div>
            </div>
            <div class="text-sm w-8 text-right">${distribution.fail}科</div>
        </div>
    `;

    document.getElementById('gradeDistribution').innerHTML = distributionHtml;
    document.getElementById('gradeResult').classList.remove('hidden');

    saveGrades(grades);
}

// 辅助函数：播放提示音
function playNotificationSound() {
    // 创建一个简单的提示音
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// 辅助函数：显示通知
function showNotification(title, message) {
    // 检查浏览器是否支持通知
    if (!("Notification" in window)) {
        // 如果不支持，使用简单的alert
        alert(`${title}: ${message}`);
        return;
    }

    // 检查是否已经授权
    if (Notification.permission === "granted") {
        // 如果已授权，创建通知
        new Notification(title, { body: message });
    } else if (Notification.permission !== "denied") {
        // 如果未授权，请求授权
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                new Notification(title, { body: message });
            }
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题 - 这将动态加载对应的CSS文件
    initializeTheme();

    initTreasureBox();

    // 移除页面加载占位符
    setTimeout(function() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            // 添加淡出动画效果
            loader.style.transition = 'opacity 0.5s ease-out';
            loader.style.opacity = '0';

            // 动画完成后移除元素
            setTimeout(function() {
                loader.style.display = 'none';
            }, 500);
        }
    }, 300);

    // 应用主题类到相应元素
    applyThemeClasses();

    // 初始化工具卡片
    initToolCards();

    // 添加主题切换功能
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-button';
    themeToggle.style.position = 'fixed';
    themeToggle.style.bottom = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.padding = '10px 20px';
    themeToggle.style.backgroundColor = '#0078d7';
    themeToggle.style.color = 'white';
    themeToggle.style.border = 'none';
    themeToggle.style.borderRadius = '4px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.zIndex = '9999';
    themeToggle.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

});

// 应用主题类
function applyThemeClasses() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    // 应用主题类到各个部分
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add(`${theme}-hero-section`);

        // 应用子元素类
        const title = heroSection.querySelector('.hero-title');
        const description = heroSection.querySelector('.hero-description');
        const tag = heroSection.querySelector('.hero-tag');

        if (title) title.classList.add(`${theme}-hero-title`);
        if (description) description.classList.add(`${theme}-hero-description`);
        if (tag) tag.classList.add(`${theme}-hero-tag`);
    }

    // 应用到模态框
    const modal = document.getElementById('toolModal');
    if (modal) {
        modal.classList.add(`${theme}-modal`);

        const content = modal.querySelector('.modal-content');
        const header = modal.querySelector('.modal-header');
        const title = modal.querySelector('.modal-title');
        const closeBtn = modal.querySelector('.close-modal');
        const body = modal.querySelector('.modal-body');

        if (content) content.classList.add(`${theme}-modal-content`);
        if (header) header.classList.add(`${theme}-modal-header`);
        if (title) title.classList.add(`${theme}-modal-title`);
        if (closeBtn) closeBtn.classList.add(`${theme}-modal-close`);
        if (body) body.classList.add(`${theme}-modal-body`);
    }
}

// 初始化工具卡片
function initToolCards() {
    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    // 获取所有工具卡片容器
    const toolsContainer = document.querySelector('.tools-container');
    if (toolsContainer) {
        toolsContainer.classList.add(`${theme}-tools-container`);
    }

    // 为工具网格添加主题类
    const toolsGrid = document.querySelector('.tools-grid');
    if (toolsGrid) {
        toolsGrid.classList.add(`${theme}-tools-grid`);
    }

    // 如果页面中还没有工具卡片，创建默认的工具卡片
    const toolCards = document.querySelectorAll('.tool-card');
    if (toolCards.length === 0) {
        createDefaultToolCards();
    } else {
        // 为现有工具卡片添加主题类
        toolCards.forEach(card => {
            card.classList.add(`${theme}-tool-card`);

            const icon = card.querySelector('.tool-icon');
            const title = card.querySelector('.tool-title');
            const description = card.querySelector('.tool-description');
            const categories = card.querySelectorAll('.tool-category');
            const button = card.querySelector('.tool-button');

            if (icon) icon.classList.add(`${theme}-tool-icon`);
            if (title) title.classList.add(`${theme}-tool-title`);
            if (description) description.classList.add(`${theme}-tool-description`);
            categories.forEach(cat => cat.classList.add(`${theme}-tool-category`));
            if (button) button.classList.add(`${theme}-tool-button`);
        });
    }
}

// 创建默认工具卡片
function createDefaultToolCards() {
    const toolsGrid = document.querySelector('.tools-grid') || document.querySelector('.tools-container');
    if (!toolsGrid) return;

    // 获取当前主题
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';

    const tools = [
        {
            id: 'calculator',
            icon: 'fas fa-calculator',
            title: '科学计算器',
            description: '30+计算方法，支持基础运算、科学计算、统计分析',
            categories: ['基础运算', '科学计算', '统计分析'],
            functionName: 'openCalculator()'
        },
        {
            id: 'converter',
            icon: 'fas fa-exchange-alt',
            title: '增强单位转换器',
            description: '支持12种分类，50+单位类型，智能转换',
            categories: ['长度', '重量', '温度'],
            functionName: 'openConverter()'
        },
        {
            id: 'timer',
            icon: 'fas fa-stopwatch',
            title: '计时器',
            description: '正计时和倒计时功能，适合学习计时使用',
            categories: ['计时', '学习'],
            functionName: 'openTimer()'
        },
        {
            id: 'random',
            icon: 'fas fa-random',
            title: '随机数生成器',
            description: '生成指定范围内的随机数，适合抽签使用',
            categories: ['随机', '抽签'],
            functionName: 'openRandomGenerator()'
        },
        {
            id: 'countdown',
            icon: 'fas fa-clock',
            title: '多功能倒计时器',
            description: '支持日期倒计时，学习规划好帮手',
            categories: ['倒计时', '规划'],
            functionName: 'openCountdown()'
        },
        {
            id: 'bmi',
            icon: 'fas fa-heartbeat',
            title: 'BMI计算器',
            description: '快速计算体质指数，关注健康成长',
            categories: ['健康', '计算'],
            functionName: 'openBMI()'
        }
    ];

    // 清空容器
    toolsGrid.innerHTML = '';

    // 创建工具卡片
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = `tool-card ${theme}-tool-card win11-fade-in`;
        card.dataset.tool = tool.id;

        let categoriesHtml = '';
        if (tool.categories && tool.categories.length > 0) {
            categoriesHtml = `<div class="tool-categories ${theme}-tool-categories">`;
            tool.categories.forEach(category => {
                categoriesHtml += `<span class="tool-category ${theme}-tool-category">${category}</span>`;
            });
            categoriesHtml += '</div>';
        }

        card.innerHTML = `
            <div class="tool-icon ${theme}-tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <h3 class="tool-title ${theme}-tool-title">${tool.title}</h3>
            <p class="tool-description ${theme}-tool-description">${tool.description}</p>
            ${categoriesHtml}
            <button class="tool-button ${theme}-tool-button primary" onclick="${tool.functionName}">
                使用工具 <i class="fas fa-arrow-right"></i>
            </button>
        `;

        toolsGrid.appendChild(card);
    });
}

// BMI计算器功能
function openBMI() {
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';
    const inputClass = theme === 'win10' ? 'win10-input' : 'win11-input';
    const buttonClass = theme === 'win10' ? 'win10-button' : 'win11-button';
    const resultClass = theme === 'win10' ? 'win10-result' : 'win11-result';

    showToolModal('BMI计算器', `
        <div class="bmi-calculator ${theme}-bmi-calculator">
            <div class="input-group">
                <label for="weight">体重 (kg):</label>
                <input type="number" id="weight" class="${inputClass}" placeholder="请输入体重" min="1" step="0.1">
            </div>
            <div class="input-group">
                <label for="height">身高 (cm):</label>
                <input type="number" id="height" class="${inputClass}" placeholder="请输入身高" min="1" step="0.1">
            </div>
            <button class="${buttonClass} primary" onclick="calculateBMI()">计算BMI</button>
            <div id="bmi-result" class="${resultClass}"></div>
        </div>
    `);
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // 转换为米
    const bmiResult = document.getElementById('bmi-result');
    const theme = document.documentElement.dataset.sidebarTheme || 'win11';
    const resultClass = theme === 'win10' ? 'win10-result' : 'win11-result';

    bmiResult.classList.add('scale-animation');
    setTimeout(() => bmiResult.classList.remove('scale-animation'), 300);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        bmiResult.innerHTML = '<p class="error">请输入有效的体重和身高</p>';
        return;
    }

    const bmi = weight / (height * height);
    let category = '';
    let advice = '';
    let color = '';

    if (bmi < 18.5) {
        category = '偏瘦';
        advice = '建议适当增加营养，多进行力量训练。';
        color = '#3b82f6';
    } else if (bmi < 24) {
        category = '正常';
        advice = '体重正常，请继续保持健康的生活方式！';
        color = '#10b981';
    } else if (bmi < 28) {
        category = '偏胖';
        advice = '建议控制饮食，增加运动量。';
        color = '#f59e0b';
    } else {
        category = '肥胖';
        advice = '建议咨询医生，制定科学的减重计划。';
        color = '#ef4444';
    }

    bmiResult.innerHTML = `
        <p>BMI值: <strong style="color: ${color}">${bmi.toFixed(1)}</strong></p>
        <p>评价: <strong style="color: ${color}">${category}</strong></p>
        <p>建议: ${advice}</p>
    `;

    playNotificationSound();
}

// 初始化主题样式 - 动态加载对应的CSS文件
function initializeTheme() {
    const theme = localStorage.getItem('sidebarTheme') || 'win11';
    document.documentElement.dataset.sidebarTheme = theme;

    // 移除现有的主题CSS链接
    const existingLinks = document.querySelectorAll('link[data-theme-css]');
    existingLinks.forEach(link => link.remove());

    // 添加新的主题CSS链接
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = `css/treasurebox/${theme}.css`;
    cssLink.dataset.themeCss = 'true';
    document.head.appendChild(cssLink);
}

// 在页面加载时初始化主题
initializeTheme();

// 导出函数供全局使用
window.openCalculator = openCalculator;
window.openConverter = openConverter;
window.openTimer = openTimer;
window.openRandomGenerator = openRandomGenerator;
window.openCountdown = openCountdown;
window.openBMI = openBMI;
window.openPomodoro = openPomodoro;
window.openTodoList = openTodoList;
window.openGradeCalculator = openGradeCalculator;
window.closeToolModal = closeToolModal;
window.appendToCalc = appendToCalc;
window.clearCalc = clearCalc;
window.calculate = calculate;
window.updateConverterUnits = updateConverterUnits;
window.convertUnits = convertUnits;
window.startTimer = startTimer;
window.pauseTimer = pauseTimer;
window.resetTimer = resetTimer;
window.updateTimerDisplay = updateTimerDisplay;
window.startCountdown = startCountdown;
window.updateCountdownDisplay = updateCountdownDisplay;
window.generateRandom = generateRandom;
window.calculateCountdown = calculateCountdown;
window.calculateBMI = calculateBMI;
window.startPomodoro = startPomodoro;
window.pausePomodoro = pausePomodoro;
window.resetPomodoro = resetPomodoro;
window.addTodo = addTodo;
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;
window.filterTodos = filterTodos;
window.clearCompleted = clearCompleted;
window.addSubject = addSubject;
window.removeSubject = removeSubject;
window.updateGradeSubject = updateGradeSubject;
window.updateGradeScore = updateGradeScore;
window.updateGradeCredit = updateGradeCredit;
window.clearGrades = clearGrades;
window.calculateGrades = calculateGrades;
window.sendEcho = sendEcho;
window.showRandomEcho = showRandomEcho;
window.deleteEcho = deleteEcho;
window.startTypingEffect = startTypingEffect;
window.initializeTheme = initializeTheme;