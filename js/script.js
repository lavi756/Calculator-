document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------- Footer Year ----------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  /* -------------------------- Mobile Navigation -------------------------- */
  const burger = document.getElementById("burger");
  const navbar = document.getElementById("navbar");

  if (burger && navbar) {
    burger.addEventListener("click", () => {
      navbar.classList.toggle("open");
      burger.classList.toggle("open");
    });

    // Close menu when a link is clicked (mobile)
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("open");
        burger.classList.remove("open");
      });
    });
  }

  /* ------------------------ Skill Progress Animation --------------------- */
  const progressBars = document.querySelectorAll(".progress-bar");

  const animateProgress = () => {
    progressBars.forEach((bar) => {
      const level = bar.dataset.level;
      if (level) {
        bar.style.setProperty("--level", level + "%");
      }
    });
  };

  // Trigger animation when skills section comes into view
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgress();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(skillsSection);
  }
});