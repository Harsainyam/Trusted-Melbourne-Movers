
// Mobile menu toggle

const mobileToggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const body = document.body;

// Toggle mobile menu
if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
}

// Mobile dropdown toggles - click on whole bar
const mobileMenuItems = document.querySelectorAll('.mobile-menu-item.has-submenu');
mobileMenuItems.forEach(function (item) {
    const wrapper = item.querySelector('.mobile-link-wrapper');

    if (wrapper) {
        wrapper.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Close other dropdowns
            mobileMenuItems.forEach(function (otherItem) {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current dropdown
            item.classList.toggle('active');
        });
    }
});

// Close mobile menu when clicking regular links (not dropdowns)
const regularLinks = document.querySelectorAll('.mobile-menu-item:not(.has-submenu) .mobile-link');
regularLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (mobileToggle && mobileMenu) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Close mobile menu when clicking dropdown links
const dropdownLinks = document.querySelectorAll('.mobile-dropdown-link, .mobile-phone-btn, .mobile-quote-btn');
dropdownLinks.forEach(function (link) {
    link.addEventListener('click', function () {
        if (mobileToggle && mobileMenu) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
});

// Close mobile menu on window resize
window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
        if (mobileToggle && mobileMenu) {
            mobileToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');

            // Close all dropdowns
            mobileMenuItems.forEach(function (item) {
                item.classList.remove('active');
            });
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for your quote request! We will contact you soon.');
    this.reset();
});
document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select-trigger');
    const options = select.querySelectorAll('.custom-option');

    trigger.addEventListener('click', () => {
        select.classList.toggle('open');
        // Close other dropdowns
        document.querySelectorAll('.custom-select').forEach(other => {
            if (other !== select) other.classList.remove('open');
        });
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            trigger.querySelector('span').textContent = option.textContent;
            trigger.classList.add('selected');
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            select.classList.remove('open');
        });
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-select')) {
        document.querySelectorAll('.custom-select').forEach(select => {
            select.classList.remove('open');
        });
    }
});


// ResidentalMOves Page JS
//
//
//
//
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! We will contact you shortly with your free estimate.');
    this.reset();
});

//ApartmentMoves Page JS
//
//
// FAQ Toggle
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const isActive = faqItem.classList.contains('active');

                // Close all FAQs
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Open clicked FAQ if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you! We will contact you shortly with your free estimate.');
            this.reset();
        });