// ============ BuildSpace — interações ============

// Navbar: fundo glass ao rolar
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Menu mobile
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
});

navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Formulário — lista de espera via FormSubmit
const form = document.getElementById("waitlistForm");
const submitBtn = document.getElementById("submitBtn");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return;

  formError.hidden = true;
  submitBtn.disabled = true;
  submitBtn.textContent = "Enviando...";

  try {
    const res = await fetch("https://formsubmit.co/ajax/odogdamassa@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "🚀 Novo cadastro na lista de espera — BuildSpace",
        _template: "table",
        _captcha: "false",
        Nome: form.nome.value.trim(),
        Email: form.email.value.trim(),
        WhatsApp: form.whatsapp.value.trim() || "Não informado",
      }),
    });

    if (!res.ok) throw new Error("FormSubmit respondeu " + res.status);

    form.hidden = true;
    formSuccess.hidden = false;
  } catch (err) {
    formError.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = "Quero entrar na BuildSpace";
  }
});
