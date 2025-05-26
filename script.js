document.addEventListener("DOMContentLoaded", function () {
  // --- إضافة كلاس loaded للجسم بعد تحميل الصفحة ---
  document.body.classList.add("loaded");

  // --- تفعيل reveal عند التمرير ---
  function revealOnScroll() {
    let reveals = document.querySelectorAll(".reveal");

    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("visible");
      } else {
        reveals[i].classList.remove("visible");
      }
    }
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // --- إظهار وغلق القائمة (overlay) ---
  const menuIcon = document.getElementById('menu-icon');
  const overlay = document.getElementById('overlay');
  const closeMenu = document.getElementById('close-menu');

  if (menuIcon && overlay) {
    menuIcon.addEventListener('click', function () {
      overlay.classList.add('show');
      overlay.style.display = 'block';
    });
  }
  if (closeMenu && overlay) {
    closeMenu.addEventListener('click', function (event) {
      event.preventDefault();
      overlay.classList.remove('show');
      overlay.style.display = 'none';
    });
  }

  // --- إخفاء overlay عند الضغط على الخلفية ---
  if (overlay) {
    overlay.addEventListener('click', function (event) {
      if (event.target === this) {
        this.classList.remove('show');
        this.style.display = 'none';
      }
    });
  }

  // --- منع قائمة السياق (Right click) والسحب Drag ---
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // --- رابط اللوجو للانتقال لقسم home ---
  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("click", function () {
      window.location.href = "#home";
    });
  }

  // --- تأثيرات IntersectionObserver للـ fade, slide, zoom ---
  const fadeInElements = document.querySelectorAll('.fade-in');
  const slideInLeftElements = document.querySelectorAll('.slide-in-left');
  const slideInRightElements = document.querySelectorAll('.slide-in-right');
  const zoomInElements = document.querySelectorAll('.zoom-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'active', 'zoom-in-active');
        observer.unobserve(entry.target);
      } else {
        entry.target.classList.remove('visible', 'active', 'zoom-in-active');
      }
    });
  }

  const observer = new IntersectionObserver(handleIntersection, observerOptions);
  fadeInElements.forEach(el => observer.observe(el));
  slideInLeftElements.forEach(el => observer.observe(el));
  slideInRightElements.forEach(el => observer.observe(el));
  zoomInElements.forEach(el => observer.observe(el));

  // --- تحميل الصور الخلفية حسب القسم عند الدخول (lazy load) ---
  const sections = document.querySelectorAll('section');
  const bgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.dataset.bgImage) {
          entry.target.style.backgroundImage = entry.target.dataset.bgImage;
        }
        bgObserver.unobserve(entry.target);
      }
    });
  });

  sections.forEach(section => {
    if (section.dataset.bgImage) {
      bgObserver.observe(section);
    }
  });

  // --- إعدادات قائمة الهاتف - زر القائمة وعناصر القائمة ---
  const menuButton = document.getElementById('menu-button');
  const menuLinks = document.querySelectorAll('.menu-link');

  if (menuButton && overlay) {
    menuButton.addEventListener('click', function () {
      overlay.style.display = 'block';
      overlay.classList.add('show');
    });
  }
  menuLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (overlay) {
        overlay.style.display = 'none';
        overlay.classList.remove('show');
      }
    });
  });

  // --- تمرير ناعم عند تحميل الصفحة مع هاش في الرابط ---
  const hash = window.location.hash;
  if (hash) {
    const targetElement = document.querySelector(hash);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- إعدادات تأثيرات التمرير لقسم About فقط ---
  function setupAboutScrollAnimations() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    const aboutElements = {
      textTitle: aboutSection.querySelector('.about-text h2'),
      textContent: aboutSection.querySelector('.about-text p'),
      imageContainer: aboutSection.querySelector('.about-image'),
      image: aboutSection.querySelector('.about-image img')
    };

    const aboutObserverOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const applyEffects = (element, effectType) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            switch (effectType) {
              case 'fade':
                entry.target.style.opacity = 1;
                break;
              case 'slide-left':
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = 1;
                break;
              case 'slide-right':
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.opacity = 1;
                break;
              case 'zoom':
                entry.target.style.transform = 'scale(1)';
                entry.target.style.opacity = 1;
                break;
            }
            observer.unobserve(entry.target);
          }
        });
      }, aboutObserverOptions);

      observer.observe(element);
    };

    if (aboutElements.textTitle) {
      aboutElements.textTitle.style.opacity = 0;
      aboutElements.textTitle.style.transition = 'opacity 1s ease-out';
      applyEffects(aboutElements.textTitle, 'fade');
    }
    if (aboutElements.textContent) {
      aboutElements.textContent.style.opacity = 0;
      aboutElements.textContent.style.transform = 'translateX(-50px)';
      aboutElements.textContent.style.transition = 'all 1s ease-out 0.3s';
      applyEffects(aboutElements.textContent, 'slide-left');
    }
    if (aboutElements.imageContainer) {
      aboutElements.imageContainer.style.opacity = 0;
      aboutElements.imageContainer.style.transform = 'translateX(50px)';
      aboutElements.imageContainer.style.transition = 'all 1s ease-out 0.6s';
      applyEffects(aboutElements.imageContainer, 'slide-right');
    }
    if (aboutElements.image) {
      aboutElements.image.style.transform = 'scale(0.8)';
      aboutElements.image.style.opacity = 0;
      aboutElements.image.style.transition = 'all 1s ease-out 0.9s';
      applyEffects(aboutElements.image, 'zoom');
    }
  }
  setupAboutScrollAnimations();

  // --- تأثيرات إضافية للسلايد إن ---
  const slideElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
  const slideObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        slideObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  slideElements.forEach(el => slideObserver.observe(el));

  // --- تأثيرات Zoom In على الصور ---
  const zoomTargets = document.querySelectorAll('.zoom-in');
  const zoomObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zoom-in-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
  });
  zoomTargets.forEach(target => zoomObserver.observe(target));

  // --- إخفاء شاشة التحميل وعرض المحتوى عند تحميل الصفحة ---
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');
  if (loader && content) {
    loader.style.display = 'none';
    content.style.display = 'block';
  }

  // --- التمرير السلس عند الضغط على روابط هاش ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- تعديل تأثيرات الهيدر عند التمرير ---
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  const headerUnique = document.getElementById('header1-unique');
  const homeSection = document.querySelector('.home');
  if (headerUnique && homeSection) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        headerUnique.style.paddingTop = '0';
        homeSection.style.marginTop = '0';
      } else {
        headerUnique.style.paddingTop = '30px';
        homeSection.style.marginTop = '-30px';
      }
    });
  }
});
