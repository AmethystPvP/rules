// DOM 元素
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

// 移动端菜单切换
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // 切换汉堡菜单图标
    const svg = mobileMenuButton.querySelector('svg');
    const path = svg.querySelector('path');
    
    if (mobileMenu.classList.contains('hidden')) {
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    } else {
        path.setAttribute('d', 'M6 18L18 6M6 6l12 12');
    }
});

// 点击菜单项后关闭移动端菜单
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const svg = mobileMenuButton.querySelector('svg');
        const path = svg.querySelector('path');
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    });
});

// 点击菜单外部关闭移动端菜单
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
        mobileMenu.classList.add('hidden');
        const svg = mobileMenuButton.querySelector('svg');
        const path = svg.querySelector('path');
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    }
});

// 复制QQ群号功能
function copyQQGroup() {
    const qqGroup = '1020959594';
    
    // 尝试使用现代 Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(qqGroup).then(() => {
            showToast('QQ群号已复制到剪贴板！');
            animateCopyButton();
        }).catch(() => {
            // 如果 Clipboard API 失败，使用备用方法
            fallbackCopyTextToClipboard(qqGroup);
        });
    } else {
        // 使用备用复制方法
        fallbackCopyTextToClipboard(qqGroup);
    }
}

// 备用复制方法
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 避免滚动到底部
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('QQ群号已复制到剪贴板！');
            animateCopyButton();
        } else {
            showToast('复制失败，请手动复制群号', 'error');
        }
    } catch (err) {
        showToast('复制失败，请手动复制群号', 'error');
    }
    
    document.body.removeChild(textArea);
}

// 显示 Toast 通知
function showToast(message, type = 'success') {
    toastMessage.textContent = message;
    
    // 设置 Toast 样式
    if (type === 'success') {
        toast.className = 'fixed top-4 right-4 bg-green-600/90 text-white px-6 py-3 rounded-lg transform translate-x-full transition-transform duration-300 z-50';
        toast.querySelector('span').textContent = '✅';
    } else if (type === 'error') {
        toast.className = 'fixed top-4 right-4 bg-red-600/90 text-white px-6 py-3 rounded-lg transform translate-x-full transition-transform duration-300 z-50';
        toast.querySelector('span').textContent = '❌';
    }
    
    // 显示 Toast
    toast.classList.add('show');
    
    // 3秒后隐藏 Toast
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// 复制按钮动画
function animateCopyButton() {
    const copyButton = document.querySelector('.minecraft-button');
    copyButton.classList.add('copied');
    
    setTimeout(() => {
        copyButton.classList.remove('copied');
    }, 600);
}

// 平滑滚动到指定区域
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        const offsetTop = target.offsetTop - 80; // 导航栏高度补偿
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 处理导航链接点击
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', () => {
    // 为所有卡片添加淡入动画
    const cards = document.querySelectorAll('.rule-card, .punishment-card, .server-ip-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 为标题添加打字机效果
    const title = document.querySelector('.glow-text');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// 滚动时的视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.getElementById('particles');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// 鼠标悬停音效模拟（视觉反馈）
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.minecraft-button, .rule-card, .punishment-card, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.filter = 'brightness(1.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.filter = 'brightness(1)';
        });
    });
}

// 初始化悬停效果
addHoverEffects();

// 键盘快捷键支持
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + C 快速复制QQ群号
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && !window.getSelection().toString()) {
        e.preventDefault();
        copyQQGroup();
    }
    
    // Esc 关闭移动端菜单
    if (e.key === 'Escape') {
        mobileMenu.classList.add('hidden');
        const svg = mobileMenuButton.querySelector('svg');
        const path = svg.querySelector('path');
        path.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
    }
});

// 性能优化：节流滚动事件
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 应用节流到滚动事件
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const parallax = document.getElementById('particles');
    
    if (parallax) {
        const speed = scrolled * 0.3;
        parallax.style.transform = `translateY(${speed}px)`;
    }
}, 16));

// 检测用户设备并优化动画
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // 如果用户偏好减少动画，禁用某些动画
    const animatedElements = document.querySelectorAll('.animate-pulse-slow, .pixel-glow');
    animatedElements.forEach(element => {
        element.style.animation = 'none';
    });
}

// 添加错误处理
window.addEventListener('error', (e) => {
    console.error('页面错误:', e.error);
});

// 添加页面可见性检测（优化性能）
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // 页面不可见时暂停动画
        document.body.style.animationPlayState = 'paused';
    } else {
        // 页面可见时恢复动画
        document.body.style.animationPlayState = 'running';
    }
});

// 控制台彩蛋
console.log('%c🎮 AmethystPvP 服务器规则页面', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
console.log('%c欢迎来到 AmethystPvP！', 'color: #06b6d4; font-size: 16px;');
console.log('%c请遵守服务器规则，享受游戏乐趣！', 'color: #10b981; font-size: 14px;');
console.log('%cQQ群：1020959594', 'color: #f59e0b; font-size: 14px;');
