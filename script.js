// JavaScript for Navjot Singh (Lavi) Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    
    // =======================
    // NAVIGATION FUNCTIONALITY
    // =======================
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    // Mobile Navigation Toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    }
    
    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = '';
                span.style.opacity = '';
            });
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    
    // =======================
    // SMOOTH SCROLLING
    // =======================
    
    // Active nav link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    
    // =======================
    // SCROLL PROGRESS BAR
    // =======================
    
    function createScrollProgress() {
        const scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        document.body.appendChild(scrollProgress);
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });
    }
    
    createScrollProgress();
    
    
    // =======================
    // SKILL BAR ANIMATIONS
    // =======================
    
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillsSection = document.querySelector('#skills');
    let skillsAnimated = false;
    
    function animateSkillBars() {
        if (skillsAnimated) return;
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
        
        skillsAnimated = true;
    }
    
    // Intersection Observer for skill bars
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateSkillBars();
                    }, 300);
                }
            });
        }, { threshold: 0.5 });
        
        skillsObserver.observe(skillsSection);
    }
    
    
    // =======================
    // FADE-IN ANIMATIONS
    // =======================
    
    const fadeElements = document.querySelectorAll('.project-card, .skill-item, .testimonial-card, .contact-item');
    
    // Add fade-in class to elements
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Intersection Observer for fade-in animations
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    
    // =======================
    // BACK TO TOP BUTTON
    // =======================
    
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    
    // =======================
    // CONTACT FORM HANDLING
    // =======================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !message || !service) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Create WhatsApp message
            const whatsappMessage = createWhatsAppMessage(name, email, phone, service, message);
            
            // Open WhatsApp
            window.open(`https://wa.me/9988839184?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
            
            // Show success message
            showNotification('Redirecting to WhatsApp...', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    function createWhatsAppMessage(name, email, phone, service, message) {
        return `Hi Lavi! 👋

*New Website Inquiry*

📞 *Contact Details:*
• Name: ${name}
• Email: ${email}
• Phone: ${phone || 'Not provided'}

🎯 *Service Requested:* ${service}

💬 *Message:*
${message}

Looking forward to working with you! 🚀`;
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'error' ? '#ff4757' : '#2ed573',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    
    // =======================
    // RESUME DOWNLOAD
    // =======================
    
    const downloadResumeBtn = document.getElementById('download-resume');
    
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create resume content
            const resumeContent = createResumeContent();
            
            // Create and download PDF
            downloadResume(resumeContent);
        });
    }
    
    function createResumeContent() {
        return `
NAVJOT SINGH (LAVI)
Web Designer & Developer
Kattu, Barnala, Punjab | Phone: +91 9988839184 | Email: navjot6230@gmail.com

================================================================================================

PERSONAL INFORMATION
================================================================================================
Full Name: Navjot Singh (Lavi)
Date of Birth: 18 October 2007
Village: Kattu, District: Barnala, Punjab
Nationality: Indian
Email: navjot6230@gmail.com
Phone/WhatsApp: +91 9988839184

================================================================================================

PROFESSIONAL SUMMARY
================================================================================================
Passionate and self-driven Web Designer from Barnala, Punjab, specializing in creating beautiful, 
user-friendly websites. Committed to making professional web design accessible to everyone, 
starting at just ₹99. Expert in crafting designs that are visually appealing and built for performance.

================================================================================================

EDUCATION
================================================================================================
• College: SSD College, Barnala (affiliated with Punjabi University, Patiala)
• Secondary: Senior Secondary Residential School for Meritorious Students
• Primary: Government Kattu, Barnala

================================================================================================

TECHNICAL SKILLS
================================================================================================
• HTML: Expert Level
• CSS: Expert Level  
• JavaScript: Advanced Level
• C Language: Intermediate Level
• C++: Intermediate Level
• Java: Intermediate Level
• AI Prompts: Expert Level
• Web Development: Expert Level

================================================================================================

FEATURED PROJECTS
================================================================================================

1. LaviLanding – ₹99 Website Offer Page
   • Clean, responsive landing page for promoting ₹99 website design offer
   • Technologies: HTML, CSS, JavaScript, Bootstrap, Canva
   • Focus: Speed, clarity, and client conversion

2. Barnala Portfolio Hub
   • Personal portfolio website showcasing work and skills
   • Technologies: HTML, CSS, JavaScript, Tailwind CSS, GitHub Pages
   • Local touch reflecting Barnala roots

================================================================================================

SERVICES OFFERED
================================================================================================
• Website Design & Development starting at ₹99
• Responsive Web Design
• Portfolio Websites
• Business Websites  
• Landing Pages
• Website Maintenance & Updates

================================================================================================

HOBBIES & INTERESTS
================================================================================================
• Making Websites
• Learning New Technologies
• Exploring Creative Design Solutions

================================================================================================

CONTACT INFORMATION
================================================================================================
• Instagram: @lavi__47x
• Facebook: Navjot Singh
• WhatsApp: +91 9988839184
• Telegram: @Lavi00006
• YouTube: @lavibarnala

================================================================================================

"From Barnala to the Web – Let's Build Your Online Identity"

© 2024 Navjot Singh (Lavi). Professional Web Designer from Punjab.
        `;
    }
    
    function downloadResume(content) {
        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'Navjot_Singh_Lavi_Resume.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        showNotification('Resume downloaded successfully!', 'success');
    }
    
    
    // =======================
    // TYPING ANIMATION
    // =======================
    
    function typeWriter(element, texts, speed = 100) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = speed;
            
            if (isDeleting) {
                typeSpeed /= 2;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }
            
            setTimeout(type, typeSpeed);
        }
        
        type();
    }
    
    // Initialize typing animation for tagline
    const taglineElement = document.querySelector('.hero-title .accent');
    if (taglineElement) {
        const taglines = [
            "Let's Build Your Online Identity",
            "Creating Digital Excellence",
            "Your Web Success Partner",
            "Building Dreams Online"
        ];
        typeWriter(taglineElement, taglines, 150);
    }
    
    
    // =======================
    // PARALLAX EFFECTS
    // =======================
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.punjab-icon');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    
    // =======================
    // LOADING SCREEN
    // =======================
    
    function createLoadingScreen() {
        const loader = document.createElement('div');
        loader.id = 'loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="logo-icon">
                    <span class="logo-text">ls</span>
                    <i class="fas fa-wheat-awn punjab-icon pulse"></i>
                </div>
                <p>Loading Portfolio...</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
        
        Object.assign(loader.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #F5F5DC 0%, rgba(255, 255, 255, 0.9) 50%, #F5F5DC 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10000',
            textAlign: 'center'
        });
        
        document.body.appendChild(loader);
        
        // Simulate loading
        let progress = 0;
        const progressBar = loader.querySelector('.loading-progress');
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
                progressBar.style.background = 'linear-gradient(45deg, #FF6B35, #1E90FF)';
                progressBar.style.height = '4px';
                progressBar.style.borderRadius = '2px';
                progressBar.style.transition = 'width 0.3s ease';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    loader.style.transition = 'opacity 0.5s ease';
                    setTimeout(() => {
                        if (loader.parentNode) {
                            loader.remove();
                        }
                    }, 500);
                }, 500);
            }
        }, 100);
    }
    
    // Show loading screen
    createLoadingScreen();
    
    
    // =======================
    // EASTER EGGS & FUN FEATURES
    // =======================
    
    // Konami Code Easter Egg
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                showEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function showEasterEgg() {
        showNotification('🎉 Konami Code Activated! Lavi appreciates your curiosity!', 'success');
        
        // Add rainbow effect to logo
        const logoText = document.querySelector('.logo-text');
        if (logoText) {
            logoText.style.animation = 'rainbow 2s infinite';
        }
        
        // Add CSS for rainbow effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { color: #FF6B35; }
                16% { color: #FFD700; }
                33% { color: #32CD32; }
                50% { color: #1E90FF; }
                66% { color: #8A2BE2; }
                83% { color: #FF1493; }
                100% { color: #FF6B35; }
            }
        `;
        document.head.appendChild(style);
    }
    
    
    // =======================
    // PERFORMANCE OPTIMIZATION
    // =======================
    
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Debounce scroll events
    function debounce(func, wait) {
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
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(() => {
        highlightNavLink();
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
});

// =======================
// ACCESSIBILITY FEATURES
// =======================

// Focus management for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.focus();
        }
    }
});

// High contrast mode toggle
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
}

// Load saved accessibility preferences
if (localStorage.getItem('highContrast') === 'true') {
    document.body.classList.add('high-contrast');
}

// Reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

console.log('🚀 Navjot Singh (Lavi) Portfolio loaded successfully!');
console.log('💻 Contact: navjot6230@gmail.com | 📱 WhatsApp: +91 9988839184');
console.log('🌐 From Barnala to the Web – Let\'s Build Your Online Identity!');