const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section");
const navDots = document.querySelectorAll(".nav-dot");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((el) => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navDots.forEach((dot) => dot.classList.remove("active"));
        const activeDot = document.querySelector(
          `.nav-dot[data-section="${entry.target.id}"]`
        );
        if (activeDot) activeDot.classList.add("active");
      }
    });
  },
  {
    threshold: 0.45,
  }
);

sections.forEach((section) => sectionObserver.observe(section));

const topbar = document.querySelector(".topbar");

function handleTopbarScroll() {
  if (window.scrollY > 40) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", handleTopbarScroll);
handleTopbarScroll();

const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else if (systemPrefersDark) {
  root.setAttribute("data-theme", "dark");
}

function updateThemeButton() {
  const isDark = root.getAttribute("data-theme") === "dark";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Ativar modo claro" : "Ativar modo escuro"
  );
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☀" : "◐";
}

themeToggle.addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark";
  const newTheme = isDark ? "light" : "dark";

  if (newTheme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.setAttribute("data-theme", "dark");
  }

  localStorage.setItem("theme", newTheme);
  updateThemeButton();
});

updateThemeButton();