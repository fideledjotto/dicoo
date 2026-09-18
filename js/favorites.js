/**
 * favorites.js
 * ------------------------------------------------------------------
 * Gestion des favoris de l'utilisateur via localStorage.
 * Aucune manipulation du DOM ici : uniquement la logique de stockage.
 * ------------------------------------------------------------------ */

const favoritesService = (() => {
  const STORAGE_KEY = "dicoo_favorites";

  function getAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Dicoo: impossible de lire les favoris.", e);
      return [];
    }
  }

  function save(ids) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch (e) {
      console.warn("Dicoo: impossible d'enregistrer les favoris.", e);
    }
  }

  function isFavorite(termId) {
    return getAll().includes(Number(termId));
  }

  function addToFavorites(termId) {
    const ids = getAll();
    const id = Number(termId);
    if (!ids.includes(id)) {
      ids.unshift(id);
      save(ids);
    }
    return true;
  }

  function removeFromFavorites(termId) {
    const ids = getAll().filter((id) => id !== Number(termId));
    save(ids);
    return true;
  }

  function toggleFavorite(termId) {
    if (isFavorite(termId)) {
      removeFromFavorites(termId);
      return false;
    }
    addToFavorites(termId);
    return true;
  }

  function clearFavorites() {
    save([]);
  }

  function count() {
    return getAll().length;
  }

  return {
    getAll,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
    count
  };
})();
