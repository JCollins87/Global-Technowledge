// Global Technowledge - minimal JS (navigation, CTA prefill, year)

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
// =========================
// Enable submit only when required fields are complete + consent checked
// (robust: works with defer, without relying on DOMContentLoaded)
// =========================
(function enableSubmitWhenComplete() {
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");

  if (!form || !submitBtn) return;

  const consent = document.getElementById("consent");

  // Only count required fields that are actually visible + not honeypots
  const requiredFields = Array.from(
    form.querySelectorAll("input[required], select[required], textarea[required]")
  ).filter(el => {
    if (el.classList.contains("honeypot")) return false;
    if (el.type === "hidden") return false;
    // ignore required checkboxes other than consent (if any)
    return true;
  });

  function isFilled(el) {
    if (el.type === "checkbox") return el.checked;
    return String(el.value || "").trim().length > 0;
  }

  function check() {
    const allRequiredFilled = requiredFields.every(isFilled);
    const consentOk = consent ? consent.checked : true;

    const ready = allRequiredFilled && consentOk;

    submitBtn.disabled = !ready;
    submitBtn.classList.toggle("ready", ready);
  }

  // Run once on load
  check();

  // Watch changes
  requiredFields.forEach(el => {
    el.addEventListener("input", check);
    el.addEventListener("change", check);
    el.addEventListener("blur", check);
  });

  if (consent) consent.addEventListener("change", check);
})();
console.log("Enable-submit script loaded");

