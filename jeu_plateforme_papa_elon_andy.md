# Spécifications complètes — Jeu de plateforme « Une aventure créée par Papa, Elon et Andy »

## 🎮 Objectif général
Créer un **jeu de plateforme 2D complet**, inspiré de Super Mario Bros et Super Mario Run, conçu pour une **expérience mobile-first** mais entièrement jouable sur navigateur (ordinateur, tablette, smartphone). L’objectif est de proposer une aventure ludique, fluide et progressive, adaptée à des enfants de 5 et 7 ans, avec un univers coloré, des personnages emblématiques et des mécaniques intuitives.

L’IA (Codex ou autre modèle de développement) devra **tout générer** : code, assets visuels et sonores, mécaniques, interface, et tests. Aucun élément externe n’est fourni.

---

## 🧩 Technologies et contraintes techniques

- **Langage :** JavaScript ES6+
- **Moteur de jeu :** Phaser 3
- **Rendu :** Canvas (HTML5)
- **Compatibilité :**
  - Navigateurs modernes (Chrome, Safari, Firefox, Edge)
  - iOS et Android
  - Tablettes et ordinateurs (responsive)
  - Orientation portrait et paysage
- **Sauvegarde locale :** `localStorage`
- **Mode plein écran** disponible.
- **Progression sauvegardée automatiquement**.
- **Option “reprendre la partie”** dans le menu principal.

---

## 📱 Expérience utilisateur

- **Mobile-first** : interface et commandes pensées d’abord pour les écrans tactiles.
- **Contrôles tactiles :** boutons virtuels gauche / droite / saut / double saut / attaque.
- **Clavier (PC) :** flèches directionnelles + barre espace.
- **HUD affiché en permanence :** score, nombre de pièces, vies restantes.
- **Musique et sons** : activables/désactivables via le menu pause.
- **Mode hors-ligne** (le jeu fonctionne sans connexion après le premier chargement).
- **Ajout possible à l’écran d’accueil** (PWA avec manifeste intégré).

---

## 🧠 Scénario principal

Un grand méchant nommé **Dr Chaos** a volé les **cristaux de l’harmonie**, une source magique qui maintient l’équilibre des mondes. Ces cristaux sont maintenant éparpillés dans différents univers.

Papa, Elon et Andy, avec l’aide de leurs héros préférés (Sonic, Mario, Bob l’éponge, Blippi, etc.), partent les récupérer avant que Dr Chaos ne les utilise pour créer un monde de désordre éternel.

Chaque monde contient des **sous-fifres de Dr Chaos** : les “Gardiens du Chaos”, un par monde, jusqu’à l’affrontement final.

Entre chaque monde, une **bande dessinée de 2-3 cases** (simplement illustrée) présente la transition de manière courte et lisible pour des enfants (textes très simples, dialogues légers).

---

## 🧙 Personnages jouables

Tous les personnages ont les mêmes capacités de base, mais des **différences esthétiques** et des animations uniques.

1. **Sonic** – rapide, effet de vitesse en course.
2. **Shadow** – effet de fumée sombre.
3. **Knuckles** – saute légèrement plus haut.
4. **Kwazii (Octonauts)** – animation pirate.
5. **Capitaine Barnacle (Octonauts)** – animation courageuse.
6. **Kai (Ninjago)** – feu en attaque.
7. **Lloyd (Ninjago)** – effet vert lumineux.
8. **Bob l’éponge** – bulles en saut.
9. **Patrick** – claque en attaque.
10. **Blippi** – tourne sur lui-même pour attaquer.
11. **Mario** – animation classique.
12. **Luigi** – saute un peu plus haut.

Les joueurs peuvent **changer de personnage entre les niveaux**.

---

## 🌍 Mondes et niveaux

Le jeu comporte **6 mondes thématiques**, chacun avec sa propre ambiance visuelle, musique et ennemis.

| Monde | Thème | Niveaux | Boss | Spécificité |
|-------|--------|----------|------|--------------|
| 1 | Forêt magique | 1 à 4 | Grumf la Taupe Géante | Tremplins naturels, troncs mouvants |
| 2 | Désert doré | 5 à 8 | Scaraboss | Tempêtes de sable, sables mouvants |
| 3 | Océan infini | 9 à 12 | Capitaine Piranha | Niveaux aquatiques, bulles d’air |
| 4 | Montagne glacée | 13 à 15 | Yéti Frost | Glissades, plateformes fragiles |
| 5 | Ville urbaine | 16 à 18 | RoboChef | Circuits électriques, ascenseurs |
| 6 | Château du Chaos | 19 et 20 | Dr Chaos | Pièges, flammes, plateformes mouvantes |

Chaque niveau dure environ **2 à 4 minutes** et comporte **1 point de sauvegarde** (un drapeau).

---

## 💥 Mécaniques de jeu

### Déplacements
- Aller à gauche / droite
- Saut / double saut
- Attaque simple
- Interaction avec objets (pièces, items)

### Objets et bonus
- **Pièces** : augmentent le score total.
- **Vies** : augmentent les tentatives disponibles.
- **Items de pouvoir** :
  - Champignon géant → grandit jusqu’à ce qu’on se fasse toucher
  - Étoile → invincibilité temporaire
  - Boule de feu → tir de projectiles
  - Rayon laser → tir rapide à distance
  - Bouclier → protège un coup
  - Aimant → attire les pièces pendant 10 secondes
  - Horloge → ralentit les ennemis 5 secondes

Certains items apparaissent **aléatoirement** ou sont **rares**.

### Ennemis
Chaque monde a ses propres ennemis :
- Monde 1 : taupes bondissantes, oiseaux farceurs
- Monde 2 : scarabées, serpents de sable
- Monde 3 : poissons, crabes, méduses électriques
- Monde 4 : pingouins fous, stalactites vivantes
- Monde 5 : robots cuisiniers, drones
- Monde 6 : gardiens du chaos, chevaliers mécaniques

### Mécaniques spéciales
- Tremplins, plateformes mouvantes, tuyaux de transport, bulles sous-marines, ascenseurs, flammes, plateformes qui disparaissent.

### Difficulté
- Progression linéaire (la difficulté augmente légèrement par monde)
- Pas de limite de temps.

---

## 🪙 Score et progression

- Score total affiché en haut à gauche.
- Comptage : pièces + ennemis battus + temps restant (bonus mineur).
- Écran de résumé après chaque niveau :
  - Score obtenu
  - Pièces attrapées
  - Pouvoirs utilisés
  - Niveau suivant disponible.

### Sauvegarde et carte du monde
- Sauvegarde automatique après chaque niveau.
- **Carte interactive** : permet de voir la progression.
- Possibilité de sélectionner un niveau déjà terminé pour le rejouer.

---

## 🎵 Audio

- **Musique différente par monde** : ambiance adaptée (forêt, désert, eau, glace, ville, château).
- **Effets sonores** : saut, attaque, item attrapé, ennemi battu, victoire, défaite, checkpoint.
- **Sons mignons et simples** adaptés aux enfants.
- Boutons dans le menu pause pour activer/désactiver musique et sons.

---

## 💾 Interface et menus

### Menu principal
- Jouer
- Reprendre la partie
- Options (musique, sons, plein écran)
- Crédits : “Une aventure créée par Papa, Elon et Andy”

### En jeu
- Bouton pause
- Indicateurs permanents : score, vies, pièces.
- Animation fluide et couleurs vives.

---

## 🔐 Sauvegarde et persistance

- Données sauvegardées dans `localStorage` :
  ```json
  {
    "niveau": 7,
    "personnage": "Sonic",
    "vies": 3,
    "score": 1200,
    "pieces": 240
  }
  ```
- Reprise automatique à la dernière position connue.

---

## 🧩 Exigences de développement

### Structure de projet
```
/game
  /assets
    /sprites
    /tilesets
    /audio
  /src
    main.js
    config.js
    scenes/
      MenuScene.js
      LevelScene1.js ... LevelScene20.js
      UIScene.js
      MapScene.js
  index.html
  manifest.json
```

### Fonctionnalités clés à implémenter
1. Gestion des collisions et de la gravité.
2. Détection précise des plateformes mouvantes.
3. IA basique des ennemis (patrouille, attaque).
4. Gestion des checkpoints.
5. Interface adaptative mobile.
6. Système d’items et de pouvoirs.
7. Carte du monde interactive.
8. Sauvegarde locale persistante.
9. Système de sons et musique avec volume ajustable.
10. Transition fluide entre scènes.

---

## 🧪 Tests unitaires et d’intégration

L’IA doit générer et exécuter automatiquement des tests pour vérifier :

### Tests de gameplay
- Les collisions entre joueur et plateformes.
- Le saut et double saut fonctionnent toujours.
- Les items donnent les effets attendus.
- La mort du joueur réinitialise le niveau au dernier checkpoint.

### Tests d’interface
- Les boutons sont fonctionnels sur mobile et desktop.
- Le mode plein écran s’active correctement.
- Les options sons/musiques sont persistantes.

### Tests de sauvegarde
- La progression est bien enregistrée et restaurée.
- Le changement de personnage ne réinitialise pas les scores.

### Tests de compatibilité
- Chrome, Firefox, Safari, Edge.
- iPhone, iPad, Android (portrait et paysage).
- Résolution minimale : 320x480.

### Tests de performance
- FPS constant > 50.
- Aucune fuite mémoire.
- Chargement du jeu < 5 secondes sur mobile.

### Autotests continus
- L’IA doit exécuter, corriger et réexécuter les tests jusqu’à obtention de 100 % de réussite.
- Les erreurs doivent être loguées et corrigées automatiquement.

---

## 🏁 Fin du jeu et récompenses

- Après avoir vaincu Dr Chaos, cinématique de fin simple (illustration, musique héroïque, remerciement : “Bravo, tu as restauré les cristaux de l’harmonie !”).
- Déblocage d’un monde bonus avec **séquence spéciale** (course infinie rigolote).
- Générique final : “Une aventure créée par Papa, Elon et Andy”.

---

## ✨ Style visuel et ton

- Univers coloré, lumineux, joyeux.
- Design mignon, proche des jeux pour enfants.
- Textes courts, faciles à lire.
- Sons et musiques entraînants.

---

## 💡 Résumé pour Codex

**Mission :** Générer l’intégralité du jeu décrit ci-dessus, en utilisant Phaser 3 et JavaScript, avec tous les assets nécessaires (sprites, sons, musiques, animations). Aucune ressource externe n’est fournie.

L’IA doit :
1. Créer le code complet, structuré et commenté.
2. Générer les visuels et sons correspondants.
3. Intégrer les tests unitaires et les exécuter.
4. Réparer automatiquement les erreurs détectées.
5. Valider le jeu sur toutes les plateformes listées.

Objectif final : un **jeu parfaitement fonctionnel, fluide, et jouable sur navigateur ou mobile**, pour Elon et Andy ❤️

