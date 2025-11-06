const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const pointsParTour = [5, 3, 2, 1];

app.use(express.static("public"));

// 🎮 PARTIES THÉMATIQUES (5 parties de 20 questions)
const partiesThematiques = {
    "partie1": {
        nom: "Game 1",
        mots: [
            { "categorie": "Personnage One Piece", "mot": "Judge", "indices": ["blond", "roi", "père"] },
            { "categorie": "Personnage d'anime", "mot": "Saitama", "indices": ["héros", "nonchalant", "puissant"] },
            { "categorie": "Film", "mot": "Gladiator", "indices": ["armure", "empire", "arène"] },
            { "categorie": "Personnage One Piece", "mot": "Akainu", "indices": ["fleur", "chien", "chaleur"] },
            { "categorie": "Personnage d'anime", "mot": "Tanjiro", "indices": ["eau", "épée", "vert"] },
            { "categorie": "Personnage Naruto", "mot": "Sai", "indices": ["homme", "secret", "dessin"] },
            { "categorie": "Personnage d'anime", "mot": "Mikasa", "indices": ["adoption", "loyale", "écharpe"] },
            { "categorie": "Serie", "mot": "From", "indices": ["nuit", "surnaturel", "arbre"] },
            { "categorie": "Personnage Naruto", "mot": "Obito", "indices": ["masque", "trahison", "oeil"] },
            { "categorie": "Personnage d'anime", "mot": "Natsu", "indices": ["dragon", "rose", "feu"] },
            { "categorie": "Serie", "mot": "Vampire Diaries", "indices": ["sang", "amour", "frère"] },
            { "categorie": "Personnage d'anime", "mot": "Inosuke", "indices": ["sauvage", "animal", "double lame"] },
            { "categorie": "Personnage Naruto", "mot": "Darui", "indices": ["kumo", "jonin", "éclair"] },
            { "categorie": "Anime", "mot": "Evangelion", "indices": ["psychologie", "pilote", "mecha"] },
            { "categorie": "Personnage d'anime", "mot": "Onizuka", "indices": ["humour", "charisme", "rebelle"] },
            { "categorie": "Personnage Naruto", "mot": "Hiruzen", "indices": ["sacrifice", "sage", "Enma"] },
            { "categorie": "Serie", "mot": "Westworld", "indices": ["futur", "conscience", "mémoire"] },
            { "categorie": "Personnage One Piece", "mot": "Kuina", "indices": ["défi", "rivalité", "épée"] },
            { "categorie": "Serie", "mot": "Casa de Papel", "indices": ["identité", "plan", "masque"] },
            { "categorie": "Film", "mot": "Parasite", "indices": ["sous-sol", "infiltration", "famille"] },
            { "categorie": "Anime", "mot": "Tokyo Ghoul", "indices": ["dualité", "masque", "kagune"] },
            { "categorie": "Personnage One Piece", "mot": "Ener", "indices": ["ambition", "ennemi", "dieu"] },
        ]
    },
    "partie2": {
        nom: "Game 2",
        mots: [
            { "categorie": "Personnage d'anime", "mot": "Eren", "indices": ["destin", "transformation", "liberté"] },
            { "categorie": "Film", "mot": "Le Seigneur des Anneaux", "indices": ["quête", "milieu", "voyage"] },
            { "categorie": "Personnage One Piece", "mot": "Big Mom", "indices": ["famille", "rose", "ile"] },
            { "categorie": "Personnage Naruto", "mot": "Temari", "indices": ["belette", "vent", "soeur"] },
            { "categorie": "Personnage d'anime", "mot": "Asuna", "indices": ["épée", "femme", "jeu"] },
            { "categorie": "Serie", "mot": "Mentalist", "indices": ["manipulation", "rouge", "john"] },
            { "categorie": "Personnage One Piece", "mot": "Sogeking", "indices": ["masque", "flamme", "courage"] },
            { "categorie": "Film", "mot": "Avengers", "indices": ["équipe", "alien", "conflit"] },
            { "categorie": "Personnage One Piece", "mot": "Barbe Noir", "indices": ["trahison", "ambition", "roi"] },
            { "categorie": "Personnage d'anime", "mot": "Kirito", "indices": ["cape noire", "double lame", "joueur"] },
            { "categorie": "Anime", "mot": "Steins;Gate", "indices": ["machine", "john", "micro onde"] },
            { "categorie": "Personnage d'anime", "mot": "Seiya", "indices": ["armure", "bronze", "cosmos"] },
            { "categorie": "Personnage Naruto", "mot": "Shino", "indices": ["silencieux", "stratège", "konoha"] },
            { "categorie": "Personnage d'anime", "mot": "Goku", "indices": ["combat", "tournoi", "boule"] },
            { "categorie": "Personnage Naruto", "mot": "Zabuza", "indices": ["kiri", "assassin", "traque"] },
            { "categorie": "Anime", "mot": "Bleach", "indices": ["ames", "trio", "orange"] },
            { "categorie": "Serie", "mot": "Breaking Bad", "indices": ["cartel", "albuquerque", "chimie"] },
            { "categorie": "Anime", "mot": "Shaman King", "indices": ["esprits", "fusion", "Yoh"] },
            { "categorie": "Personnage d'anime", "mot": "Light", "indices": ["justice", "manipulation", "dieu"] },
            { "categorie": "Personnage Naruto", "mot": "Anko", "indices": ["kunoichi", "marque", "examen chunin"] },
            { "categorie": "Anime", "mot": "Erased", "indices": ["retour", "meurtre", "enquête"] },
            { "categorie": "Personnage One Piece", "mot": "Sabo", "indices": ["révolution", "chapeau", "naruto"] },
        ]
    },
    "partie3": {
        nom: "Game 3",
        mots: [
            { "categorie": "Personnage d'anime", "mot": "Kirua", "indices": ["amitié", "éclair", "silence"] },
            { "categorie": "Personnage One Piece", "mot": "Belmer", "indices": ["tempête", "marine", "maman"] },
            { "categorie": "Personnage Naruto", "mot": "Kakuzu", "indices": ["assassin", "coeur", "akatsuki"] },
            { "categorie": "Personnage d'anime", "mot": "Deku", "indices": ["détermination", "héritage", "vert"] },
            { "categorie": "Anime", "mot": "Death Note", "indices": ["meurtres", "mystère", "justice"] },
            { "categorie": "Personnage Naruto", "mot": "Yamato", "indices": ["konoha", "cellule", "technique spéciale"] },
            { "categorie": "Film", "mot": "Avatar", "indices": ["conflit", "nature", "extraterrestre"] },
            { "categorie": "Serie", "mot": "Stranger Things", "indices": ["adolescents", "disparition", "Hawkins"] },
            { "categorie": "Personnage Naruto", "mot": "Akamaru", "indices": ["transformation", "flair", "fidélité"] },
            { "categorie": "Anime", "mot": "Black Clover", "indices": ["royaume", "rivalité", "magie"] },
            { "categorie": "Film", "mot": "Insaisissables", "indices": ["braquage", "manipulation", "Paris"] },
            { "categorie": "Personnage Naruto", "mot": "Sakura", "indices": ["force", "fille", "médicale"] },
            { "categorie": "Film", "mot": "Interstellar", "indices": ["exploration", "temps", "relativité"] },
            { "categorie": "Personnage d'anime", "mot": "Bakugo", "indices": ["explosion", "combat", "rival"] },
            { "categorie": "Personnage Naruto", "mot": "Kankuro", "indices": ["peinture", "fratrie", "suna"] },
            { "categorie": "Serie", "mot": "The Boys", "indices": ["corruption", "Vought", "violence"] },
            { "categorie": "Personnage Naruto", "mot": "Pain / Nagato", "indices": ["destruction", "passé douloureux", "grenouille"] },
            { "categorie": "Personnage d'anime", "mot": "Asta", "indices": ["orphelin", "ombre", "chevalier"] },
            { "categorie": "Serie", "mot": "Black Mirror", "indices": ["technologie", "obsession", "dystopie"] },
            { "categorie": "Personnage Naruto", "mot": "Hidan", "indices": ["pacte", "sang", "culte"] },
            { "categorie": "Film", "mot": "Pirates des Caraïbes", "indices": ["malédiction", "trésor", "océan"] },
            { "categorie": "Anime", "mot": "Jujutsu Kaisen", "indices": ["école", "pouvoir", "territoire"] },
        ]
    },
    "partie4": {
        nom: "Game 4",
        mots: [
            { "categorie": "Personnage One Piece", "mot": "Crocodile", "indices": ["Alabasta", "secret", "Casino"] },
            { "categorie": "Anime", "mot": "Fairy Tail", "indices": ["magie", "aventure", "salamandre"] },
            { "categorie": "Personnage d'anime", "mot": "Ichigo", "indices": ["remplacant", "épée", "orange"] },
            { "categorie": "Film", "mot": "Jurassic Park", "indices": ["ile", "évasion", "fossile"] },
            { "categorie": "Personnage Naruto", "mot": "Haku", "indices": ["loyal", "masque", "glace"] },
            { "categorie": "Personnage d'anime", "mot": "Vegeta", "indices": ["prince", "entrainement", "rival"] },
            { "categorie": "Personnage One Piece", "mot": "Imu", "indices": ["ancien", "manipulation", "monde"] },
            { "categorie": "Film", "mot": "Star Wars", "indices": ["sabre", "destin", "empire"] },
            { "categorie": "Personnage Naruto", "mot": "Danzo", "indices": ["secret", "bandage", "cellule"] },
            { "categorie": "Serie", "mot": "Haunting of Hill House", "indices": ["fantome", "echo", "maison"] },
            { "categorie": "Film", "mot": "La La Land", "indices": ["danse", "séduction", "jazz"] },
            { "categorie": "Personnage d'anime", "mot": "Zoro", "indices": ["épée", "entrainement", "oeil"] },
            { "categorie": "Film", "mot": "Titanic", "indices": ["amour", "tragedie", "luxe"] },
            { "categorie": "Anime", "mot": "Parasyte", "indices": ["transformation", "infection", "migi"] },
            { "categorie": "Personnage Naruto", "mot": "Jiraya", "indices": ["sage", "mort", "mentor"] },
            { "categorie": "Film", "mot": "The Prestige", "indices": ["illusion", "obsession", "tesla"] },
            { "categorie": "Personnage One Piece", "mot": "Bonclay", "indices": ["danse", "camouflage", "sacrifice"] },
            { "categorie": "Serie", "mot": "See", "indices": ["guerrier", "tribu", "vision"] },
            { "categorie": "Anime", "mot": "Demon Slayer", "indices": ["famille", "marque", "démon"] },
            { "categorie": "Personnage One Piece", "mot": "Fujitora", "indices": ["justice", "jeu d'argent", "épée"] },
            { "categorie": "Film", "mot": "The Dark Knight", "indices": ["ville", "masque", "justice"] },
        ]
    },
    "partie5": {
        nom: "Game 5",
        mots: [
            { "categorie": "Serie", "mot": "Game of Thrones", "indices": ["famille", "trahison", "loups"] },
            { "categorie": "Film", "mot": "Fight Club", "indices": ["violence", "dissociation", "narrateur"] },
            { "categorie": "Personnage One Piece", "mot": "Brook", "indices": ["glace", "pirate", "culotte"] },
            { "categorie": "Serie", "mot": "Friends", "indices": ["appartement", "café", "amitié"] },
            { "categorie": "Personnage One Piece", "mot": "Kaido", "indices": ["bête", "force", "alcool"] },
            { "categorie": "Film", "mot": "Shrek", "indices": ["conte", "transformation", "dreamworks"] },
            { "categorie": "Anime", "mot": "Fullmetal Alchemist", "indices": ["sacrifice", "ames", "transmutation"] },
            { "categorie": "Film", "mot": "Inception", "indices": ["architecte", "labyrinthe", "totem"] },
            { "categorie": "Serie", "mot": "Marcopolo", "indices": ["voyage", "commerce", "passée"] },
            { "categorie": "Personnage One Piece", "mot": "Kizaru", "indices": ["lunettes", "jaune", "miroir"] },
            { "categorie": "Serie", "mot": "Lost", "indices": ["mystère", "Australie", "temps"] },
            { "categorie": "Personnage Naruto", "mot": "Konan", "indices": ["orphelin", "ange", "fleur"] },
            { "categorie": "Film", "mot": "Spiderman", "indices": ["masque", "deuil", "responsabilité"] },
            { "categorie": "Serie", "mot": "Vikings", "indices": ["conquête", "saga", "famille"] },
            { "categorie": "Personnage One Piece", "mot": "Doflamingo", "indices": ["cruel", "royaume", "famille"] },
            { "categorie": "Anime", "mot": "Hunter x Hunter", "indices": ["examen", "insectes", "jeu"] },
            { "categorie": "Personnage Naruto", "mot": "Kushina", "indices": ["kyubi", "destin", "amour"] },
            { "categorie": "Anime", "mot": "Attaque des Titans", "indices": ["colère", "heritage", "liberté"] },
            { "categorie": "Anime", "mot": "Sword Art Online", "indices": ["guilde", "épée", "jeu"] },
            { "categorie": "Personnage One Piece", "mot": "Boa Hancock", "indices": ["fierté", "chef", "femme"] },
            { "categorie": "Anime", "mot": "My Hero Academia", "indices": ["determiation", "entrainement", "heritage"] },
        ]
    }
};

let parties = {};

io.on("connection", (socket) => {
    console.log("Nouvelle connexion :", socket.id);

    // 🔹 Obtenir la liste des parties disponibles
    socket.on("getPartiesDisponibles", () => {
        const liste = Object.keys(partiesThematiques).map(id => ({
            id,
            nom: partiesThematiques[id].nom,
            nbQuestions: partiesThematiques[id].mots.length
        }));
        socket.emit("partiesDisponibles", liste);
    });

    // 🔹 Hôte crée une partie avec une thématique choisie
    socket.on("creerPartie", (partieThematiqueId) => {
        if (!partiesThematiques[partieThematiqueId]) {
            socket.emit("erreur", "Partie thématique invalide !");
            return;
        }

        const code = Math.random().toString(36).substring(2, 6).toUpperCase();
        const motsPartie = partiesThematiques[partieThematiqueId].mots;

        parties[code] = {
            joueurs: {},
            host: socket.id,
            reponsesVisibles: false,
            indexMot: 0,
            indexIndice: 0,
            partieThematiqueId: partieThematiqueId,
            motsADeviner: motsPartie
        };
        socket.join(code);
        socket.emit("partieCreee", { code, nom: partiesThematiques[partieThematiqueId].nom });

        // Envoyer la première catégorie immédiatement à toute la room
        io.to(code).emit("nouveauMot", { categorie: motsPartie[0].categorie });

        console.log("Partie créée :", code, "- Thème:", partiesThematiques[partieThematiqueId].nom);
    });

    // 🔹 Joueur rejoint
    socket.on("rejoindrePartie", ({ code, pseudo }) => {
        const partie = parties[code];
        if (!partie) {
            socket.emit("erreur", "Code invalide !");
            return;
        }

        partie.joueurs[socket.id] = { pseudo, reponse: null, status: null, score: 0, indicesVus: 0, indicesPremiereProp: undefined, premiereReponse: null };
        socket.join(code);

        const joueursPourHost = Object.values(partie.joueurs).map(j => ({
            pseudo: j.pseudo,
            reponse: j.status === "valide" ? "V" : j.status === "propose" ? "O" : "...",
            score: j.score || 0
        }));
        io.to(partie.host).emit("joueursMaj", joueursPourHost);
        console.log(`${pseudo} rejoint ${code}`);
    });

    // 🔹 Joueur envoie sa réponse (proposition)
    socket.on("repondre", ({ code, texte, status }) => {
        const partie = parties[code];
        if (!partie) return;
        const joueur = partie.joueurs[socket.id];
        if (!joueur) return;

        if (status === "propose" && joueur.premiereReponse === null) {
            joueur.premiereReponse = texte;
        }

        joueur.reponse = texte;
        joueur.status = status || "propose";

        if (status === "propose" && joueur.indicesPremiereProp === undefined) {
            joueur.indicesPremiereProp = partie.indexIndice;
        }

        socket.emit("reponseConfirmee");

        const joueursPourHost = Object.values(partie.joueurs).map((j) => ({
            pseudo: j.pseudo,
            reponse: j.status === "valide" ? "V" : j.status === "propose" ? "O" : "...",
            score: j.score || 0
        }));
        io.to(partie.host).emit("joueursMaj", joueursPourHost);
    });

    // 🔹 Joueur valide sa réponse finale
    socket.on("validerReponse", ({ code, texte }) => {
        const partie = parties[code];
        if (!partie) return;

        const joueur = partie.joueurs[socket.id];
        if (!joueur) return;

        joueur.reponse = texte;
        joueur.status = "valide";
        joueur.indicesVus = partie.indexIndice;

        socket.emit("reponseConfirmee");

        const joueursPourHost = Object.values(partie.joueurs).map((j) => ({
            pseudo: j.pseudo,
            reponse: j.status === "valide" ? "V" : j.status === "propose" ? "O" : "...",
            score: j.score || 0
        }));

        io.to(partie.host).emit("joueursMaj", joueursPourHost);
    });

    // 🔹 Hôte clique sur "Montrer les réponses"
    socket.on("montrerReponses", (code) => {
        const partie = parties[code];
        if (!partie) return;

        partie.reponsesVisibles = true;
        const motActuel = partie.motsADeviner[partie.indexMot];

        Object.values(partie.joueurs).forEach(j => {
            if (j.status === "valide" && j.reponse) {
                const indicesVus = j.indicesVus || 0;
                const points = pointsParTour[indicesVus] || 1;

                let bonus = 0;
                if (j.indicesPremiereProp !== undefined && j.indicesPremiereProp === 0) {
                    const premiereReponse = j.premiereReponse || j.reponse;
                    if (premiereReponse.toLowerCase().trim() === motActuel.mot.toLowerCase().trim()) {
                        bonus = 2;
                    }
                }

                j.score += points + bonus;
            }
        });

        const joueursPourHost = Object.values(partie.joueurs).map(j => ({
            pseudo: j.pseudo,
            reponse: j.reponse || "...",
            score: j.score
        }));

        io.to(partie.host).emit("majReponses", { joueurs: joueursPourHost, motFinal: motActuel.mot });
    });

    // 🔹 Hôte passe au mot suivant
    socket.on("motSuivant", (code) => {
        const partie = parties[code];
        if (!partie) return;

        partie.indexMot++;

        // Vérifier si c'est la fin de la partie
        if (partie.indexMot >= partie.motsADeviner.length) {
            // Partie terminée - envoyer les scores finaux
            const joueursFinal = Object.values(partie.joueurs)
                .map(j => ({
                    pseudo: j.pseudo,
                    score: j.score
                }))
                .sort((a, b) => b.score - a.score); // Trier par score décroissant

            io.to(partie.host).emit("partieTerminee", joueursFinal);
            io.to(code).emit("partieTerminee", joueursFinal);
            return;
        }

        partie.indexIndice = 0;
        partie.reponsesVisibles = false;

        Object.values(partie.joueurs).forEach(j => {
            j.reponse = null;
            j.status = null;
            j.indicesVus = 0;
            j.indicesPremiereProp = undefined;
            j.premiereReponse = null;
        });

        const motActuel = partie.motsADeviner[partie.indexMot];

        io.to(code).emit("nouveauMot", { categorie: motActuel.categorie });
        io.to(code).emit("reinitialiserReponse");

        const joueursPourHost = Object.values(partie.joueurs).map(j => ({
            pseudo: j.pseudo,
            reponse: "...",
            score: j.score
        }));
        io.to(partie.host).emit("joueursMaj", joueursPourHost);
    });

    // 🔹 Hôte affiche l'indice suivant
    socket.on("indiceSuivant", (code) => {
        const partie = parties[code];
        if (!partie) return;

        const motActuel = partie.motsADeviner[partie.indexMot];

        if (partie.indexIndice >= motActuel.indices.length) return;

        const indice = motActuel.indices[partie.indexIndice];
        partie.indexIndice++;

        io.to(code).emit("nouvelIndice", indice);
        io.to(partie.host).emit("nouvelIndice", indice);
    });

    // 🔹 Déconnexion
    socket.on("disconnect", () => {
        for (let code in parties) {
            const partie = parties[code];
            if (partie && partie.joueurs[socket.id]) {
                delete partie.joueurs[socket.id];
                const joueursPourHost = Object.values(partie.joueurs).map(j => ({
                    pseudo: j.pseudo,
                    reponse: j.status === "valide" ? "V" : j.status === "propose" ? "O" : "...",
                    score: j.score || 0
                }));
                io.to(partie.host).emit("joueursMaj", joueursPourHost);
            }
        }
    });
});

server.listen(3000, () => {
    console.log("✅ Serveur sur http://localhost:3000");
});