class EnhancedUnitConverter {
    constructor() {
        this.categories = {
            length: {
                name: '长度',
                units: {
                    '米': { factor: 1, symbol: 'm' },
                    '千米': { factor: 0.001, symbol: 'km' },
                    '厘米': { factor: 100, symbol: 'cm' },
                    '毫米': { factor: 1000, symbol: 'mm' },
                    '微米': { factor: 1000000, symbol: 'μm' },
                    '纳米': { factor: 1000000000, symbol: 'nm' },
                    '英里': { factor: 0.000621371, symbol: 'mi' },
                    '码': { factor: 1.09361, symbol: 'yd' },
                    '英尺': { factor: 3.28084, symbol: 'ft' },
                    '英寸': { factor: 39.3701, symbol: 'in' },
                    '海里': { factor: 0.000539957, symbol: 'nmi' },
                    '光年': { factor: 1.057e-16, symbol: 'ly' }
                }
            },
            weight: {
                name: '重量',
                units: {
                    '千克': { factor: 1, symbol: 'kg' },
                    '克': { factor: 1000, symbol: 'g' },
                    '毫克': { factor: 1000000, symbol: 'mg' },
                    '吨': { factor: 0.001, symbol: 't' },
                    '磅': { factor: 2.20462, symbol: 'lb' },
                    '盎司': { factor: 35.274, symbol: 'oz' },
                    '克拉': { factor: 5000, symbol: 'ct' },
                    '斤': { factor: 2, symbol: 'jin' },
                    '两': { factor: 20, symbol: 'liang' },
                    '钱': { factor: 200, symbol: 'qian' }
                }
            },
            temperature: {
                name: '温度',
                units: {
                    '摄氏度': { convert: (c) => c, symbol: '°C' },
                    '华氏度': { convert: (c) => c * 9/5 + 32, symbol: '°F' },
                    '开尔文': { convert: (c) => c + 273.15, symbol: 'K' },
                    '兰氏度': { convert: (c) => (c + 273.15) * 9/5, symbol: '°R' },
                    '列氏度': { convert: (c) => c * 4/5, symbol: '°Ré' }
                }
            },
            area: {
                name: '面积',
                units: {
                    '平方米': { factor: 1, symbol: 'm²' },
                    '平方千米': { factor: 0.000001, symbol: 'km²' },
                    '平方厘米': { factor: 10000, symbol: 'cm²' },
                    '平方毫米': { factor: 1000000, symbol: 'mm²' },
                    '公顷': { factor: 0.0001, symbol: 'ha' },
                    '亩': { factor: 0.0015, symbol: 'mu' },
                    '平方英尺': { factor: 10.7639, symbol: 'ft²' },
                    '平方码': { factor: 1.19599, symbol: 'yd²' },
                    '平方英里': { factor: 3.861e-7, symbol: 'mi²' },
                    '英亩': { factor: 0.000247105, symbol: 'acre' }
                }
            },
            volume: {
                name: '体积',
                units: {
                    '立方米': { factor: 1, symbol: 'm³' },
                    '升': { factor: 1000, symbol: 'L' },
                    '毫升': { factor: 1000000, symbol: 'mL' },
                    '立方厘米': { factor: 1000000, symbol: 'cm³' },
                    '立方毫米': { factor: 1000000000, symbol: 'mm³' },
                    '加仑(美)': { factor: 264.172, symbol: 'gal' },
                    '加仑(英)': { factor: 219.969, symbol: 'gal' },
                    '夸脱(美)': { factor: 1056.69, symbol: 'qt' },
                    '品脱(美)': { factor: 2113.38, symbol: 'pt' },
                    '液盎司(美)': { factor: 33814, symbol: 'fl oz' }
                }
            },
            speed: {
                name: '速度',
                units: {
                    '米/秒': { factor: 1, symbol: 'm/s' },
                    '千米/小时': { factor: 3.6, symbol: 'km/h' },
                    '英里/小时': { factor: 2.23694, symbol: 'mph' },
                    '英尺/秒': { factor: 3.28084, symbol: 'ft/s' },
                    '节': { factor: 1.94384, symbol: 'kn' },
                    '马赫': { factor: 0.00291545, symbol: 'Ma' },
                    '光速': { factor: 3.33564e-9, symbol: 'c' }
                }
            },
            time: {
                name: '时间',
                units: {
                    '秒': { factor: 1, symbol: 's' },
                    '毫秒': { factor: 1000, symbol: 'ms' },
                    '微秒': { factor: 1000000, symbol: 'μs' },
                    '纳秒': { factor: 1000000000, symbol: 'ns' },
                    '分钟': { factor: 1/60, symbol: 'min' },
                    '小时': { factor: 1/3600, symbol: 'h' },
                    '天': { factor: 1/86400, symbol: 'day' },
                    '周': { factor: 1/604800, symbol: 'week' },
                    '月': { factor: 1/2592000, symbol: 'month' },
                    '年': { factor: 1/31536000, symbol: 'year' }
                }
            },
            pressure: {
                name: '压力',
                units: {
                    '帕斯卡': { factor: 1, symbol: 'Pa' },
                    '千帕': { factor: 0.001, symbol: 'kPa' },
                    '兆帕': { factor: 0.000001, symbol: 'MPa' },
                    '巴': { factor: 0.00001, symbol: 'bar' },
                    '毫巴': { factor: 0.01, symbol: 'mbar' },
                    '标准大气压': { factor: 0.00000986923, symbol: 'atm' },
                    '毫米汞柱': { factor: 0.00750062, symbol: 'mmHg' },
                    '磅/平方英寸': { factor: 0.000145038, symbol: 'psi' },
                    '托': { factor: 0.00750062, symbol: 'Torr' }
                }
            },
            energy: {
                name: '能量',
                units: {
                    '焦耳': { factor: 1, symbol: 'J' },
                    '千焦': { factor: 0.001, symbol: 'kJ' },
                    '兆焦': { factor: 0.000001, symbol: 'MJ' },
                    '卡路里': { factor: 0.239006, symbol: 'cal' },
                    '千卡': { factor: 0.000239006, symbol: 'kcal' },
                    '千瓦时': { factor: 0.000000277778, symbol: 'kWh' },
                    '英热单位': { factor: 0.000947817, symbol: 'BTU' },
                    '电子伏特': { factor: 6.242e+18, symbol: 'eV' },
                    '尔格': { factor: 10000000, symbol: 'erg' }
                }
            },
            power: {
                name: '功率',
                units: {
                    '瓦特': { factor: 1, symbol: 'W' },
                    '千瓦': { factor: 0.001, symbol: 'kW' },
                    '兆瓦': { factor: 0.000001, symbol: 'MW' },
                    '马力': { factor: 0.00134102, symbol: 'hp' },
                    '英制马力': { factor: 0.00134102, symbol: 'hp' },
                    '公制马力': { factor: 0.00135962, symbol: 'ps' },
                    '尔格/秒': { factor: 10000000, symbol: 'erg/s' },
                    '英尺·磅/秒': { factor: 0.737562, symbol: 'ft·lb/s' },
                    '千卡/小时': { factor: 0.000859845, symbol: 'kcal/h' }
                }
            },
            angle: {
                name: '角度',
                units: {
                    '度': { factor: 1, symbol: '°' },
                    '弧度': { factor: 0.0174533, symbol: 'rad' },
                    '梯度': { factor: 1.11111, symbol: 'grad' },
                    '圈': { factor: 0.00277778, symbol: 'turn' },
                    '角分': { factor: 60, symbol: "'" },
                    '角秒': { factor: 3600, symbol: '"' }
                }
            },
            data: {
                name: '数据',
                units: {
                    '字节': { factor: 1, symbol: 'B' },
                    '千字节': { factor: 0.001, symbol: 'KB' },
                    '兆字节': { factor: 0.000001, symbol: 'MB' },
                    '吉字节': { factor: 0.000000001, symbol: 'GB' },
                    '太字节': { factor: 0.000000000001, symbol: 'TB' },
                    '比特': { factor: 8, symbol: 'bit' },
                    '千比特': { factor: 0.008, symbol: 'Kbit' },
                    '兆比特': { factor: 0.000008, symbol: 'Mbit' },
                    '吉比特': { factor: 0.000000008, symbol: 'Gbit' }
                }
            }
        };

        this.currentCategory = 'length';
        this.fromUnit = '米';
        this.toUnit = '千米';
        this.inputValue = 1;
    }

    convert(value, fromUnit, toUnit, category) {
        if (category === 'temperature') {
            // 温度转换特殊处理
            const celsius = this.toCelsius(value, fromUnit);
            return this.fromCelsius(celsius, toUnit);
        } else {
            // 其他单位转换
            const fromFactor = this.categories[category].units[fromUnit].factor;
            const toFactor = this.categories[category].units[toUnit].factor;
            return (value / fromFactor) * toFactor;
        }
    }

    toCelsius(value, fromUnit) {
        if (fromUnit === '摄氏度') return value;
        if (fromUnit === '华氏度') return (value - 32) * 5/9;
        if (fromUnit === '开尔文') return value - 273.15;
        if (fromUnit === '兰氏度') return (value - 491.67) * 5/9;
        if (fromUnit === '列氏度') return value * 5/4;
        return value;
    }

    fromCelsius(value, toUnit) {
        if (toUnit === '摄氏度') return value;
        if (toUnit === '华氏度') return value * 9/5 + 32;
        if (toUnit === '开尔文') return value + 273.15;
        if (toUnit === '兰氏度') return (value + 273.15) * 9/5;
        if (toUnit === '列氏度') return value * 4/5;
        return value;
    }

    getUnitSymbol(unit, category) {
        return this.categories[category].units[unit].symbol;
    }
}

class EnhancedTimer {
    constructor() {
        this.timers = [];
        this.timerId = 0;
        this.presets = {
            pomodoro: { name: '番茄工作法', minutes: 25, seconds: 0 },
            shortBreak: { name: '短休息', minutes: 5, seconds: 0 },
            longBreak: { name: '长休息', minutes: 15, seconds: 0 },
            quickMeeting: { name: '快速会议', minutes: 10, seconds: 0 },
            standardMeeting: { name: '标准会议', minutes: 30, seconds: 0 },
            presentation: { name: '演讲', minutes: 20, seconds: 0 },
            exercise: { name: '运动', minutes: 45, seconds: 0 },
            meditation: { name: '冥想', minutes: 15, seconds: 0 },
            reading: { name: '阅读', minutes: 60, seconds: 0 },
            cooking: { name: '烹饪', minutes: 40, seconds: 0 }
        };
    }

    createTimer(name, minutes, seconds) {
        const totalSeconds = minutes * 60 + seconds;
        const timer = {
            id: this.timerId++,
            name: name,
            totalSeconds: totalSeconds,
            remainingSeconds: totalSeconds,
            isRunning: false,
            isFinished: false,
            interval: null
        };

        this.timers.push(timer);
        return timer;
    }

    startTimer(timerId) {
        const timer = this.timers.find(t => t.id === timerId);
        if (!timer || timer.isFinished) return;

        timer.isRunning = true;
        timer.interval = setInterval(() => {
            if (timer.remainingSeconds > 0) {
                timer.remainingSeconds--;
            } else {
                this.pauseTimer(timerId);
                timer.isFinished = true;
                this.onTimerFinished(timer);
            }
        }, 1000);
    }

    pauseTimer(timerId) {
        const timer = this.timers.find(t => t.id === timerId);
        if (!timer) return;

        timer.isRunning = false;
        if (timer.interval) {
            clearInterval(timer.interval);
            timer.interval = null;
        }
    }

    resetTimer(timerId) {
        const timer = this.timers.find(t => t.id === timerId);
        if (!timer) return;

        this.pauseTimer(timerId);
        timer.remainingSeconds = timer.totalSeconds;
        timer.isFinished = false;
    }

    deleteTimer(timerId) {
        const index = this.timers.findIndex(t => t.id === timerId);
        if (index === -1) return;

        const timer = this.timers[index];
        this.pauseTimer(timerId);
        this.timers.splice(index, 1);
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    onTimerFinished(timer) {
        // 可以在这里添加计时器完成时的回调
        console.log(`计时器 "${timer.name}" 已完成`);
    }
}

class ScientificCalculator {
    constructor() {
        this.display = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
        this.memory = 0;
        this.history = [];
        this.angleMode = 'deg'; // 'deg' 或 'rad'
        this.maxHistoryItems = 20;
    }

    inputDigit(digit) {
        if (this.waitingForOperand) {
            this.display = String(digit);
            this.waitingForOperand = false;
        } else {
            this.display = this.display === '0' ? String(digit) : this.display + digit;
        }
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.display = '0.';
            this.waitingForOperand = false;
        } else if (this.display.indexOf('.') === -1) {
            this.display += '.';
        }
    }

    clear() {
        this.display = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
    }

    clearAll() {
        this.clear();
        this.memory = 0;
    }

    deleteLastDigit() {
        const display = this.display;
        this.display = display.length === 1 ? '0' : display.substring(0, display.length - 1);
    }

    toggleSign() {
        const display = this.display;
        this.display = display.charAt(0) === '-' ? display.substring(1) : `-${display}`;
    }

    inputPercent() {
        const display = this.display;
        this.display = String(parseFloat(display) / 100);
    }

    performOperation(nextOperation) {
        const inputValue = parseFloat(this.display);

        if (this.previousValue === null) {
            this.previousValue = inputValue;
        } else if (this.operation) {
            const currentValue = this.previousValue || 0;
            const newValue = this.calculate(currentValue, inputValue, this.operation);

            this.display = String(newValue);
            this.previousValue = newValue;

            // 添加到历史记录
            this.addToHistory(`${currentValue} ${this.operation} ${inputValue} = ${newValue}`);
        }

        this.waitingForOperand = true;
        this.operation = nextOperation;
    }

    calculate(firstValue, secondValue, operation) {
        switch (operation) {
            case '+': return firstValue + secondValue;
            case '-': return firstValue - secondValue;
            case '*': return firstValue * secondValue;
            case '/': return firstValue / secondValue;
            case '=': return secondValue;
            default: return secondValue;
        }
    }

    // 科学计算功能
    calculateSquare() {
        const value = parseFloat(this.display);
        const result = value * value;
        this.addToHistory(`sqr(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateSquareRoot() {
        const value = parseFloat(this.display);
        const result = Math.sqrt(value);
        this.addToHistory(`√(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateCube() {
        const value = parseFloat(this.display);
        const result = value * value * value;
        this.addToHistory(`cube(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateCubeRoot() {
        const value = parseFloat(this.display);
        const result = Math.cbrt(value);
        this.addToHistory(`∛(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculatePower(power) {
        const value = parseFloat(this.display);
        const result = Math.pow(value, power);
        this.addToHistory(`${value}^${power} = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateReciprocal() {
        const value = parseFloat(this.display);
        const result = 1 / value;
        this.addToHistory(`1/(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateFactorial() {
        const value = parseInt(this.display);
        if (value < 0) {
            this.display = '错误';
            return;
        }

        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }

        this.addToHistory(`${value}! = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateLog(base = 10) {
        const value = parseFloat(this.display);
        if (value <= 0) {
            this.display = '错误';
            return;
        }

        const result = base === 10 ? Math.log10(value) : Math.log(value);
        this.addToHistory(`log${base === 10 ? '' : 'e'}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateLn() {
        const value = parseFloat(this.display);
        if (value <= 0) {
            this.display = '错误';
            return;
        }

        const result = Math.log(value);
        this.addToHistory(`ln(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateExp() {
        const value = parseFloat(this.display);
        const result = Math.exp(value);
        this.addToHistory(`e^(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateSin() {
        const value = parseFloat(this.display);
        const radians = this.angleMode === 'deg' ? value * Math.PI / 180 : value;
        const result = Math.sin(radians);
        this.addToHistory(`sin${this.angleMode === 'deg' ? '°' : ''}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateCos() {
        const value = parseFloat(this.display);
        const radians = this.angleMode === 'deg' ? value * Math.PI / 180 : value;
        const result = Math.cos(radians);
        this.addToHistory(`cos${this.angleMode === 'deg' ? '°' : ''}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateTan() {
        const value = parseFloat(this.display);
        const radians = this.angleMode === 'deg' ? value * Math.PI / 180 : value;
        const result = Math.tan(radians);
        this.addToHistory(`tan${this.angleMode === 'deg' ? '°' : ''}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateASin() {
        const value = parseFloat(this.display);
        if (value < -1 || value > 1) {
            this.display = '错误';
            return;
        }

        let result = Math.asin(value);
        if (this.angleMode === 'deg') {
            result = result * 180 / Math.PI;
        }

        this.addToHistory(`asin${this.angleMode === 'deg' ? '°' : ''}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateACos() {
        const value = parseFloat(this.display);
        if (value < -1 || value > 1) {
            this.display = '错误';
            return;
        }

        let result = Math.acos(value);
        if (this.angleMode === 'deg') {
            result = result * 180 / Math.PI;
        }

        this.addToHistory(`acos${this.angleMode === 'deg' ? '°' : ''}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateATan() {
        const value = parseFloat(this.display);
        let result = Math.atan(value);
        if (this.angleMode === 'deg') {
            result = result * 180 / Math.PI;
        }

        this.addToHistory(`atan${this.angleMode === 'deg' ? '°' : ''}(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateSinH() {
        const value = parseFloat(this.display);
        const result = Math.sinh(value);
        this.addToHistory(`sinh(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateCosH() {
        const value = parseFloat(this.display);
        const result = Math.cosh(value);
        this.addToHistory(`cosh(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    calculateTanH() {
        const value = parseFloat(this.display);
        const result = Math.tanh(value);
        this.addToHistory(`tanh(${value}) = ${result}`);
        this.display = String(result);
        this.waitingForOperand = true;
    }

    toggleAngleMode() {
        this.angleMode = this.angleMode === 'deg' ? 'rad' : 'deg';
    }

    // 内存功能
    memoryAdd() {
        this.memory += parseFloat(this.display);
    }

    memorySubtract() {
        this.memory -= parseFloat(this.display);
    }

    memoryRecall() {
        this.display = String(this.memory);
        this.waitingForOperand = true;
    }

    memoryClear() {
        this.memory = 0;
    }

    // 常数
    inputPi() {
        this.display = String(Math.PI);
        this.waitingForOperand = true;
    }

    inputE() {
        this.display = String(Math.E);
        this.waitingForOperand = true;
    }

    // 历史记录
    addToHistory(calculation) {
        this.history.unshift(calculation);
        if (this.history.length > this.maxHistoryItems) {
            this.history.pop();
        }
    }

    getHistory() {
        return [...this.history];
    }

    clearHistory() {
        this.history = [];
    }
}

// 导出类
window.EnhancedUnitConverter = EnhancedUnitConverter;
window.EnhancedTimer = EnhancedTimer;
window.ScientificCalculator = ScientificCalculator;

let enhancedCalculator = null;

function openEnhancedCalculator() {
    const scientificCalculatorHtml = `
        <div class="calculator-container p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-lg">
            <!-- 计算器显示区域 -->
            <div class="calculator-display-container mb-4 rounded-lg overflow-hidden bg-black">
                <div class="calculator-history text-right p-2 text-gray-400 min-h-[30px]" id="calculatorHistory"></div>
                <div class="calculator-display text-right p-4 text-white text-3xl font-mono" id="calculatorDisplay">0</div>
                <div class="calculator-mode flex justify-between p-2 bg-gray-900">
                    <button id="angleMode" class="text-sm px-3 py-1 bg-blue-700 text-white rounded-full">角度: DEG</button>
                    <button id="memoryIndicator" class="text-sm px-3 py-1 bg-blue-700 text-white rounded-full hidden">M</button>
                </div>
            </div>
            
            <!-- 记忆功能按钮 -->
            <div class="calculator-memory mb-3">
                <div class="grid grid-cols-5 gap-2">
                    <button onclick="calculatorAction('mc')" class="calc-btn calc-btn-memory py-2 px-3 rounded-lg text-sm">MC</button>
                    <button onclick="calculatorAction('mr')" class="calc-btn calc-btn-memory py-2 px-3 rounded-lg text-sm">MR</button>
                    <button onclick="calculatorAction('m+')" class="calc-btn calc-btn-memory py-2 px-3 rounded-lg text-sm">M+</button>
                    <button onclick="calculatorAction('m-')" class="calc-btn calc-btn-memory py-2 px-3 rounded-lg text-sm">M-</button>
                    <button onclick="calculatorAction('ms')" class="calc-btn calc-btn-memory py-2 px-3 rounded-lg text-sm">MS</button>
                </div>
            </div>
            
            <!-- 科学计算功能按钮 -->
            <div class="calculator-scientific mb-3">
                <div class="grid grid-cols-6 gap-2">
                    <button onclick="calculatorAction('second')" class="calc-btn calc-btn-scientific py-2 rounded-lg">2nd</button>
                    <button onclick="calculatorAction('pi')" class="calc-btn calc-btn-scientific py-2 rounded-lg">π</button>
                    <button onclick="calculatorAction('e')" class="calc-btn calc-btn-scientific py-2 rounded-lg">e</button>
                    <button onclick="calculatorAction('c')" class="calc-btn calc-btn-clear py-2 rounded-lg">C</button>
                    <button onclick="calculatorAction('ce')" class="calc-btn calc-btn-clear py-2 rounded-lg">CE</button>
                    <button onclick="calculatorAction('backspace')" class="calc-btn calc-btn-clear py-2 rounded-lg">⌫</button>
                </div>
            </div>
            
            <!-- 核心计算区域：科学函数 + 数字键盘 -->
            <div id="calculator-main-grid">
                <!-- 科学函数按钮 -->
                <div class="grid grid-cols-5 gap-2 mb-3">
                    <button onclick="calculatorAction('x2')" class="calc-btn calc-btn-scientific py-2 rounded-lg">x²</button>
                    <button onclick="calculatorAction('sqrt')" class="calc-btn calc-btn-scientific py-2 rounded-lg">√</button>
                    <button onclick="calculatorAction('xy')" class="calc-btn calc-btn-scientific py-2 rounded-lg">xʸ</button>
                    <button onclick="calculatorAction('1/x')" class="calc-btn calc-btn-scientific py-2 rounded-lg">1/x</button>
                    <button onclick="calculatorAction('divide')" class="calc-btn calc-btn-operator py-2 rounded-lg">÷</button>
                </div>
                
                <div class="grid grid-cols-5 gap-2 mb-3">
                    <button onclick="calculatorAction('sin')" class="calc-btn calc-btn-scientific py-2 rounded-lg">sin</button>
                    <button onclick="calculatorAction('cos')" class="calc-btn calc-btn-scientific py-2 rounded-lg">cos</button>
                    <button onclick="calculatorAction('tan')" class="calc-btn calc-btn-scientific py-2 rounded-lg">tan</button>
                    <button onclick="calculatorAction('log')" class="calc-btn calc-btn-scientific py-2 rounded-lg">log</button>
                    <button onclick="calculatorAction('multiply')" class="calc-btn calc-btn-operator py-2 rounded-lg">×</button>
                </div>
                
                <div class="grid grid-cols-5 gap-2 mb-3">
                    <button onclick="calculatorAction('asin')" class="calc-btn calc-btn-scientific py-2 rounded-lg">asin</button>
                    <button onclick="calculatorAction('acos')" class="calc-btn calc-btn-scientific py-2 rounded-lg">acos</button>
                    <button onclick="calculatorAction('atan')" class="calc-btn calc-btn-scientific py-2 rounded-lg">atan</button>
                    <button onclick="calculatorAction('ln')" class="calc-btn calc-btn-scientific py-2 rounded-lg">ln</button>
                    <button onclick="calculatorAction('subtract')" class="calc-btn calc-btn-operator py-2 rounded-lg">-</button>
                </div>
                
                <div class="grid grid-cols-5 gap-2 mb-3">
                    <button onclick="calculatorAction('factorial')" class="calc-btn calc-btn-scientific py-2 rounded-lg">n!</button>
                    <button onclick="calculatorAction('sinh')" class="calc-btn calc-btn-scientific py-2 rounded-lg">sinh</button>
                    <button onclick="calculatorAction('cosh')" class="calc-btn calc-btn-scientific py-2 rounded-lg">cosh</button>
                    <button onclick="calculatorAction('tanh')" class="calc-btn calc-btn-scientific py-2 rounded-lg">tanh</button>
                    <button onclick="calculatorAction('add')" class="calc-btn calc-btn-operator py-2 rounded-lg">+</button>
                </div>
                
                <!-- 数字键盘 -->
                <div class="grid grid-cols-5 gap-2 mb-3">
                    <button onclick="calculatorAction('7')" class="calc-btn calc-btn-number py-2 rounded-lg">7</button>
                    <button onclick="calculatorAction('8')" class="calc-btn calc-btn-number py-2 rounded-lg">8</button>
                    <button onclick="calculatorAction('9')" class="calc-btn calc-btn-number py-2 rounded-lg">9</button>
                    <button onclick="calculatorAction('leftParen')" class="calc-btn calc-btn-scientific py-2 rounded-lg">(</button>
                    <button onclick="calculatorAction('rightParen')" class="calc-btn calc-btn-scientific py-2 rounded-lg">)</button>
                </div>
                
                <div class="grid grid-cols-5 gap-2 mb-3">
                    <button onclick="calculatorAction('4')" class="calc-btn calc-btn-number py-2 rounded-lg">4</button>
                    <button onclick="calculatorAction('5')" class="calc-btn calc-btn-number py-2 rounded-lg">5</button>
                    <button onclick="calculatorAction('6')" class="calc-btn calc-btn-number py-2 rounded-lg">6</button>
                    <button onclick="calculatorAction('percent')" class="calc-btn calc-btn-scientific py-2 rounded-lg">%</button>
                    <button onclick="calculatorAction('negate')" class="calc-btn calc-btn-number py-2 rounded-lg">±</button>
                </div>
                
                <div class="grid grid-cols-5 gap-2">
                    <button onclick="calculatorAction('1')" class="calc-btn calc-btn-number py-2 rounded-lg">1</button>
                    <button onclick="calculatorAction('2')" class="calc-btn calc-btn-number py-2 rounded-lg">2</button>
                    <button onclick="calculatorAction('3')" class="calc-btn calc-btn-number py-2 rounded-lg">3</button>
                    <button onclick="calculatorAction('0')" class="calc-btn calc-btn-number py-2 rounded-lg">0</button>
                    <button onclick="calculatorAction('decimal')" class="calc-btn calc-btn-number py-2 rounded-lg">.</button>
                </div>
                
                <!-- 等号按钮 -->
                <div class="mt-3">
                    <button onclick="calculatorAction('equals')" class="calc-btn calc-btn-equals py-3 rounded-lg w-full">=</button>
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('科学计算器', scientificCalculatorHtml);

    // 初始化增强计算器
    if (!enhancedCalculator) {
        enhancedCalculator = new ScientificCalculator();
    }

    // 初始化UI
    updateCalculatorDisplay();
    updateCalculatorHistory();
    updateMemoryIndicator();
    updateAngleMode();

    // 添加键盘事件监听
    document.addEventListener('keydown', handleCalculatorKeyPress);
}

// 计算器操作处理函数
function calculatorAction(action) {
    if (!enhancedCalculator) {
        enhancedCalculator = new ScientificCalculator();
    }

    switch (action) {
        // 数字输入
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            enhancedCalculator.inputDigit(parseInt(action));
            break;

        // 小数点
        case 'decimal':
            enhancedCalculator.inputDecimal();
            break;

        // 基本运算
        case 'add':
            enhancedCalculator.performOperation('+');
            break;
        case 'subtract':
            enhancedCalculator.performOperation('-');
            break;
        case 'multiply':
            enhancedCalculator.performOperation('*');
            break;
        case 'divide':
            enhancedCalculator.performOperation('/');
            break;
        case 'equals':
            enhancedCalculator.performOperation('=');
            break;

        // 清除操作
        case 'c':
            enhancedCalculator.clear();
            break;
        case 'ce':
            enhancedCalculator.clearAll();
            break;
        case 'backspace':
            enhancedCalculator.deleteLastDigit();
            break;

        // 科学计算
        case 'x2':
            enhancedCalculator.calculateSquare();
            break;
        case 'sqrt':
            enhancedCalculator.calculateSquareRoot();
            break;
        case 'cbrt':
            enhancedCalculator.calculateCubeRoot();
            break;
        case 'xy':
            enhancedCalculator.calculatePower(2); // 简化处理，实际应该弹出输入框
            break;
        case 'factorial':
            enhancedCalculator.calculateFactorial();
            break;
        case 'reciprocal':
            enhancedCalculator.calculateReciprocal();
            break;
        case 'log':
            enhancedCalculator.calculateLog(10);
            break;
        case 'ln':
            enhancedCalculator.calculateLn();
            break;
        case 'exp':
            enhancedCalculator.calculateExp();
            break;
        case 'sin':
            enhancedCalculator.calculateSin();
            break;
        case 'cos':
            enhancedCalculator.calculateCos();
            break;
        case 'tan':
            enhancedCalculator.calculateTan();
            break;
        case 'asin':
            enhancedCalculator.calculateASin();
            break;
        case 'acos':
            enhancedCalculator.calculateACos();
            break;
        case 'atan':
            enhancedCalculator.calculateATan();
            break;
        case 'sinh':
            enhancedCalculator.calculateSinH();
            break;
        case 'cosh':
            enhancedCalculator.calculateCosH();
            break;
        case 'tanh':
            enhancedCalculator.calculateTanH();
            break;

        // 常数
        case 'pi':
            enhancedCalculator.inputPi();
            break;
        case 'e':
            enhancedCalculator.inputE();
            break;

        // 角度模式切换
        case 'angleMode':
            enhancedCalculator.toggleAngleMode();
            updateAngleMode();
            break;

        // 符号切换
        case 'negate':
            enhancedCalculator.toggleSign();
            break;

        // 百分比
        case 'percent':
            enhancedCalculator.inputPercent();
            break;

        // 括号
        case 'leftParen':
            enhancedCalculator.inputDigit('(');
            break;
        case 'rightParen':
            enhancedCalculator.inputDigit(')');
            break;

        // 内存操作
        case 'mc':
            enhancedCalculator.memoryClear();
            updateMemoryIndicator();
            break;
        case 'mr':
            enhancedCalculator.memoryRecall();
            break;
        case 'm+':
            enhancedCalculator.memoryAdd();
            updateMemoryIndicator();
            break;
        case 'm-':
            enhancedCalculator.memorySubtract();
            updateMemoryIndicator();
            break;
        case 'ms':
            enhancedCalculator.memory = parseFloat(enhancedCalculator.display);
            updateMemoryIndicator();
            break;
    }

    // 更新显示
    updateCalculatorDisplay();
    updateCalculatorHistory();
}

// 更新计算器显示
function updateCalculatorDisplay() {
    if (enhancedCalculator) {
        const displayElement = document.getElementById('calculatorDisplay');
        if (displayElement) {
            displayElement.textContent = enhancedCalculator.display;
        }
    }
}

// 更新计算器历史记录
function updateCalculatorHistory() {
    if (enhancedCalculator) {
        const historyElement = document.getElementById('calculatorHistory');
        if (historyElement) {
            const history = enhancedCalculator.getHistory();
            if (history.length > 0) {
                historyElement.textContent = history[0];
            } else {
                historyElement.textContent = '';
            }
        }
    }
}

// 更新内存指示器
function updateMemoryIndicator() {
    if (enhancedCalculator) {
        const memoryIndicator = document.getElementById('memoryIndicator');
        if (memoryIndicator) {
            if (enhancedCalculator.memory !== 0) {
                memoryIndicator.classList.remove('hidden');
            } else {
                memoryIndicator.classList.add('hidden');
            }
        }
    }
}

// 更新角度模式显示
function updateAngleMode() {
    if (enhancedCalculator) {
        const angleMode = document.getElementById('angleMode');
        if (angleMode) {
            angleMode.textContent = `角度: ${enhancedCalculator.angleMode.toUpperCase()}`;
        }
    }
}

// 处理键盘输入
function handleCalculatorKeyPress(event) {
    if (!enhancedCalculator || !document.getElementById('calculatorDisplay')) {
        return;
    }

    const key = event.key;

    // 数字键
    if (key >= '0' && key <= '9') {
        calculatorAction(key);
    }
    // 小数点
    else if (key === '.') {
        calculatorAction('decimal');
    }
    // 基本运算符
    else if (key === '+') {
        calculatorAction('add');
    }
    else if (key === '-') {
        calculatorAction('subtract');
    }
    else if (key === '*') {
        calculatorAction('multiply');
    }
    else if (key === '/') {
        event.preventDefault(); // 防止浏览器快捷键
        calculatorAction('divide');
    }
    else if (key === 'Enter' || key === '=') {
        calculatorAction('equals');
    }
    // 退格键
    else if (key === 'Backspace') {
        calculatorAction('backspace');
    }
    // Escape键
    else if (key === 'Escape') {
        calculatorAction('c');
    }
    // 删除键
    else if (key === 'Delete') {
        calculatorAction('ce');
    }
}

let enhancedConverter = null;

function openEnhancedUnitConverter() {
    const unitConverterHtml = `
        <div class="converter-container">
            <!-- 转换类型选择 -->
            <div class="converter-card">
                <div class="converter-card-title">
                    <div class="converter-card-icon">📐</div>
                    选择转换类型
                </div>
                <div class="converter-tabs" id="converterTabs">
                    <!-- 标签将通过JS动态生成 -->
                </div>
            </div>
            
            <!-- 输入区域 -->
            <div class="converter-card">
                <div class="converter-card-title">
                    <div class="converter-card-icon">✏️</div>
                    输入数值
                </div>
                <div class="input-group">
                    <input type="number" id="converterValue" class="converter-input" placeholder="输入要转换的数值" step="any">
                    <select id="fromUnit" class="converter-select">
                        <!-- 选项将通过JS动态生成 -->
                    </select>
                    <div style="text-align: center; margin: 1rem 0; color: #6200EE; font-weight: bold;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14"></path>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                    <select id="toUnit" class="converter-select">
                        <!-- 选项将通过JS动态生成 -->
                    </select>
                    <button id="convertBtn" class="converter-btn">转换</button>
                </div>
            </div>
            
            <!-- 结果显示 -->
            <div class="converter-card">
                <div class="converter-card-title">
                    <div class="converter-card-icon">📊</div>
                    转换结果
                </div>
                <div class="result-display">
                    <div class="result-value" id="converterResult">请输入数值并选择单位</div>
                    <div class="result-formula" id="resultFormula"></div>
                    <div class="result-ratio" id="resultRatio"></div>
                </div>
            </div>
            
            <!-- 常用转换快捷方式 -->
            <div class="converter-card">
                <div class="converter-card-title">
                    <div class="converter-card-icon">⚡</div>
                    常用转换
                </div>
                <div class="quick-convert-grid" id="quickConvert">
                    <!-- 快捷转换按钮将通过JS动态生成 -->
                </div>
            </div>
            
            <!-- 转换历史 -->
            <div class="converter-card">
                <div class="converter-card-title">
                    <div class="converter-card-icon">📜</div>
                    转换历史
                </div>
                <div class="converter-history" id="converterHistory">
                    <!-- 历史记录将通过JS动态生成 -->
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('增强单位转换器', unitConverterHtml);

    // 初始化转换器
    initEnhancedConverter();

    // 添加事件监听器
    document.getElementById('convertBtn').addEventListener('click', performEnhancedConversion);
    document.getElementById('converterValue').addEventListener('input', performEnhancedConversion);
    document.getElementById('fromUnit').addEventListener('change', performEnhancedConversion);
    document.getElementById('toUnit').addEventListener('change', performEnhancedConversion);
}

// 初始化增强转换器
function initEnhancedConverter() {
    const converter = new EnhancedUnitConverter();
    window.currentConverter = converter;

    // 创建转换类型标签
    const tabsContainer = document.getElementById('converterTabs');
    Object.keys(converter.categories).forEach(category => {
        const tab = document.createElement('button');
        tab.className = 'converter-tab';
        tab.textContent = converter.categories[category].name;
        tab.dataset.category = category;

        if (category === 'length') {
            tab.classList.add('active');
        }

        tab.addEventListener('click', function() {
            // 更新活动标签
            document.querySelectorAll('.converter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // 更新单位选项
            updateUnitOptions(category);

            // 更新快捷转换按钮
            updateQuickConvertButtons(category);
        });

        tabsContainer.appendChild(tab);
    });

    // 初始化长度转换选项
    updateUnitOptions('length');

    // 初始化快捷转换按钮
    updateQuickConvertButtons('length');
}

// 更新单位选项
function updateUnitOptions(category) {
    // 确保转换器已初始化
    if (!window.currentConverter) {
        window.currentConverter = new EnhancedUnitConverter();
    }

    const converter = window.currentConverter;
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');

    // 清空现有选项
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    try {
        // 添加新选项
        const units = converter.categories[category].units;
        Object.keys(units).forEach(unit => {
            const fromOption = document.createElement('option');
            fromOption.value = unit;
            const symbol = units[unit].symbol || '';
            fromOption.textContent = symbol ? `${unit} (${symbol})` : unit;
            fromUnitSelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = unit;
            toOption.textContent = symbol ? `${unit} (${symbol})` : unit;
            toUnitSelect.appendChild(toOption);
        });

        // 设置默认选择
        if (toUnitSelect.options.length > 1) {
            toUnitSelect.selectedIndex = 1;
        }

        // 触发一次转换
        performEnhancedConversion();
    } catch (error) {
        console.error('更新单位选项时出错:', error);
        // 如果出错，显示错误信息
        fromUnitSelect.innerHTML = '<option value="">加载单位失败</option>';
        toUnitSelect.innerHTML = '<option value="">加载单位失败</option>';
    }
}

// 更新快捷转换按钮
function updateQuickConvertButtons(category) {
    const quickConvertContainer = document.getElementById('quickConvert');
    quickConvertContainer.innerHTML = '';

    // 根据类别添加不同的快捷转换
    const quickConversions = {
        length: [
            { from: '米', to: '千米' },
            { from: '千米', to: '米' },
            { from: '厘米', to: '米' },
            { from: '米', to: '厘米' },
            { from: '毫米', to: '厘米' },
            { from: '厘米', to: '毫米' }
        ],
        weight: [
            { from: '克', to: '千克' },
            { from: '千克', to: '克' },
            { from: '毫克', to: '克' },
            { from: '克', to: '毫克' },
            { from: '吨', to: '千克' },
            { from: '千克', to: '吨' }
        ],
        temperature: [
            { from: '摄氏度', to: '华氏度' },
            { from: '华氏度', to: '摄氏度' },
            { from: '摄氏度', to: '开尔文' },
            { from: '开尔文', to: '摄氏度' }
        ],
        area: [
            { from: '平方米', to: '平方千米' },
            { from: '平方千米', to: '平方米' },
            { from: '平方厘米', to: '平方米' },
            { from: '平方米', to: '平方厘米' }
        ],
        volume: [
            { from: '升', to: '毫升' },
            { from: '毫升', to: '升' },
            { from: '立方米', to: '升' },
            { from: '升', to: '立方米' }
        ],
        speed: [
            { from: '米/秒', to: '千米/小时' },
            { from: '千米/小时', to: '米/秒' },
            { from: '千米/小时', to: '英里/小时' },
            { from: '英里/小时', to: '千米/小时' }
        ],
        time: [
            { from: '秒', to: '分钟' },
            { from: '分钟', to: '小时' },
            { from: '小时', to: '天' },
            { from: '天', to: '周' }
        ],
        pressure: [
            { from: '帕斯卡', to: '千帕' },
            { from: '千帕', to: '兆帕' },
            { from: '大气压', to: '千帕' },
            { from: '千帕', to: '大气压' }
        ],
        energy: [
            { from: '焦耳', to: '千焦' },
            { from: '千焦', to: '兆焦' },
            { from: '卡路里', to: '焦耳' },
            { from: '焦耳', to: '卡路里' }
        ],
        power: [
            { from: '瓦特', to: '千瓦' },
            { from: '千瓦', to: '兆瓦' },
            { from: '马力', to: '千瓦' },
            { from: '千瓦', to: '马力' }
        ],
        angle: [
            { from: '度', to: '弧度' },
            { from: '弧度', to: '度' },
            { from: '度', to: '梯度' },
            { from: '梯度', to: '度' }
        ],
        data: [
            { from: '字节', to: '千字节' },
            { from: '千字节', to: '兆字节' },
            { from: '兆字节', to: '吉字节' },
            { from: '吉字节', to: '太字节' }
        ]
    };

    const conversions = quickConversions[category] || [];

    // 确保转换器已初始化
    if (!window.currentConverter) {
        window.currentConverter = new EnhancedUnitConverter();
    }

    const converter = window.currentConverter;

    conversions.forEach(conversion => {
        const btn = document.createElement('button');
        btn.className = 'quick-convert-btn';

        // 获取单位符号，添加错误处理
        let fromSymbol = '';
        let toSymbol = '';

        try {
            if (converter.categories[category] &&
                converter.categories[category].units[conversion.from]) {
                fromSymbol = converter.categories[category].units[conversion.from].symbol;
            }

            if (converter.categories[category] &&
                converter.categories[category].units[conversion.to]) {
                toSymbol = converter.categories[category].units[conversion.to].symbol;
            }
        } catch (error) {
            console.error('获取单位符号时出错:', error);
        }

        // 如果没有获取到符号，使用空字符串
        if (!fromSymbol) fromSymbol = '';
        if (!toSymbol) toSymbol = '';

        // 设置按钮文本，包含单位符号
        const fromText = fromSymbol ? `${conversion.from} (${fromSymbol})` : conversion.from;
        const toText = toSymbol ? `${conversion.to} (${toSymbol})` : conversion.to;
        btn.textContent = `${fromText} → ${toText}`;

        btn.addEventListener('click', function() {
            // 设置单位选择
            document.getElementById('fromUnit').value = conversion.from;
            document.getElementById('toUnit').value = conversion.to;

            // 设置默认值
            document.getElementById('converterValue').value = 1;

            // 执行转换
            performEnhancedConversion();
        });

        quickConvertContainer.appendChild(btn);
    });
}

// 执行增强转换
function performEnhancedConversion() {
    const value = parseFloat(document.getElementById('converterValue').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const activeTab = document.querySelector('.converter-tab.active');
    const category = activeTab ? activeTab.dataset.category : 'length';

    if (isNaN(value)) {
        document.getElementById('converterResult').textContent = '请输入有效数值';
        document.getElementById('resultFormula').textContent = '';
        document.getElementById('resultRatio').textContent = '';
        return;
    }

    // 确保转换器已初始化
    if (!window.currentConverter) {
        window.currentConverter = new EnhancedUnitConverter();
    }

    const converter = window.currentConverter;

    try {
        const result = converter.convert(value, fromUnit, toUnit, category);

        // 获取单位符号，添加错误处理
        let toSymbol = '';
        let fromSymbol = '';

        try {
            if (converter.categories[category] &&
                converter.categories[category].units[toUnit]) {
                toSymbol = converter.categories[category].units[toUnit].symbol;
            }

            if (converter.categories[category] &&
                converter.categories[category].units[fromUnit]) {
                fromSymbol = converter.categories[category].units[fromUnit].symbol;
            }
        } catch (error) {
            console.error('获取单位符号时出错:', error);
        }

        // 如果没有获取到符号，使用空字符串
        if (!toSymbol) toSymbol = '';
        if (!fromSymbol) fromSymbol = '';

        // 更新结果显示
        const toText = toSymbol ? `${toUnit} (${toSymbol})` : toUnit;
        document.getElementById('converterResult').textContent = `${result.toFixed(6).replace(/\.?0+$/, '')} ${toText}`;

        // 显示转换公式
        const fromFactor = converter.categories[category].units[fromUnit].factor;
        const toFactor = converter.categories[category].units[toUnit].factor;
        const ratio = fromFactor / toFactor;

        const fromText = fromSymbol ? `${fromUnit} (${fromSymbol})` : fromUnit;
        document.getElementById('resultFormula').textContent = `${value} ${fromText} = ${value} × ${ratio.toFixed(6).replace(/\.?0+$/, '')} ${toText}`;
        document.getElementById('resultRatio').textContent = `1 ${fromText} = ${ratio.toFixed(6).replace(/\.?0+$/, '')} ${toText}`;

        // 添加到历史记录
        addToConversionHistory(value, fromUnit, result, toUnit);
    } catch (error) {
        console.error('转换过程中出错:', error);
        document.getElementById('converterResult').textContent = '转换出错，请检查输入';
        document.getElementById('resultFormula').textContent = '';
        document.getElementById('resultRatio').textContent = '';
    }
}

// 添加到转换历史
function addToConversionHistory(fromValue, fromUnit, toValue, toUnit) {
    const historyContainer = document.getElementById('converterHistory');
    const activeTab = document.querySelector('.converter-tab.active');
    const category = activeTab ? activeTab.dataset.category : 'length';

    // 确保转换器已初始化
    if (!window.currentConverter) {
        window.currentConverter = new EnhancedUnitConverter();
    }

    const converter = window.currentConverter;

    // 获取单位符号，添加错误处理
    let fromSymbol = '';
    let toSymbol = '';

    try {
        if (converter.categories[category] &&
            converter.categories[category].units[fromUnit]) {
            fromSymbol = converter.categories[category].units[fromUnit].symbol;
        }

        if (converter.categories[category] &&
            converter.categories[category].units[toUnit]) {
            toSymbol = converter.categories[category].units[toUnit].symbol;
        }
    } catch (error) {
        console.error('获取单位符号时出错:', error);
    }

    // 如果没有获取到符号，使用空字符串
    if (!fromSymbol) fromSymbol = '';
    if (!toSymbol) toSymbol = '';

    // 创建历史记录项
    const historyItem = document.createElement('div');
    historyItem.className = 'converter-history-item';

    // 格式化显示文本
    const fromText = fromSymbol ? `${fromUnit} (${fromSymbol})` : fromUnit;
    const toText = toSymbol ? `${toUnit} (${toSymbol})` : toUnit;
    historyItem.textContent = `${fromValue} ${fromText} = ${toValue.toFixed(6).replace(/\.?0+$/, '')} ${toText}`;

    // 添加点击事件，点击后可以重新应用这个转换
    historyItem.addEventListener('click', function() {
        document.getElementById('converterValue').value = fromValue;
        document.getElementById('fromUnit').value = fromUnit;
        document.getElementById('toUnit').value = toUnit;
        performEnhancedConversion();
    });

    if (historyContainer.firstChild) {
        historyContainer.insertBefore(historyItem, historyContainer.firstChild);
    } else {
        historyContainer.appendChild(historyItem);
    }

    while (historyContainer.children.length > 10) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

// 快速转换
function quickConvert(category, fromUnit, toUnit) {
    // 设置转换类型
    const activeTab = document.querySelector(`[data-category="${category}"]`);
    if (activeTab) {
        activeTab.click();
    }

    // 设置单位
    document.getElementById('fromUnit').value = fromUnit;
    document.getElementById('toUnit').value = toUnit;

    // 设置默认值
    document.getElementById('converterValue').value = 1;

    // 执行转换
    performEnhancedConversion();
}

let enhancedTimer = null;

function openEnhancedTimer() {
    const multiTimerHtml = `
        <div class="timer-container">
            <!-- 预设模式选择 -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">选择预设模式</label>
                <div class="grid grid-cols-2 gap-2">
                    <button onclick="setTimerPreset('pomodoro')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">番茄工作法 (25分钟)</button>
                    <button onclick="setTimerPreset('shortBreak')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">短休息 (5分钟)</button>
                    <button onclick="setTimerPreset('longBreak')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">长休息 (15分钟)</button>
                    <button onclick="setTimerPreset('quickMeeting')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">快速会议 (10分钟)</button>
                    <button onclick="setTimerPreset('standardMeeting')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">标准会议 (30分钟)</button>
                    <button onclick="setTimerPreset('presentation')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">演讲 (20分钟)</button>
                    <button onclick="setTimerPreset('exercise')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">运动 (45分钟)</button>
                    <button onclick="setTimerPreset('meditation')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">冥想 (15分钟)</button>
                    <button onclick="setTimerPreset('reading')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">阅读 (60分钟)</button>
                    <button onclick="setTimerPreset('cooking')" class="p-2 bg-gray-100 rounded text-sm hover:bg-gray-200">烹饪 (40分钟)</button>
                </div>
            </div>
            
            <!-- 自定义时间设置 -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">自定义时间</label>
                <div class="flex items-center space-x-2">
                    <input type="number" id="customHours" class="w-20 p-2 border border-gray-300 rounded-lg" min="0" max="23" value="0">
                    <span>小时</span>
                    <input type="number" id="customMinutes" class="w-20 p-2 border border-gray-300 rounded-lg" min="0" max="59" value="0">
                    <span>分钟</span>
                    <input type="number" id="customSeconds" class="w-20 p-2 border border-gray-300 rounded-lg" min="0" max="59" value="0">
                    <span>秒</span>
                </div>
            </div>
            
            <!-- 计时器名称 -->
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">计时器名称</label>
                <input type="text" id="timerName" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="输入计时器名称...">
            </div>
            
            <!-- 创建计时器按钮 -->
            <button onclick="createEnhancedTimer()" class="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors mb-4">
                创建计时器
            </button>
            
            <!-- 活动计时器列表 -->
            <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">活动计时器</h4>
                <div id="activeTimers" class="space-y-2">
                    <div class="text-gray-400 text-center p-4 bg-gray-50 rounded-lg">
                        暂无活动计时器
                    </div>
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('多功能倒计时器', multiTimerHtml);

    // 初始化增强计时器
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }
}

// 设置计时器预设
function setTimerPreset(presetName) {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    const preset = enhancedTimer.presets[presetName];
    if (preset) {
        document.getElementById('customHours').value = Math.floor(preset.minutes / 60);
        document.getElementById('customMinutes').value = preset.minutes % 60;
        document.getElementById('customSeconds').value = preset.seconds;
        document.getElementById('timerName').value = preset.name;
    }
}

// 创建增强计时器
function createEnhancedTimer() {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    const hours = parseInt(document.getElementById('customHours').value) || 0;
    const minutes = parseInt(document.getElementById('customMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('customSeconds').value) || 0;
    const name = document.getElementById('timerName').value || `计时器 ${enhancedTimer.timerId + 1}`;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        alert('请设置计时时间');
        return;
    }

    // 创建计时器
    const timer = enhancedTimer.createTimer(name, minutes + hours * 60, seconds);

    // 更新计时器列表
    updateTimerList();
}

// 更新计时器列表
function updateTimerList() {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    const timersContainer = document.getElementById('activeTimers');

    if (enhancedTimer.timers.length === 0) {
        timersContainer.innerHTML = `
            <div class="text-gray-400 text-center p-4 bg-gray-50 rounded-lg">
                暂无活动计时器
            </div>
        `;
        return;
    }

    timersContainer.innerHTML = '';

    enhancedTimer.timers.forEach(timer => {
        const timerElement = document.createElement('div');
        timerElement.className = 'p-3 bg-gray-50 rounded-lg';

        const timeDisplay = enhancedTimer.formatTime(timer.remainingSeconds);
        const statusText = timer.isFinished ? '已完成' : (timer.isRunning ? '运行中' : '已暂停');
        const statusClass = timer.isFinished ? 'text-green-600' : (timer.isRunning ? 'text-blue-600' : 'text-gray-600');

        timerElement.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="font-medium">${timer.name}</div>
                <div class="${statusClass} text-sm">${statusText}</div>
            </div>
            <div class="text-2xl font-mono text-center mb-2">${timeDisplay}</div>
            <div class="flex space-x-2">
                ${!timer.isFinished ? `
                    <button onclick="startEnhancedTimer(${timer.id})" class="flex-1 p-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                        ${timer.isRunning ? '暂停' : '开始'}
                    </button>
                    <button onclick="resetEnhancedTimer(${timer.id})" class="flex-1 p-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600">
                        重置
                    </button>
                ` : ''}
                <button onclick="deleteEnhancedTimer(${timer.id})" class="flex-1 p-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                    删除
                </button>
            </div>
        `;

        timersContainer.appendChild(timerElement);
    });
}

// 开始增强计时器
function startEnhancedTimer(timerId) {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    const timer = enhancedTimer.timers.find(t => t.id === timerId);
    if (timer) {
        if (timer.isRunning) {
            enhancedTimer.pauseTimer(timerId);
        } else {
            enhancedTimer.startTimer(timerId);

            // 开始更新显示
            updateTimerDisplay(timerId);
        }

        updateTimerList();
    }
}

// 重置增强计时器
function resetEnhancedTimer(timerId) {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    enhancedTimer.resetTimer(timerId);
    updateTimerList();
}

// 删除增强计时器
function deleteEnhancedTimer(timerId) {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    enhancedTimer.deleteTimer(timerId);
    updateTimerList();
}

// 更新计时器显示
function updateTimerDisplay(timerId) {
    if (!enhancedTimer) {
        enhancedTimer = new EnhancedTimer();
    }

    const timer = enhancedTimer.timers.find(t => t.id === timerId);
    if (!timer || !timer.isRunning) {
        return;
    }

    updateTimerList();

    // 如果计时器还在运行，继续更新
    if (timer.isRunning) {
        setTimeout(() => updateTimerDisplay(timerId), 1000);
    }
}

// 增强倒计时器功能
let enhancedCountdown;
let enhancedCountdownInterval;

function openEnhancedCountdown() {
    const enhancedCountdownHtml = `
        <div class="space-y-4">
            <!-- 倒计时显示 -->
            <div class="text-center p-6 bg-gray-100 rounded-lg">
                <div id="countdownDisplay" class="text-4xl font-mono font-bold text-primary mb-2">00:00:00</div>
                <div id="countdownName" class="text-lg text-gray-600">未命名倒计时</div>
                <div id="countdownProgress" class="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div id="countdownProgressBar" class="bg-primary h-2 rounded-full" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- 预设倒计时 -->
            <div class="grid grid-cols-2 gap-2">
                <button onclick="setCountdownPreset('pomodoro')" class="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                    番茄钟 (25分钟)
                </button>
                <button onclick="setCountdownPreset('shortBreak')" class="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                    短休息 (5分钟)
                </button>
                <button onclick="setCountdownPreset('longBreak')" class="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                    长休息 (15分钟)
                </button>
                <button onclick="setCountdownPreset('meeting')" class="p-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                    会议 (60分钟)
                </button>
            </div>
            
            <!-- 自定义倒计时 -->
            <div class="border-t pt-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">自定义倒计时</h4>
                <div class="flex justify-center items-center space-x-2 mb-4">
                    <input type="number" id="countdownHours" class="w-16 p-2 border border-gray-300 rounded-lg text-center" min="0" max="23" value="0">
                    <span>小时</span>
                    <input type="number" id="countdownMinutes" class="w-16 p-2 border border-gray-300 rounded-lg text-center" min="0" max="59" value="0">
                    <span>分钟</span>
                    <input type="number" id="countdownSeconds" class="w-16 p-2 border border-gray-300 rounded-lg text-center" min="0" max="59" value="0">
                    <span>秒</span>
                </div>
                
                <!-- 倒计时名称 -->
                <div class="mb-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">倒计时名称</label>
                    <input type="text" id="countdownNameInput" class="w-full p-2 border border-gray-300 rounded-lg" placeholder="输入倒计时名称...">
                </div>
            </div>
            
            <!-- 控制按钮 -->
            <div class="flex space-x-2">
                <button id="startCountdownBtn" onclick="startCountdown()" class="flex-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                    开始
                </button>
                <button id="pauseCountdownBtn" onclick="pauseCountdown()" class="flex-1 p-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600" disabled>
                    暂停
                </button>
                <button onclick="resetCountdown()" class="flex-1 p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                    重置
                </button>
            </div>
            
            <!-- 通知设置 -->
            <div class="border-t pt-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">通知设置</h4>
                <div class="flex items-center">
                    <input type="checkbox" id="enableSound" class="mr-2" checked>
                    <label for="enableSound" class="text-sm">播放声音提醒</label>
                </div>
                <div class="flex items-center mt-2">
                    <input type="checkbox" id="enableNotification" class="mr-2" checked>
                    <label for="enableNotification" class="text-sm">浏览器通知</label>
                </div>
            </div>
        </div>
    `;

    // 使用showToolModal函数显示模态框
    showToolModal('增强倒计时器', enhancedCountdownHtml);

    // 初始化增强倒计时器
    if (!enhancedCountdown) {
        enhancedCountdown = {
            totalSeconds: 0,
            remainingSeconds: 0,
            isRunning: false,
            presets: {
                pomodoro: { name: '番茄钟', minutes: 25, seconds: 0 },
                shortBreak: { name: '短休息', minutes: 5, seconds: 0 },
                longBreak: { name: '长休息', minutes: 15, seconds: 0 },
                meeting: { name: '会议', minutes: 60, seconds: 0 }
            }
        };
    }

    // 请求通知权限
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// 设置倒计时预设
function setCountdownPreset(presetName) {
    const preset = enhancedCountdown.presets[presetName];
    if (preset) {
        document.getElementById('countdownHours').value = Math.floor(preset.minutes / 60);
        document.getElementById('countdownMinutes').value = preset.minutes % 60;
        document.getElementById('countdownSeconds').value = preset.seconds;
        document.getElementById('countdownNameInput').value = preset.name;
    }
}

// 开始倒计时
function startCountdown() {
    const hours = parseInt(document.getElementById('countdownHours').value) || 0;
    const minutes = parseInt(document.getElementById('countdownMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('countdownSeconds').value) || 0;
    const name = document.getElementById('countdownNameInput').value || '倒计时';

    // 如果是第一次开始或者已重置，设置总时间
    if (!enhancedCountdown.isRunning && enhancedCountdown.remainingSeconds === 0) {
        enhancedCountdown.totalSeconds = hours * 3600 + minutes * 60 + seconds;
        enhancedCountdown.remainingSeconds = enhancedCountdown.totalSeconds;
    }

    if (enhancedCountdown.remainingSeconds <= 0) {
        alert('请设置有效的倒计时时间');
        return;
    }

    enhancedCountdown.isRunning = true;

    // 更新按钮状态
    document.getElementById('startCountdownBtn').disabled = true;
    document.getElementById('pauseCountdownBtn').disabled = false;

    // 禁用输入
    document.getElementById('countdownHours').disabled = true;
    document.getElementById('countdownMinutes').disabled = true;
    document.getElementById('countdownSeconds').disabled = true;
    document.getElementById('countdownNameInput').disabled = true;

    // 更新显示
    document.getElementById('countdownName').textContent = name;

    // 开始倒计时
    enhancedCountdownInterval = setInterval(() => {
        enhancedCountdown.remainingSeconds--;
        updateCountdownDisplay();

        if (enhancedCountdown.remainingSeconds <= 0) {
            completeCountdown();
        }
    }, 1000);

    updateCountdownDisplay();
}

// 暂停倒计时
function pauseCountdown() {
    enhancedCountdown.isRunning = false;
    clearInterval(enhancedCountdownInterval);

    // 更新按钮状态
    document.getElementById('startCountdownBtn').disabled = false;
    document.getElementById('pauseCountdownBtn').disabled = true;
}

// 重置倒计时
function resetCountdown() {
    enhancedCountdown.isRunning = false;
    enhancedCountdown.remainingSeconds = 0;
    enhancedCountdown.totalSeconds = 0;
    clearInterval(enhancedCountdownInterval);

    // 更新按钮状态
    document.getElementById('startCountdownBtn').disabled = false;
    document.getElementById('pauseCountdownBtn').disabled = true;

    // 启用输入
    document.getElementById('countdownHours').disabled = false;
    document.getElementById('countdownMinutes').disabled = false;
    document.getElementById('countdownSeconds').disabled = false;
    document.getElementById('countdownNameInput').disabled = false;

    // 重置显示
    document.getElementById('countdownDisplay').textContent = '00:00:00';
    document.getElementById('countdownName').textContent = '未命名倒计时';
    document.getElementById('countdownProgressBar').style.width = '0%';
}

// 完成倒计时
function completeCountdown() {
    enhancedCountdown.isRunning = false;
    clearInterval(enhancedCountdownInterval);

    // 更新显示
    document.getElementById('countdownDisplay').textContent = '00:00:00';
    document.getElementById('countdownDisplay').classList.add('text-red-600');

    // 播放声音提醒
    if (document.getElementById('enableSound').checked) {
        playNotificationSound();
    }

    // 发送浏览器通知
    if (document.getElementById('enableNotification').checked && 'Notification' in window && Notification.permission === 'granted') {
        new Notification('倒计时完成', {
            body: document.getElementById('countdownName').textContent + ' 已完成！',
            icon: '/favicon.ico'
        });
    }

    // 更新按钮状态
    document.getElementById('startCountdownBtn').disabled = false;
    document.getElementById('pauseCountdownBtn').disabled = true;
}

// 更新倒计时显示
function updateCountdownDisplay() {
    const hours = Math.floor(enhancedCountdown.remainingSeconds / 3600);
    const minutes = Math.floor((enhancedCountdown.remainingSeconds % 3600) / 60);
    const seconds = enhancedCountdown.remainingSeconds % 60;

    const display =
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');

    document.getElementById('countdownDisplay').textContent = display;
    document.getElementById('countdownDisplay').classList.remove('text-red-600');

    // 更新进度条
    const progress = enhancedCountdown.totalSeconds > 0
        ? ((enhancedCountdown.totalSeconds - enhancedCountdown.remainingSeconds) / enhancedCountdown.totalSeconds) * 100
        : 0;
    document.getElementById('countdownProgressBar').style.width = progress + '%';
}

// 播放通知声音
function playNotificationSound() {
    // 创建一个简单的音频上下文播放提示音
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

// 导出函数供全局使用
window.openEnhancedCalculator = openEnhancedCalculator;
window.openEnhancedUnitConverter = openEnhancedUnitConverter;
window.openEnhancedTimer = openEnhancedTimer;
window.openEnhancedCountdown = openEnhancedCountdown;
window.calculatorAction = calculatorAction;
window.initEnhancedConverter = initEnhancedConverter;
window.updateUnitOptions = updateUnitOptions;
window.updateQuickConvertButtons = updateQuickConvertButtons;
window.performEnhancedConversion = performEnhancedConversion;
window.addToConversionHistory = addToConversionHistory;
window.quickConvert = quickConvert;
window.setTimerPreset = setTimerPreset;
window.createEnhancedTimer = createEnhancedTimer;
window.startEnhancedTimer = startEnhancedTimer;
window.resetEnhancedTimer = resetEnhancedTimer;
window.deleteEnhancedTimer = deleteEnhancedTimer;
window.setCountdownPreset = setCountdownPreset;
window.startCountdown = startCountdown;
window.pauseCountdown = pauseCountdown;
window.resetCountdown = resetCountdown;