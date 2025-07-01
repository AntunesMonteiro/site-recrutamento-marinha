document.addEventListener('DOMContentLoaded', () => {
  const navbarTop = document.querySelector('.navbar-top');
  const navbarBottom = document.querySelector('.navbar-bottom');
  const fixedButtons = document.querySelector('.fixed-buttons');
  const sections = document.querySelectorAll('.secao');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        if (id === 'sec1') {
          navbarTop?.classList.add('hidden');
          navbarBottom?.classList.remove('hidden');
          fixedButtons?.classList.add('hidden'); // Oculta botões laterais na sec1
        } else if (['sec2', 'sec3', 'sec4', 'sec5'].includes(id)) {
          navbarTop?.classList.remove('hidden');
          navbarBottom?.classList.add('hidden');
          fixedButtons?.classList.remove('hidden'); // Mostra botões laterais
        } else if (id === 'sec6') {
          navbarTop?.classList.add('hidden');
          navbarBottom?.classList.add('hidden');
          fixedButtons?.classList.add('hidden'); // Oculta botões laterais na sec6
        }
      }
    });
  }, { threshold: 0.6 });

  sections.forEach(section => observer.observe(section));

  // === Carrossel da Secção 2 — efeito 3D visível ===
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let order = [0, 1, 2];

  function updateCarouselOrder() {
    slides.forEach((slide, index) => {
      const pos = order.indexOf(index);

      if (pos === 0) {
        slide.style.zIndex = 3;
        slide.style.opacity = 1;
        slide.style.transform = 'scale(1) translateX(60px)';
      } else if (pos === 1) {
        slide.style.zIndex = 2;
        slide.style.opacity = 0.8;
        slide.style.transform = 'scale(0.95) translateX(30px)';
      } else if (pos === 2) {
        slide.style.zIndex = 1;
        slide.style.opacity = 0.6;
        slide.style.transform = 'scale(0.9) translateX(0px)';
      }
    });
  }

  if (prevBtn && nextBtn && slides.length === 3) {
    prevBtn.addEventListener('click', () => {
      order.unshift(order.pop());
      updateCarouselOrder();
    });

    nextBtn.addEventListener('click', () => {
      order.push(order.shift());
      updateCarouselOrder();
    });

    updateCarouselOrder();
  }
});
