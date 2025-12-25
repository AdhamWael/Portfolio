const slides = [
    {
        title: ['WEB', 'DEVEL', 'OPER'],
        description: "A freelance web developer based in Egypt. Specializing in modern frontend technologies and creative coding, I build immersive and performant web experiences.",
        gradient: "linear-gradient(180deg, #ffffff 0%, #f0f4e1 100%)",
        meshColors: "radial-gradient(circle at 70% 30%, rgba(196, 214, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
        image: "download.png"
    },
    {
        title: ['Pro', 'blem', 'SOLVER'],
        description: "Crafting intuitive and accessible user interfaces. I focus on user-centered design principles to create digital products that are easy to use.",
        gradient: "linear-gradient(180deg, #ffffff 0%, #fff0f0 100%)",
        meshColors: "radial-gradient(circle at 70% 30%, rgba(255, 107, 107, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
        image: "download.png"
    },
    {
        title: ['CREA', 'TIVE', 'CODER'],
        description: "Pushing the boundaries to create unique web experiences that are both functional and immersive. Every pixel is crafted with intent.",
        gradient: "linear-gradient(180deg, #ffffff 0%, #f0fafa 100%)",
        meshColors: "radial-gradient(circle at 70% 30%, rgba(78, 205, 196, 0.15) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(0, 0, 0, 0.05) 0%, transparent 50%)",
        image: "download.png"
    }
];

let currentIndex = 0;
const heroTitle = document.getElementById('heroTitle');
const heroDescription = document.getElementById('heroDescription');
const indicators = document.querySelectorAll('.indicator');
const body = document.body;

function updateSlide(index) {
    const slide = slides[index];

    // Update Title
    const lines = heroTitle.querySelectorAll('.line');
    lines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
        setTimeout(() => {
            line.textContent = slide.title[i] || '';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 300 + (i * 100));
    });

    // Update Description
    heroDescription.style.opacity = '0';
    setTimeout(() => {
        heroDescription.textContent = slide.description;
        heroDescription.style.opacity = '1';
    }, 300);

    // Update Image
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            heroImage.src = slide.image;
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1)';
        }, 300);
    }

    // Update Background Gradients
    body.style.background = slide.gradient;

    // Update Mesh Gradient Colors
    const mesh = document.querySelector('.mesh-gradient');
    if (mesh) {
        mesh.style.background = slide.meshColors;
    }

    // Update Indicators
    indicators.forEach(ind => ind.classList.remove('active'));
    if (indicators[index]) indicators[index].classList.add('active');

    currentIndex = index;
}

// Initial update to apply slide 0 gradient and state
updateSlide(currentIndex);

// Auto-play
let interval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    updateSlide(nextIndex);
}, 5000);

// Click Handlers
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        clearInterval(interval); // Stop auto-play on interaction
        const index = parseInt(indicator.dataset.index);
        updateSlide(index);

        // Restart auto-play after 10s
        interval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            updateSlide(nextIndex);
        }, 10000);
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(element => {
    observer.observe(element);
});

// Hero Description Card Tilt Effect
const heroCard = document.querySelector('.hero-description');
if (heroCard) {
    window.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        const angleX = (e.clientY - cardY) / 30;
        const angleY = (cardX - e.clientX) / 30;

        heroCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
    });

    window.addEventListener('mouseleave', () => {
        heroCard.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
}

// Hero Background Mouse Interaction
const meshGradient = document.querySelector('.mesh-gradient');
if (meshGradient) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;

        meshGradient.style.transform = `translate(${x}px, ${y}px) rotate(${x / 2}deg) scale(1.3)`;
    });
}

// Project Modal Logic
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalImage1 = document.getElementById('modalImage1');
const modalDescription = document.getElementById('modalDescription');
const modalImage2 = document.getElementById('modalImage2'); // Correct ID
const modalLinkBtn = document.getElementById('modalLinkBtn'); // Updated to match new ID
const modalClientText = document.getElementById('modalClientText');
const modalRoleText = document.getElementById('modalRoleText');
const modalChallengeText = document.getElementById('modalChallengeText');
const modalSolutionText = document.getElementById('modalSolutionText');
const closeModalBtn = document.querySelector('.close-button'); // Select by class

const projectData = {
    'E-Commerce Platform': {
        description: "A premium e-commerce platform built for high-scale fashion brands. Includes localized payments, dynamic inventory, and a custom design system.",
        image1: "Wide.jpg",
        client: "Adham Wael",
        role: "Lead Developer<br>UX Strategist",
        link: "https://google.com",
        challenge: "Developing a system that handles thousands of concurrent users while maintaining a 99+ lighthouse performance score across all device types.",
        solution: "Utilized Next.js for server-side rendering and GSAP for high-end micro-interactions that don't compromise core web vitals.",
        image2: "darris.jpg"
    },
    'Real Estate Website': {
        description: "A modern property listing platform with interactive maps and high-fidelity property walkthroughs.",
        image1: "darris.jpg",
        client: "Luxe Realty",
        role: "Frontend Architect",
        link: "#",
        challenge: "Integrating complex map APIs with custom-styled markers while ensuring the UI remains minimalist and fast.",
        solution: "Used Mapbox GL JS for the mapping engine and custom React hooks for state management of property filters.",
        image2: "Wide.jpg"
    },
    'Interactive Learning Website': {
        description: "An educational platform focused on immersive learning experiences through interactive storytelling and gamified progress tracking.",
        image1: "Wide.jpg",
        client: "EduTech Global",
        role: "Creative Developer",
        link: "#",
        challenge: "Managing complex state transitions between learning modules while keeping the visual experience cohesive and engaging.",
        solution: "Implemented a robust animation pipeline using GSAP timelines and a modular component architecture based on Next.js.",
        image2: "darris.jpg"
    }
};

let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
let velocityX = 0;
let velocityY = 0;

const projectHoverContainer = document.getElementById('projectHoverContainer');
const projectHoverImage = document.getElementById('projectHoverImage');

document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const imageSrc = item.dataset.image;
        if (imageSrc) {
            projectHoverImage.src = imageSrc;
            projectHoverContainer.classList.add('active');
        }
    });

    item.addEventListener('mouseleave', () => {
        projectHoverContainer.classList.remove('active');
    });

    item.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        velocityX = targetX - lastMouseX;
        velocityY = targetY - lastMouseY;

        lastMouseX = targetX;
        lastMouseY = targetY;
    });

    item.addEventListener('click', () => {
        // Normalize title by removing extra spaces and newlines from <br> tags
        const title = item.querySelector('.project-title').textContent.replace(/\s+/g, ' ').trim();
        const category = item.querySelector('.project-category').textContent.trim();
        const data = projectData[title];

        modalTitle.textContent = title;
        modalCategory.textContent = category;
        modalImage1.src = item.dataset.image; // Use data attribute or fallback

        if (data) {
            modalDescription.textContent = data.description;
            if (data.image1) {
                modalImage1.src = data.image1;
            }

            // Populate details
            modalClientText.textContent = data.client;
            modalRoleText.innerHTML = data.role; // Use innerHTML for <br>
            if (modalLinkBtn) modalLinkBtn.href = data.link;
            modalChallengeText.textContent = data.challenge;
            modalSolutionText.textContent = data.solution;

            if (data.image2) {
                modalImage2.src = data.image2;
                modalImage2.style.display = 'block';
            } else {
                modalImage2.style.display = 'none';
            }

        } else {
            modalDescription.textContent = "Project details coming soon.";
        }

        modal.classList.add('active');
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) modalContent.scrollTop = 0; // Always start at the top
        body.style.overflow = 'hidden'; // Prevent background scrolling

        // Update URL Hash for "nested page" behavior
        const projectSlug = title.toLowerCase().replace(/\s+/g, '-');
        history.pushState({ project: title }, '', `#project-${projectSlug}`);

        // Reveal modal elements with a slight delay
        const revealElements = modal.querySelectorAll('.modal-title, .modal-category, .modal-description, .modal-sidebar, .modal-main');
        revealElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 400 + (i * 100));
        });
    });
});

// Helper function to open project by title
function openProject(title) {
    const items = document.querySelectorAll('.project-item');
    let targetItem = null;
    items.forEach(item => {
        if (item.querySelector('.project-title').textContent.replace(/\s+/g, ' ').trim() === title) {
            targetItem = item;
        }
    });

    if (targetItem) {
        targetItem.click();
    }
}

// Handle browser back button and initial load for project hashes
window.addEventListener('popstate', (e) => {
    if (modal.classList.contains('active')) {
        modal.classList.remove('active');
        body.style.overflow = '';
    }

    // If hash contains a project, open it
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
        const slug = hash.replace('#project-', '');
        // Find matching project in data
        const title = Object.keys(projectData).find(key =>
            key.toLowerCase().replace(/\s+/g, '-') === slug
        );
        if (title) openProject(title);
    }
});

// Check on load
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
        const slug = hash.replace('#project-', '');
        const title = Object.keys(projectData).find(key =>
            key.toLowerCase().replace(/\s+/g, '-') === slug
        );
        if (title) setTimeout(() => openProject(title), 500); // Small delay for animations
    }
});

// Smooth Lerp for Follower
function lerpFollower() {
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;

    const skewX = velocityX * 0.1;
    const skewY = velocityY * 0.1;
    const rotation = velocityX * 0.05;

    // We only update the position via JS, CSS handles the rest
    projectHoverContainer.style.left = `${currentX}px`;
    projectHoverContainer.style.top = `${currentY}px`;

    // Optional: Add a subtle tilt/rotation for flavor
    projectHoverImage.style.transform = `scale(1) rotate(${rotation * 0.5}deg)`;

    // Decelerate velocity
    velocityX *= 0.9;
    velocityY *= 0.9;

    requestAnimationFrame(lerpFollower);
}
lerpFollower();

// Close modal on click outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        body.style.overflow = '';
        history.pushState('', '', window.location.pathname + window.location.search);
    }
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        body.style.overflow = '';
        history.pushState('', '', window.location.pathname + window.location.search);
    });
}

const closeProjectBtn = document.querySelector('.close-project-btn');
if (closeProjectBtn) {
    closeProjectBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        body.style.overflow = '';
        history.pushState('', '', window.location.pathname + window.location.search);
    });
}

// Mobile Menu Variables
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-link');

// Advanced Navbar Behavior
const header = document.querySelector('.site-header');
let lastScrollY = window.scrollY;
const progressBar = document.querySelector('.header-progress-bar');
const navTimeElements = document.querySelectorAll('.nav-time');

window.addEventListener('scroll', () => {
    // Toggle glass pill state
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = scrolled + "%";

    lastScrollY = window.scrollY;
});

// Sync Nav Clock with Footer Clock
function updateNavTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    navTimeElements.forEach(el => el.textContent = timeStr);
}
setInterval(updateNavTime, 1000);
updateNavTime();

// Magnetic Effect for Nav Links
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
    wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        wrap.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    wrap.addEventListener('mouseleave', () => {
        wrap.style.transform = `translate(0px, 0px)`;
    });
});

// Section-Aware Navbar Theme Switching
const themeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            header.classList.add('theme-dark');
        } else {
            header.classList.remove('theme-dark');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "-20% 0px -80% 0px" // Trigger as it enters the top 20%
});

// Targets for dark theme
const darkSections = document.querySelectorAll('.site-footer, [data-theme="dark"]');
darkSections.forEach(section => themeObserver.observe(section));

// Mobile Toggle Execution
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        mobileNavToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('nav-open');
        body.style.overflow = !isExpanded ? 'hidden' : '';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mobileNavToggle) {
            mobileNavToggle.classList.remove('active');
            mobileNavToggle.setAttribute('aria-expanded', 'false');
        }
        mainNav.classList.remove('active');
        body.classList.remove('nav-open');
        body.style.overflow = '';
    });
});

// Estimate Calculator Logic
const estimateForm = document.getElementById('estimateForm');
const projectType = document.getElementById('projectType');
const pageCount = document.getElementById('pageCount');
const pageValue = document.getElementById('pageValue');
const addons = document.querySelectorAll('.addon');
const totalCostElement = document.getElementById('totalCost');

function calculateEstimate() {
    let total = parseInt(projectType.value);

    // Page count cost (first page included in base price usually, but let's add extra pages)
    // Assuming base price includes 1 page.
    let pages = parseInt(pageCount.value);
    if (pages > 1) {
        total += (pages - 1) * 100;
    }

    // Addons
    addons.forEach(addon => {
        if (addon.checked) {
            total += parseInt(addon.value);
        }
    });

    // Format currency
    totalCostElement.textContent = '$' + total.toLocaleString();
}

if (estimateForm) {
    // Event Listeners
    projectType.addEventListener('change', calculateEstimate);

    pageCount.addEventListener('input', () => {
        pageValue.textContent = pageCount.value + (pageCount.value == 1 ? ' Page' : ' Pages');
        calculateEstimate();
    });

    addons.forEach(addon => {
        addon.addEventListener('change', calculateEstimate);
    });

    // Initial calculation
    calculateEstimate();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);

        // Auto-close modal if clicking a nav link
        const currentModal = document.getElementById('projectModal');
        if (currentModal && currentModal.classList.contains('active')) {
            currentModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (targetId === "" || targetId === "home" || this.classList.contains('back-to-top')) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});



// Explicit Back to Top Listener
document.querySelectorAll('.back-to-top').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        // Auto-close modal if clicking from inside footer
        const currentModal = document.getElementById('projectModal');
        if (currentModal && currentModal.classList.contains('active')) {
            currentModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

console.log('Eldeeb Portfolio Loaded with Carousel, Animations, Modal, and Estimate Calculator');

// Services Section: Toggle details on click for mobile
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', (e) => {
        // Toggle 'active' class on click
        // Only close others if we want it to behave like a single-expansion accordion
        const isActive = item.classList.contains('active');

        document.querySelectorAll('.service-item').forEach(other => {
            other.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Footer Clock
function updateClock() {
    const clockElement = document.querySelector('.clock-time');
    if (!clockElement) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call

// Hide page loader when window finishes loading (ensure visible at least 2s)
const _loaderShownAt = Date.now();

window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    const minVisible = 2000; // minimum visible time in ms
    const elapsed = Date.now() - _loaderShownAt;
    const remaining = Math.max(0, minVisible - elapsed);

    // After ensuring minimum visible time, animate loader into the navbar logo
    setTimeout(() => {
        const logo = document.querySelector('.logo-link');
        const loaderInner = loader.querySelector('.loader-inner');
        const loaderText = loader.querySelector('.loader-text');

        if (!logo || !loaderInner || !loaderText) {
            // fallback: just fade out
            loader.classList.add('page-loader--hide');
            setTimeout(() => {
                if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
            }, 800);
            return;
        }

        // Get positions
        const liRect = loaderInner.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();

        // Compute translation to logo center
        const deltaX = (logoRect.left + logoRect.width / 2) - (liRect.left + liRect.width / 2);
        const deltaY = (logoRect.top + logoRect.height / 2) - (liRect.top + liRect.height / 2);

        // Get computed styles from the logo so we can morph the text properties
        const logoStyle = getComputedStyle(logo);
        const logoFontSize = logoStyle.fontSize || '16px';
        const logoColor = logoStyle.color || '#000';
        const logoLetterSpacing = logoStyle.letterSpacing || 'normal';
        const logoFontWeight = logoStyle.fontWeight || '700';

        // Hide the logo visually but keep its layout so the loader can replace it seamlessly
        logo.style.visibility = 'hidden';

        // Hide the progress bar during the transform
        const bar = loader.querySelector('.loader-bar');
        if (bar) bar.style.opacity = '0';

        // Move loaderInner to fixed positioning at its current viewport position
        loaderInner.style.position = 'fixed';
        loaderInner.style.left = liRect.left + 'px';
        loaderInner.style.top = liRect.top + 'px';
        loaderInner.style.width = liRect.width + 'px';
        loaderInner.style.height = liRect.height + 'px';
        loaderInner.style.margin = '0';
        loaderInner.style.zIndex = 100000;
        loaderInner.style.transformOrigin = 'center center';

        // Prepare transitions on loader inner and text
        loaderInner.style.transition = 'transform 700ms cubic-bezier(.2,.9,.3,1), opacity 300ms ease';
        loaderText.style.transition = 'font-size 700ms cubic-bezier(.2,.9,.3,1), color 700ms ease, letter-spacing 700ms ease, font-weight 700ms ease';

        // Force reflow
        void loaderInner.offsetWidth;

        // Compute scale ratio using font-size
        const loaderFontSize = parseFloat(getComputedStyle(loaderText).fontSize || '24');
        const logoFontSizeNum = parseFloat(logoFontSize.toString().replace('px', '')) || 16;
        const scale = Math.max(0.3, logoFontSizeNum / loaderFontSize);

        // Apply transform that moves and scales the loader-inner to the logo position
        loaderInner.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${scale})`;
        loaderInner.style.opacity = '0.98';

        // Animate text properties to match the logo style (font-size, color, letter-spacing, weight)
        loaderText.style.fontSize = logoFontSize;
        loaderText.style.color = logoColor;
        loaderText.style.letterSpacing = logoLetterSpacing;
        loaderText.style.fontWeight = logoFontWeight;

        // Single cleanup function to avoid duplication
        let cleanupExecuted = false;
        const cleanup = () => {
            if (cleanupExecuted) return;
            cleanupExecuted = true;

            // Show the real logo
            logo.style.visibility = 'visible';
            // Add a small activation class for a subtle highlight
            logo.classList.add('logo-activated');
            // Fade out and remove loader
            loader.classList.add('page-loader--hide');
            setTimeout(() => {
                if (loader && loader.parentNode) {
                    loader.parentNode.removeChild(loader);
                }
            }, 600);
        };

        // Listen for transform transition end on loaderInner
        loaderInner.addEventListener('transitionend', (ev) => {
            if (ev.propertyName === 'transform') {
                setTimeout(cleanup, 100);
            }
        });

        // Fallback in case transitionend doesn't fire
        setTimeout(cleanup, 1500);
    }, remaining);
});


// Contact Form Submission (Web3Forms AJAX)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        formStatus.style.display = 'block';
        formStatus.textContent = 'Please wait...';
        formStatus.className = 'status-pending';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status == 200) {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.className = 'status-success';
                    contactForm.reset();
                    submitBtn.classList.add('success');
                    submitBtn.innerHTML = '<span>Success</span><i class="fas fa-check"></i>';
                } else {
                    console.log(response);
                    formStatus.textContent = jsonResponse.message;
                    formStatus.className = 'status-error';
                    submitBtn.innerHTML = originalBtnText;
                }
            })
            .catch(error => {
                console.log(error);
                formStatus.textContent = "Something went wrong!";
                formStatus.className = 'status-error';
                submitBtn.innerHTML = originalBtnText;
            })
            .then(function () {
                submitBtn.disabled = false;
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    if (submitBtn.classList.contains('success')) {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.classList.remove('success');
                    }
                }, 5000);
            });
    });
}
