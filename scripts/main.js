document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------
  // NAVBARS + FIXED BUTTONS (Observer)
  // -----------------------------------
  const navbarTop = document.querySelector('.navbar-top');
  const navbarBottom = document.querySelector('.navbar-bottom');
  const fixedButtons = document.querySelector('aside.fixed-buttons') || document.querySelector('.fixed-buttons');
  const sections = document.querySelectorAll('.secao');

  if (sections.length) {
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
  }

  // -----------------------------------
  // CARROSSEL DESTAQUES (SEC2) - 5 cards
  // -----------------------------------
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  let order = [...Array(slides.length).keys()]; // [0, 1, 2, 3, 4...]

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

  // -----------------------------------
  // ACORDEÕES (SEC3)
  // -----------------------------------
  const acordeoes = document.querySelectorAll('.acordeao');

  acordeoes.forEach(acordeao => {
    const summary = acordeao.querySelector('summary');
    const buttons = acordeao.querySelectorAll('button');

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const tipo = acordeao.dataset.type;
        const valor = button.textContent.trim();

        if (!summary) return;

        if (tipo === 'habilitacoes') {
          summary.textContent = valor;
        } else if (tipo === 'idade') {
          summary.textContent = `${valor} anos`;
        } else {
          summary.textContent = valor;
        }

        // fecha o acordeão
        acordeao.removeAttribute('open');
      });
    });
  });

  // -----------------------------------
  // CARROSSEL TESTEMUNHOS (SEC5)
  // -----------------------------------
  const testimoniosContainer = document.querySelector('.carousel-testemunhos');
  const prevTestemunhos = document.getElementById('prev-testemunhos');
  const nextTestemunhos = document.getElementById('next-testemunhos');

  if (testimoniosContainer && prevTestemunhos && nextTestemunhos) {
    const scrollAmount = 400;

    prevTestemunhos.addEventListener('click', () => {
      testimoniosContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextTestemunhos.addEventListener('click', () => {
      testimoniosContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // -----------------------------------
  // BOTÕES SEGMENTADOS - estado ativo
  // -----------------------------------
  const segItems = document.querySelectorAll('.seg-item');
  if (segItems.length) {
    segItems.forEach(item => {
      item.addEventListener('click', () => {
        segItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  // -----------------------------------
  // MENU MOBILE
  // -----------------------------------
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const menuMobile = document.getElementById("menuMobile");

  function closeMobileMenu() {
    if (!menuMobile || !hamburgerBtn) return;
    menuMobile.hidden = true;
    hamburgerBtn.setAttribute("aria-expanded", "false");
  }

  // vamos declarar closeChat antes de usar no toggle
  // (função real do chat é definida mais abaixo, mas esta referência funciona)
  let closeChat = () => {};

  function toggleMobileMenu() {
    if (!menuMobile || !hamburgerBtn) return;

    const isOpen = !menuMobile.hidden;
    menuMobile.hidden = isOpen;
    hamburgerBtn.setAttribute("aria-expanded", String(!isOpen));

    // Abre menu -> fecha o chat
    if (!isOpen) {
      closeChat();
    }
  }

  hamburgerBtn?.addEventListener("click", toggleMobileMenu);

  menuMobile?.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // -----------------------------------
  // CHAT (ligado ao backend) + OFFSET automático
  // -----------------------------------
  const API_URL = "http://localhost:3001/api/chat";

  const btnChat = document.getElementById("btnChat");
  const panel = document.getElementById("aiChatPanel");
  const closeBtn = document.getElementById("aiChatClose");

  const form = document.getElementById("aiChatForm");
  const input = document.getElementById("aiChatInput");
  const body = document.getElementById("aiChatBody");

  const fixedButtonsWrap = document.getElementById("fixedButtons");

  function isElementVisible(el) {
    if (!el) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function updateChatOffset() {
    // mobile: encosta ao canto
    if (window.matchMedia("(max-width: 520px)").matches) {
      document.documentElement.style.setProperty("--chat-right-offset", "0px");
      return;
    }

    if (!panel || panel.hidden) return;

    if (fixedButtonsWrap && isElementVisible(fixedButtonsWrap)) {
      const rect = fixedButtonsWrap.getBoundingClientRect();
      const gap = 14;
      document.documentElement.style.setProperty("--chat-right-offset", `${rect.width + gap}px`);
    } else {
      document.documentElement.style.setProperty("--chat-right-offset", "0px");
    }
  }

  function openChat() {
    if (!panel) return;
    panel.hidden = false;
    panel.setAttribute("aria-hidden", "false");
    updateChatOffset();
    setTimeout(() => input?.focus(), 50);
  }

  closeChat = function () {
    if (!panel) return;
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");
  };

  // expor se precisares noutros sítios
  window.__closeChat = closeChat;

  btnChat?.addEventListener("click", () => {
    if (!panel) return;
    panel.hidden ? openChat() : closeChat();
  });

  closeBtn?.addEventListener("click", closeChat);

  // fechar chat com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && !panel.hidden) closeChat();
  });

  const nowLabel = () => {
    const d = new Date();
    return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
  };

  function addMsg(text, who = "user", metaText = null) {
    if (!body) return null;

    const wrap = document.createElement("div");
    wrap.className = `ai-chat__msg ai-chat__msg--${who}`;

    const bubble = document.createElement("div");
    bubble.className = "ai-chat__bubble";

    const content = document.createElement("div");
    content.className = "ai-chat__text";
    content.textContent = String(text);

    const meta = document.createElement("div");
    meta.className = "ai-chat__meta";
    meta.textContent = metaText || nowLabel();

    bubble.appendChild(content);
    bubble.appendChild(meta);
    wrap.appendChild(bubble);

    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;

    return wrap;
  }

  function setFormLoading(isLoading) {
    if (!input || !form) return;
    const sendBtn = form.querySelector('button[type="submit"]');
    input.disabled = isLoading;
    if (sendBtn) sendBtn.disabled = isLoading;
  }

  async function sendToBackend(message) {
    const r = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!r.ok) {
      const t = await r.text().catch(() => "");
      throw new Error(`HTTP ${r.status} ${r.statusText} ${t}`.slice(0, 500));
    }

    const data = await r.json();
    return (data?.answer || "Sem resposta.").trim();
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!input) return;

    const text = input.value.trim();
    if (!text) return;

    addMsg(text, "user");
    input.value = "";

    // bot typing placeholder
    const typingNode = addMsg("A escrever…", "bot", nowLabel());
    setFormLoading(true);

    try {
      const answer = await sendToBackend(text);

      // substituir texto "A escrever…" pela resposta
      if (typingNode) {
        const txt = typingNode.querySelector(".ai-chat__text");
        if (txt) txt.textContent = answer;
      } else {
        addMsg(answer, "bot");
      }
    } catch (err) {
      const msg =
        "⚠️ Não consegui obter resposta do servidor. " +
        "Confirma se o backend está a correr em http://localhost:3001.";

      if (typingNode) {
        const txt = typingNode.querySelector(".ai-chat__text");
        if (txt) txt.textContent = msg;
      } else {
        addMsg(msg, "bot");
      }

      console.error("Chat error:", err);
    } finally {
      setFormLoading(false);
      input.focus();
    }
  });

  window.addEventListener("resize", updateChatOffset, { passive: true });
  window.addEventListener("scroll", updateChatOffset, { passive: true });
});


// =========================
// MODAL "JUNTA-TE A NÓS"
// =========================
const joinModal = document.getElementById("joinModal");
const joinClose = document.getElementById("joinModalClose");
const joinForm = document.getElementById("joinForm");

const btnJuntaHero = document.getElementById("btnJuntaHero");
const btnJuntaFixed = document.getElementById("btnJuntaFixed");

function openJoinModal() {
  if (!joinModal) return;
  joinModal.hidden = false;
  joinModal.setAttribute("aria-hidden", "false");
  // foca o primeiro input (UX)
  setTimeout(() => joinForm?.querySelector("input, select")?.focus(), 50);
}

function closeJoinModal() {
  if (!joinModal) return;
  joinModal.hidden = true;
  joinModal.setAttribute("aria-hidden", "true");
}

btnJuntaHero?.addEventListener("click", openJoinModal);
btnJuntaFixed?.addEventListener("click", openJoinModal);

joinClose?.addEventListener("click", closeJoinModal);

// fechar ao clicar no backdrop
joinModal?.addEventListener("click", (e) => {
  const target = e.target;
  if (target && target.matches("[data-close='true']")) closeJoinModal();
});

// fechar com ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && joinModal && !joinModal.hidden) closeJoinModal();
});

// submit demonstrativo (o programador liga ao backend/API)
joinForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Registo (simulação) enviado ✅");
  closeJoinModal();
  joinForm.reset();
});
