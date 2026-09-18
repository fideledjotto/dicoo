/**
 * ui.js
 * ------------------------------------------------------------------
 * Briques d'interface réutilisables : composants HTML (cartes,
 * suggestions...), mode sombre, menu mobile, animations d'apparition,
 * feedback utilisateur (toast). Ce fichier ne connaît pas la donnée
 * métier : il reçoit des objets déjà prêts à afficher.
 * ------------------------------------------------------------------ */

const ui = (() => {
  /* ------------------------------ Utils ------------------------------ */

  function debounce(fn, delay = 200) {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = String(str ?? "");
    return div.innerHTML;
  }

  /* --------------------------- Dark mode ------------------------------ */

  const THEME_KEY = "dicoo_theme";

  function initDarkMode() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    applyTheme(theme);

    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
      });
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    document.querySelectorAll("[data-theme-toggle] i").forEach((icon) => {
      icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon-stars";
    });
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"
      );
    });
  }

  /* -------------------------- Menu mobile ------------------------------ */

  function initMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("no-scroll", isOpen);
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("no-scroll");
      });
    });
  }

  /* ------------------------ Animations d'apparition --------------------- */

  function initRevealAnimations() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ------------------------------- Toast -------------------------------- */

  function showToast(message, icon = "bi-check-circle") {
    let container = document.querySelector(".toast-container-dicoo");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container-dicoo";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = "dicoo-toast";
    toast.innerHTML = `<i class="bi ${icon}"></i><span>${escapeHTML(message)}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));
    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 300);
    }, 2600);
  }

  /* --------------------------- Badges nav (compteurs) -------------------- */

  function updateNavBadges() {
    const favCount = typeof favoritesService !== "undefined" ? favoritesService.count() : 0;
    const histCount = typeof historyService !== "undefined" ? historyService.count() : 0;

    document.querySelectorAll("[data-favorites-badge]").forEach((el) => {
      el.textContent = favCount;
      el.classList.toggle("d-none", favCount === 0);
    });
    document.querySelectorAll("[data-history-badge]").forEach((el) => {
      el.textContent = histCount;
      el.classList.toggle("d-none", histCount === 0);
    });
  }

  /* ------------------------------ Composants ----------------------------- */

  function domainCardHTML(domain) {
    return `
      <a href="dictionnaire.html?domaine=${encodeURIComponent(domain.slug)}" class="domain-card" data-reveal>
        <div class="domain-card__icon"><i class="bi ${domain.icon}" aria-hidden="true"></i></div>
        <h3 class="domain-card__title">${escapeHTML(domain.name)}</h3>
        <p class="domain-card__desc">${escapeHTML(domain.description)}</p>
        <div class="domain-card__footer">
          <span class="domain-card__count">${domain.termCount.toLocaleString("fr-FR")} termes</span>
          <span class="domain-card__cta">Explorer <i class="bi bi-arrow-right"></i></span>
        </div>
      </a>`;
  }

  function termCardHTML(entry) {
    const isFav = typeof favoritesService !== "undefined" && favoritesService.isFavorite(entry.id);
    return `
      <article class="term-card" data-reveal>
        <div class="term-card__top">
          <span class="term-card__domain">${escapeHTML(entry.domain)}</span>
          <button type="button" class="fav-btn ${isFav ? "is-active" : ""}" data-fav-toggle="${entry.id}" aria-label="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}" aria-pressed="${isFav}">
            <i class="bi ${isFav ? "bi-heart-fill" : "bi-heart"}"></i>
          </button>
        </div>
        <a href="terme.html?terme=${encodeURIComponent(entry.term)}" class="term-card__link">
          <h3 class="term-card__title">${escapeHTML(entry.term)}</h3>
          <p class="term-card__def">${escapeHTML(entry.shortDefinition)}</p>
        </a>
        <div class="term-card__footer">
          <span class="badge-type">${escapeHTML(entry.type)}</span>
          <span class="term-card__translation"><i class="bi bi-translate"></i> ${escapeHTML(entry.translations.en)}</span>
        </div>
      </article>`;
  }

  function suggestionItemHTML(entry) {
    return `
      <button type="button" class="suggestion-item" data-suggestion-term="${escapeHTML(entry.term)}">
        <span class="suggestion-item__icon"><i class="bi bi-search"></i></span>
        <span class="suggestion-item__text">
          <span class="suggestion-item__term">${escapeHTML(entry.term)}</span>
          <span class="suggestion-item__domain">${escapeHTML(entry.domain)}</span>
        </span>
        <i class="bi bi-arrow-up-left suggestion-item__arrow" aria-hidden="true"></i>
      </button>`;
  }

  function emptyStateHTML({ icon = "bi-inbox", title, text }) {
    return `
      <div class="empty-state">
        <div class="empty-state__icon"><i class="bi ${icon}"></i></div>
        <h3 class="empty-state__title">${escapeHTML(title)}</h3>
        <p class="empty-state__text">${escapeHTML(text)}</p>
      </div>`;
  }

  /* ---------------------- Favoris : délégation d'événement --------------- */

  function bindFavoriteButtons(root, onChange) {
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-fav-toggle]");
      if (!btn) return;
      const id = btn.getAttribute("data-fav-toggle");
      const isNowFav = favoritesService.toggleFavorite(id);
      btn.classList.toggle("is-active", isNowFav);
      btn.setAttribute("aria-pressed", String(isNowFav));
      btn.querySelector("i").className = isNowFav ? "bi bi-heart-fill" : "bi bi-heart";
      btn.classList.add("pop");
      setTimeout(() => btn.classList.remove("pop"), 300);
      showToast(isNowFav ? "Ajouté aux favoris" : "Retiré des favoris", isNowFav ? "bi-heart-fill" : "bi-heart");
      updateNavBadges();
      if (typeof onChange === "function") onChange(isNowFav);
    });
  }

  return {
    debounce,
    escapeHTML,
    initDarkMode,
    initMobileMenu,
    initRevealAnimations,
    showToast,
    updateNavBadges,
    domainCardHTML,
    termCardHTML,
    suggestionItemHTML,
    emptyStateHTML,
    bindFavoriteButtons
  };
})();
