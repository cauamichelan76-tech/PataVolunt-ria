document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
      menuButton.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
        menuButton.textContent = "☰";
      });
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const interestSelect = document.querySelector("#interest");
  document.querySelectorAll(".interest-button").forEach(button => {
    button.addEventListener("click", () => {
      if (interestSelect) {
        interestSelect.value = "Adoção";
        const message = document.querySelector("#message");
        if (message) message.value = `Tenho interesse em conhecer melhor o(a) ${button.dataset.pet}.`;
      }
      document.querySelector("#cadastro")?.scrollIntoView({ behavior: "smooth" });
      document.querySelector("#name")?.focus({ preventScroll: true });
    });
  });

  const form = document.querySelector("#interest-form");
  const feedback = document.querySelector("#form-feedback");
  if (form && feedback) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      feedback.className = "form-feedback visible";

      if (!form.checkValidity()) {
        feedback.classList.add("error");
        feedback.textContent = "Confira os campos obrigatórios e informe um e-mail válido antes de continuar.";
        form.reportValidity();
        return;
      }

      const name = document.querySelector("#name").value.trim();
      const firstName = name.split(/\s+/)[0];
      feedback.classList.add("success");
      feedback.textContent = `Obrigado, ${firstName}! Seu formulário foi validado nesta demonstração. Para receber cadastros de verdade, é necessário conectar um serviço de envio ou um back-end.`;
      form.reset();
    });
  }
});
