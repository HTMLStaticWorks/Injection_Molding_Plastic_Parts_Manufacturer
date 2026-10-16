// Global Theme & RTL Toggle Functions (Accessible across mobile, tablet, and desktop)
window.applyTheme = function(isDark) {
    const htmlElement = document.documentElement;
    if (isDark) {
        htmlElement.classList.add('dark');
        try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
        htmlElement.classList.remove('dark');
        try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
};

window.toggleTheme = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const htmlElement = document.documentElement;
    const isDark = htmlElement.classList.contains('dark');
    window.applyTheme(!isDark);
};

window.applyDirection = function(dir) {
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('dir', dir);
    try { localStorage.setItem('dir', dir); } catch (e) {}
};

window.toggleRTL = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const htmlElement = document.documentElement;
    const currentDir = htmlElement.getAttribute('dir') || 'ltr';
    window.applyDirection(currentDir === 'rtl' ? 'ltr' : 'rtl');
};

// Main Initialization Function
function initSiteInteractions() {
    const htmlElement = document.documentElement;

    // 1. Initialize theme from storage or system preference
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            window.applyTheme(true);
        } else {
            window.applyTheme(false);
        }
    } catch (e) {
        // Fallback to current HTML class
        if (htmlElement.classList.contains('dark')) {
            window.applyTheme(true);
        }
    }

    // 2. Initialize RTL direction
    try {
        const savedDir = localStorage.getItem('dir');
        if (savedDir) {
            window.applyDirection(savedDir);
        }
    } catch (e) {}

    // 3. Attach listeners to all theme toggle buttons (header, mobile, tablet, drawer)
    const allThemeToggleBtns = document.querySelectorAll('#theme-toggle, #mobile-theme-toggle, .theme-toggle-btn, [data-theme-toggle]');
    allThemeToggleBtns.forEach(btn => {
        // Bind both click and touchstart for instant response on mobile/tablet
        btn.addEventListener('click', (e) => {
            window.toggleTheme(e);
        });
    });

    // 4. Attach listeners to all RTL toggle buttons
    const allRtlToggleBtns = document.querySelectorAll('#rtl-toggle, #mobile-rtl-toggle, .rtl-toggle-btn, [data-rtl-toggle]');
    allRtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            window.toggleRTL(e);
        });
    });

    // 5. Mobile Drawer Menu & Overlay Controls
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');

    function openMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('invisible', 'pointer-events-none');
        // Force reflow for smooth CSS transitions
        void mobileMenu.offsetWidth;
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0', 'pointer-events-auto');
        document.body.classList.add('overflow-hidden');
    }

    function closeMobileMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.add('translate-x-full', 'pointer-events-none');
        mobileMenu.classList.remove('translate-x-0', 'pointer-events-auto');
        document.body.classList.remove('overflow-hidden');
        setTimeout(() => {
            if (mobileMenu && mobileMenu.classList.contains('translate-x-full')) {
                mobileMenu.classList.add('invisible');
            }
        }, 300);
    }

    if (mobileMenuBtn && mobileMenu && mobileMenuCloseBtn) {
        // Ensure menu is non-blocking and invisible when closed initially
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.add('invisible', 'pointer-events-none');
        }

        mobileMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMobileMenu();
        });

        mobileMenuCloseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeMobileMenu();
        });

        if (mobileMenuLinks) {
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileMenu();
                });
            });
        }

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
                closeMobileMenu();
            }
        });
    }

    // Sticky Header
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('shadow-md', 'glass-header');
                header.classList.remove('bg-transparent');
            } else {
                header.classList.remove('shadow-md', 'glass-header');
                header.classList.add('bg-transparent');
            }
        });
    }

    // Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
                scrollTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Form Validation (Basic)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Password visibility toggle
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="fas fa-eye-slash"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="fas fa-eye"></i>';
            }
        });
    });

    // Hero Showcase Tab Switcher
    const heroTabButtons = document.querySelectorAll('.hero-tab-btn');
    const heroShowcaseImg = document.getElementById('hero-showcase-img');
    const heroShowcaseTitle = document.getElementById('hero-showcase-title');
    const heroShowcaseTag = document.getElementById('hero-showcase-tag');
    const heroShowcaseBadge = document.getElementById('hero-showcase-badge');

    if (heroTabButtons.length && heroShowcaseImg) {
        heroTabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                heroTabButtons.forEach(b => {
                    b.classList.remove('active', 'bg-accent-500', 'text-white', 'shadow-sm');
                    b.classList.add('text-industrial-300');
                });
                btn.classList.add('active', 'bg-accent-500', 'text-white', 'shadow-sm');
                btn.classList.remove('text-industrial-300');

                const newImg = btn.getAttribute('data-img');
                const newTitle = btn.getAttribute('data-title');
                const newTag = btn.getAttribute('data-tag');
                const newBadge = btn.getAttribute('data-badge');

                heroShowcaseImg.style.opacity = '0.3';
                heroShowcaseImg.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    if (newImg) heroShowcaseImg.src = newImg;
                    if (newTitle && heroShowcaseTitle) heroShowcaseTitle.textContent = newTitle;
                    if (newTag && heroShowcaseTag) heroShowcaseTag.textContent = newTag;
                    if (newBadge && heroShowcaseBadge) heroShowcaseBadge.textContent = newBadge;
                    heroShowcaseImg.style.opacity = '1';
                    heroShowcaseImg.style.transform = 'scale(1)';
                }, 160);
            });
        });
    }

    // Product Components Showcase Filtering
    const productFilterBtns = document.querySelectorAll('.product-filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (productFilterBtns.length && productCards.length) {
        productFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');

                // Active button styling
                productFilterBtns.forEach(b => {
                    b.classList.remove('bg-accent-500', 'text-white', 'shadow-md');
                    b.classList.add('bg-white', 'dark:bg-industrial-800', 'text-industrial-700', 'dark:text-industrial-300', 'border', 'border-gray-200', 'dark:border-industrial-700');
                });
                btn.classList.add('bg-accent-500', 'text-white', 'shadow-md');
                btn.classList.remove('bg-white', 'dark:bg-industrial-800', 'text-industrial-700', 'dark:text-industrial-300', 'border');

                // Filter cards with smooth animation
                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 200);
                    }
                });
            });
        });
    }

    // Blog Categories Tab Switching and Section Navigation
    const blogTabBtns = document.querySelectorAll('.blog-tab-btn');
    const blogArticles = document.querySelectorAll('.blog-article-card');
    const bannerTitle = document.getElementById('banner-title');
    const bannerBadge = document.getElementById('banner-badge');
    const bannerDesc = document.getElementById('banner-desc');
    const bannerIcon = document.getElementById('banner-icon');

    const categoryMeta = {
        'all': {
            title: 'All Manufacturing Articles',
            badge: '9 Articles',
            icon: 'fa-th-large',
            desc: 'Complete library of technical engineering insights covering precision tooling design, polymer science selection, and design for manufacturability (DFM).'
        },
        'mold-design': {
            title: 'Mold Design & Tooling Architecture',
            badge: '3 Articles &bull; Tooling Suite',
            icon: 'fa-drafting-compass',
            desc: 'Core principles of runner design, 3D Moldflow filling analysis, cooling line optimization, cavity transducers, and SPI Class 101 tool steel metallurgy.'
        },
        'material-section': {
            title: 'Material Section & Polymer Science',
            badge: '3 Articles &bull; Resin Portfolio',
            icon: 'fa-atom',
            desc: 'Mechanical performance guidelines, high-heat resin selection (PEEK, Ultem, PPS), volumetric shrinkage calculations, and medical biocompatibility.'
        },
        'dfm-guidelines': {
            title: 'Design for Manufacturability (DFM) Guidelines',
            badge: '3 Articles &bull; Engineering Standards',
            icon: 'fa-ruler-combined',
            desc: 'Critical design rules covering draft angles, wall thickness uniformity, internal corner radii, snap-fits, and knurled insert retention to prevent defects.'
        }
    };

    function switchBlogCategory(category, shouldScroll = false) {
        // Normalize aliases
        if (!category || category === 'all-articles') category = 'all';
        if (category === 'material-selection') category = 'material-section';
        if (!categoryMeta[category]) category = 'all';

        // 1. Update Tab Buttons UI
        blogTabBtns.forEach(btn => {
            const tab = btn.getAttribute('data-tab');
            const alias = btn.getAttribute('data-alias');
            const isMatch = tab === category || alias === category;
            const countBadge = btn.querySelector('.tab-count');

            if (isMatch) {
                btn.classList.add('active', 'bg-accent-500', 'text-white', 'shadow-md');
                btn.classList.remove('bg-white', 'dark:bg-industrial-800', 'text-industrial-700', 'dark:text-industrial-300');
                btn.setAttribute('aria-selected', 'true');
                if (countBadge) {
                    countBadge.className = 'tab-count text-xs px-2 py-0.5 rounded-full bg-white/20 text-white font-mono';
                }
            } else {
                btn.classList.remove('active', 'bg-accent-500', 'text-white', 'shadow-md');
                btn.classList.add('bg-white', 'dark:bg-industrial-800', 'text-industrial-700', 'dark:text-industrial-300');
                btn.setAttribute('aria-selected', 'false');
                if (countBadge) {
                    countBadge.className = 'tab-count text-xs px-2 py-0.5 rounded-full bg-industrial-100 dark:bg-industrial-700 text-industrial-600 dark:text-industrial-300 font-mono';
                }
            }
        });

        // 2. Update Banner Info
        if (bannerTitle && categoryMeta[category]) {
            const meta = categoryMeta[category];
            bannerTitle.textContent = meta.title;
            bannerBadge.innerHTML = meta.badge;
            bannerDesc.textContent = meta.desc;
            if (bannerIcon) {
                bannerIcon.className = `fas ${meta.icon}`;
            }
        }

        // 3. Filter Articles with smooth transition
        blogArticles.forEach(card => {
            const cardCat = card.getAttribute('data-category');
            const matches = category === 'all' || cardCat === category;

            if (matches) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, 40);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px) scale(0.97)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 200);
            }
        });

        // 4. Smooth scroll to content area if user triggered
        if (shouldScroll) {
            const contentArea = document.getElementById('blog-content-area');
            if (contentArea) {
                const navOffset = 90;
                const elementPosition = contentArea.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: elementPosition - navOffset,
                    behavior: 'smooth'
                });
            }
        }
    }

    if (blogTabBtns.length) {
        blogTabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = btn.getAttribute('data-tab');
                switchBlogCategory(tab, true);
                if (history.pushState) {
                    history.pushState(null, null, `#${tab}`);
                } else {
                    location.hash = `#${tab}`;
                }
            });
        });

        // Listen for clicks on card badges with [data-filter-trigger]
        const filterTriggers = document.querySelectorAll('[data-filter-trigger]');
        filterTriggers.forEach(trig => {
            trig.addEventListener('click', (e) => {
                e.preventDefault();
                const targetCat = trig.getAttribute('data-filter-trigger');
                switchBlogCategory(targetCat, true);
                if (history.pushState) {
                    history.pushState(null, null, `#${targetCat}`);
                } else {
                    location.hash = `#${targetCat}`;
                }
            });
        });

        // Check URL Hash on initial page load
        const initialHash = window.location.hash.replace('#', '');
        if (initialHash && ['mold-design', 'material-section', 'material-selection', 'dfm-guidelines', 'all', 'all-articles'].includes(initialHash)) {
            switchBlogCategory(initialHash, true);
        }

        // Listen for popstate / hashchange (browser forward/back buttons)
        window.addEventListener('hashchange', () => {
            const currentHash = window.location.hash.replace('#', '');
            if (currentHash) {
                switchBlogCategory(currentHash, false);
            }
        });
    }
}

// Execute immediately if DOM is ready, or listen for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSiteInteractions);
} else {
    initSiteInteractions();
}


