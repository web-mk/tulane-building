
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

// Highlights Swiper
const highlightsSwiper = new Swiper(".highlights-swiper", {
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

// Story Swiper
const storySwiper = new Swiper(".story-swiper", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 20,

  loopAdditionalSlides: 1,
  watchSlidesProgress: true,

  navigation: {
    prevEl: ".story-navigation .swiper-prev-button",
    nextEl: ".story-navigation .swiper-next-button",
  },
});

console.log('Story swiper initialized', storySwiper);


// Dedication/Amounts Field Populate Logic JS

(function () {
  const formatAmount = (value) =>
    `$${Number(value).toLocaleString()}`;

  const updateFormFields = (dedicationText, amountValue) => {
    const dedicationInput = document.querySelector('input[name="dedication"]');
    const amountInput = document.querySelector(
      '.details-form-card input[name="amount"]'
    );

    if (dedicationInput) dedicationInput.value = dedicationText;
    if (amountInput) amountInput.value = formatAmount(amountValue);
  };

  const clearGiftPackages = () => {
    document
      .querySelectorAll('.gift-selection input[type="radio"]')
      .forEach((radio) => (radio.checked = false));
  };

  const clearDedicationCards = () => {
    document
      .querySelectorAll('.dedication-card')
      .forEach((card) => card.classList.remove('is-active'));
  };

  // const scrollToForm = () => {
  //   document.querySelector('#partner')?.scrollIntoView({
  //     behavior: 'smooth',
  //   });
  // };

  document.querySelectorAll('.dedication-card').forEach((card) => {
    card.addEventListener('click', () => {
      const amountText = card.querySelector('.amount')?.textContent || '';
      const labelText = card.querySelector('h3')?.textContent || '';
      const numericAmount = amountText.replace(/[^\d]/g, '');
      clearGiftPackages();
      clearDedicationCards();
      updateFormFields(`${labelText} – ${amountText}`, numericAmount);
      card.classList.add('is-active');
      scrollToForm();
    });
  });

  document
    .querySelectorAll('.gift-selection input[type="radio"]')
    .forEach((radio) => {
      radio.addEventListener('change', () => {
        if (!radio.checked) return;

        const card = radio.closest('.gift-card');
        if (!card) return;

        const priceText =
          card.querySelector('.gift-price')?.textContent || '';
        const termText =
          card.querySelector('.gift-term')?.textContent || '';

        const numericAmount = radio.value;

        clearDedicationCards();

        updateFormFields(
          `${priceText} ${termText}`,
          numericAmount
        );
      });
    });

})();
