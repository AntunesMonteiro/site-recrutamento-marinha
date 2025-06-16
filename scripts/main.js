document.addEventListener('DOMContentLoaded', () => {
    const navbarTop = document.querySelector('.navbar-top');
    const navbarBottom = document.querySelector('.navbar-bottom');
    const fixedButtons = document.querySelector('aside.fixed-buttons') || document.querySelector('.fixed-buttons');
    const sections = document.querySelectorAll('.secao');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
  
          if (id === 'sec1') {
            navbarTop?.classList.add('hidden');
            navbarBottom?.classList.remove('hidden');
            fixedButtons?.classList.add('hidden');
          } else if (['sec2', 'sec3', 'sec4', 'sec5'].includes(id)) {
            navbarTop?.classList.remove('hidden');
            navbarBottom?.classList.add('hidden');
            fixedButtons?.classList.remove('hidden');
          } else if (id === 'sec6') {
            navbarTop?.classList.add('hidden');
            navbarBottom?.classList.add('hidden');
            fixedButtons?.classList.add('hidden');
          }
        }
      });
    }, { threshold: 0.6 });
  
    sections.forEach(section => observer.observe(section));
  
    // === Carrossel da Secção 2 ===
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    let currentIndex = 0;
  
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) slide.classList.add('active');
      });
    }
  
    if (prevBtn && nextBtn && slides.length > 0) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
      });
  
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
      });
  
      showSlide(currentIndex);
    }
  });