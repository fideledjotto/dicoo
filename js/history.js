/**
 * history.js
 * ------------------------------------------------------------------
 * Gestion de l'historique de recherche via localStorage.
 * Chaque entrée : { termId, term, domain, date (ISO) }.
 * ------------------------------------------------------------------ */

const historyService = (() => {
  const STORAGE_KEY = "dicoo_history";
  const MAX_ENTRIES = 100;

  function getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Dicoo: impossible de lire l'historique.", e);
      return [];
    }
  }

  function save(entries) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch (e) {
      console.warn("Dicoo: impossible d'enregistrer l'historique.", e);
    }
  }

  /**
   * Ajoute une consultation à l'historique. Si le terme a déjà été
   * consulté, l'entrée existante est déplacée en tête (avec la
   * nouvelle date) plutôt que dupliquée.
   */
  function addToHistory(term) {
    if (!term) return;
    let entries = getAll().filter((e) => e.termId !== term.id);
    entries.unshift({
      termId: term.id,
      term: term.term,
      domain: term.domain,
      date: new Date().toISOString()
    });
    entries = entries.slice(0, MAX_ENTRIES);
    save(entries);
  }

  function clearHistory() {
    save([]);
  }

  /**
   * Regroupe les entrées de l'historique par période lisible :
   * "Aujourd'hui", "Hier", ou une date formatée.
   */
  function getGroupedHistory() {
    const entries = getAll();
    const groups = {};
    const today = new Date();
    const todayKey = today.toDateString();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const yesterdayKey = yesterday.toDateString();

    entries.forEach((entry) => {
      const d = new Date(entry.date);
      const key = d.toDateString();
      let label;
      if (key === todayKey) label = "Aujourd'hui";
      else if (key === yesterdayKey) label = "Hier";
      else
        label = d.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

      if (!groups[label]) groups[label] = [];
      groups[label].push(entry);
    });

    return groups;
  }

  function count() {
    return getAll().length;
  }

  return {
    getAll,
    addToHistory,
    clearHistory,
    getGroupedHistory,
    count
  };
})();
