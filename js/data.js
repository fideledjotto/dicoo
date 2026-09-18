/**
 * data.js
 * ------------------------------------------------------------------
 * Source de données de Dicoo (front-end autonome).
 *
 * Ce fichier NE CONTIENT AUCUNE LOGIQUE D'AFFICHAGE NI DE DOM.
 * Il expose uniquement des données et des fonctions d'accès aux données
 * (dataService), afin qu'il soit trivial de remplacer plus tard le
 * stockage local par de vrais appels à une API back-end.
 *
 * Quand le back-end existera, il suffira de remplacer le corps des
 * fonctions du dataService (ex: getTerms, getDomains) par des appels
 * fetch("/api/...") : le reste de l'application (search.js, ui.js,
 * dictionary.js...) n'aura pas à changer, car il consomme uniquement
 * le dataService.
 * ------------------------------------------------------------------ */

/* ============================= DOMAINES ============================= */
/**
 * categoriesData : regroupements utilisés pour organiser les 60+
 * domaines dans une UX lisible (page domaines.html).
 */
const categoriesData = [
  { id: "sciences-tech", name: "Sciences & Technologies" },
  { id: "sante", name: "Santé & Médecine" },
  { id: "humaines", name: "Sciences humaines & sociales" },
  { id: "droit-gestion", name: "Droit & Gestion" },
  { id: "ingenierie", name: "Ingénierie & Industrie" },
  { id: "vie-environnement", name: "Sciences de la vie & Environnement" },
  { id: "commerce", name: "Économie & Commerce" },
  { id: "arts-education", name: "Arts & Éducation" }
];

/**
 * domainsData : liste des domaines couverts par Dicoo.
 * icon : classe Bootstrap Icons (bi-...)
 * termCount : nombre affiché à titre indicatif dans l'interface.
 */
const domainsData = [
  // Sciences & Technologies
  { id: 1, slug: "informatique", name: "Informatique", category: "sciences-tech", icon: "bi-cpu", description: "Les fondamentaux du traitement de l'information et des systèmes numériques.", termCount: 1250 },
  { id: 2, slug: "developpement-web", name: "Développement web", category: "sciences-tech", icon: "bi-code-slash", description: "Le vocabulaire des langages, frameworks et pratiques du web.", termCount: 940 },
  { id: 3, slug: "intelligence-artificielle", name: "Intelligence artificielle", category: "sciences-tech", icon: "bi-stars", description: "Apprentissage automatique, réseaux de neurones et raisonnement machine.", termCount: 610 },
  { id: 4, slug: "cybersecurite", name: "Cybersécurité", category: "sciences-tech", icon: "bi-shield-lock", description: "Protection des systèmes, des données et des réseaux.", termCount: 480 },
  { id: 5, slug: "data-science", name: "Data Science", category: "sciences-tech", icon: "bi-bar-chart", description: "Analyse, modélisation et valorisation des données.", termCount: 530 },
  { id: 6, slug: "reseaux", name: "Réseaux", category: "sciences-tech", icon: "bi-diagram-3", description: "Architecture et protocoles des réseaux informatiques.", termCount: 390 },
  { id: 7, slug: "telecommunications", name: "Télécommunications", category: "sciences-tech", icon: "bi-broadcast", description: "Transmission de l'information à distance.", termCount: 310 },
  { id: 8, slug: "mathematiques", name: "Mathématiques", category: "sciences-tech", icon: "bi-calculator", description: "Concepts fondamentaux et appliqués des mathématiques.", termCount: 720 },
  { id: 9, slug: "physique", name: "Physique", category: "sciences-tech", icon: "bi-magnet", description: "Lois et phénomènes du monde physique.", termCount: 560 },
  { id: 10, slug: "electronique", name: "Électronique", category: "sciences-tech", icon: "bi-lightning-charge", description: "Composants, circuits et systèmes électroniques.", termCount: 340 },
  { id: 11, slug: "robotique", name: "Robotique", category: "sciences-tech", icon: "bi-gear", description: "Conception et commande des systèmes robotisés.", termCount: 260 },
  { id: 12, slug: "automatisation", name: "Automatisation", category: "sciences-tech", icon: "bi-arrow-repeat", description: "Automatisation des processus industriels et numériques.", termCount: 220 },

  // Santé & Médecine
  { id: 13, slug: "medecine", name: "Médecine", category: "sante", icon: "bi-heart-pulse", description: "Diagnostic, pathologies et pratique clinique.", termCount: 1580 },
  { id: 14, slug: "pharmacie", name: "Pharmacie", category: "sante", icon: "bi-capsule", description: "Médicaments, formulation et dispensation.", termCount: 640 },
  { id: 15, slug: "biologie", name: "Biologie", category: "sante", icon: "bi-droplet-half", description: "Le vivant, ses mécanismes et sa classification.", termCount: 890 },
  { id: 16, slug: "sante-publique", name: "Santé publique", category: "sante", icon: "bi-clipboard2-pulse", description: "Prévention et politiques de santé des populations.", termCount: 410 },
  { id: 17, slug: "nutrition", name: "Nutrition", category: "sante", icon: "bi-egg-fried", description: "Alimentation et équilibre nutritionnel.", termCount: 280 },
  { id: 18, slug: "dentisterie", name: "Dentisterie", category: "sante", icon: "bi-emoji-smile", description: "Soins et santé bucco-dentaire.", termCount: 230 },
  { id: 19, slug: "kinesitherapie", name: "Kinésithérapie", category: "sante", icon: "bi-person-arms-up", description: "Rééducation fonctionnelle et mouvement.", termCount: 190 },
  { id: 20, slug: "psychologie", name: "Psychologie", category: "sante", icon: "bi-chat-heart", description: "Fonctionnement psychique et comportement humain.", termCount: 710 },

  // Sciences humaines & sociales
  { id: 21, slug: "sociologie", name: "Sociologie", category: "humaines", icon: "bi-people", description: "Structures sociales, groupes et interactions humaines.", termCount: 1250 },
  { id: 22, slug: "philosophie", name: "Philosophie", category: "humaines", icon: "bi-lightbulb", description: "Pensée, éthique et théories de la connaissance.", termCount: 630 },
  { id: 23, slug: "histoire", name: "Histoire", category: "humaines", icon: "bi-hourglass-split", description: "Événements, périodes et analyse du passé.", termCount: 920 },
  { id: 24, slug: "geographie", name: "Géographie", category: "humaines", icon: "bi-globe-americas", description: "Espaces, territoires et organisation du monde.", termCount: 540 },
  { id: 25, slug: "anthropologie", name: "Anthropologie", category: "humaines", icon: "bi-person-badge", description: "Cultures et sociétés humaines dans leur diversité.", termCount: 310 },
  { id: 26, slug: "sciences-politiques", name: "Sciences politiques", category: "humaines", icon: "bi-bank", description: "Pouvoir, institutions et systèmes politiques.", termCount: 480 },
  { id: 27, slug: "sciences-information", name: "Sciences de l'information", category: "humaines", icon: "bi-info-circle", description: "Traitement, diffusion et organisation de l'information.", termCount: 260 },
  { id: 28, slug: "linguistique", name: "Linguistique", category: "humaines", icon: "bi-translate", description: "Structure, sens et évolution des langues.", termCount: 470 },
  { id: 29, slug: "litterature", name: "Littérature", category: "humaines", icon: "bi-book", description: "Œuvres, genres et courants littéraires.", termCount: 680 },
  { id: 30, slug: "theologie", name: "Théologie", category: "humaines", icon: "bi-moon-stars", description: "Étude des religions et du fait spirituel.", termCount: 240 },

  // Droit & Gestion
  { id: 31, slug: "droit", name: "Droit", category: "droit-gestion", icon: "bi-file-earmark-ruled", description: "Règles juridiques, textes et jurisprudence.", termCount: 1340 },
  { id: 32, slug: "economie", name: "Économie", category: "droit-gestion", icon: "bi-graph-up-arrow", description: "Production, échange et politiques économiques.", termCount: 980 },
  { id: 33, slug: "gestion", name: "Gestion", category: "droit-gestion", icon: "bi-kanban", description: "Pilotage des organisations et des projets.", termCount: 520 },
  { id: 34, slug: "finance", name: "Finance", category: "droit-gestion", icon: "bi-cash-coin", description: "Marchés financiers, investissement et gestion du capital.", termCount: 760 },
  { id: 35, slug: "comptabilite", name: "Comptabilité", category: "droit-gestion", icon: "bi-receipt", description: "Enregistrement et analyse des flux financiers.", termCount: 430 },
  { id: 36, slug: "marketing", name: "Marketing", category: "droit-gestion", icon: "bi-megaphone", description: "Stratégies de marché et relation client.", termCount: 590 },
  { id: 37, slug: "communication", name: "Communication", category: "droit-gestion", icon: "bi-chat-dots", description: "Transmission de messages et relations publiques.", termCount: 350 },
  { id: 38, slug: "journalisme", name: "Journalisme", category: "droit-gestion", icon: "bi-newspaper", description: "Collecte, vérification et diffusion de l'information.", termCount: 290 },
  { id: 39, slug: "ressources-humaines", name: "Ressources humaines", category: "droit-gestion", icon: "bi-people-fill", description: "Gestion des talents et des relations de travail.", termCount: 310 },
  { id: 40, slug: "relations-internationales", name: "Relations internationales", category: "droit-gestion", icon: "bi-globe2", description: "Diplomatie et relations entre États.", termCount: 270 },

  // Ingénierie & Industrie
  { id: 41, slug: "architecture", name: "Architecture", category: "ingenierie", icon: "bi-building", description: "Conception des espaces et des bâtiments.", termCount: 420 },
  { id: 42, slug: "genie-civil", name: "Génie civil", category: "ingenierie", icon: "bi-bricks", description: "Conception et construction des infrastructures.", termCount: 380 },
  { id: 43, slug: "genie-electrique", name: "Génie électrique", category: "ingenierie", icon: "bi-lightning-fill", description: "Systèmes électriques et énergie appliquée.", termCount: 330 },
  { id: 44, slug: "genie-mecanique", name: "Génie mécanique", category: "ingenierie", icon: "bi-gear-wide-connected", description: "Conception mécanique et systèmes industriels.", termCount: 300 },
  { id: 45, slug: "genie-industriel", name: "Génie industriel", category: "ingenierie", icon: "bi-diagram-2", description: "Optimisation des processus de production.", termCount: 210 },
  { id: 46, slug: "energie", name: "Énergie", category: "ingenierie", icon: "bi-battery-charging", description: "Production, stockage et transition énergétique.", termCount: 260 },
  { id: 47, slug: "metallurgie", name: "Métallurgie", category: "ingenierie", icon: "bi-tools", description: "Transformation et propriétés des métaux.", termCount: 180 },

  // Sciences de la vie & Environnement
  { id: 48, slug: "agriculture", name: "Agriculture", category: "vie-environnement", icon: "bi-tree", description: "Production végétale et pratiques agricoles.", termCount: 470 },
  { id: 49, slug: "agronomie", name: "Agronomie", category: "vie-environnement", icon: "bi-flower3", description: "Science des sols, des cultures et des rendements.", termCount: 310 },
  { id: 50, slug: "elevage", name: "Élevage", category: "vie-environnement", icon: "bi-egg", description: "Production et santé animale.", termCount: 240 },
  { id: 51, slug: "environnement", name: "Environnement", category: "vie-environnement", icon: "bi-recycle", description: "Préservation des écosystèmes et durabilité.", termCount: 400 },
  { id: 52, slug: "geologie", name: "Géologie", category: "vie-environnement", icon: "bi-gem", description: "Structure et histoire de la Terre.", termCount: 350 },
  { id: 53, slug: "ecologie", name: "Écologie", category: "vie-environnement", icon: "bi-globe-europe-africa", description: "Relations entre les êtres vivants et leur milieu.", termCount: 320 },
  { id: 54, slug: "oceanographie", name: "Océanographie", category: "vie-environnement", icon: "bi-water", description: "Étude physique, chimique et biologique des océans.", termCount: 170 },
  { id: 55, slug: "meteorologie", name: "Météorologie", category: "vie-environnement", icon: "bi-cloud-sun", description: "Prévision et dynamique de l'atmosphère.", termCount: 200 },

  // Économie & Commerce
  { id: 56, slug: "commerce", name: "Commerce", category: "commerce", icon: "bi-shop", description: "Échanges commerciaux et distribution.", termCount: 360 },
  { id: 57, slug: "logistique", name: "Logistique", category: "commerce", icon: "bi-truck", description: "Gestion des flux et de la chaîne d'approvisionnement.", termCount: 290 },
  { id: 58, slug: "transport", name: "Transport", category: "commerce", icon: "bi-signpost-split", description: "Déplacement des biens et des personnes.", termCount: 250 },
  { id: 59, slug: "tourisme", name: "Tourisme", category: "commerce", icon: "bi-airplane", description: "Voyages, destinations et industrie touristique.", termCount: 220 },
  { id: 60, slug: "hotellerie", name: "Hôtellerie", category: "commerce", icon: "bi-cup-hot", description: "Accueil et services hôteliers.", termCount: 190 },

  // Arts & Éducation
  { id: 61, slug: "arts", name: "Arts", category: "arts-education", icon: "bi-palette", description: "Création plastique, courants et techniques artistiques.", termCount: 410 },
  { id: 62, slug: "design", name: "Design", category: "arts-education", icon: "bi-pencil", description: "Conception visuelle, produit et expérience.", termCount: 300 },
  { id: 63, slug: "sport", name: "Sport", category: "arts-education", icon: "bi-trophy", description: "Disciplines sportives et sciences du mouvement.", termCount: 350 },
  { id: 64, slug: "education", name: "Éducation", category: "arts-education", icon: "bi-mortarboard", description: "Pédagogie, apprentissage et systèmes éducatifs.", termCount: 460 },
  { id: 65, slug: "musique", name: "Musique", category: "arts-education", icon: "bi-music-note-beamed", description: "Théorie musicale, genres et instruments.", termCount: 380 },
  { id: 66, slug: "cinema", name: "Cinéma", category: "arts-education", icon: "bi-camera-reels", description: "Langage cinématographique et production audiovisuelle.", termCount: 270 }
];

/* ============================ TERMES ================================ */
/**
 * dictionaryData : entrées du dictionnaire.
 * - primaryLanguage : langue "native" du terme ("fr" ou "en").
 * - translations : traductions disponibles.
 * - relatedTerms : termes associés (par leur "term" exact, résolus à l'affichage).
 */
const dictionaryData = [
  {
    id: 1,
    term: "Algorithme",
    primaryLanguage: "fr",
    domain: "Informatique",
    domainSlug: "informatique",
    category: "Programmation",
    translations: { fr: "Algorithme", en: "Algorithm" },
    shortDefinition: "Suite finie et ordonnée d'instructions permettant de résoudre un problème.",
    definition: "En informatique, un algorithme est une suite finie et non ambiguë d'instructions ou d'opérations permettant de résoudre un problème ou d'obtenir un résultat déterminé à partir de données d'entrée. Il constitue la base de tout programme informatique.",
    simpleDefinition: "C'est une recette d'étapes à suivre, dans l'ordre, pour arriver à un résultat précis — un peu comme une recette de cuisine, mais pour un ordinateur.",
    examples: [
      "Un algorithme décrit une suite d'étapes permettant de résoudre un problème.",
      "L'algorithme de tri rapide (quicksort) classe une liste en un temps moyen très efficace."
    ],
    professionalExample: "Dans une équipe de développement, on choisit un algorithme de recherche en fonction de la taille des données et du temps d'exécution acceptable en production.",
    relatedTerms: ["Programmation", "Code", "Fonction", "Complexité algorithmique", "Structure de données"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 2,
    term: "API",
    primaryLanguage: "en",
    domain: "Informatique",
    domainSlug: "informatique",
    category: "Programmation",
    translations: { fr: "Interface de programmation applicative", en: "API" },
    shortDefinition: "Interface permettant à deux logiciels de communiquer entre eux.",
    definition: "Une API (Application Programming Interface) est un ensemble de règles et de définitions qui permet à des applications logicielles de communiquer entre elles, en exposant certaines fonctionnalités ou données sans révéler le fonctionnement interne du système.",
    simpleDefinition: "C'est comme un menu de restaurant : tu choisis ce que tu veux, et la cuisine (le système) s'occupe de le préparer sans que tu aies besoin de savoir comment.",
    examples: [
      "L'application météo utilise une API pour récupérer les prévisions en temps réel.",
      "Les développeurs consomment l'API de paiement pour intégrer un système de règlement en ligne."
    ],
    professionalExample: "Une entreprise expose une API REST à ses partenaires afin qu'ils puissent intégrer son catalogue de produits dans leurs propres sites.",
    relatedTerms: ["Backend", "REST", "Serveur", "Requête HTTP", "Développement web"],
    level: "Intermédiaire",
    type: "Acronyme"
  },
  {
    id: 3,
    term: "Deployment",
    primaryLanguage: "en",
    domain: "Développement web",
    domainSlug: "developpement-web",
    category: "Mise en production",
    translations: { fr: "Déploiement", en: "Deployment" },
    shortDefinition: "Mise à disposition d'une application sur un environnement de production.",
    definition: "Le déploiement désigne l'ensemble des opérations permettant de rendre une application ou une mise à jour disponible et fonctionnelle sur un serveur ou un environnement de production, accessible aux utilisateurs finaux.",
    simpleDefinition: "C'est le moment où le site ou l'application, développé en coulisses, est enfin mis en ligne pour que tout le monde puisse l'utiliser.",
    examples: [
      "Le déploiement de la nouvelle version s'est fait sans interruption de service.",
      "L'équipe automatise son déploiement grâce à un pipeline d'intégration continue."
    ],
    professionalExample: "Avant chaque déploiement en production, l'équipe DevOps exécute une suite de tests automatisés pour limiter les risques de régression.",
    relatedTerms: ["Serveur", "Intégration continue", "Environnement de production", "Versioning"],
    level: "Intermédiaire",
    type: "Terme"
  },
  {
    id: 4,
    term: "Framework",
    primaryLanguage: "en",
    domain: "Développement web",
    domainSlug: "developpement-web",
    category: "Outils",
    translations: { fr: "Cadre de développement", en: "Framework" },
    shortDefinition: "Ensemble structuré d'outils et de bibliothèques facilitant le développement.",
    definition: "Un framework est un cadre de travail logiciel qui fournit une structure, des conventions et des bibliothèques réutilisables afin d'accélérer et de standardiser le développement d'applications.",
    simpleDefinition: "C'est une boîte à outils déjà organisée qui évite de tout reconstruire depuis zéro à chaque nouveau projet.",
    examples: [
      "React est un framework (plus précisément une bibliothèque) très utilisé pour créer des interfaces utilisateur.",
      "Le framework impose une organisation précise des fichiers du projet."
    ],
    professionalExample: "Choisir un framework adapté à la taille de l'équipe et à la maintenabilité du projet est une décision technique stratégique.",
    relatedTerms: ["Bibliothèque", "Développement web", "Architecture logicielle"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 5,
    term: "Machine Learning",
    primaryLanguage: "en",
    domain: "Intelligence artificielle",
    domainSlug: "intelligence-artificielle",
    category: "Apprentissage automatique",
    translations: { fr: "Apprentissage automatique", en: "Machine Learning" },
    shortDefinition: "Ensemble de méthodes permettant à un système d'apprendre à partir de données.",
    definition: "Le machine learning est un sous-domaine de l'intelligence artificielle qui regroupe des méthodes permettant à un système informatique d'améliorer ses performances sur une tâche donnée en s'appuyant sur l'analyse de données, sans être explicitement programmé pour chaque cas.",
    simpleDefinition: "C'est la capacité d'un ordinateur à apprendre à partir d'exemples, un peu comme un enfant qui apprend à reconnaître un chat en en voyant plusieurs.",
    examples: [
      "Le machine learning permet de détecter des fraudes bancaires à partir de l'historique des transactions.",
      "Un modèle de machine learning est entraîné sur des milliers d'images étiquetées."
    ],
    professionalExample: "Une équipe data science évalue plusieurs modèles de machine learning avant de sélectionner celui offrant le meilleur compromis précision/coût.",
    relatedTerms: ["Intelligence artificielle", "Réseau de neurones", "Data Science", "Algorithme"],
    level: "Intermédiaire",
    type: "Concept"
  },
  {
    id: 6,
    term: "Socialisation",
    primaryLanguage: "fr",
    domain: "Sociologie",
    domainSlug: "sociologie",
    category: "Concepts fondamentaux",
    translations: { fr: "Socialisation", en: "Socialization" },
    shortDefinition: "Processus par lequel un individu intériorise les normes et valeurs de sa société.",
    definition: "La socialisation désigne le processus par lequel un individu apprend et intériorise, tout au long de sa vie, les normes, les valeurs et les codes de comportement propres à la société et aux groupes sociaux auxquels il appartient.",
    simpleDefinition: "C'est la façon dont on apprend, dès l'enfance, à vivre avec les autres en suivant les règles non écrites de la société.",
    examples: [
      "La famille est le premier agent de socialisation de l'enfant.",
      "La socialisation secondaire se poursuit à l'école, au travail et dans les groupes sociaux."
    ],
    professionalExample: "Un sociologue étudie comment la socialisation professionnelle transforme les représentations des nouveaux employés dans une entreprise.",
    relatedTerms: ["Norme sociale", "Habitus", "Culture", "Groupe social"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 7,
    term: "Habitus",
    primaryLanguage: "fr",
    domain: "Sociologie",
    domainSlug: "sociologie",
    category: "Concepts fondamentaux",
    translations: { fr: "Habitus", en: "Habitus" },
    shortDefinition: "Système de dispositions durables acquises par l'individu au fil de ses expériences sociales.",
    definition: "Concept développé notamment par Pierre Bourdieu, l'habitus désigne un système de dispositions durables et transposables, acquis par l'individu au cours de sa trajectoire sociale, qui structure ses perceptions, ses jugements et ses actions.",
    simpleDefinition: "Ce sont les réflexes et façons de penser qu'on développe sans s'en rendre compte, à force de grandir dans un certain milieu social.",
    examples: [
      "L'habitus explique en partie la reproduction des inégalités sociales d'une génération à l'autre.",
      "Le goût culturel est fortement influencé par l'habitus de classe."
    ],
    professionalExample: "En sociologie de l'éducation, l'habitus permet d'expliquer pourquoi certains élèves se sentent plus à l'aise que d'autres face aux codes scolaires.",
    relatedTerms: ["Socialisation", "Capital culturel", "Classe sociale"],
    level: "Avancé",
    type: "Concept"
  },
  {
    id: 8,
    term: "Hypertension",
    primaryLanguage: "fr",
    domain: "Médecine",
    domainSlug: "medecine",
    category: "Cardiologie",
    translations: { fr: "Hypertension", en: "Hypertension" },
    shortDefinition: "Élévation anormale et prolongée de la pression artérielle.",
    definition: "L'hypertension artérielle est une élévation chronique de la pression exercée par le sang sur la paroi des artères, généralement définie par une pression systolique supérieure à 140 mmHg et/ou diastolique supérieure à 90 mmHg.",
    simpleDefinition: "C'est quand le sang pousse trop fort contre les parois des artères, ce qui fatigue le cœur sur le long terme.",
    examples: [
      "L'hypertension non traitée augmente le risque d'accident vasculaire cérébral.",
      "Le médecin recommande une réduction du sel pour contrôler l'hypertension."
    ],
    professionalExample: "En consultation, le suivi de l'hypertension repose sur des mesures régulières de la tension et un ajustement progressif du traitement.",
    relatedTerms: ["Pression artérielle", "Cardiologie", "Facteur de risque"],
    level: "Intermédiaire",
    type: "Terme"
  },
  {
    id: 9,
    term: "Posologie",
    primaryLanguage: "fr",
    domain: "Pharmacie",
    domainSlug: "pharmacie",
    category: "Prescription",
    translations: { fr: "Posologie", en: "Dosage" },
    shortDefinition: "Indication de la dose et du rythme de prise d'un médicament.",
    definition: "La posologie désigne les indications précises sur la quantité de médicament à administrer, la fréquence des prises et la durée du traitement, afin d'en garantir l'efficacité et la sécurité.",
    simpleDefinition: "C'est simplement le mode d'emploi d'un médicament : combien en prendre, et à quel moment.",
    examples: [
      "La posologie doit être adaptée au poids et à l'âge du patient.",
      "Ne jamais dépasser la posologie indiquée sur la notice."
    ],
    professionalExample: "Le pharmacien vérifie la posologie prescrite pour détecter d'éventuelles interactions médicamenteuses avant la délivrance.",
    relatedTerms: ["Médicament", "Prescription", "Interaction médicamenteuse"],
    level: "Débutant",
    type: "Terme"
  },
  {
    id: 10,
    term: "Jurisprudence",
    primaryLanguage: "fr",
    domain: "Droit",
    domainSlug: "droit",
    category: "Sources du droit",
    translations: { fr: "Jurisprudence", en: "Case law" },
    shortDefinition: "Ensemble des décisions rendues par les tribunaux sur une question de droit.",
    definition: "La jurisprudence désigne l'ensemble des décisions rendues par les juridictions, qui permettent d'interpréter et de préciser l'application des règles de droit, et qui peuvent servir de référence pour des affaires similaires.",
    simpleDefinition: "Ce sont les décisions déjà prises par les juges dans le passé, qui aident à comprendre comment la loi s'applique concrètement.",
    examples: [
      "Cette décision fait désormais jurisprudence en matière de droit du travail.",
      "L'avocat s'appuie sur la jurisprudence de la Cour de cassation."
    ],
    professionalExample: "Un cabinet d'avocats consulte systématiquement la jurisprudence récente avant de construire son argumentation devant le tribunal.",
    relatedTerms: ["Droit", "Loi", "Tribunal", "Doctrine"],
    level: "Intermédiaire",
    type: "Concept"
  },
  {
    id: 11,
    term: "Contrat",
    primaryLanguage: "fr",
    domain: "Droit",
    domainSlug: "droit",
    category: "Droit des obligations",
    translations: { fr: "Contrat", en: "Contract" },
    shortDefinition: "Accord de volontés créant des obligations entre les parties.",
    definition: "Un contrat est un accord de volontés entre deux ou plusieurs parties, destiné à créer, modifier, transmettre ou éteindre des obligations juridiques, et dont l'exécution peut être exigée en justice.",
    simpleDefinition: "C'est une promesse écrite (ou orale) entre deux personnes ou entreprises, qui doit être respectée sous peine de sanctions.",
    examples: [
      "Le contrat de travail précise les droits et devoirs de l'employeur et du salarié.",
      "Une clause de résiliation figure dans presque tous les contrats commerciaux."
    ],
    professionalExample: "Le juriste d'entreprise relit chaque contrat fournisseur afin d'en sécuriser les clauses de responsabilité.",
    relatedTerms: ["Jurisprudence", "Obligation", "Clause", "Droit"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 12,
    term: "Agroécologie",
    primaryLanguage: "fr",
    domain: "Agriculture",
    domainSlug: "agriculture",
    category: "Pratiques agricoles",
    translations: { fr: "Agroécologie", en: "Agroecology" },
    shortDefinition: "Approche agricole qui s'appuie sur les principes de l'écologie.",
    definition: "L'agroécologie est une approche de production agricole qui applique les concepts et principes de l'écologie à la conception et à la gestion de systèmes agricoles durables, en réduisant la dépendance aux intrants chimiques.",
    simpleDefinition: "C'est une façon de cultiver la terre en travaillant avec la nature plutôt que contre elle, pour préserver les sols sur le long terme.",
    examples: [
      "La rotation des cultures est une pratique centrale en agroécologie.",
      "Plusieurs exploitations se tournent vers l'agroécologie pour réduire leur usage de pesticides."
    ],
    professionalExample: "Un ingénieur agronome accompagne des exploitants dans la transition vers des pratiques agroécologiques adaptées à leur sol.",
    relatedTerms: ["Agronomie", "Rotation des cultures", "Environnement"],
    level: "Intermédiaire",
    type: "Concept"
  },
  {
    id: 13,
    term: "Irrigation",
    primaryLanguage: "fr",
    domain: "Agriculture",
    domainSlug: "agriculture",
    category: "Techniques agricoles",
    translations: { fr: "Irrigation", en: "Irrigation" },
    shortDefinition: "Apport artificiel d'eau aux cultures.",
    definition: "L'irrigation est l'ensemble des techniques permettant d'apporter artificiellement de l'eau aux cultures, afin de compenser une pluviométrie insuffisante et d'optimiser les rendements agricoles.",
    simpleDefinition: "C'est le fait d'arroser les champs quand la pluie ne suffit pas.",
    examples: [
      "L'irrigation goutte-à-goutte permet d'économiser une grande quantité d'eau.",
      "La région dépend fortement de l'irrigation pendant la saison sèche."
    ],
    professionalExample: "Le technicien agricole calcule les besoins en irrigation en fonction du type de sol et de la culture pratiquée.",
    relatedTerms: ["Agriculture", "Agronomie", "Rendement"],
    level: "Débutant",
    type: "Terme"
  },
  {
    id: 14,
    term: "Inflation",
    primaryLanguage: "fr",
    domain: "Économie",
    domainSlug: "economie",
    category: "Macroéconomie",
    translations: { fr: "Inflation", en: "Inflation" },
    shortDefinition: "Hausse générale et durable du niveau des prix.",
    definition: "L'inflation désigne une augmentation générale et durable du niveau des prix des biens et services dans une économie, entraînant une baisse du pouvoir d'achat de la monnaie.",
    simpleDefinition: "C'est quand les prix augmentent globalement, si bien que le même argent permet d'acheter un peu moins qu'avant.",
    examples: [
      "La banque centrale relève ses taux directeurs pour lutter contre l'inflation.",
      "L'inflation a fortement réduit le pouvoir d'achat des ménages cette année."
    ],
    professionalExample: "Un économiste analyse les causes de l'inflation pour anticiper l'évolution des taux d'intérêt.",
    relatedTerms: ["Pouvoir d'achat", "Taux d'intérêt", "Politique monétaire"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 15,
    term: "Offre et demande",
    primaryLanguage: "fr",
    domain: "Économie",
    domainSlug: "economie",
    category: "Microéconomie",
    translations: { fr: "Offre et demande", en: "Supply and demand" },
    shortDefinition: "Mécanisme fondamental déterminant le prix d'un bien sur un marché.",
    definition: "La loi de l'offre et de la demande est un principe économique selon lequel le prix d'un bien ou d'un service sur un marché concurrentiel tend vers un équilibre déterminé par la quantité offerte par les vendeurs et la quantité demandée par les acheteurs.",
    simpleDefinition: "Plus un produit est demandé et rare, plus son prix a tendance à monter ; plus il est abondant et peu demandé, plus il baisse.",
    examples: [
      "Le prix du billet d'avion varie selon l'offre et la demande à l'approche des vacances.",
      "Un déséquilibre entre l'offre et la demande peut provoquer une pénurie."
    ],
    professionalExample: "Un analyste de marché étudie l'évolution de l'offre et de la demande avant de recommander une stratégie de prix.",
    relatedTerms: ["Inflation", "Marché", "Prix d'équilibre"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 16,
    term: "Biais cognitif",
    primaryLanguage: "fr",
    domain: "Psychologie",
    domainSlug: "psychologie",
    category: "Psychologie cognitive",
    translations: { fr: "Biais cognitif", en: "Cognitive bias" },
    shortDefinition: "Distorsion systématique du jugement par rapport à la réalité objective.",
    definition: "Un biais cognitif est un mécanisme de pensée qui conduit à une déviation systématique du jugement ou du raisonnement par rapport à une norme logique ou rationnelle, souvent lié à des raccourcis mentaux utilisés par le cerveau.",
    simpleDefinition: "C'est quand notre cerveau prend un raccourci et nous fait juger une situation de façon déformée, sans qu'on s'en rende compte.",
    examples: [
      "Le biais de confirmation pousse à privilégier les informations qui confirment nos croyances.",
      "L'effet de halo est un biais cognitif fréquent dans les entretiens de recrutement."
    ],
    professionalExample: "En UX design, connaître les biais cognitifs aide à comprendre pourquoi les utilisateurs interprètent une interface d'une certaine façon.",
    relatedTerms: ["Psychologie", "Perception", "Heuristique"],
    level: "Intermédiaire",
    type: "Concept"
  },
  {
    id: 17,
    term: "Résilience",
    primaryLanguage: "fr",
    domain: "Psychologie",
    domainSlug: "psychologie",
    category: "Psychologie clinique",
    translations: { fr: "Résilience", en: "Resilience" },
    shortDefinition: "Capacité à surmonter un traumatisme ou une épreuve.",
    definition: "La résilience désigne la capacité d'un individu à faire face à une épreuve, un traumatisme ou une situation adverse, et à se reconstruire positivement malgré les difficultés rencontrées.",
    simpleDefinition: "C'est la capacité à se relever après un coup dur et à continuer d'avancer.",
    examples: [
      "Le soutien social joue un rôle important dans le développement de la résilience.",
      "La résilience ne signifie pas l'absence de souffrance, mais la capacité à la traverser."
    ],
    professionalExample: "Un psychologue clinicien accompagne son patient dans la construction de mécanismes de résilience après un événement traumatique.",
    relatedTerms: ["Psychologie", "Traumatisme", "Bien-être"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 18,
    term: "Actif",
    primaryLanguage: "fr",
    domain: "Finance",
    domainSlug: "finance",
    category: "Marchés financiers",
    translations: { fr: "Actif", en: "Asset" },
    shortDefinition: "Bien ou droit ayant une valeur économique positive pour son détenteur.",
    definition: "En finance, un actif est un élément du patrimoine ayant une valeur économique positive, susceptible de générer des flux de trésorerie futurs ou d'être vendu, tel qu'une action, une obligation ou un bien immobilier.",
    simpleDefinition: "C'est tout ce qui a de la valeur et qu'on possède : de l'argent, des actions, un bien immobilier...",
    examples: [
      "Un portefeuille diversifié répartit les actifs entre actions, obligations et liquidités.",
      "La valeur des actifs de l'entreprise a augmenté cette année."
    ],
    professionalExample: "Un gestionnaire de patrimoine réévalue régulièrement la répartition des actifs selon le profil de risque du client.",
    relatedTerms: ["Action", "Obligation", "Portefeuille"],
    level: "Débutant",
    type: "Terme"
  },
  {
    id: 19,
    term: "Liquidité",
    primaryLanguage: "fr",
    domain: "Finance",
    domainSlug: "finance",
    category: "Gestion financière",
    translations: { fr: "Liquidité", en: "Liquidity" },
    shortDefinition: "Capacité d'un actif à être rapidement converti en argent disponible.",
    definition: "La liquidité désigne la facilité et la rapidité avec lesquelles un actif peut être converti en monnaie disponible sans perte de valeur significative, ainsi que la capacité d'une entreprise à honorer ses engagements à court terme.",
    simpleDefinition: "C'est la rapidité avec laquelle on peut transformer un bien en argent immédiatement utilisable.",
    examples: [
      "Les actions cotées sont généralement plus liquides que l'immobilier.",
      "L'entreprise a renforcé sa liquidité pour faire face à une baisse d'activité."
    ],
    professionalExample: "Le directeur financier surveille de près la liquidité de l'entreprise pour anticiper d'éventuelles tensions de trésorerie.",
    relatedTerms: ["Actif", "Trésorerie", "Solvabilité"],
    level: "Intermédiaire",
    type: "Concept"
  },
  {
    id: 20,
    term: "Persona",
    primaryLanguage: "en",
    domain: "Marketing",
    domainSlug: "marketing",
    category: "Stratégie marketing",
    translations: { fr: "Persona", en: "Persona" },
    shortDefinition: "Profil fictif représentant un segment type de client.",
    definition: "Un persona est un profil semi-fictif construit à partir de données réelles et d'hypothèses, représentant un segment type de client ou d'utilisateur, utilisé pour orienter les décisions marketing et produit.",
    simpleDefinition: "C'est un portrait imaginaire mais réaliste d'un client type, pour mieux comprendre ce qu'il veut et comment lui parler.",
    examples: [
      "L'équipe marketing a créé trois personas pour représenter ses principaux segments de clientèle.",
      "Chaque campagne publicitaire est adaptée en fonction du persona ciblé."
    ],
    professionalExample: "Avant de lancer un produit, l'équipe produit construit des personas à partir d'entretiens utilisateurs réels.",
    relatedTerms: ["Segmentation", "Cible", "Étude de marché"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 21,
    term: "Taux de conversion",
    primaryLanguage: "fr",
    domain: "Marketing",
    domainSlug: "marketing",
    category: "Marketing digital",
    translations: { fr: "Taux de conversion", en: "Conversion rate" },
    shortDefinition: "Proportion de visiteurs réalisant une action souhaitée.",
    definition: "Le taux de conversion mesure la proportion de visiteurs, prospects ou utilisateurs qui réalisent une action souhaitée (achat, inscription, clic...) par rapport au nombre total de visiteurs.",
    simpleDefinition: "C'est le pourcentage de personnes qui font vraiment l'action qu'on attend d'elles, parmi tous ceux qui visitent le site.",
    examples: [
      "Le taux de conversion du site a augmenté après la refonte du parcours d'achat.",
      "Un bon taux de conversion en e-commerce se situe généralement entre 2 % et 4 %."
    ],
    professionalExample: "L'équipe growth teste différentes versions d'une page pour améliorer le taux de conversion via des tests A/B.",
    relatedTerms: ["Persona", "Entonnoir de conversion", "A/B testing"],
    level: "Intermédiaire",
    type: "Terme"
  },
  {
    id: 22,
    term: "Cellule",
    primaryLanguage: "fr",
    domain: "Biologie",
    domainSlug: "biologie",
    category: "Biologie cellulaire",
    translations: { fr: "Cellule", en: "Cell" },
    shortDefinition: "Unité de base structurelle et fonctionnelle de tout être vivant.",
    definition: "La cellule est l'unité fondamentale, structurelle et fonctionnelle de tous les organismes vivants, capable de se reproduire de manière autonome et délimitée par une membrane plasmique.",
    simpleDefinition: "C'est la plus petite brique qui compose tous les êtres vivants, comme une pièce de Lego du corps humain.",
    examples: [
      "Le corps humain est composé de milliers de milliards de cellules.",
      "La division cellulaire permet la croissance et la réparation des tissus."
    ],
    professionalExample: "Un chercheur en biologie observe le comportement des cellules cancéreuses au microscope pour tester un nouveau traitement.",
    relatedTerms: ["ADN", "Membrane plasmique", "Organite"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 23,
    term: "Photosynthèse",
    primaryLanguage: "fr",
    domain: "Biologie",
    domainSlug: "biologie",
    category: "Biologie végétale",
    translations: { fr: "Photosynthèse", en: "Photosynthesis" },
    shortDefinition: "Processus par lequel les plantes convertissent la lumière en énergie chimique.",
    definition: "La photosynthèse est le processus biologique par lequel les plantes, les algues et certaines bactéries convertissent l'énergie lumineuse en énergie chimique, en produisant de la matière organique et de l'oxygène à partir de dioxyde de carbone et d'eau.",
    simpleDefinition: "C'est la façon dont les plantes fabriquent leur propre nourriture en utilisant la lumière du soleil.",
    examples: [
      "La photosynthèse a lieu principalement dans les feuilles, au niveau des chloroplastes.",
      "Sans lumière, la photosynthèse ne peut pas se produire."
    ],
    professionalExample: "Un agronome étudie l'efficacité de la photosynthèse d'une variété de blé pour améliorer son rendement.",
    relatedTerms: ["Cellule", "Chlorophylle", "Écologie"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 24,
    term: "Ransomware",
    primaryLanguage: "en",
    domain: "Cybersécurité",
    domainSlug: "cybersecurite",
    category: "Menaces informatiques",
    translations: { fr: "Rançongiciel", en: "Ransomware" },
    shortDefinition: "Logiciel malveillant qui chiffre des données contre une rançon.",
    definition: "Un ransomware est un logiciel malveillant qui chiffre les fichiers d'un système informatique et exige le paiement d'une rançon en échange de la clé permettant de les déchiffrer.",
    simpleDefinition: "C'est un virus qui bloque l'accès à tes fichiers et demande de l'argent pour les débloquer.",
    examples: [
      "L'hôpital a été paralysé pendant plusieurs jours après une attaque par ransomware.",
      "Une sauvegarde régulière des données limite l'impact d'un ransomware."
    ],
    professionalExample: "L'équipe de cybersécurité met en place une politique de sauvegarde isolée afin de réduire l'impact potentiel d'un ransomware.",
    relatedTerms: ["Cybersécurité", "Malware", "Chiffrement"],
    level: "Intermédiaire",
    type: "Terme"
  },
  {
    id: 25,
    term: "Empreinte carbone",
    primaryLanguage: "fr",
    domain: "Environnement",
    domainSlug: "environnement",
    category: "Impact environnemental",
    translations: { fr: "Empreinte carbone", en: "Carbon footprint" },
    shortDefinition: "Quantité totale de gaz à effet de serre émise par une activité.",
    definition: "L'empreinte carbone mesure la quantité totale de gaz à effet de serre émise directement ou indirectement par une activité, un produit, une organisation ou un individu, généralement exprimée en équivalent CO2.",
    simpleDefinition: "C'est une façon de mesurer combien de gaz à effet de serre on produit à travers nos activités quotidiennes.",
    examples: [
      "L'entreprise a réduit son empreinte carbone de 20 % en deux ans.",
      "Les transports représentent une part importante de l'empreinte carbone individuelle."
    ],
    professionalExample: "Un consultant en développement durable réalise un bilan carbone afin d'identifier les postes d'émission les plus importants.",
    relatedTerms: ["Environnement", "Écologie", "Développement durable"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 26,
    term: "Contrat de bail",
    primaryLanguage: "fr",
    domain: "Droit",
    domainSlug: "droit",
    category: "Droit immobilier",
    translations: { fr: "Contrat de bail", en: "Lease agreement" },
    shortDefinition: "Contrat par lequel un bien est loué en échange d'un loyer.",
    definition: "Le contrat de bail est un contrat par lequel une personne (le bailleur) met à disposition d'une autre (le locataire) un bien, en échange du paiement d'un loyer, pour une durée déterminée ou indéterminée.",
    simpleDefinition: "C'est le document qui autorise quelqu'un à habiter ou utiliser un logement en échange d'un loyer.",
    examples: [
      "Le contrat de bail précise la durée de la location et le montant du loyer.",
      "Un préavis doit être respecté avant de résilier un contrat de bail."
    ],
    professionalExample: "Un notaire vérifie les clauses du contrat de bail commercial avant sa signature par les deux parties.",
    relatedTerms: ["Contrat", "Loyer", "Locataire"],
    level: "Débutant",
    type: "Expression"
  },
  {
    id: 27,
    term: "Bilan comptable",
    primaryLanguage: "fr",
    domain: "Comptabilité",
    domainSlug: "comptabilite",
    category: "États financiers",
    translations: { fr: "Bilan comptable", en: "Balance sheet" },
    shortDefinition: "Document présentant la situation patrimoniale d'une entreprise à un instant donné.",
    definition: "Le bilan comptable est un document de synthèse qui présente, à une date donnée, l'ensemble des actifs (ce que possède l'entreprise) et des passifs (ce qu'elle doit), permettant d'évaluer sa situation patrimoniale.",
    simpleDefinition: "C'est une photo de la santé financière d'une entreprise à un moment précis : ce qu'elle possède et ce qu'elle doit.",
    examples: [
      "Le bilan comptable est établi à la clôture de chaque exercice.",
      "L'analyse du bilan comptable permet d'évaluer la solvabilité de l'entreprise."
    ],
    professionalExample: "L'expert-comptable prépare le bilan comptable annuel avant de le transmettre aux actionnaires.",
    relatedTerms: ["Comptabilité", "Actif", "Passif"],
    level: "Intermédiaire",
    type: "Expression"
  },
  {
    id: 28,
    term: "Développement durable",
    primaryLanguage: "fr",
    domain: "Environnement",
    domainSlug: "environnement",
    category: "Développement durable",
    translations: { fr: "Développement durable", en: "Sustainable development" },
    shortDefinition: "Modèle de développement répondant aux besoins présents sans compromettre l'avenir.",
    definition: "Le développement durable est un mode de développement qui vise à répondre aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs, en conciliant enjeux économiques, sociaux et environnementaux.",
    simpleDefinition: "C'est l'idée de vivre et de produire aujourd'hui sans gâcher les ressources dont les générations futures auront besoin.",
    examples: [
      "L'entreprise a intégré le développement durable dans sa stratégie à long terme.",
      "Les objectifs de développement durable de l'ONU couvrent 17 thématiques."
    ],
    professionalExample: "Un responsable RSE pilote des projets de développement durable au sein de l'entreprise.",
    relatedTerms: ["Empreinte carbone", "Écologie", "Environnement"],
    level: "Débutant",
    type: "Expression"
  },
  {
    id: 29,
    term: "Base de données",
    primaryLanguage: "fr",
    domain: "Informatique",
    domainSlug: "informatique",
    category: "Données",
    translations: { fr: "Base de données", en: "Database" },
    shortDefinition: "Ensemble structuré de données stockées et interrogeables.",
    definition: "Une base de données est un ensemble organisé et structuré de données, stocké de manière à pouvoir être facilement consulté, mis à jour et géré par un système de gestion de base de données (SGBD).",
    simpleDefinition: "C'est un grand classeur numérique bien organisé où sont rangées des informations, pour pouvoir les retrouver facilement.",
    examples: [
      "L'application interroge la base de données à chaque recherche de l'utilisateur.",
      "Une base de données relationnelle organise les informations en tables reliées entre elles."
    ],
    professionalExample: "Un administrateur de base de données optimise les requêtes les plus lentes pour améliorer les performances de l'application.",
    relatedTerms: ["API", "Serveur", "SQL"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 30,
    term: "Cloud computing",
    primaryLanguage: "en",
    domain: "Informatique",
    domainSlug: "informatique",
    category: "Infrastructure",
    translations: { fr: "Informatique en nuage", en: "Cloud computing" },
    shortDefinition: "Mise à disposition de ressources informatiques via Internet.",
    definition: "Le cloud computing désigne la mise à disposition, via Internet, de ressources informatiques (serveurs, stockage, bases de données, logiciels) à la demande, sans que l'utilisateur ait à gérer directement l'infrastructure physique.",
    simpleDefinition: "Au lieu d'installer tout sur son propre ordinateur, on utilise des serveurs distants accessibles par Internet.",
    examples: [
      "L'entreprise a migré ses serveurs vers le cloud computing pour plus de flexibilité.",
      "Le cloud computing permet d'ajuster les ressources selon la charge du site."
    ],
    professionalExample: "Une startup choisit le cloud computing pour éviter d'investir dans une infrastructure serveur coûteuse dès son lancement.",
    relatedTerms: ["Serveur", "Base de données", "Réseaux"],
    level: "Intermédiaire",
    type: "Concept"
  },
  {
    id: 31,
    term: "Stress hydrique",
    primaryLanguage: "fr",
    domain: "Agronomie",
    domainSlug: "agronomie",
    category: "Physiologie végétale",
    translations: { fr: "Stress hydrique", en: "Water stress" },
    shortDefinition: "Situation où une plante manque d'eau pour son développement normal.",
    definition: "Le stress hydrique désigne une situation dans laquelle une plante ne dispose pas d'une quantité d'eau suffisante pour assurer son fonctionnement physiologique normal, entraînant une réduction de croissance ou de rendement.",
    simpleDefinition: "C'est quand une plante manque d'eau au point que sa croissance en est perturbée.",
    examples: [
      "Le stress hydrique a fortement réduit le rendement du maïs cette saison.",
      "Certaines variétés sont sélectionnées pour mieux résister au stress hydrique."
    ],
    professionalExample: "Un agronome ajuste le calendrier d'irrigation pour limiter le stress hydrique pendant les périodes critiques de floraison.",
    relatedTerms: ["Irrigation", "Agriculture", "Rendement"],
    level: "Avancé",
    type: "Concept"
  },
  {
    id: 32,
    term: "Norme sociale",
    primaryLanguage: "fr",
    domain: "Sociologie",
    domainSlug: "sociologie",
    category: "Concepts fondamentaux",
    translations: { fr: "Norme sociale", en: "Social norm" },
    shortDefinition: "Règle de conduite partagée au sein d'un groupe social.",
    definition: "Une norme sociale est une règle de conduite, explicite ou implicite, partagée par les membres d'un groupe social, qui oriente les comportements attendus et dont le non-respect peut entraîner des sanctions sociales.",
    simpleDefinition: "Ce sont les règles non écrites que la plupart des gens respectent dans un groupe, sans forcément y penser.",
    examples: [
      "Se saluer en entrant dans une pièce est une norme sociale répandue.",
      "Les normes sociales varient fortement d'une culture à l'autre."
    ],
    professionalExample: "Un sociologue observe comment les normes sociales évoluent au sein d'une entreprise après l'arrivée d'une nouvelle direction.",
    relatedTerms: ["Socialisation", "Culture", "Sanction sociale"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 33,
    term: "Diagnostic",
    primaryLanguage: "fr",
    domain: "Médecine",
    domainSlug: "medecine",
    category: "Pratique clinique",
    translations: { fr: "Diagnostic", en: "Diagnosis" },
    shortDefinition: "Identification d'une maladie à partir de ses signes et symptômes.",
    definition: "Le diagnostic est la démarche par laquelle un professionnel de santé identifie la nature d'une maladie ou d'un trouble à partir de l'examen clinique, des symptômes rapportés et, le cas échéant, d'examens complémentaires.",
    simpleDefinition: "C'est le moment où le médecin détermine ce dont souffre réellement le patient.",
    examples: [
      "Le diagnostic a nécessité plusieurs examens complémentaires.",
      "Un diagnostic précoce améliore souvent les chances de traitement."
    ],
    professionalExample: "L'équipe médicale confronte plusieurs hypothèses avant de poser un diagnostic définitif.",
    relatedTerms: ["Hypertension", "Symptôme", "Pathologie"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 34,
    term: "Empathie",
    primaryLanguage: "fr",
    domain: "Psychologie",
    domainSlug: "psychologie",
    category: "Psychologie sociale",
    translations: { fr: "Empathie", en: "Empathy" },
    shortDefinition: "Capacité à comprendre et ressentir les émotions d'autrui.",
    definition: "L'empathie est la capacité à comprendre, voire à ressentir, les émotions et le point de vue d'une autre personne, en se mettant mentalement à sa place, sans pour autant se confondre avec elle.",
    simpleDefinition: "C'est réussir à se mettre à la place de quelqu'un d'autre pour comprendre ce qu'il ressent.",
    examples: [
      "L'empathie est une compétence clé dans les métiers du soin.",
      "Faire preuve d'empathie ne signifie pas être d'accord avec l'autre."
    ],
    professionalExample: "Dans un entretien de recrutement, l'empathie du manager facilite la mise en confiance du candidat.",
    relatedTerms: ["Psychologie", "Intelligence émotionnelle", "Relation sociale"],
    level: "Débutant",
    type: "Concept"
  },
  {
    id: 35,
    term: "Portefeuille d'investissement",
    primaryLanguage: "fr",
    domain: "Finance",
    domainSlug: "finance",
    category: "Gestion de patrimoine",
    translations: { fr: "Portefeuille d'investissement", en: "Investment portfolio" },
    shortDefinition: "Ensemble des actifs détenus par un investisseur.",
    definition: "Un portefeuille d'investissement désigne l'ensemble des actifs financiers (actions, obligations, liquidités, immobilier...) détenus par un investisseur, dont la composition vise à atteindre un équilibre entre rendement attendu et niveau de risque.",
    simpleDefinition: "C'est l'ensemble de tout ce dans quoi une personne a investi son argent : actions, obligations, immobilier, etc.",
    examples: [
      "Diversifier son portefeuille d'investissement permet de réduire le risque global.",
      "Le portefeuille d'investissement a été rééquilibré après la baisse des marchés."
    ],
    professionalExample: "Le conseiller financier propose une répartition du portefeuille d'investissement adaptée à l'horizon de placement du client.",
    relatedTerms: ["Actif", "Liquidité", "Risque financier"],
    level: "Intermédiaire",
    type: "Expression"
  },
  {
    id: 36,
    term: "Backend",
    primaryLanguage: "en",
    domain: "Développement web",
    domainSlug: "developpement-web",
    category: "Architecture logicielle",
    translations: { fr: "Back-end", en: "Backend" },
    shortDefinition: "Partie d'une application qui gère la logique serveur et les données.",
    definition: "Le backend désigne l'ensemble des composants logiciels d'une application qui s'exécutent côté serveur : logique métier, gestion des données, sécurité et communication avec la base de données, invisibles pour l'utilisateur final.",
    simpleDefinition: "C'est la partie invisible d'un site ou d'une application, qui fait fonctionner tout ce que l'on ne voit pas à l'écran.",
    examples: [
      "Le backend traite la commande avant de renvoyer une confirmation à l'utilisateur.",
      "L'équipe backend développe l'API consommée par l'application mobile."
    ],
    professionalExample: "Le développeur backend optimise les requêtes vers la base de données pour réduire le temps de réponse de l'API.",
    relatedTerms: ["API", "Base de données", "Serveur"],
    level: "Débutant",
    type: "Terme"
  },
  {
    id: 37,
    term: "Capital culturel",
    primaryLanguage: "fr",
    domain: "Sociologie",
    domainSlug: "sociologie",
    category: "Sociologie de la culture",
    translations: { fr: "Capital culturel", en: "Cultural capital" },
    shortDefinition: "Ensemble des ressources culturelles dont dispose un individu.",
    definition: "Le capital culturel, concept développé par Pierre Bourdieu, désigne l'ensemble des ressources culturelles (savoirs, diplômes, goûts, manières) qu'un individu accumule et qui influencent sa position et sa trajectoire sociales.",
    simpleDefinition: "Ce sont les connaissances, diplômes et références culturelles qu'une personne accumule, et qui peuvent l'aider socialement.",
    examples: [
      "Le capital culturel transmis par la famille influence la réussite scolaire.",
      "Le capital culturel ne se limite pas aux diplômes : il inclut aussi les habitudes et les goûts."
    ],
    professionalExample: "Un chercheur étudie comment le capital culturel des étudiants influence leur orientation post-bac.",
    relatedTerms: ["Habitus", "Sociologie", "Classe sociale"],
    level: "Avancé",
    type: "Concept"
  },
  {
    id: 38,
    term: "Vaccination",
    primaryLanguage: "fr",
    domain: "Santé publique",
    domainSlug: "sante-publique",
    category: "Prévention",
    translations: { fr: "Vaccination", en: "Vaccination" },
    shortDefinition: "Administration d'un vaccin pour immuniser contre une maladie.",
    definition: "La vaccination est un acte médical préventif consistant à administrer un vaccin afin de stimuler le système immunitaire et de le préparer à réagir efficacement en cas d'exposition future à un agent infectieux spécifique.",
    simpleDefinition: "C'est le fait de recevoir un vaccin pour que le corps apprenne à se défendre contre une maladie avant même de la rencontrer.",
    examples: [
      "La campagne de vaccination a permis de réduire fortement les cas de la maladie.",
      "Certains vaccins nécessitent plusieurs doses pour une protection optimale."
    ],
    professionalExample: "Un épidémiologiste évalue la couverture vaccinale nécessaire pour atteindre l'immunité collective au sein d'une population.",
    relatedTerms: ["Santé publique", "Immunité", "Épidémiologie"],
    level: "Débutant",
    type: "Terme"
  },
  {
    id: 39,
    term: "Brief créatif",
    primaryLanguage: "fr",
    domain: "Design",
    domainSlug: "design",
    category: "Méthodologie",
    translations: { fr: "Brief créatif", en: "Creative brief" },
    shortDefinition: "Document cadrant les objectifs et contraintes d'un projet créatif.",
    definition: "Le brief créatif est un document de cadrage qui présente les objectifs, la cible, le contexte, les contraintes et les attentes d'un projet créatif, servant de référence commune entre un client et une équipe de conception.",
    simpleDefinition: "C'est le document de départ qui explique ce qu'on attend d'un projet créatif, pour que tout le monde parte dans la même direction.",
    examples: [
      "L'agence a rédigé un brief créatif détaillé avant de lancer la campagne.",
      "Un bon brief créatif évite les allers-retours inutiles en cours de projet."
    ],
    professionalExample: "Le designer relit le brief créatif avant chaque revue de projet pour s'assurer de rester aligné avec les objectifs initiaux.",
    relatedTerms: ["Design", "Persona", "Cahier des charges"],
    level: "Débutant",
    type: "Expression"
  },
  {
    id: 40,
    term: "Complexité algorithmique",
    primaryLanguage: "fr",
    domain: "Informatique",
    domainSlug: "informatique",
    category: "Programmation",
    translations: { fr: "Complexité algorithmique", en: "Algorithmic complexity" },
    shortDefinition: "Mesure des ressources nécessaires à l'exécution d'un algorithme.",
    definition: "La complexité algorithmique est une mesure théorique du nombre d'opérations ou de la quantité de mémoire nécessaires à l'exécution d'un algorithme, généralement exprimée en fonction de la taille des données en entrée (notation Big O).",
    simpleDefinition: "C'est une façon d'estimer si un algorithme restera rapide même quand on lui donne beaucoup plus de données à traiter.",
    examples: [
      "Un algorithme de complexité O(n²) devient très lent avec de grandes quantités de données.",
      "Réduire la complexité algorithmique améliore les performances du programme."
    ],
    professionalExample: "Avant la mise en production, l'équipe technique revoit la complexité algorithmique des fonctions les plus sollicitées.",
    relatedTerms: ["Algorithme", "Programmation", "Structure de données"],
    level: "Avancé",
    type: "Concept"
  }
];

/* ========================= MOT DU JOUR =============================== */
/**
 * wordsOfTheDay : liste de termes (par id) éligibles au "mot du jour".
 * Le choix du jour est déterministe (basé sur la date) afin que tous
 * les visiteurs voient le même mot le même jour.
 */
const wordsOfTheDayIds = [6, 1, 8, 24, 14, 22, 28, 16, 10, 20];

/* =========================== DATA SERVICE ============================= */
/**
 * dataService : point d'accès unique aux données.
 * Toutes les fonctions sont "async" dès maintenant afin que le passage
 * à une vraie API (fetch) ne nécessite aucun changement d'interface
 * pour le reste de l'application.
 */
const dataService = {
  async getDomains() {
    return domainsData;
  },
  async getCategories() {
    return categoriesData;
  },
  async getTerms() {
    return dictionaryData;
  },
  async getTermById(id) {
    return dictionaryData.find((t) => t.id === Number(id)) || null;
  },
  async getTermBySlug(term) {
    return (
      dictionaryData.find(
        (t) => t.term.toLowerCase() === String(term).toLowerCase()
      ) || null
    );
  },
  async getTermsByDomain(domainSlug) {
    return dictionaryData.filter((t) => t.domainSlug === domainSlug);
  },
  async getDomainBySlug(slug) {
    return domainsData.find((d) => d.slug === slug) || null;
  },
  async getWordOfTheDay() {
    const dayIndex =
      Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % wordsOfTheDayIds.length;
    const id = wordsOfTheDayIds[dayIndex];
    return dictionaryData.find((t) => t.id === id) || dictionaryData[0];
  }
};
