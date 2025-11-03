document.addEventListener('DOMContentLoaded', () => {
    // Base de données des mots pour chaque catégorie
    const motsParCategorie = {
        youtubetwitch: [
            "SQUEEZIE", "AMIXEM", "MCFLY ET CARLITO", "JOUEUR DU GRENIER", "LE RIRE JAUNE",
            "MICHOU", "INOXTAG", "VALOUZZ", "PIDI", "LEBOUSEUH", "MASTU",
            "BOB LENNON", "LENA SITUATIONS", "ENJOY PHEONIX", "NATOO", "SEB", "JOYCA",
            "MISTER V", "SIPHANO", "WANKIL STUDIO", "DJILSI", "TIBO IN SHAPE",
            "ZERATOR", "MICHALOW", "GOTAGA", "MISTER MV", "BAGHERA", "MAGHLA", "ANTOINE DANIEL",
            "FLAMBY", "DOMINGO", "ETOILES", "KAATSUP", "BYILHAN", "ANYME",
        ],
        sio: [
            "HTML", "CSS", "JAVASCRIPT", "PYTHON", "PHP", "SQL", "DART",
            "VARIABLE", "FONCTION", "ALGORITHME", "BOUCLE", "CONDITION",
            "TABLEAU", "OBJET", "CLASSE", "HERITAGE", "POLYMORPHISME", "INTERFACE",
            "REQUETE", "JOINTURE", "TRANSACTION",
            "GIT", "GITHUB", "API", "JSON", "FRAMEWORK",
            "DEVELOPPEMENT", "PROGRAMMATION", "CODE", "SCRIPT", "APPLICATION"
        ],
        jeux: [
            "MINECRAFT", "FORTNITE BATTLE ROYALE", "ZELDA", "SUPER MARIO BROS",
            "POKEMON", "CALL OF DUTY", "ASSASSINS CREED", "OVERWATCH",
            "LEAGUE OF LEGENDS", "VALORANT", "THE LAST OF US", "GOD OF WAR",
            "RED DEAD REDEMPTION", "GHOST OF TSUSHIMA", "ELDEN RING", "DARK SOULS", "SEKIRO",
            "SKYRIM", "THE WITCHER", "FINAL FANTASY", "DRAGON QUEST", "PERSONA",
            "FALLOUT", "DIABLO", "BORDERLANDS",
            "AMONG US", "FALL GUYS", "HOLLOW KNIGHT", "CELESTE",
            "UNDERTALE", "HADES", "DEAD CELLS", "TETRIS", "PACMAN", "SONIC"
        ],
        films: [
            "AVATAR", "TITANIC", "STAR WARS", "AVENGERS", "HARRY POTTER",
            "SEIGNEUR DES ANNEAUX", "PIRATES DES CARAIBES", "JURASSIC PARK", "INCEPTION",
            "FORREST GUMP", "BLACK PANTHER", "JOKER",
            "INTOUCHABLE", "ASTERIX", "OSS 117", "LES VISITEURS",
            "LE ROI LION", "TOY STORY", "LA REINE DES NEIGES", "SHREK",
            "NEMO", "LES INDESTRUCTIBLES", "RATATOUILLE",
            "SCREAM", "ANABELLE", "CHUCKY", "SCARY MOVIE"
        ],
        plats: [
            "BOEUF BOURGUIGNON", "COQ AU VIN", "RATATOUILLE", "QUICHE LORRAINE",
            "GRATIN DAUPHINOIS", "BOUILLABAISSE", "TARTE TATIN", "CHARCUTERIE",
            "PIZZA", "SPAGHETTI BOLOGNAISE", "SPAGHETTI CARBONARA", "LASAGNES", "TIRAMISU", "PANNA COTTA",
            "SUSHI", "NOUILLES", "POULET CURRY", "ROULEAUX DE PRINTEMPS", "RAMEN", "GYOZA",
            "TACOS", "BURRITO", "PAELLA", "FAJITAS", "FALAFEL", "KEBAB", "CHILI CON CARNE",
            "CREME BRULEE", "PROFITEROLES", "FONDANT AU CHOCOLAT", "ILE FLOTTANTE", "MILLE FEUILLE",
            "MACARON", "ECLAIR", "PARIS BREST", "FRAISIER", "OPERA", "TROPEZIENNE", "CREPES", "GAUFRES", "PANCAKES",
            "FRITES", "FRICADELLE", "BURGER", "SANDWICH", "CROQUE MONSIEUR", "CROQUE MADAME"
        ],
        series: [
            "BREAKING BAD", "GAME OF THRONES", "STRANGER THINGS", "THE CROWN", "THE WALKING DEAD",
            "LA CASA DE PAPEL", "PEAKY BLINDERS", "VIKINGS", "STAR TREK",
            "FRIENDS", "THE OFFICE", "THE BIG BANG THEORY",
            "MODERN FAMILY", "THE SIMPSONS", "SOUTH PARK", "FAMILY GUY", "RICK AND MORTY",
            "SHERLOCK", "SQUID GAME", "BLACK MIRROR", "THE MANDALORIAN", "DOCTOR WHO",
        ],
        sports: [
            "FOOTBALL", "BASKETBALL", "RUGBY", "HANDBALL", "VOLLEYBALL",
            "HOCKEY", "BASEBALL", "WATER POLO", "CURLING",
            "TENNIS", "BADMINTON", "TENNIS DE TABLE", "PADEL",
            "ATHLETISME", "NATATION", "JUDO", "KARATE", "BOXE",
            "ESCALADE", "GYMNASTIQUE", "HALTEROPHILIE", "EQUITATION", "GOLF",
            "SKATEBOARD", "SURF", "SNOWBOARD", "SKI",
            "PARKOUR", "ESCALADE", "PLONGEE", "PARACHUTISME",
            "FORMULE UN", "MOTO GP"
        ],
        musique: [
            "TAYLOR SWIFT", "BEYONCE", "ED SHEERAN", "ARIANA GRANDE",
            "THE WEEKEND", "ADELE", "BRUNO MARS", "LADY GAGA", "HARRY STYLES",
            "BILLIE EILISH", "COLDPLAY", "IMAGINE DRAGONS", "DUA LIPA", "OLIVIA RODRIGO",
            "EMINEM", "KENDRICK LAMAR", "NICKI MINAJ", "CARDI B", "TRAVIS SCOTT",
            "NINHO", "TIAKOLA", "ORELSAN", "THEODORA", "DAFT PUNK",
            "STROMAE", "ANGÈLE", "MIKA", "GAZO", "JULIEN DORE", "CLARA LUCIANI", "JOHNNY HALLYDAY",
            "RIHANNA", "ALICIA KEYS", "SAM SMITH", "SABRINA CARPENTER",
            "DAVID GUETTA", "CALVIN HARRIS", "MARTIN GARRIX", "AVICII",
            "DADJU", "SELENA GOMEZ", "PHARRELLS WILLIAM", "GIMS",
            "BEATLES", "QUEEN", "LED ZEPPELIN", "ACDC", "ROLLING STONES", "NIRVANA",
        ]
    };

    // Variables du jeu
    let motActuel = "";
    let lettresTrouvees = [];
    let lettresUtilisees = [];
    let erreurs = 0;
    const maxErreurs = 6;

    const homeScreen = document.getElementById('home-screen');
    const gameArea = document.getElementById('game-area');
    const penduArt = document.getElementById('pendu-art');
    const wordPlaceholder = document.getElementById('word-placeholder');
    const usedLetters = document.getElementById('used-letters');
    const keyboardContainer = document.getElementById('keyboard-container');
    const messageDiv = document.getElementById('message');
    const replayBtn = document.getElementById('replay-btn');
    const trouverMotBtn = document.getElementById('trouver-mot-btn');

    // Initialisation du jeu
    const initJeu = () => {
        homeScreen.classList.remove('hidden');
        gameArea.classList.add('hidden');
        messageDiv.textContent = '';
        messageDiv.className = 'message';
        replayBtn.classList.add('hidden');

        creerPenduSVG();
    }

    // Créer le SVG (image du bonhomme) du pendu
    const creerPenduSVG = () => {
        penduArt.innerHTML = `
        <svg class="pendu-svg" viewBox="0 0 200 180">
            <!-- Structure du pendu -->
            <line class="pendu-line" x1="20" y1="170" x2="100" y2="170"/>
            <line class="pendu-line" x1="40" y1="170" x2="40" y2="20"/>
            <line class="pendu-line" x1="40" y1="20" x2="100" y2="20"/>
            <line class="pendu-line" x1="100" y1="20" x2="100" y2="40"/>
            
            <!-- Parties du bonhomme -->
            <circle class="pendu-part" id="head" cx="100" cy="55" r="15" fill="none"/>
            <line class="pendu-part" id="body" x1="100" y1="70" x2="100" y2="110"/>
            <line class="pendu-part" id="left-arm" x1="100" y1="80" x2="80" y2="95"/>
            <line class="pendu-part" id="right-arm" x1="100" y1="80" x2="120" y2="95"/>
            <line class="pendu-part" id="left-leg" x1="100" y1="110" x2="85" y2="140"/>
            <line class="pendu-part" id="right-leg" x1="100" y1="110" x2="115" y2="140"/>
        </svg>
    `;
    }

    // Démarrer le jeu avec la catégorie séléctionné
    const demarrerJeu = (categorie) => {
        homeScreen.classList.add('hidden');
        gameArea.classList.remove('hidden');
        trouverMotBtn.disabled = false;

        const mots = motsParCategorie[categorie];
        motActuel = mots[Math.floor(Math.random() * mots.length)];

        lettresTrouvees = Array(motActuel.length).fill('_');
        lettresUtilisees = [];
        erreurs = 0;

        mettreAJourAffichage();
        creerClavier();
        reinitialiserPendu();
    }

    // Réinitialiser le pendu
    const reinitialiserPendu = () => {
        const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
        parts.forEach(part => {
            const element = document.getElementById(part);
            if (element) {
                element.classList.remove('visible');
            }
        });
    }

    // Créer le clavier virtuel (Pavé avec toutes les lettres de l'alphabet)
    const creerClavier = () => {
        keyboardContainer.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let lettre of alphabet) {
            const btn = document.createElement('button');
            btn.className = 'letter-btn';
            btn.textContent = lettre;
            btn.addEventListener('click', () => proposerLettre(lettre));
            keyboardContainer.appendChild(btn);
        }
    }

    // Proposer une lettre
    const proposerLettre = (lettre) => {
        if (lettresUtilisees.includes(lettre)) return;

        lettresUtilisees.push(lettre);
        const btn = [...keyboardContainer.children].find(b => b.textContent === lettre);
        btn.disabled = true;

        if (motActuel.includes(lettre)) {
            // Lettre correcte
            btn.classList.add('correct');
            for (let i = 0; i < motActuel.length; i++) {
                if (motActuel[i] === lettre) {
                    lettresTrouvees[i] = lettre;
                }
            }
        } else {
            // Lettre incorrecte
            btn.classList.add('incorrect');
            erreurs++;
            mettreAJourPendu();
        }

        mettreAJourAffichage();
        verifierFinJeu();
    }

    // Mettre à jour le dessin du pendu
    const mettreAJourPendu = () => {
        const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
        if (erreurs > 0 && erreurs <= parts.length) {
            const partToShow = parts[erreurs - 1];
            const element = document.getElementById(partToShow);
            if (element) {
                element.classList.add('visible');
            }
        }
    }

    // Mettre à jour l'affichage
    const mettreAJourAffichage = () => {
        // Afficher le mot avec gestion des espaces
        let affichageMot = '';
        for (let i = 0; i < motActuel.length; i++) {
            if (motActuel[i] === ' ') {
                affichageMot += '<span class="word-space"> </span>';
            } else {
                affichageMot += '<span class="letter">' + lettresTrouvees[i] + '</span>';
            }
        }

        wordPlaceholder.innerHTML = affichageMot;
        usedLetters.textContent = lettresUtilisees.join(', ');
    }

    // Vérifier si le jeu est terminé
    const verifierFinJeu = () => {
        let motCompletTrouve = true;

        for (let i = 0; i < motActuel.length; i++) {
            // Si c'est une lettre (pas un espace) et qu'elle n'est pas trouvée
            if (motActuel[i] !== ' ' && lettresTrouvees[i] === '_') {
                motCompletTrouve = false;
                break;
            }
        }

        if (motCompletTrouve) {
            // Victoire
            messageDiv.textContent = 'Bravo ! Vous avez gagné !';
            messageDiv.className = 'message win';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
        } else if (erreurs >= maxErreurs) {
            // Défaite
            messageDiv.textContent = `Dommage ! Le mot était : ${motActuel}`;
            messageDiv.className = 'message lose';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
        }
    }

    const proposerMotComplet = () => {
        const motPropose = prompt("💡 Vous pensez avoir trouvé le mot ? Écrivez-le ici : \n\nAttention : Une erreur est le jeu se termine !");

        if (motPropose === null) {
            return;
        }

        if (motPropose && motPropose.toUpperCase().replace(/\s+/g, ' ') === motActuel) {
            // Victoire instantanée
            lettresTrouvees = motActuel.split('');
            mettreAJourAffichage();
            messageDiv.textContent = 'Bravo ! Vous avez gagné !';
            messageDiv.className = 'message win';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
        } else {
            // Défaite instantanée
            erreurs = maxErreurs;
            afficherPenduComplet();
            messageDiv.textContent = `Dommage ! Le mot était : ${motActuel}`;
            messageDiv.className = 'message lose';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
        }
    }

    const afficherPenduComplet = () => {
        const parts = ['head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'];
        parts.forEach(part => {
            const element = document.getElementById(part);
            if (element) {
                element.classList.add('visible');
            }
        });
    }

    // Désactiver le clavier
    const desactiverClavier = () => {
        const boutons = keyboardContainer.getElementsByClassName('letter-btn');
        for (let btn of boutons) {
            btn.disabled = true;
        }

        trouverMotBtn.disabled = true;
    }

    // Événements
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const categorie = e.target.closest('.category-btn').dataset.category;
            demarrerJeu(categorie);
        });
    });
    trouverMotBtn.addEventListener('click', proposerMotComplet);
    replayBtn.addEventListener('click', initJeu);

    // Initialiser le jeu au démarrage
    initJeu();
});