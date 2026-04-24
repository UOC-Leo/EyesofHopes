// ==================== NAVIGATION ==================== 

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
    }
});

// ==================== GALLERY/SLIDESHOW ==================== 

const slideIndex = {};

// Initialize slides
document.querySelectorAll('.gallery-section').forEach(section => {
    const sectionId = section.id;
    slideIndex[sectionId] = 1;
    showSlide(1, sectionId);
});

function changeSlide(n, sectionId) {
    showSlide(slideIndex[sectionId] += n, sectionId);
}

function currentSlide(n, sectionId) {
    showSlide(slideIndex[sectionId] = n, sectionId);
}

function showSlide(n, sectionId) {
    const section = document.getElementById(sectionId);
    const slides = section.getElementsByClassName('slide');
    const dots = section.parentElement.getElementsByClassName('dot');
    
    if (n > slides.length) {
        slideIndex[sectionId] = 1;
    }
    if (n < 1) {
        slideIndex[sectionId] = slides.length;
    }
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
    }
    
    // Remove active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }
    
    // Show current slide and activate corresponding dot
    if (slides[slideIndex[sectionId] - 1]) {
        slides[slideIndex[sectionId] - 1].classList.add('active');
    }
    if (dots[slideIndex[sectionId] - 1]) {
        dots[slideIndex[sectionId] - 1].classList.add('active');
    }
}

// ==================== GALLERY TABS ==================== 

function switchGallery(galleryId) {
    // Hide all gallery sections
    document.querySelectorAll('.gallery-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.gallery-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected gallery section
    document.getElementById(galleryId).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Reset slideshow
    const activeSection = document.getElementById(galleryId);
    const slideshow = activeSection.querySelector('.slideshow-container');
    if (slideshow) {
        showSlide(slideIndex[galleryId], galleryId);
    }
}

// ==================== EDUCATION CARDS TOGGLE ==================== 

function toggleEducationContent(card) {
    // Close other cards
    document.querySelectorAll('.education-card').forEach(c => {
        if (c !== card) {
            c.classList.remove('expanded');
        }
    });
    
    // Toggle current card
    card.classList.toggle('expanded');
}

// Close expanded cards when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.education-card')) {
        document.querySelectorAll('.education-card').forEach(card => {
            card.classList.remove('expanded');
        });
    }
});

// ==================== RESOURCE DOWNLOAD ==================== 

function downloadResource(filename) {
    const link = document.createElement('a');
    link.href = 'assets/resources/' + filename;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ==================== SMOOTH SCROLLING ==================== 

// Smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==================== SCROLL TO TOP BUTTON ==================== 

// Create and add scroll-to-top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
    color: white;
    border: none;
    padding: 15px 15px;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    z-index: 99;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 4px 15px rgba(0, 102, 204, 0.4);
    font-size: 24px;
    font-weight: bold;
    width: 50px;
    height: 50px;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;
});

scrollTopBtn.addEventListener('mouseover', () => {
    scrollTopBtn.style.transform = 'scale(1.15) rotate(10deg)';
    scrollTopBtn.style.boxShadow = '0 8px 25px rgba(0, 102, 204, 0.6)';
});

scrollTopBtn.addEventListener('mouseout', () => {
    scrollTopBtn.style.transform = 'scale(1) rotate(0deg)';
    scrollTopBtn.style.boxShadow = '0 4px 15px rgba(0, 102, 204, 0.4)';
});

// ==================== ENHANCED HOVER EFFECTS ==================== 

// Add enhanced hover effects to all interactive cards
document.querySelectorAll('.phase-card, .blog-card, .resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
});

// Add interactive effects to education cards
document.querySelectorAll('.education-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1.3) rotate(15deg)';
            icon.style.transition = 'all 0.4s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ==================== SECTION ENTRANCE ANIMATIONS ==================== 

// Add entrance animations to sections when they come into view
const sectionObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.8s ease-out forwards';
            sectionObserver.unobserve(entry.target);
        }
    });
}, sectionObserverOptions);

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ==================== KEYBOARD NAVIGATION ==================== 

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
    }
});

// Tab key for gallery navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        const activeGallery = document.querySelector('.gallery-section.active');
        if (activeGallery) {
            changeSlide(1, activeGallery.id);
        }
    } else if (e.key === 'ArrowLeft') {
        const activeGallery = document.querySelector('.gallery-section.active');
        if (activeGallery) {
            changeSlide(-1, activeGallery.id);
        }
    }
});

// ==================== FORM-LIKE INTERACTIONS ==================== 

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== LOADER ==================== 

// Show loader while page loads, then hide it
window.addEventListener('load', () => {
    // Page fully loaded
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});

// ==================== LOCAL STORAGE FOR USER PREFERENCES ==================== 

// Save scroll position on unload
window.addEventListener('beforeunload', () => {
    localStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position on load
window.addEventListener('load', () => {
    const scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        localStorage.removeItem('scrollPosition');
    }
});

// ==================== PRINT FUNCTIONALITY ==================== 

function printPage() {
    window.print();
}

// ==================== SEARCH FUNCTIONALITY (Optional) ==================== 

// Simple search across page content
function searchContent(query) {
    const sections = document.querySelectorAll('section');
    let results = [];
    
    sections.forEach(section => {
        const text = section.textContent.toLowerCase();
        if (text.includes(query.toLowerCase())) {
            results.push({
                section: section.id,
                title: section.querySelector('h2')?.textContent || section.id
            });
        }
    });
    
    return results;
}

// ==================== STATS COUNTER ANIMATION ==================== 

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 50;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = originalText;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Animate counters when section comes into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact');
if (impactSection) {
    counterObserver.observe(impactSection);
}

// ==================== RESPONSIVE IMAGE HANDLING ==================== 

// Add support for lazy loading images
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        // Image is already cached
    } else {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in';
    }
});

// ==================== UTILITY FUNCTIONS ==================== 

// Get current section from URL hash
function getCurrentSection() {
    return window.location.hash.slice(1) || 'home';
}

// Set active section from URL hash
window.addEventListener('hashchange', () => {
    const section = getCurrentSection();
    document.querySelectorAll('section').forEach(sec => {
        sec.style.opacity = sec.id === section ? '1' : '0.5';
    });
});

// Mobile viewport height fix for address bar
function setVH() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
}

setVH();
window.addEventListener('resize', setVH);

// ==================== PAGE INITIALIZATION ==================== 

// Initialize page on load
document.addEventListener('DOMContentLoaded', () => {
    // Log initialization
    console.log('Eyes of Hopes website initialized');
    
    // Set initial gallery
    const firstGalleryBtn = document.querySelector('.gallery-tab-btn');
    if (firstGalleryBtn) {
        firstGalleryBtn.classList.add('active');
    }
    
    // Verify all required elements are present
    const requiredElements = [
        '.navbar',
        '#home',
        '#about',
        '#education',
        '#gallery',
        '#impact',
        '#resources',
        '.footer'
    ];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Missing element: ${selector}`);
        }
    });
});

// ==================== ERROR HANDLING ==================== 

// Handle image loading errors
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        // Create a placeholder
        this.style.border = '2px solid #ddd';
        this.style.padding = '20px';
    });
});

// ==================== ACCESSIBILITY ==================== 

// Skip to main content link
const skipLink = document.createElement('a');
skipLink.href = '#home';
skipLink.className = 'skip-link';
skipLink.textContent = 'Skip to main content';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: linear-gradient(135deg, #0066cc 0%, #0052a3 100%);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
    transition: all 0.3s ease;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ==================== CONTACT FORM (if needed) ==================== 

// Add contact form submission handler
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ==================== CUSTOM EVENTS ==================== 

// Dispatch custom events for tracking
const events = {
    sectionViewed: new CustomEvent('sectionViewed'),
    imageViewed: new CustomEvent('imageViewed'),
    resourceDownloaded: new CustomEvent('resourceDownloaded')
};

// Log when sections come into view
document.querySelectorAll('section').forEach(section => {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(`Viewed section: ${entry.target.id}`);
                document.dispatchEvent(events.sectionViewed);
            }
        });
    });
    sectionObserver.observe(section);
});
