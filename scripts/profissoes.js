document.addEventListener('DOMContentLoaded', () => {
    const carrossel = document.querySelector('.carrossel');
    const cards = Array.from(document.querySelectorAll('.card'));
    const dots = document.querySelectorAll('.dot');
    const titulo = document.getElementById('titulo');
    const descricao = document.getElementById('descricao');
  
    let order = [0, 1, 2]; // índice de cada card (posição lógica)
  
    const textos = [
      {
        titulo: 'MILITAR',
        descricao: 'Desenvolve competências de liderança, disciplina e operação em ambientes exigentes.'
      },
      {
        titulo: 'MILITARIZADO',
        descricao: 'Profissionais com formação técnica que integram a estrutura da Marinha com funções especializadas.'
      },
      {
        titulo: 'CIVIL',
        descricao: 'Colabora em áreas administrativas, técnicas e de apoio, essenciais ao funcionamento da Marinha.'
      }
    ];
  
    function updateCards() {
      const reordered = order.map(i => cards[i]);
      reordered.forEach(card => carrossel.appendChild(card));
  
      // Atualizar dots
      dots.forEach(dot => dot.classList.remove('active'));
      dots[order[0]].classList.add('active');
  
      // Atualizar título e texto
      titulo.textContent = textos[order[0]].titulo;
      descricao.textContent = textos[order[0]].descricao;
    }
  
    // Clique nos cards para rotacionar
    cards.forEach((card, i) => {
      card.addEventListener('click', () => {
        const first = order.shift();
        order.push(first);
        updateCards();
      });
    });
  
    // Clique nos pontos
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.index);
        while (order[0] !== index) {
          order.push(order.shift());
        }
        updateCards();
      });
    });
  
    updateCards();
  });
  