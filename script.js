// Little Berry Systems - minimal JS (navigation, CTA prefill, year)

(function () {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const navLinks = document.getElementById("navLinks");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        navLinks.classList.contains("open")
      );
    });
  }

  // CTA lane prefill
  document.querySelectorAll("[data-lane]").forEach(btn => {
    btn.addEventListener("click", () => {
      const lane = btn.getAttribute("data-lane");
      const select = document.querySelector("select[name='inquiryType']");
      if (select && lane) {
        setTimeout(() => {
          select.value = lane;
        }, 150);
      }
    });
  });
})();
