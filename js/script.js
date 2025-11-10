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

    // Fonction pour créer l'explosion de confetti
    const creerConfetti = () => {
        const confettiCount = 150; // Nombre de confettis
        const colors = [
            '#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6',
            '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#14b8a6'
        ];

        const container = document.body;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Position aléatoire en haut de l'écran
            const startX = Math.random() * window.innerWidth;
            const startY = -20;

            // Couleur aléatoire
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Taille aléatoire
            const size = Math.random() * 10 + 8;

            // Animation delay aléatoire
            const delay = Math.random() * 2;

            // Durée d'animation aléatoire
            const duration = Math.random() * 2 + 2;

            // Appliquer les styles
            confetti.style.cssText = `
            left: ${startX}px;
            top: ${startY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            position: fixed;
            z-index: 1000;
            pointer-events: none;
        `;

            // Formes aléatoires
            const shapeType = Math.floor(Math.random() * 4);
            switch (shapeType) {
                case 0:
                    confetti.style.borderRadius = '50%'; // Cercle
                    break;
                case 1:
                    confetti.style.width = `${size * 0.6}px`; // Rectangle
                    confetti.style.height = `${size * 1.4}px`;
                    break;
                case 2:
                    confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)'; // Triangle
                    break;
                case 3:
                    confetti.style.transform = 'rotate(45deg)'; // Carré
                    break;
            }

            container.appendChild(confetti);

            // Supprimer l'élément après l'animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, (duration + delay) * 1000);
        }

        // Ajouter des particules supplémentaires
        creerParticulesSupplementaires();
    };

    // Fonction pour créer des particules supplémentaires (effet bonus)
    const creerParticulesSupplementaires = () => {
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;

            const size = Math.random() * 6 + 4;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 50;

            particle.style.cssText = `
            left: ${startX}px;
            top: ${startY}px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            position: fixed;
            z-index: 1000;
            pointer-events: none;
        `;

            document.body.appendChild(particle);

            // Animation personnalisée pour les particules
            const endX = startX + Math.cos(angle) * distance;
            const endY = startY + Math.sin(angle) * distance;

            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0.2, 0, 0.8, 1)'
            });

            // Supprimer après l'animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    };

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
        let html = '';
        let currentWord = '';

        for (let i = 0; i < motActuel.length; i++) {
            if (motActuel[i] === ' ') {
                // Quand on rencontre un espace, on wrap le mot précédent
                if (currentWord) {
                    html += `<div class="word-container">${currentWord}</div>`;
                    currentWord = '';
                }
                html += '<span class="word-space"></span>';
            } else {
                // Accumuler les lettres du mot courant
                currentWord += `<span class="letter">${lettresTrouvees[i]}</span>`;
            }
        }

        // Ne pas oublier le dernier mot
        if (currentWord) {
            html += `<div class="word-container">${currentWord}</div>`;
        }

        wordPlaceholder.innerHTML = html;
        usedLetters.textContent = lettresUtilisees.join(', ');
    };

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
            // Victoire - déclencher le confetti !
            messageDiv.textContent = 'Bravo ! Vous avez gagné !';
            messageDiv.className = 'message win';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
            
            // Lancer le confetti après un petit délai pour l'effet dramatique
            setTimeout(() => {
                creerConfetti();
            }, 300);
            
        } else if (erreurs >= maxErreurs) {
            // Défaite
            messageDiv.textContent = `Dommage ! Le mot était : ${motActuel}`;
            messageDiv.className = 'message lose';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
        }
    };

    const proposerMotComplet = () => {
        const motPropose = prompt("💡 Vous pensez avoir trouvé le mot ? Écrivez-le ici : \n\nAttention : Une erreur et le jeu se termine !");
    
        if (motPropose === null) {
            return;
        }
    
        // Normaliser la proposition : majuscules et gestion des espaces
        const propositionNormalisee = motPropose.toUpperCase().trim();
        
        // Normaliser le mot actuel pour la comparaison
        const motActuelNormalise = motActuel;
        
        // Comparaison en tenant compte des espaces
        if (propositionNormalisee === motActuelNormalise) {
            // Victoire instantanée
            lettresTrouvees = motActuel.split('');
            mettreAJourAffichage();
            messageDiv.textContent = 'Bravo ! Vous avez gagné !';
            messageDiv.className = 'message win';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
            
            // Confetti pour la victoire par mot complet
            setTimeout(() => {
                creerConfetti();
            }, 300);
        } else {
            // Défaite instantanée
            erreurs = maxErreurs;
            afficherPenduComplet();
            messageDiv.textContent = `Dommage ! Le mot était : ${motActuel}`;
            messageDiv.className = 'message lose';
            desactiverClavier();
            replayBtn.classList.remove('hidden');
            
            // Animations de défaite
            setTimeout(() => {
                lancerAnimationsDefaite();
            }, 500);
        }
    };

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