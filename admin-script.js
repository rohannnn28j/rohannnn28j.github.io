// ============================================
// ADMIN DASHBOARD JAVASCRIPT
// ============================================

// ============================================
// AUTHENTICATION
// ============================================

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin123';

const loginForm = document.getElementById('loginForm');
const loginContainer = document.getElementById('loginContainer');
const dashboardContainer = document.getElementById('dashboardContainer');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'flex';
        initializeDashboard();
    } else {
        showNotification('Invalid credentials', 'error');
    }
});

// ============================================
// LOGOUT
// ============================================

document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    loginContainer.style.display = 'flex';
    dashboardContainer.style.display = 'none';
    loginForm.reset();
});

// ============================================
// INITIALIZATION
// ============================================

function initializeDashboard() {
    // Initialize default data in localStorage
    initializeDefaultData();
    
    // Load all data
    loadPortfolio();
    loadServices();
    loadContact();
    loadAbout();
    loadSettings();
    
    // Update stats
    updateStats();
    
    // Setup navigation
    setupNavigation();
    
    // Setup forms
    setupForms();
    
    // Setup modals
    setupModals();
}

function initializeDefaultData() {
    // Portfolio
    if (!localStorage.getItem('portfolio')) {
        const defaultPortfolio = [
            {
                id: 1,
                title: 'E-Commerce Platform',
                description: 'Modern shopping platform with smooth animations',
                image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&h=300&fit=crop'
            },
            {
                id: 2,
                title: 'Creative Agency',
                description: 'Portfolio website with stunning visual effects',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop'
            },
            {
                id: 3,
                title: 'SaaS Dashboard',
                description: 'Responsive dashboard with interactive elements',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop'
            },
            {
                id: 4,
                title: 'Mobile App Landing',
                description: 'Engaging landing page for mobile applications',
                image: 'https://images.unsplash.com/photo-1512941691920-25bda36dc643?w=500&h=300&fit=crop'
            }
        ];
        localStorage.setItem('portfolio', JSON.stringify(defaultPortfolio));
    }
    
    // Services
    if (!localStorage.getItem('services')) {
        const defaultServices = [
            {
                id: 1,
                name: 'Web Development',
                description: 'Building responsive, fast, and scalable websites',
                icon: 'fas fa-laptop-code'
            },
            {
                id: 2,
                name: 'UI/UX Design',
                description: 'Designing intuitive and beautiful user interfaces',
                icon: 'fas fa-paint-brush'
            },
            {
                id: 3,
                name: 'Responsive Design',
                description: 'Creating websites that work on all devices',
                icon: 'fas fa-mobile-alt'
            },
            {
                id: 4,
                name: 'Performance',
                description: 'Optimizing websites for speed and performance',
                icon: 'fas fa-rocket'
            },
            {
                id: 5,
                name: 'SEO Optimization',
                description: 'Improving search engine rankings',
                icon: 'fas fa-search'
            },
            {
                id: 6,
                name: 'Custom Solutions',
                description: 'Tailored web solutions for your business',
                icon: 'fas fa-cogs'
            }
        ];
        localStorage.setItem('services', JSON.stringify(defaultServices));
    }
    
    // Contact
    if (!localStorage.getItem('contact')) {
        const defaultContact = {
            email: 'rohanshahabadkar@gmail.com',
            phone: '+91 9136081633',
            address: 'A004 82 BLDG SHRIPRASTHA COMPLEX\nNALASOPARA WEST, 401203'
        };
        localStorage.setItem('contact', JSON.stringify(defaultContact));
    }
    
    // About
    if (!localStorage.getItem('about')) {
        const defaultAbout = {
            bio: 'ROHAN - Web Designer & Developer',
            text: 'I\'m ROHAN, a passionate web designer and developer with years of experience creating beautiful, functional, and user-friendly websites. My goal is to transform your ideas into digital masterpieces.',
            skills: ['HTML5', 'CSS3 & Animations', 'JavaScript', 'UI/UX Design']
        };
        localStorage.setItem('about', JSON.stringify(defaultAbout));
    }
}

// ============================================
// NAVIGATION
// ============================================

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', (e) => {
            e.preventDefault();
            
            const section = navItem.dataset.section;
            
            // Remove active class from all nav items and sections
            document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
            document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding section
            navItem.classList.add('active');
            document.getElementById(section).classList.add('active');
            
            // Update header title
            document.getElementById('sectionTitle').textContent = 
                navItem.querySelector('span').textContent;
        });
    });
}

// ============================================
// PORTFOLIO MANAGEMENT
// ============================================

let currentPortfolioId = null;

document.getElementById('addPortfolioBtn').addEventListener('click', () => {
    currentPortfolioId = null;
    document.getElementById('portfolioForm').reset();
    document.getElementById('portfolioModal').classList.add('active');
});

function loadPortfolio() {
    const portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    const portfolioList = document.getElementById('portfolioList');
    
    portfolioList.innerHTML = '';
    
    portfolio.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <div class="item-actions">
                <button class="edit-btn" onclick="editPortfolio(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deletePortfolio(${item.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        portfolioList.appendChild(card);
    });
}

function editPortfolio(id) {
    const portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    const item = portfolio.find(p => p.id === id);
    
    if (item) {
        currentPortfolioId = id;
        document.getElementById('portfolioTitle').value = item.title;
        document.getElementById('portfolioDescription').value = item.description;
        document.getElementById('portfolioImage').value = item.image;
        document.getElementById('portfolioModal').classList.add('active');
    }
}

function deletePortfolio(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
        portfolio = portfolio.filter(p => p.id !== id);
        localStorage.setItem('portfolio', JSON.stringify(portfolio));
        loadPortfolio();
        updateStats();
        showNotification('Project deleted successfully');
    }
}

document.getElementById('portfolioForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('portfolioTitle').value;
    const description = document.getElementById('portfolioDescription').value;
    const image = document.getElementById('portfolioImage').value;
    
    let portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    
    if (currentPortfolioId) {
        // Edit existing
        const index = portfolio.findIndex(p => p.id === currentPortfolioId);
        if (index !== -1) {
            portfolio[index] = { id: currentPortfolioId, title, description, image };
        }
    } else {
        // Add new
        const newId = Math.max(...portfolio.map(p => p.id), 0) + 1;
        portfolio.push({ id: newId, title, description, image });
    }
    
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
    loadPortfolio();
    updateStats();
    document.getElementById('portfolioModal').classList.remove('active');
    showNotification('Project saved successfully');
});

// ============================================
// SERVICES MANAGEMENT
// ============================================

let currentServiceId = null;

document.getElementById('addServiceBtn').addEventListener('click', () => {
    currentServiceId = null;
    document.getElementById('serviceForm').reset();
    document.getElementById('serviceModal').classList.add('active');
});

function loadServices() {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    const servicesList = document.getElementById('servicesList');
    
    servicesList.innerHTML = '';
    
    services.forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div style="text-align: center; font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;">
                <i class="${item.icon}"></i>
            </div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="item-actions">
                <button class="edit-btn" onclick="editService(${item.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteService(${item.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        servicesList.appendChild(card);
    });
}

function editService(id) {
    const services = JSON.parse(localStorage.getItem('services')) || [];
    const item = services.find(s => s.id === id);
    
    if (item) {
        currentServiceId = id;
        document.getElementById('serviceName').value = item.name;
        document.getElementById('serviceDescription').value = item.description;
        document.getElementById('serviceIcon').value = item.icon;
        document.getElementById('serviceModal').classList.add('active');
    }
}

function deleteService(id) {
    if (confirm('Are you sure you want to delete this service?')) {
        let services = JSON.parse(localStorage.getItem('services')) || [];
        services = services.filter(s => s.id !== id);
        localStorage.setItem('services', JSON.stringify(services));
        loadServices();
        updateStats();
        showNotification('Service deleted successfully');
    }
}

document.getElementById('serviceForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('serviceName').value;
    const description = document.getElementById('serviceDescription').value;
    const icon = document.getElementById('serviceIcon').value;
    
    let services = JSON.parse(localStorage.getItem('services')) || [];
    
    if (currentServiceId) {
        // Edit existing
        const index = services.findIndex(s => s.id === currentServiceId);
        if (index !== -1) {
            services[index] = { id: currentServiceId, name, description, icon };
        }
    } else {
        // Add new
        const newId = Math.max(...services.map(s => s.id), 0) + 1;
        services.push({ id: newId, name, description, icon });
    }
    
    localStorage.setItem('services', JSON.stringify(services));
    loadServices();
    updateStats();
    document.getElementById('serviceModal').classList.remove('active');
    showNotification('Service saved successfully');
});

// ============================================
// CONTACT MANAGEMENT
// ============================================

function loadContact() {
    const contact = JSON.parse(localStorage.getItem('contact')) || {
        email: 'rohanshahabadkar@gmail.com',
        phone: '+91 9136081633',
        address: 'A004 82 BLDG SHRIPRASTHA COMPLEX\nNALASOPARA WEST, 401203'
    };
    
    document.getElementById('contactEmail').value = contact.email;
    document.getElementById('contactPhone').value = contact.phone;
    document.getElementById('contactAddress').value = contact.address;
}

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const contact = {
        email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        address: document.getElementById('contactAddress').value
    };
    
    localStorage.setItem('contact', JSON.stringify(contact));
    showNotification('Contact information saved successfully');
});

// ============================================
// ABOUT MANAGEMENT
// ============================================

function loadAbout() {
    const about = JSON.parse(localStorage.getItem('about')) || {
        bio: 'ROHAN - Web Designer & Developer',
        text: 'I\'m ROHAN, a passionate web designer and developer.',
        skills: ['HTML5', 'CSS3 & Animations', 'JavaScript', 'UI/UX Design']
    };
    
    document.getElementById('aboutBio').value = about.bio;
    document.getElementById('aboutText').value = about.text;
    
    // Load skills
    const skillsList = document.getElementById('skillsList');
    skillsList.innerHTML = '';
    about.skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <input type="text" value="${skill}" placeholder="Skill name">
            <button type="button" onclick="removeSkill(${index})">Remove</button>
        `;
        skillsList.appendChild(skillItem);
    });
}

document.getElementById('addSkillBtn').addEventListener('click', () => {
    const skillsList = document.getElementById('skillsList');
    const skillItem = document.createElement('div');
    skillItem.className = 'skill-item';
    skillItem.innerHTML = `
        <input type="text" placeholder="New skill">
        <button type="button" onclick="this.parentElement.remove()">Remove</button>
    `;
    skillsList.appendChild(skillItem);
});

function removeSkill(index) {
    document.getElementById('skillsList').children[index].remove();
}

document.getElementById('aboutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const skills = Array.from(document.getElementById('skillsList').querySelectorAll('input'))
        .map(input => input.value)
        .filter(value => value.trim() !== '');
    
    const about = {
        bio: document.getElementById('aboutBio').value,
        text: document.getElementById('aboutText').value,
        skills: skills
    };
    
    localStorage.setItem('about', JSON.stringify(about));
    showNotification('About section saved successfully');
});

// ============================================
// SETTINGS MANAGEMENT
// ============================================

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('settings')) || {
        siteTitle: 'ROHAN WEB DESIGNER',
        siteDescription: 'Creative Web Design Solutions',
        instagram: 'https://www.instagram.com/rohannn28j/',
        facebook: '',
        twitter: ''
    };
    
    document.getElementById('siteTitle').value = settings.siteTitle;
    document.getElementById('siteDescription').value = settings.siteDescription;
    document.getElementById('instagramLink').value = settings.instagram;
    document.getElementById('facebookLink').value = settings.facebook;
    document.getElementById('twitterLink').value = settings.twitter;
}

document.getElementById('settingsForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const settings = {
        siteTitle: document.getElementById('siteTitle').value,
        siteDescription: document.getElementById('siteDescription').value,
        instagram: document.getElementById('instagramLink').value,
        facebook: document.getElementById('facebookLink').value,
        twitter: document.getElementById('twitterLink').value
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
    showNotification('Settings saved successfully');
});

// ============================================
// STATS
// ============================================

function updateStats() {
    const portfolio = JSON.parse(localStorage.getItem('portfolio')) || [];
    const services = JSON.parse(localStorage.getItem('services')) || [];
    
    document.getElementById('portfolioCount').textContent = portfolio.length;
    document.getElementById('servicesCount').textContent = services.length;
}

// ============================================
// MODALS
// ============================================

function setupModals() {
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// ============================================
// FORMS
// ============================================

function setupForms() {
    // Any additional form setup can go here
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.background = type === 'success' ? '#10b981' : '#ef4444';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// CHECK AUTHENTICATION
// ============================================

window.addEventListener('load', () => {
    if (!sessionStorage.getItem('adminLoggedIn')) {
        loginContainer.style.display = 'flex';
        dashboardContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'flex';
        initializeDashboard();
    }
});

console.log('Admin dashboard loaded successfully!');
