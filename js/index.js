
// ===========================
// Mobile Menu Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const siteHeader = document.querySelector('.site-header');
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const navbarMenu = document.querySelector('.site-header .header-nav');

    if (!menuToggleBtn || !navbarMenu) return;

    function toggleMenu() {
        siteHeader.classList.toggle('is-active');
        menuToggleBtn.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');
        const isExpanded = menuToggleBtn.classList.contains('is-active');
        menuToggleBtn.setAttribute('aria-expanded', isExpanded);
    }

    function closeMenu() {
        siteHeader.classList.remove('is-active');
        menuToggleBtn.classList.remove('is-active');
        navbarMenu.classList.remove('is-active');
        menuToggleBtn.setAttribute('aria-expanded', 'false');
    }

    menuToggleBtn.addEventListener('click', toggleMenu);

    document.addEventListener('click', event => {
        if (!menuToggleBtn.contains(event.target) && !navbarMenu.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });

    let resizeTimeout;
    function handleResize() {
        const isDesktop = window.innerWidth > 991;
        if (isDesktop) {
            closeMenu();
            menuToggleBtn.removeEventListener('click', toggleMenu);
        } else {
            menuToggleBtn.removeEventListener('click', toggleMenu);
            menuToggleBtn.addEventListener('click', toggleMenu);
        }
    }

    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 200);
    });

    handleResize();
});

// Accordion
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('is-active');

    document.querySelectorAll('.accordion-item').forEach(el => {
        el.classList.remove('is-active');
    });

    if (!isActive) {
        item.classList.add('is-active');
    }
}

// Swiper Configuration
var swiper = new Swiper(".highlights-swiper", {
  slidesPerView: 4,
  spaceBetween: 20,
  navigation: {
      prevEl: ".highlights-section .swiper-prev-button",
      nextEl: ".highlights-section .swiper-next-button",
    },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 25,
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});

// Swiper Configuration
var swiper = new Swiper(".story-swiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
      prevEl: ".story-section .swiper-prev-button",
      nextEl: ".story-section .swiper-next-button",
    },
});