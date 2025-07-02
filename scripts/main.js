document.addEventListener('DOMContentLoaded', () => {
  const navbarTop = document.querySelector('.navbar-top');
  const navbarBottom = document.querySelector('.navbar-bottom');
  const fixedButtons = document.querySelector('aside.fixed-buttons') || document.querySelector('.fixed-buttons');
  const sections = document.querySelectorAll('.secao');

  // === OBSERVADOR PARA MOSTRAR/ESCONDER NAVBAR E BOTÕES FIXOS ===
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.id;

      if (entry.isIntersecting) {
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

  // === CARROSSEL DESTAQUES COM 5 CARDS EM EFEITO 3D ===
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let order = [...Array(slides.length).keys()]; // [0, 1, 2, 3, 4]

  function updateCarouselOrder() {
    slides.forEach(slide => {
      slide.classList.remove('pos-0', 'pos-1', 'pos-2', 'pos-3', 'pos-4');
    });

    order.forEach((slideIndex, pos) => {
      if (slides[slideIndex]) {
        slides[slideIndex].classList.add(`pos-${pos}`);
      }
    });
  }

  if (prevBtn && nextBtn && slides.length >= 5) {
    prevBtn.addEventListener('click', () => {
      order.unshift(order.pop()); // move o último para a frente
      updateCarouselOrder();
    });

    nextBtn.addEventListener('click', () => {
      order.push(order.shift()); // move o primeiro para o fim
      updateCarouselOrder();
    });

    updateCarouselOrder();
  }
});
