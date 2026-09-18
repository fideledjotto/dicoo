/**
 * app.js
 * ------------------------------------------------------------------
 * Point d'entrée de l'application. Initialise les comportements
 * communs à toutes les pages (thème, menu mobile, animations,
 * recherche du header, compteurs favoris/historique), puis délègue
 * à dictionary.js ou aux fonctions locales selon la page courante
 * (identifiée par l'attribut data-page sur <body>).
 * ------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  // --- Comportements communs à toutes les pages ---
  ui.initDarkMode();
  ui.initMobileMenu();
  ui.updateNavBadges();
  markActiveNavLink();

  const headerInput = document.querySelector("[data-header-search-input]");
  const headerResults = document.querySelector("[data-header-search-results]");
  if (headerInput && headerResults) {
    dictionaryController.initSearchWidget(headerInput, headerResults, { showRecent: true });
  }

  // --- Routage simple par page ---
  const page = document.body.getAttribute("data-page");

  switch (page) {
    case "home":
      dictionaryController.initHomePage();
      break;
    case "domaines":
      dictionaryController.initDomainsPage();
      break;
    case "dictionnaire":
      dictionaryController.initDictionaryPage();
      break;
    case "terme":
      dictionaryController.initTermPage();
      break;
    case "favoris":
      initFavoritesPage();
      break;
    case "historique":
      initHistoryPage();
      break;
    default:
      break;
  }

  ui.initRevealAnimations();
});

/**
 * Met en évidence, dans la navigation, le lien correspondant à la
 * page actuellement affichée.
 */
function markActiveNavLink() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === current) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* ============================ PAGE FAVORIS ============================ */

async function initFavoritesPage() {
  const grid = document.querySelector("[data-favorites-grid]");
  const emptyWrap = document.querySelector("[data-favorites-empty]");
  const countLabel = document.querySelector("[data-favorites-count]");
  if (!grid) return;

  const favIds = favoritesService.getAll();
  const allTerms = await dataService.getTerms();
  const favTerms = favIds
    .map((id) => allTerms.find((t) => t.id === id))
    .filter(Boolean);

  if (countLabel) {
    countLabel.textContent = `${favTerms.length} terme${favTerms.length > 1 ? "s" : ""} enregistré${favTerms.length > 1 ? "s" : ""}`;
  }

  if (!favTerms.length) {
    grid.innerHTML = "";
    if (emptyWrap) emptyWrap.classList.remove("d-none");
    return;
  }

  if (emptyWrap) emptyWrap.classList.add("d-none");
  grid.innerHTML = favTerms.map(ui.termCardHTML).join("");
  ui.initRevealAnimations();

  ui.bindFavoriteButtons(grid, () => {
    // Un favori retiré depuis cette page doit disparaître de la liste
    initFavoritesPage();
  });
}

/* =========================== PAGE HISTORIQUE =========================== */

async function initHistoryPage() {
  const container = document.querySelector("[data-history-list]");
  const emptyWrap = document.querySelector("[data-history-empty]");
  const clearBtn = document.querySelector("[data-history-clear]");
  const countLabel = document.querySelector("[data-history-count]");
  if (!container) return;

  function render() {
    const grouped = historyService.getGroupedHistory();
    const groupLabels = Object.keys(grouped);
    const total = historyService.count();

    if (countLabel) {
      countLabel.textContent = `${total} recherche${total > 1 ? "s" : ""}`;
    }

    if (!groupLabels.length) {
      container.innerHTML = "";
      if (emptyWrap) emptyWrap.classList.remove("d-none");
      if (clearBtn) clearBtn.classList.add("d-none");
      return;
    }

    if (emptyWrap) emptyWrap.classList.add("d-none");
    if (clearBtn) clearBtn.classList.remove("d-none");

    container.innerHTML = groupLabels
      .map(
        (label) => `
        <div class="history-group" data-reveal>
          <h2 class="history-group__label">${ui.escapeHTML(label)}</h2>
          <div class="history-group__items">
            ${grouped[label]
              .map(
                (h) => `
              <a class="history-item" href="terme.html?terme=${encodeURIComponent(h.term)}">
                <span class="history-item__icon"><i class="bi bi-clock-history"></i></span>
                <span class="history-item__text">
                  <span class="history-item__term">${ui.escapeHTML(h.term)}</span>
                  <span class="history-item__domain">${ui.escapeHTML(h.domain)}</span>
                </span>
                <span class="history-item__time">${new Date(h.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
              </a>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");
    ui.initRevealAnimations();
  }

  render();

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      historyService.clearHistory();
      ui.updateNavBadges();
      ui.showToast("Historique effacé", "bi-trash3");
      render();
    });
  }
}
