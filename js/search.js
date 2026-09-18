/**
 * search.js
 * ------------------------------------------------------------------
 * Logique de recherche bilingue (français / anglais) de Dicoo.
 * Ce fichier ne touche jamais au DOM : il expose uniquement des
 * fonctions pures consommées par ui.js / dictionary.js.
 * ------------------------------------------------------------------ */

const searchService = (() => {
  /**
   * Normalise une chaîne : minuscules + suppression des accents,
   * afin qu'une recherche "algorithme" trouve aussi "Algorithme"
   * ou "algorïthme".
   */
  function normalize(str) {
    return String(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  /**
   * Construit, pour un terme, la liste de toutes les chaînes dans
   * lesquelles la recherche doit pouvoir "matcher" : le terme
   * principal + toutes ses traductions.
   */
  function getSearchableStrings(entry) {
    const strings = [entry.term];
    if (entry.translations) {
      Object.values(entry.translations).forEach((v) => strings.push(v));
    }
    return strings.map(normalize);
  }

  /**
   * Recherche un terme (query) dans un tableau d'entrées du
   * dictionnaire (dictionaryData), en français ET en anglais.
   * Retourne les résultats triés par pertinence (correspondance
   * exacte > commence par > contient).
   */
  function searchTerms(query, entries) {
    const q = normalize(query);
    if (!q) return [];

    const scored = [];

    entries.forEach((entry) => {
      const strings = getSearchableStrings(entry);
      let bestScore = 0;

      strings.forEach((s) => {
        if (s === q) bestScore = Math.max(bestScore, 100);
        else if (s.startsWith(q)) bestScore = Math.max(bestScore, 75);
        else if (s.includes(q)) bestScore = Math.max(bestScore, 50);
      });

      // Recherche également dans le domaine et la catégorie (tolérance)
      if (bestScore === 0) {
        const domainStr = normalize(entry.domain);
        const categoryStr = normalize(entry.category);
        if (domainStr.includes(q) || categoryStr.includes(q)) {
          bestScore = 20;
        }
      }

      if (bestScore > 0) {
        scored.push({ entry, score: bestScore });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.entry);
  }

  /**
   * Recherche des domaines par nom (page domaines.html).
   */
  function searchDomains(query, domains) {
    const q = normalize(query);
    if (!q) return domains;
    return domains.filter(
      (d) => normalize(d.name).includes(q) || normalize(d.description).includes(q)
    );
  }

  /**
   * Retourne des suggestions rapides (utilisées dans la barre de
   * recherche de l'accueil / du header) : jusqu'à `limit` résultats.
   */
  function getSuggestions(query, entries, limit = 6) {
    return searchTerms(query, entries).slice(0, limit);
  }

  return {
    normalize,
    searchTerms,
    searchDomains,
    getSuggestions
  };
})();
