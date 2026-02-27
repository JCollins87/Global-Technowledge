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
// Enable submit only when form is complete
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const requiredFields = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  const consent = document.getElementById("consent");

  function checkFormCompletion() {
    let allFilled = true;

    requiredFields.forEach(field => {
      if (field.type === "checkbox") return;
      if (!field.value || field.value.trim() === "") {
        allFilled = false;
      }
    });

    if (!consent || !consent.checked) {
      allFilled = false;
    }

    if (allFilled) {
      submitBtn.disabled = false;
      submitBtn.classList.add("ready");
    } else {
      submitBtn.disabled = true;
      submitBtn.classList.remove("ready");
    }
  }

  requiredFields.forEach(field => {
    field.addEventListener("input", checkFormCompletion);
    field.addEventListener("change", checkFormCompletion);
  });

  if (consent) {
    consent.addEventListener("change", checkFormCompletion);
  }
});
