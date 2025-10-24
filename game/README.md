# 🎮 Une Aventure Créée par Papa, Elon et Andy

Un jeu de plateforme 2D complet inspiré de Super Mario Bros, créé avec Phaser 3 et conçu pour une expérience mobile-first.

## 📖 Description

Partez à l'aventure avec vos héros préférés (Sonic, Mario, Bob l'éponge, Blippi, et plus encore!) pour récupérer les cristaux de l'harmonie volés par Dr Chaos!

### Caractéristiques principales

- 🎭 **12 personnages jouables** avec des capacités uniques
- 🌍 **6 mondes thématiques** (Forêt, Désert, Océan, Glace, Ville, Château)
- 🎯 **20 niveaux progressifs**
- 👾 **6 boss épiques** à affronter
- 💫 **7 power-ups différents**
- 📱 **Contrôles tactiles** pour mobile
- ⌨️ **Support clavier** pour PC
- 💾 **Sauvegarde automatique** avec localStorage
- 🎵 **Musique et effets sonores** adaptés
- 🌐 **PWA** - Jouable hors ligne!

## 🚀 Comment Jouer

### Sur Ordinateur

1. Ouvrez `index.html` dans votre navigateur
2. Utilisez les **flèches directionnelles** pour vous déplacer
3. Appuyez sur **ESPACE** pour sauter (double saut possible!)
4. Appuyez sur **X** pour attaquer

### Sur Mobile/Tablette

1. Ouvrez `index.html` dans votre navigateur mobile
2. Utilisez les **boutons tactiles** à l'écran
3. Bouton gauche/droite pour se déplacer
4. Bouton haut pour sauter
5. Bouton épée pour attaquer

## 🎯 Objectif du Jeu

- Collectez les **pièces** pour augmenter votre score
- Battez les **ennemis** pour gagner des points
- Récupérez des **power-ups** pour obtenir des capacités spéciales
- Atteignez le **drapeau** pour activer le checkpoint
- Arrivez au **drapeau à damier** pour terminer le niveau
- Battez les **boss** de chaque monde
- Sauvez le monde en récupérant tous les cristaux!

## 🦸 Personnages

1. **Sonic** - Le plus rapide
2. **Shadow** - Mystérieux et puissant
3. **Knuckles** - Saute très haut
4. **Kwazii** - L'aventurier pirate
5. **Capitaine Barnacle** - Courageux et fort
6. **Kai** - Maître du feu
7. **Lloyd** - Le ninja vert
8. **Bob l'éponge** - Plein de bulles
9. **Patrick** - L'étoile de mer
10. **Blippi** - L'explorateur
11. **Mario** - Le classique
12. **Luigi** - Le sauteur

## 💫 Power-ups

- 🍄 **Champignon géant** - Grandit jusqu'à être touché
- ⭐ **Étoile** - Invincibilité temporaire (8s)
- 🔥 **Boule de feu** - Tir de projectiles (15s)
- ⚡ **Rayon laser** - Tir rapide (12s)
- 🛡️ **Bouclier** - Protège un coup
- 🧲 **Aimant** - Attire les pièces (10s)
- ⏰ **Horloge** - Ralentit les ennemis (5s)

## 🌍 Les Mondes

### Monde 1: Forêt Magique (Niveaux 1-4)
- Boss: **Grumf la Taupe Géante**
- Ennemis: Taupes bondissantes, oiseaux farceurs
- Spécialité: Tremplins naturels, plateformes mouvantes

### Monde 2: Désert Doré (Niveaux 5-8)
- Boss: **Scaraboss**
- Ennemis: Scarabées, serpents de sable
- Spécialité: Tempêtes de sable, sables mouvants

### Monde 3: Océan Infini (Niveaux 9-12)
- Boss: **Capitaine Piranha**
- Ennemis: Poissons, crabes, méduses électriques
- Spécialité: Niveaux aquatiques, bulles d'air

### Monde 4: Montagne Glacée (Niveaux 13-15)
- Boss: **Yéti Frost**
- Ennemis: Pingouins fous, stalactites vivantes
- Spécialité: Plateformes glissantes et fragiles

### Monde 5: Ville Urbaine (Niveaux 16-18)
- Boss: **RoboChef**
- Ennemis: Robots cuisiniers, drones
- Spécialité: Circuits électriques, ascenseurs

### Monde 6: Château du Chaos (Niveaux 19-20)
- Boss: **Dr Chaos** (Boss Final!)
- Ennemis: Gardiens du chaos, chevaliers mécaniques
- Spécialité: Pièges mortels, flammes, plateformes mouvantes

## 🛠️ Technologies Utilisées

- **Phaser 3** - Moteur de jeu HTML5
- **JavaScript ES6+** - Langage de programmation
- **HTML5 Canvas** - Rendu graphique
- **localStorage** - Sauvegarde des données
- **PWA** - Application web progressive

## 📁 Structure du Projet

```
game/
├── index.html              # Page principale
├── manifest.json           # Manifeste PWA
├── sw.js                   # Service Worker
├── src/
│   ├── main.js            # Point d'entrée
│   ├── config.js          # Configuration du jeu
│   └── scenes/            # Scènes du jeu
│       ├── MenuScene.js
│       ├── CharacterSelectScene.js
│       ├── MapScene.js
│       ├── GameScene.js
│       ├── UIScene.js
│       ├── PauseScene.js
│       ├── GameOverScene.js
│       ├── VictoryScene.js
│       └── ComicScene.js
└── assets/                # Assets (sprites, sons, musiques)
    ├── sprites/
    ├── tilesets/
    └── audio/
```

## 🎮 Installation

### Méthode 1: Jouer directement

1. Téléchargez ou clonez ce repository
2. Ouvrez `game/index.html` dans votre navigateur
3. C'est tout! Aucune installation nécessaire

### Méthode 2: Serveur local (recommandé pour le développement)

```bash
# Avec Python 3
cd game
python -m http.server 8000

# Avec Node.js
npx http-server game -p 8000
```

Ensuite, ouvrez `http://localhost:8000` dans votre navigateur.

### Méthode 3: PWA sur mobile

1. Ouvrez le jeu dans votre navigateur mobile
2. Ajoutez-le à votre écran d'accueil
3. Jouez comme une application native!

## 💾 Sauvegarde

Le jeu sauvegarde automatiquement:
- Votre progression (niveau atteint)
- Votre personnage sélectionné
- Vos vies restantes
- Votre score total
- Vos pièces collectées
- Les niveaux débloqués

La sauvegarde se fait dans le `localStorage` de votre navigateur.

## 🎨 Personnalisation

Le jeu utilise des graphiques procéduraux (formes géométriques et emojis) pour être facilement personnalisable. Vous pouvez:

- Modifier les couleurs dans `config.js`
- Ajouter de nouveaux personnages dans `GameConfig.characters`
- Créer de nouveaux mondes dans `GameConfig.worlds`
- Ajuster la difficulté dans `GameConfig.gameplay`

## 📱 Compatibilité

- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Edge (Desktop)
- ✅ iOS Safari
- ✅ Android Chrome

Résolution minimale: 320x480

## 🐛 Dépannage

### Le jeu ne se charge pas
- Vérifiez votre connexion internet (pour le premier chargement)
- Videz le cache de votre navigateur
- Essayez avec un autre navigateur

### Les contrôles ne fonctionnent pas
- Sur mobile: Assurez-vous que le JavaScript est activé
- Sur PC: Vérifiez que les touches ne sont pas désactivées

### La sauvegarde ne fonctionne pas
- Vérifiez que les cookies/localStorage sont activés
- Ne jouez pas en mode navigation privée

## 📝 Crédits

**Une aventure créée par Papa, Elon et Andy**

Développé avec ❤️ en 2025

- Moteur de jeu: Phaser 3
- Inspiré par: Super Mario Bros, Super Mario Run, Sonic

## 📄 Licence

Ce projet est créé à des fins éducatives et personnelles. Les personnages mentionnés appartiennent à leurs propriétaires respectifs.

---

🎮 **Bon jeu!** 🎮
