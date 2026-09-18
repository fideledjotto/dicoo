/**
 * dictionary.js
 * ------------------------------------------------------------------
 * Logique "métier" des pages liées au dictionnaire : accueil, domaines,
 * dictionnaire (liste + filtres) et fiche d'un terme. Ce fichier
 * orchestre dataService (données) + searchService (recherche) +
 * ui.js (rendu), mais ne contient pas lui-même le HTML des composants.
 * ------------------------------------------------------------------ */

const dictionaryController = (() => {
  /* ===================================================================
   *  RECHERCHE GLOBALE (header + hero) — utilisée sur toutes les pages
   * =================================================================== */

  /**
   * Branche un champ de recherche (input) sur un conteneur de
   * suggestions. Au clic / Enter sur une suggestion ou une validation,
   * redirige vers dictionnaire.html?q=... ou terme.html?terme=...
   */
  async function initSearchWidget(inputEl, resultsEl, options = {}) {
    if (!inputEl || !resultsEl) return;
    const terms = await dataService.getTerms();

    const runSearch = ui.debounce((value) => {
      const query = value.trim();
      if (!query) {
        resultsEl.innerHTML = "";
        resultsEl.classList.remove("is-open");
        return;
      }
      const matches = searchService.getSuggestions(query, terms, options.limit || 6);
      if (!matches.length) {
        resultsEl.innerHTML = `<p class="suggestions-empty">Aucun résultat pour « ${ui.escapeHTML(query)} ». Essayez un autre terme, en français ou en anglais.</p>`;
      } else {
        resultsEl.innerHTML = matches.map(ui.suggestionItemHTML).join("");
      }
      resultsEl.classList.add("is-open");
    }, 180);

    inputEl.addEventListener("input", (e) => runSearch(e.target.value));

    inputEl.addEventListener("focus", () => {
      if (inputEl.value.trim()) {
        resultsEl.classList.add("is-open");
      } else if (options.showRecent !== false) {
        renderRecentInDropdown(resultsEl);
      }
    });

    document.addEventListener("click", (e) => {
      if (!resultsEl.contains(e.target) && e.target !== inputEl) {
        resultsEl.classList.remove("is-open");
      }
    });

    resultsEl.addEventListener("click", (e) => {
      const item = e.target.closest("[data-suggestion-term]");
      if (!item) return;
      const term = item.getAttribute("data-suggestion-term");
      window.location.href = `terme.html?terme=${encodeURIComponent(term)}`;
    });

    const form = inputEl.closest("form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = inputEl.value.trim();
        if (query) {
          window.location.href = `dictionnaire.html?q=${encodeURIComponent(query)}`;
        }
      });
    }
  }

  function renderRecentInDropdown(resultsEl) {
    const recent = historyService.getAll().slice(0, 5);
    if (!recent.length) return;
    resultsEl.innerHTML =
      `<p class="suggestions-label">Résultats récents</p>` +
      recent
        .map(
          (h) => `
        <button type="button" class="suggestion-item" data-suggestion-term="${ui.escapeHTML(h.term)}">
          <span class="suggestion-item__icon"><i class="bi bi-clock-history"></i></span>
          <span class="suggestion-item__text">
            <span class="suggestion-item__term">${ui.escapeHTML(h.term)}</span>
            <span class="suggestion-item__domain">${ui.escapeHTML(h.domain)}</span>
          </span>
          <i class="bi bi-arrow-up-left suggestion-item__arrow" aria-hidden="true"></i>
        </button>`
        )
        .join("");
    resultsEl.classList.add("is-open");
  }

  /* ===================================================================
   *  ACCUEIL
   * =================================================================== */

  async function initHomePage() {
    const wordOfDay = await dataService.getWordOfTheDay();
    renderWordOfTheDay(wordOfDay);

    const domains = await dataService.getDomains();
    const preview = document.querySelector("[data-domains-preview]");
    if (preview) {
      const featured = domains.slice(0, 8);
      preview.innerHTML = featured.map(ui.domainCardHTML).join("");
    }

    const heroInput = document.querySelector("[data-hero-search-input]");
    const heroResults = document.querySelector("[data-hero-search-results]");
    initSearchWidget(heroInput, heroResults, { showRecent: true });

    document.querySelectorAll("[data-suggestion-chip]").forEach((chip) => {
      chip.addEventListener("click", () => {
        window.location.href = `terme.html?terme=${encodeURIComponent(chip.dataset.suggestionChip)}`;
      });
    });
  }

  function renderWordOfTheDay(entry) {
    const el = document.querySelector("[data-word-of-day]");
    if (!el || !entry) return;
    el.innerHTML = `
      <span class="wod-eyebrow">Mot du jour</span>
      <h3 class="wod-term">${ui.escapeHTML(entry.term)}</h3>
      <span class="wod-domain">${ui.escapeHTML(entry.domain)}</span>
      <p class="wod-def">${ui.escapeHTML(entry.shortDefinition)}</p>
      <a class="btn btn-dicoo-light" href="terme.html?terme=${encodeURIComponent(entry.term)}">Découvrir</a>
    `;
  }

  /* ===================================================================
   *  PAGE DOMAINES
   * =================================================================== */

  async function initDomainsPage() {
    const domains = await dataService.getDomains();
    const categories = await dataService.getCategories();
    const grid = document.querySelector("[data-domains-grid]");
    const searchInput = document.querySelector("[data-domain-search]");
    const categoryNav = document.querySelector("[data-category-nav]");
    const countLabel = document.querySelector("[data-domains-count]");

    let activeCategory = "all";

    if (categoryNav) {
      const allBtn = `<button type="button" class="category-pill is-active" data-category="all">Tous les domaines</button>`;
      const catBtns = categories
        .map((c) => `<button type="button" class="category-pill" data-category="${c.id}">${ui.escapeHTML(c.name)}</button>`)
        .join("");
      categoryNav.innerHTML = allBtn + catBtns;

      categoryNav.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-category]");
        if (!btn) return;
        activeCategory = btn.getAttribute("data-category");
        categoryNav.querySelectorAll(".category-pill").forEach((p) => p.classList.remove("is-active"));
        btn.classList.add("is-active");
        render();
      });
    }

    function render() {
      let list = domains;
      if (activeCategory !== "all") {
        list = list.filter((d) => d.category === activeCategory);
      }
      const query = searchInput ? searchInput.value : "";
      list = searchService.searchDomains(query, list);

      if (countLabel) {
        countLabel.textContent = `${list.length} domaine${list.length > 1 ? "s" : ""}`;
      }

      grid.innerHTML = list.length
        ? list.map(ui.domainCardHTML).join("")
        : ui.emptyStateHTML({
            icon: "bi-search",
            title: "Aucun domaine trouvé",
            text: "Essayez un autre mot-clé ou explorez une autre catégorie."
          });
      ui.initRevealAnimations();
    }

    if (searchInput) {
      searchInput.addEventListener("input", ui.debounce(render, 150));
    }

    render();
  }

  /* ===================================================================
   *  PAGE DICTIONNAIRE (liste + filtres)
   * =================================================================== */

  async function initDictionaryPage() {
    const terms = await dataService.getTerms();
    const domains = await dataService.getDomains();

    const params = new URLSearchParams(window.location.search);
    const searchInput = document.querySelector("[data-dictionary-search]");
    const resultsGrid = document.querySelector("[data-dictionary-results]");
    const resultsCount = document.querySelector("[data-results-count]");
    const domainFilter = document.querySelector("[data-filter-domain]");
    const langFilter = document.querySelector("[data-filter-lang]");
    const levelFilter = document.querySelector("[data-filter-level]");
    const typeFilter = document.querySelector("[data-filter-type]");
    const resetBtn = document.querySelector("[data-filters-reset]");

    // Remplit dynamiquement la liste des domaines du filtre
    if (domainFilter) {
      const uniqueDomains = [...new Set(terms.map((t) => t.domain))].sort();
      domainFilter.innerHTML =
        `<option value="all">Tous</option>` +
        uniqueDomains.map((d) => `<option value="${ui.escapeHTML(d)}">${ui.escapeHTML(d)}</option>`).join("");
    }

    // Pré-remplissage depuis l'URL (recherche globale, ou lien depuis une carte domaine)
    if (params.get("q") && searchInput) searchInput.value = params.get("q");
    if (params.get("domaine") && domainFilter) {
      const domainObj = domains.find((d) => d.slug === params.get("domaine"));
      if (domainObj) domainFilter.value = domainObj.name;
    }

    function getFiltered() {
      let list = terms;

      const query = searchInput ? searchInput.value.trim() : "";
      if (query) list = searchService.searchTerms(query, list);

      if (domainFilter && domainFilter.value !== "all") {
        list = list.filter((t) => t.domain === domainFilter.value);
      }
      if (langFilter && langFilter.value !== "all") {
        list = list.filter((t) => t.primaryLanguage === langFilter.value);
      }
      if (levelFilter && levelFilter.value !== "all") {
        list = list.filter((t) => t.level === levelFilter.value);
      }
      if (typeFilter && typeFilter.value !== "all") {
        list = list.filter((t) => t.type === typeFilter.value);
      }
      return list;
    }

    function render() {
      const list = getFiltered();
      if (resultsCount) {
        resultsCount.textContent = `${list.length} terme${list.length > 1 ? "s" : ""} trouvé${list.length > 1 ? "s" : ""}`;
      }
      resultsGrid.innerHTML = list.length
        ? list.map(ui.termCardHTML).join("")
        : ui.emptyStateHTML({
            icon: "bi-journal-x",
            title: "Aucun terme ne correspond",
            text: "Modifiez vos filtres ou essayez une autre recherche, en français ou en anglais."
          });
      ui.initRevealAnimations();
      ui.bindFavoriteButtons(resultsGrid);
    }

    [searchInput, domainFilter, langFilter, levelFilter, typeFilter].forEach((el) => {
      if (!el) return;
      el.addEventListener(el.tagName === "SELECT" ? "change" : "input", ui.debounce(render, 150));
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (searchInput) searchInput.value = "";
        [domainFilter, langFilter, levelFilter, typeFilter].forEach((el) => {
          if (el) el.value = "all";
        });
        render();
      });
    }

    render();
  }

  /* ===================================================================
   *  PAGE D'UN TERME
   * =================================================================== */

  async function initTermPage() {
    const params = new URLSearchParams(window.location.search);
    const termQuery = params.get("terme");
    const container = document.querySelector("[data-term-page]");
    if (!container) return;

    const entry = termQuery ? await dataService.getTermBySlug(termQuery) : null;

    if (!entry) {
      container.innerHTML = ui.emptyStateHTML({
        icon: "bi-question-circle",
        title: "Terme introuvable",
        text: "Ce terme n'existe pas encore dans Dicoo. Essayez une autre recherche."
      });
      return;
    }

    historyService.addToHistory(entry);
    ui.updateNavBadges();

    document.title = `${entry.term} — Dicoo`;

    const allTerms = await dataService.getTerms();
    const related = entry.relatedTerms
      .map((name) => allTerms.find((t) => t.term.toLowerCase() === name.toLowerCase()))
      .filter(Boolean);
    const relatedFallback = entry.relatedTerms.filter(
      (name) => !allTerms.find((t) => t.term.toLowerCase() === name.toLowerCase())
    );

    const isFav = favoritesService.isFavorite(entry.id);
    let translationDirection = entry.primaryLanguage === "en" ? "en-fr" : "fr-en";

    function translationBlockHTML() {
      const [from, to] = translationDirection.split("-");
      const fromLabel = from === "fr" ? "Français" : "English";
      const toLabel = to === "fr" ? "Français" : "English";
      const fromFlag = from === "fr" ? "🇫🇷" : "🇬🇧";
      const toFlag = to === "fr" ? "🇫🇷" : "🇬🇧";
      return `
        <div class="translation-row">
          <div class="translation-col">
            <span class="translation-col__label">${fromFlag} ${fromLabel}</span>
            <span class="translation-col__term">${ui.escapeHTML(entry.translations[from])}</span>
          </div>
          <i class="bi bi-arrow-right translation-arrow" aria-hidden="true"></i>
          <div class="translation-col">
            <span class="translation-col__label">${toFlag} ${toLabel}</span>
            <span class="translation-col__term">${ui.escapeHTML(entry.translations[to])}</span>
          </div>
        </div>`;
    }

    container.innerHTML = `
      <div class="term-header" data-reveal>
        <nav class="breadcrumb-dicoo" aria-label="Fil d'Ariane">
          <a href="index.html">Accueil</a> <i class="bi bi-chevron-right"></i>
          <a href="dictionnaire.html?domaine=${encodeURIComponent(entry.domainSlug)}">${ui.escapeHTML(entry.domain)}</a> <i class="bi bi-chevron-right"></i>
          <span>${ui.escapeHTML(entry.term)}</span>
        </nav>
        <div class="term-header__top">
          <div>
            <span class="badge-domain">${ui.escapeHTML(entry.domain)}</span>
            <span class="badge-type">${ui.escapeHTML(entry.type)}</span>
            <h1 class="term-title">${ui.escapeHTML(entry.term)}
              <button type="button" class="speak-btn" data-speak="${ui.escapeHTML(entry.term)}" data-lang="${entry.primaryLanguage}" aria-label="Prononcer ${ui.escapeHTML(entry.term)}">
                <i class="bi bi-volume-up-fill"></i>
              </button>
            </h1>
          </div>
          <button type="button" class="fav-btn fav-btn--lg ${isFav ? "is-active" : ""}" data-fav-toggle="${entry.id}" aria-pressed="${isFav}" aria-label="${isFav ? "Retirer des favoris" : "Ajouter aux favoris"}">
            <i class="bi ${isFav ? "bi-heart-fill" : "bi-heart"}"></i>
            <span>${isFav ? "Dans vos favoris" : "Ajouter aux favoris"}</span>
          </button>
        </div>
      </div>

      <div class="term-body">
        <div class="term-main">
          <section class="term-section" data-reveal>
            <h2>Définition</h2>
            <p>${ui.escapeHTML(entry.definition)}</p>
          </section>

          <section class="term-section term-section--simple" data-reveal>
            <h2><i class="bi bi-emoji-smile"></i> Définition simple</h2>
            <p>${ui.escapeHTML(entry.simpleDefinition)}</p>
          </section>

          <section class="term-section" data-reveal data-translation-block>
            <div class="term-section__head">
              <h2>Traduction</h2>
              <button type="button" class="btn-translate" data-translate-toggle>
                <i class="bi bi-arrow-left-right"></i> Traduire
              </button>
            </div>
            <div data-translation-content>${translationBlockHTML()}</div>
          </section>

          <section class="term-section" data-reveal>
            <h2>Exemples</h2>
            <ul class="example-list">
              ${entry.examples.map((ex) => `<li>${ui.escapeHTML(ex)}</li>`).join("")}
            </ul>
          </section>

          <section class="term-section" data-reveal>
            <h2>Exemple en contexte professionnel</h2>
            <p>${ui.escapeHTML(entry.professionalExample)}</p>
          </section>
        </div>

        <aside class="term-aside" data-reveal>
          <div class="aside-card">
            <h3>Termes associés</h3>
            <div class="related-terms">
              ${related
                .map(
                  (r) =>
                    `<a href="terme.html?terme=${encodeURIComponent(r.term)}" class="related-term-chip">${ui.escapeHTML(r.term)}</a>`
                )
                .join("")}
              ${relatedFallback
                .map((name) => `<span class="related-term-chip related-term-chip--static">${ui.escapeHTML(name)}</span>`)
                .join("")}
            </div>
          </div>
          <div class="aside-card">
            <h3>Niveau</h3>
            <p class="aside-level"><i class="bi bi-signpost-2"></i> ${ui.escapeHTML(entry.level)}</p>
            <h3>Catégorie</h3>
            <p class="aside-level"><i class="bi bi-bookmark"></i> ${ui.escapeHTML(entry.category)}</p>
          </div>
        </aside>
      </div>
    `;

    ui.initRevealAnimations();
    ui.bindFavoriteButtons(container, () => {
      const btn = container.querySelector("[data-fav-toggle]");
      const nowFav = favoritesService.isFavorite(entry.id);
      btn.querySelector("span").textContent = nowFav ? "Dans vos favoris" : "Ajouter aux favoris";
    });

    const translateBtn = container.querySelector("[data-translate-toggle]");
    const translationContent = container.querySelector("[data-translation-content]");
    if (translateBtn) {
      translateBtn.addEventListener("click", () => {
        translationDirection = translationDirection === "fr-en" ? "en-fr" : "fr-en";
        translationContent.classList.add("flip-anim");
        translationContent.innerHTML = translationBlockHTML();
        setTimeout(() => translationContent.classList.remove("flip-anim"), 400);
      });
    }

    const speakBtn = container.querySelector("[data-speak]");
    if (speakBtn) {
      speakBtn.addEventListener("click", () => {
        if (!("speechSynthesis" in window)) {
          ui.showToast("La prononciation audio n'est pas disponible sur ce navigateur.", "bi-exclamation-circle");
          return;
        }
        const utterance = new SpeechSynthesisUtterance(speakBtn.getAttribute("data-speak"));
        utterance.lang = speakBtn.getAttribute("data-lang") === "en" ? "en-US" : "fr-FR";
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      });
    }
  }

  return {
    initSearchWidget,
    initHomePage,
    initDomainsPage,
    initDictionaryPage,
    initTermPage
  };
})();
