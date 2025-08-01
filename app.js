// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling for nav links
    initSmoothScrolling();
    
    // Initialize header scroll effect
    initHeaderScrollEffect();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize enhanced interactions
    initEnhancedInteractions();
});

// Bot verification functionality
function verifyBot() {
    const input = document.getElementById('botId');
    const result = document.getElementById('verificationResult');
    const realBotId = '1383674798248562789';
    const enteredId = input.value.trim();
    
    // Clear previous results
    result.className = 'verification__result';
    result.innerHTML = '';
    
    if (!enteredId) {
        result.className = 'verification__result error';
        result.innerHTML = '❌ Please enter a bot user ID';
        return;
    }
    
    // Add loading state
    result.className = 'verification__result';
    result.innerHTML = '🔄 Verifying...';
    result.style.display = 'block';
    
    // Simulate verification delay for better UX
    setTimeout(() => {
        if (enteredId === realBotId) {
            result.className = 'verification__result success';
            result.innerHTML = '✅ VERIFIED - This is the official Kindle AutoMM bot!';
            
            // Add celebration animation
            celebrateVerification();
        } else {
            result.className = 'verification__result error';
            result.innerHTML = '❌ INVALID - This is not the official Kindle AutoMM bot. Be careful of impersonators!';
        }
    }, 1000);
}

// Celebration animation for successful verification
function celebrateVerification() {
    const result = document.getElementById('verificationResult');
    result.style.animation = 'pulse 0.6s ease-in-out 3';
    
    // Create confetti effect
    createConfetti();
}

// Simple confetti effect
function createConfetti() {
    const colors = ['#1e3a8a', '#3b82f6', '#60a5fa', '#93c5fd', '#ffffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createConfettiPiece(color) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 10000;
        pointer-events: none;
        border-radius: 50%;
        animation: confettiFall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections - updated to include notification cards
    const animatedElements = document.querySelectorAll(
        '.notification, .feature__card, .testimonial__card, .verification__card'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Fixed smooth scrolling for navigation - Enhanced version
function initSmoothScrolling() {
    // Handle navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('href').substring(1);
            
            // Handle empty hash
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Get header height dynamically
                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 80;
                
                // Calculate target position
                const elementTop = targetElement.offsetTop;
                const targetPosition = Math.max(0, elementTop - headerHeight - 20);
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                console.log(`Scrolling to ${targetId} at position ${targetPosition}`);
            } else {
                console.warn(`Target element with ID "${targetId}" not found`);
            }
        });
    });
}

// Header scroll effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(30, 58, 138, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(30, 58, 138, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    }, 16));
}

// Counter animations for stats
function initCounterAnimations() {
    const stats = document.querySelectorAll('.hero__stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasDollar = text.includes('$');
    const hasSlash = text.includes('/');
    
    let targetNumber = 0;
    
    if (hasSlash) {
        // Handle "24/7" case
        element.textContent = '24/7';
        return;
    }
    
    if (hasDollar) {
        // Extract number from "$10,000+"
        targetNumber = parseInt(text.replace(/[$,+]/g, ''));
    } else if (hasPlus) {
        // Extract number from "250+"
        targetNumber = parseInt(text.replace('+', ''));
    }
    
    if (targetNumber === 0) return;
    
    let currentNumber = 0;
    const increment = targetNumber / 50;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        currentNumber += increment;
        
        if (currentNumber >= targetNumber) {
            currentNumber = targetNumber;
            clearInterval(timer);
        }
        
        let displayText = '';
        if (hasDollar) {
            displayText = '$' + Math.floor(currentNumber).toLocaleString();
            if (hasPlus) displayText += '+';
        } else {
            displayText = Math.floor(currentNumber).toString();
            if (hasPlus) displayText += '+';
        }
        
        element.textContent = displayText;
    }, stepTime);
}

// Enhanced interactions and effects
function initEnhancedInteractions() {
    // Initialize button effects
    initButtonEffects();
    
    // Initialize card hover effects
    initCardHoverEffects();
    
    // Initialize form enhancements
    initFormEnhancements();
    
    // Initialize notification card effects
    initNotificationCardEffects();
}

// Enhanced button effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Mouse hover effects
        button.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(30, 58, 138, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        // Add ripple effect
        button.addEventListener('click', createRipple);
    });
}

// Enhanced notification card effects
function initNotificationCardEffects() {
    const notificationCards = document.querySelectorAll('.notification');
    
    notificationCards.forEach(card => {
        // Enhanced hover effects for notification cards
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(46, 173, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Add click feedback
        card.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98) translateY(-2px)';
        });
        
        card.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1.05) translateY(-5px)';
        });
        
        // Add subtle animation on scroll into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        observer.observe(card);
    });
}

// Enhanced card hover effects
function initCardHoverEffects() {
    // Feature cards
    const featureCards = document.querySelectorAll('.feature__card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 15px 35px rgba(30, 58, 138, 0.15)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
            this.style.borderColor = '';
        });
    });
    
    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial__card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(30, 58, 138, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
}

// Enhanced form functionality
function initFormEnhancements() {
    const input = document.getElementById('botId');
    const button = document.querySelector('.verification__btn');
    
    if (input && button) {
        // Ensure input is properly configured
        input.setAttribute('type', 'text');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('spellcheck', 'false');
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            const value = this.value.trim();
            
            if (value.length === 0) {
                this.style.borderColor = '';
                this.style.backgroundColor = '';
            } else if (!/^\d+$/.test(value)) {
                this.style.borderColor = '#dc2626';
                this.style.backgroundColor = 'rgba(220, 38, 38, 0.05)';
            } else if (value.length !== 19) {
                this.style.borderColor = '#f59e0b';
                this.style.backgroundColor = 'rgba(245, 158, 11, 0.05)';
            } else {
                this.style.borderColor = '#059669';
                this.style.backgroundColor = 'rgba(5, 150, 105, 0.05)';
            }
        });
        
        // Allow Enter key to trigger verification
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                verifyBot();
            }
        });
        
        // Focus enhancement
        input.addEventListener('focus', function() {
            this.style.outline = '2px solid #3b82f6';
            this.style.outlineOffset = '2px';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    }
}

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    // Add ripple styles if not already present
    if (!document.querySelector('style[data-ripple]')) {
        const rippleStyle = document.createElement('style');
        rippleStyle.setAttribute('data-ripple', 'true');
        rippleStyle.textContent = `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                background-color: rgba(255, 255, 255, 0.3);
                pointer-events: none;
            }
            
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }
    
    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    button.appendChild(circle);
    
    setTimeout(() => {
        if (circle.parentNode) {
            circle.remove();
        }
    }, 600);
}

// Performance optimization: Throttle function
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
    };
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Mobile optimizations
function initMobileOptimizations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Optimize animations for mobile
        const cards = document.querySelectorAll('.notification, .feature__card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', initMobileOptimizations);
window.addEventListener('resize', throttle(initMobileOptimizations, 250));

// Add custom styles for better notification card integration
document.addEventListener('DOMContentLoaded', function() {
    // Add some custom animation styles for notification cards
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification.fade-in {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .notification.fade-in.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .notification,
            .notification.fade-in,
            .notification.fade-in.visible {
                transition: none;
                transform: none;
                animation: none;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    // Debug: Log available elements on page load
    console.log('Available sections:');
    ['services', 'verify', 'features', 'contact'].forEach(id => {
        const element = document.getElementById(id);
        console.log(`${id}: ${element ? 'Found' : 'Not found'}`);
    });
});