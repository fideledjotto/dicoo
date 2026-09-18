# Dicoo — « Le dictionnaire qui parle votre domaine. »

Dicoo est un dictionnaire spécialisé multidomaine et bilingue (français / anglais),
destiné aux étudiants, professionnels, enseignants, chercheurs et à toute personne
souhaitant comprendre un terme dans le contexte précis d'un domaine.

Ce dépôt contient le **front-end complet** de l'application. Il fonctionne
entièrement sans back-end (les données sont locales, dans `js/data.js`) et est
prêt à être connecté à une future API.

## Démarrer

Aucune installation n'est nécessaire : ouvrez simplement `index.html` dans un
navigateur. Pour un rendu optimal (et éviter d'éventuelles restrictions de
certains navigateurs sur les fichiers ouverts en local), vous pouvez aussi
servir le dossier avec un petit serveur statique, par exemple :

```bash
npx serve .
# ou
python3 -m http.server 8080
```

## Structure du projet

```
Dicoo/
├── index.html          Accueil (hero, recherche, mot du jour, domaines)
├── domaines.html        Liste des 60+ domaines, avec catégories et recherche
├── dictionnaire.html    Dictionnaire complet : recherche + filtres
├── terme.html            Fiche détaillée d'un terme (?terme=NomDuTerme)
├── favoris.html          Termes ajoutés aux favoris (localStorage)
├── historique.html       Historique des consultations (localStorage)
├── a-propos.html         Présentation du projet
│
├── css/
│   ├── style.css         Design system, typographie, composants
│   ├── responsive.css    Points de rupture et mise en page adaptative
│   └── animations.css    Keyframes, transitions, micro-interactions
│
├── js/
│   ├── data.js           Données (domaines, termes) + dataService (point
│   │                     d'entrée unique, prêt à être branché sur une API)
│   ├── search.js         Recherche bilingue, insensible aux accents/majuscules
│   ├── dictionary.js     Logique des pages liées au dictionnaire (accueil,
│   │                     domaines, dictionnaire, fiche terme)
│   ├── favorites.js      Gestion des favoris (localStorage)
│   ├── history.js        Gestion de l'historique de recherche (localStorage)
│   ├── ui.js              Composants d'interface réutilisables, thème sombre,
│   │                     menu mobile, animations, toasts
│   └── app.js             Point d'entrée : initialisation commune + routage
│                          par page (favoris/historique inclus)
│
└── assets/
    ├── images/
    └── icons/            (Les icônes utilisées proviennent de Bootstrap Icons via CDN)
```

## Fonctionnalités

- Recherche bilingue français/anglais (insensible aux accents et à la casse)
- Traduction FR ↔ EN sur chaque fiche de terme, avec inversion du sens
- Navigation par domaine (60+ domaines, filtrables par catégorie)
- Filtres du dictionnaire : domaine, langue, niveau, type
- Favoris et historique persistés en `localStorage`
- Mode sombre avec préférence sauvegardée
- Menu mobile, recherche accessible en un tap, cibles tactiles confortables
- Animations et transitions mesurées (apparition au scroll, micro-interactions)
- HTML sémantique, labels ARIA, focus visible, navigation clavier

## Préparer le futur back-end

Toute la donnée transite par `dataService` (`js/data.js`). Aujourd'hui :

```js
async function getTerms() {
  return dictionaryData;
}
```

Demain, il suffira de remplacer le corps de chaque fonction par un appel à
l'API, sans toucher au reste de l'application :

```js
async function getTerms() {
  const response = await fetch("/api/terms");
  return response.json();
}
```

## Technologies

HTML5 · CSS3 (custom properties, keyframes) · JavaScript Vanilla (ES6+) ·
Bootstrap 5 (grille, utilitaires) · Bootstrap Icons · Google Fonts (Montserrat)
