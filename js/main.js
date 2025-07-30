// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    console.log('AmethystPvP 网站已加载');
    
    // 初始化所有功能
    initMobileMenu();
    initSmoothScroll();
    initParticleSystem();
    initScrollAnimations();
    initServerIPCopy();
    initNavHighlight();
    
    // 添加页面加载动画
    addLoadAnimations();
});

// 服务器IP复制功能
function copyServerIP() {
    const serverIP = 'amethystpvp.xyz';
    
    // 创建临时文本区域
    const textArea = document.createElement('textarea');
    textArea.value = serverIP;
    document.body.appendChild(textArea);
    textArea.select();
    
    try {
        // 尝试复制到剪贴板
        document.execCommand('copy');
        showToast('服务器IP已复制到剪贴板！', 'success');
    } catch (err) {
        console.error('复制失败:', err);
        showToast('复制失败，请手动复制：' + serverIP, 'error');
    }
    
    // 清理临时元素
    document.body.removeChild(textArea);
}

// Toast 通知系统
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastText = toast.querySelector('span');
    
    // 设置消息内容
    toastText.textContent = message;
    
    // 设置样式
    toast.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300`;
    
    if (type === 'success') {
        toast.classList.add('bg-green-600', 'text-white');
    } else if (type === 'error') {
        toast.classList.add('bg-red-600', 'text-white');
    } else if (type === 'info') {
        toast.classList.add('bg-blue-600', 'text-white');
    }
    
    // 显示 toast
    setTimeout(() => {
        toast.classList.add('show');
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后隐藏
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            toast.classList.remove('show');
        }, 300);
    }, 3000);
}

// 移动端菜单功能
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        toggleMobileMenu();
    });
    
    // 点击导航链接后关闭菜单
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function toggleMobileMenu() {
    const nav = document.querySelector('nav');
    const existingMenu = document.getElementById('mobile-menu');
    
    if (existingMenu) {
        closeMobileMenu();
        return;
    }
    
    // 创建移动端菜单
    const mobileMenu = document.createElement('div');
    mobileMenu.id = 'mobile-menu';
    mobileMenu.className = 'fixed top-16 left-0 right-0 z-40 mx-4 rounded-lg overflow-hidden';
    mobileMenu.style.background = 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(139, 92, 246, 0.1))';
    mobileMenu.style.backdropFilter = 'blur(10px)';
    mobileMenu.style.border = '1px solid rgba(139, 92, 246, 0.3)';
    
    // 添加菜单项
    const menuItems = [
        { href: '#home', text: '首页' },
        { href: '#gamemodes', text: '游戏模式' },
        { href: '#features', text: '特色功能' },
        { href: '#join', text: '立即加入' }
    ];
    
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.text;
        link.className = 'block py-4 px-6 text-white hover:bg-purple-600 hover:bg-opacity-20 transition-colors duration-300';
        mobileMenu.appendChild(link);
    });
    
    // 添加到页面
    document.body.appendChild(mobileMenu);
    
    // 添加进入动画
    mobileMenu.style.opacity = '0';
    mobileMenu.style.transform = 'translateY(-20px)';
    setTimeout(() => {
        mobileMenu.style.opacity = '1';
        mobileMenu.style.transform = 'translateY(0)';
        mobileMenu.style.transition = 'all 0.3s ease';
    }, 10);
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            mobileMenu.remove();
        }, 300);
    }
}

// 平滑滚动功能
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单
                closeMobileMenu();
            }
        });
    });
}

// 粒子系统
function initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // 创建粒子
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
    
    // 定期创建新粒子
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% 概率
            createParticle(particlesContainer);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 h-1 rounded-full opacity-50';
    
    // 随机颜色
    const colors = ['bg-purple-400', 'bg-cyan-400', 'bg-pink-400', 'bg-yellow-400'];
    particle.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
    // 随机位置
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // 添加动画
    particle.style.animation = `particle-float ${3 + Math.random() * 4}s ease-in-out infinite`;
    
    container.appendChild(particle);
    
    // 10秒后删除粒子
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 10000);
}

// 添加粒子动画CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particle-float {
        0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.3;
        }
        25% {
            transform: translateY(-20px) translateX(10px) scale(1.2);
            opacity: 0.7;
        }
        50% {
            transform: translateY(-40px) translateX(-10px) scale(1);
            opacity: 1;
        }
        75% {
            transform: translateY(-20px) translateX(15px) scale(0.8);
            opacity: 0.7;
        }
    }
`;
document.head.appendChild(particleStyle);

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 观察所有游戏模式卡片和特色功能卡片
    const cards = document.querySelectorAll('.game-mode-card, .feature-card');
    cards.forEach(card => {
        observer.observe(card);
    });
}

// 导航高亮功能
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// 服务器IP复制初始化
function initServerIPCopy() {
    // 为所有IP文本添加点击复制功能
    const serverIPs = document.querySelectorAll('#server-ip');
    serverIPs.forEach(ip => {
        ip.style.cursor = 'pointer';
        ip.title = '点击复制服务器IP';
        ip.addEventListener('click', copyServerIP);
    });
}

// 页面加载动画
function addLoadAnimations() {
    // 为主要元素添加加载动画
    const elements = document.querySelectorAll('h1, h2, .game-mode-card, .feature-card');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + C 复制服务器IP
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        copyServerIP();
    }
    
    // Esc 关闭移动端菜单
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// 游戏模式卡片点击效果
document.addEventListener('click', function(e) {
    if (e.target.closest('.game-mode-card')) {
        const card = e.target.closest('.game-mode-card');
        
        // 添加点击波纹效果
        const ripple = document.createElement('div');
        ripple.className = 'absolute inset-0 bg-white opacity-20 rounded-xl';
        ripple.style.transform = 'scale(0)';
        ripple.style.transition = 'transform 0.6s ease';
        
        card.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = 'scale(1)';
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // 显示提示
        const gameMode = card.querySelector('h3').textContent;
        showToast(`${gameMode} - 即将推出更多详情！`, 'info');
    }
});

// 性能优化：节流滚动事件
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 应用节流到滚动事件
const throttledScroll = throttle(function() {
    // 滚动相关的处理
    updateScrollProgress();
}, 100);

window.addEventListener('scroll', throttledScroll);

// 滚动进度指示器
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // 更新导航栏透明度
    const nav = document.querySelector('nav');
    if (winScroll > 100) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
    }
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 资源加载失败处理
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.warn('图片加载失败:', this.src);
        });
    });
});

// 导出全局函数供HTML调用
window.copyServerIP = copyServerIP;
window.showToast = showToast;