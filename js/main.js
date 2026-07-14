/* Main JavaScript Logic - Stackly Growth Solutions */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileMenu();
  initCustomCursor();
  initButtonRipples();
  initScrollReveal();
  initAnimatedCounters();
  initTestimonialSlider();
  initFaqAccordion();
  initSmoothScroll();
  initHeroTyping();
  initHeroParallax();
});

/* ==========================================
   1. Preloader Animation
   ========================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
    // Fallback if load event doesn't fire fast enough
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, 2500);
  }
}

/* ==========================================
   2. Sticky Header & Active Navigation Link Tracker
   ========================================== */
function initStickyHeader() {
  const header = document.querySelector('.header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Update active links on scroll
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120;
      
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSectionId) && currentSectionId !== '') {
          link.classList.add('active');
        }
      });
    });
  }
}

/* ==========================================
   3. Mobile Navigation Menu Toggle
   ========================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }
}

/* ==========================================
   4. Custom Interactive Cursor
   ========================================== */
function initCustomCursor() {
  const cursor = document.createElement('div');
  cursor.classList.add('custom-cursor');
  const cursorDot = document.createElement('div');
  cursorDot.classList.add('custom-cursor-dot');
  
  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  
  const hoverables = document.querySelectorAll('a, button, .btn, .clickable, input, select, textarea');
  hoverables.forEach(item => {
    item.addEventListener('mouseenter', () => {
      cursor.classList.add('hovered');
    });
    item.addEventListener('mouseleave', () => {
      cursor.classList.remove('hovered');
    });
  });
}

/* ==========================================
   5. Interactive Ripple Hover Effects
   ========================================== */
function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

/* ==========================================
   6. Scroll Reveal Interactions (Intersection Observer)
   ========================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-zoom');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if browser doesn't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

/* ==========================================
   7. Success Statistics Animated Counters
   ========================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-value');
  
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000; // 2 seconds
          const stepTime = Math.max(Math.floor(duration / target), 15);
          let current = 0;
          
          const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = current;
            }
          }, stepTime);
          
          observer.unobserve(counter);
        }
      });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
  } else {
    // Fallback
    counters.forEach(counter => {
      counter.textContent = counter.getAttribute('data-target');
    });
  }
}

/* ==========================================
   8. Client Success Stories Testimonial Slider
   ========================================== */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (slider && slides.length > 0) {
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create dots indicator
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
    }
    
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slideCount;
      updateSlider();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slideCount) % slideCount;
      updateSlider();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let autoSlideInterval = setInterval(nextSlide, 6000);
    
    // Reset auto-slide timer on action
    const resetAutoSlide = () => {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextSlide, 6000);
    };
    
    if (nextBtn) nextBtn.addEventListener('click', resetAutoSlide);
    if (prevBtn) prevBtn.addEventListener('click', resetAutoSlide);
  }
}

/* ==========================================
   9. Smooth Accordions (FAQ section)
   ========================================== */
function initFaqAccordion() {
  const accordionHeaders = document.querySelectorAll('.faq-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const activeHeader = document.querySelector('.faq-header.active');
      if (activeHeader && activeHeader !== header) {
        activeHeader.classList.remove('active');
        activeHeader.nextElementSibling.style.maxHeight = null;
      }
      
      header.classList.toggle('active');
      const body = header.nextElementSibling;
      if (header.classList.contains('active')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = null;
      }
    });
  });
}

/* ==========================================
   10. Smooth Anchor Scrolling
   ========================================== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPos = targetSection.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

/* ==========================================
   11. Hero Text Typing & Word Rotator
   ========================================== */
function initHeroTyping() {
  const textEl = document.getElementById('hero-dynamic-text');
  if (!textEl) return;
  const words = ['Growth Vector', 'Digital Scaling', 'Capital Restructure', 'Operations SLA'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
      textEl.textContent = currentWord.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 50;
    } else {
      textEl.textContent = currentWord.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2000;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }
  type();
}

/* ==========================================
   12. Hero Mouse Move Interactive Parallax
   ========================================== */
function initHeroParallax() {
  const heroSection = document.getElementById('hero');
  const fCard1 = document.querySelector('.f-card-1');
  const fCard2 = document.querySelector('.f-card-2');
  const preview = document.querySelector('.hero-dashboard-preview');
  
  if (!heroSection) return;
  
  // Set initial transitions for smooth rendering
  if (fCard1) fCard1.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
  if (fCard2) fCard2.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
  if (preview) preview.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)';
  
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const moveX = (x / rect.width) * 35; 
    const moveY = (y / rect.height) * 35;
    
    if (fCard1) {
      fCard1.style.transform = `translate(${moveX * 1.1}px, ${moveY * 1.1}px)`;
    }
    if (fCard2) {
      fCard2.style.transform = `translate(${-moveX * 1.3}px, ${-moveY * 1.3}px)`;
    }
    if (preview) {
      preview.style.transform = `rotateY(${moveX * 0.25}deg) rotateX(${-moveY * 0.25}deg) translateY(${-moveY * 0.15}px)`;
    }
  });
  
  heroSection.addEventListener('mouseleave', () => {
    if (fCard1) fCard1.style.transform = 'translate(0, 0)';
    if (fCard2) fCard2.style.transform = 'translate(0, 0)';
    if (preview) preview.style.transform = 'rotateY(0deg) rotateX(0deg) translateY(0px)';
  });
}
