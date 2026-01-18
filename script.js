// ============================================
// ROHAN WEB DESIGNER - Main JavaScript
// ============================================

// Hide loading screen after animation
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000);
});



// ============================================
// USER AUTHENTICATION SYSTEM
// ============================================

const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const openAuthModal = document.getElementById('openAuthModal');
const closeAuth = document.getElementById('closeAuth');
const profileToggle = document.getElementById('profileToggle');
const profileAvatar = document.getElementById('profileAvatar');
const userProfileMenu = document.getElementById('userProfileMenu');
const logoutBtn = document.getElementById('logoutBtn');

// Open auth modal
if (openAuthModal) {
    openAuthModal.addEventListener('click', () => {
        authModal.classList.add('active');
    });
}

// Close auth modal
if (closeAuth) {
    closeAuth.addEventListener('click', () => {
        authModal.classList.remove('active');
    });
}

// Close modal on outside click
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('active');
    }
});

// Toggle between login and signup forms
document.querySelectorAll('.toggle-form').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const formType = btn.dataset.form;
        
        // Hide all forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        
        // Show selected form
        if (formType === 'signup') {
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        } else {
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        }
    });
});

// Initialize - Show login form by default
window.addEventListener('DOMContentLoaded', () => {
    if (loginForm) {
        loginForm.classList.add('active');
    }
    if (signupForm) {
        signupForm.classList.remove('active');
    }
});

// Handle Signup
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirm').value;
        
        // Validation
        if (password.length < 6) {
            showNotification('Password must be at least 6 characters', 'error');
            return;
        }
        
        if (password !== confirm) {
            showNotification('Passwords do not match', 'error');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.email === email)) {
            showNotification('Email already registered', 'error');
            return;
        }
        
        // Create new user
        const user = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };
        
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        
        showNotification('Account created successfully! Please login.', 'success');
        
        // Switch to login form
        signupForm.classList.remove('active');
        signupForm.reset();
        loginForm.classList.add('active');
        loginForm.reset();
    });
}

// Handle Login
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Check credentials
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Save logged in user
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            showNotification(`Welcome back, ${user.name}!`, 'success');
            authModal.classList.remove('active');
            loginForm.reset();
            
            // Update UI
            updateAuthUI();
        } else {
            showNotification('Invalid email or password', 'error');
        }
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        localStorage.removeItem('currentUser');
        showNotification('Logged out successfully', 'success');
        
        userProfileMenu.classList.remove('active');
        updateAuthUI();
    });
}

// Profile toggle
if (profileAvatar) {
    profileAvatar.addEventListener('click', () => {
        userProfileMenu.classList.toggle('active');
    });
}

// Close profile menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.profile-toggle') && !e.target.closest('.user-profile-menu')) {
        userProfileMenu.classList.remove('active');
    }
});

// Update UI based on login status
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.querySelector('.login-btn-nav');
    const profileToggleEl = document.getElementById('profileToggle');
    
    if (currentUser) {
        // Show profile, hide login button
        if (loginBtn) loginBtn.classList.add('hidden');
        if (profileToggleEl) profileToggleEl.classList.remove('hidden');
        
        // Update avatar and user info
        const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const profileAvatarEl = document.getElementById('profileAvatar');
        const userAvatarEl = document.getElementById('userAvatar');
        const userNameEl = document.getElementById('userName');
        const userEmailEl = document.getElementById('userEmail');
        
        if (profileAvatarEl) profileAvatarEl.textContent = initials;
        if (userAvatarEl) userAvatarEl.textContent = initials;
        if (userNameEl) userNameEl.textContent = currentUser.name;
        if (userEmailEl) userEmailEl.textContent = currentUser.email;
    } else {
        // Show login button, hide profile
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (profileToggleEl) profileToggleEl.classList.add('hidden');
        if (userProfileMenu) userProfileMenu.classList.remove('active');
    }
}

// Check if user is already logged in on page load
window.addEventListener('load', () => {
    updateAuthUI();
});



const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.style.gap = navMenu.classList.contains('active') ? '8px' : '6px';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
    });
});

// Highlight nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        // Success message
        showNotification('Message sent successfully! Thank you for contacting.', 'success');
        contactForm.reset();
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SMOOTH PARALLAX ON SCROLL
// ============================================

const shapes = document.querySelectorAll('.animated-shape');

window.addEventListener('scroll', () => {
    shapes.forEach((shape, index) => {
        const offset = window.scrollY * (0.5 + index * 0.1);
        shape.style.transform = `translateY(${offset}px)`;
    });
});

// ============================================
// CTA BUTTON SCROLL
// ============================================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    });
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
            left: ${x}px;
            top: ${y}px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

// ============================================
// PAGE LOAD COMPLETE
// ============================================

console.log('ROHAN WEB DESIGNER - Website loaded successfully!');
