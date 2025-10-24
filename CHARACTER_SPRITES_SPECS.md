# Spécifications pour les Sprites PNG des Personnages

## Dimensions et Format

### Taille des Sprites
- **Dimensions individuelles**: 64x64 pixels (pour compatibilité rétro-pixel art) OU 128x128 pixels (pour plus de détails)
- **Format**: PNG avec transparence (canal alpha)
- **Résolution**: 72 DPI minimum
- **Fond**: Transparent (pas de background)

### Spritesheet (Recommandé)
- **Format**: Une seule image contenant toutes les animations
- **Organisation**: Grille horizontale ou verticale
- **Espacement**: 0 pixels entre les frames (tight grid)
- **Dimensions totales**: Variable selon le nombre de frames (ex: 8 frames × 64px = 512px de largeur)

## Animations Requises par Personnage

### 1. Animations Essentielles (Minimum)

Chaque personnage doit avoir **au minimum** ces 4 états:

#### **IDLE** (Au repos)
- **Frames**: 2-4 frames
- **Durée**: 400-600ms par frame
- **Description**: Respiration légère, mouvement minimal
- **Exemple**: Personnage debout qui respire, yeux qui clignent occasionnellement

#### **WALK** (Marche)
- **Frames**: 4-6 frames
- **Durée**: 100-150ms par frame
- **Description**: Cycle de marche complet (gauche-droite)
- **Détails**:
  - Bras qui bougent en opposition aux jambes
  - Léger mouvement vertical (bounce)
  - Vue de profil ou 3/4

#### **JUMP** (Saut)
- **Frames**: 3-5 frames
- **Durée**: Variable (150ms montée, 200ms apex, 150ms descente)
- **Description**:
  - Frame 1: Préparation (accroupi)
  - Frame 2: Impulsion (jambes tendues)
  - Frame 3: Apex (bras en l'air, position compacte)
  - Frame 4: Descente (jambes légèrement fléchies)
  - Frame 5: Atterrissage (accroupi)

#### **HIT** (Touché/Blessé)
- **Frames**: 1-2 frames
- **Durée**: 100-200ms
- **Description**: Réaction à un impact
- **Détails**:
  - Personnage penché en arrière
  - Expression de douleur ou surprise
  - Possibilité de flash blanc/rouge pour effet

### 2. Animations Optionnelles (Pour Plus de Polish)

#### **RUN** (Course)
- **Frames**: 6-8 frames
- **Durée**: 80-100ms par frame
- **Description**: Comme WALK mais plus rapide et dynamique
- **Différence**: Jambes plus levées, bras plus énergiques

#### **ATTACK** (Attaque)
- **Frames**: 3-5 frames
- **Durée**: 100-150ms par frame
- **Description**: Animation d'attaque de base
- **Exemples**:
  - Sonic: Spin dash
  - Mario: Coup de poing
  - Kwazii: Coup d'épée

#### **FALL** (Chute)
- **Frames**: 2-3 frames
- **Durée**: 150-200ms par frame
- **Description**: État de chute libre
- **Détails**: Bras en mouvement, jambes pédalant

#### **VICTORY** (Victoire)
- **Frames**: 4-6 frames
- **Durée**: 200-300ms par frame
- **Description**: Animation jouée à la fin d'un niveau
- **Exemples**: Pouce levé, saut de joie, pose cool

## Spécifications par Personnage

### **Sonic the Hedgehog**

**Couleurs principales**:
- Bleu cobalt (#0066FF)
- Beige/Chair (#FFE0BD) pour le ventre
- Rouge (#FF0000) pour les chaussures
- Blanc pour les gants

**Animations requises**:
1. **IDLE**: Debout, tapant du pied impatiemment (2-3 frames)
2. **WALK**: Course normale (6 frames)
3. **JUMP**: Spin jump en boule (4 frames de rotation)
4. **SPINDASH**: Charge au sol (6 frames de rotation rapide) - OPTIONNEL

**Particularités**:
- Les épines doivent être bien visibles
- Effet de flou/vitesse sur les animations rapides
- Position en boule pour le saut

---

### **Shadow the Hedgehog**

**Couleurs principales**:
- Noir (#1a1a1a)
- Rouge (#CC0000) pour les rayures
- Blanc pour la fourrure du torse
- Rouge et noir pour les chaussures

**Animations requises**:
1. **IDLE**: Position confiante, bras croisés (2 frames)
2. **WALK**: Course assurée (6 frames)
3. **JUMP**: Spin jump similaire à Sonic (4 frames)
4. **CHAOS_CONTROL**: Téléportation (4 frames avec effet de disparition) - OPTIONNEL

**Particularités**:
- Rayures rouges bien visibles sur les épines
- Attitude plus "cool" et sérieuse que Sonic
- Possibilité d'aura verte/jaune pour pouvoirs Chaos

---

### **Knuckles the Echidna**

**Couleurs principales**:
- Rouge (#DD0000)
- Blanc pour le torse
- Gris/Violet (#9966CC) pour les chaussures
- Blanc pour les gants avec pointes

**Animations requises**:
1. **IDLE**: Position de combat, poings fermés (3 frames)
2. **WALK**: Marche lourde (4 frames)
3. **JUMP**: Saut avec bras en arrière (3 frames)
4. **GLIDE**: Bras tendus, planant (3 frames de glissement) - OPTIONNEL
5. **PUNCH**: Coup de poing puissant (4 frames) - OPTIONNEL

**Particularités**:
- Dreads (épines) vers l'arrière
- Pointes blanches sur les gants
- Posture plus massive et forte

---

### **Kwazii (Octonauts)**

**Couleurs principales**:
- Orange (#FF8C00) pour la fourrure
- Bleu marine (#003366) pour l'uniforme
- Blanc pour le ventre
- Noir pour le bandeau de pirate

**Animations requises**:
1. **IDLE**: Position de pirate, main sur la hanche (3 frames)
2. **WALK**: Marche de marin (4 frames)
3. **JUMP**: Saut acrobatique (4 frames)
4. **SWORD**: Coup d'épée (4 frames) - OPTIONNEL

**Particularités**:
- Bandeau de pirate sur un œil
- Queue de chat visible
- Épée peut être visible dans certaines animations

---

### **Captain Barnacles (Octonauts)**

**Couleurs principales**:
- Blanc (#FFFFFF) pour la fourrure
- Bleu marine (#003366) pour l'uniforme
- Noir pour le nez et les détails

**Animations requises**:
1. **IDLE**: Position de capitaine, debout fermement (2 frames)
2. **WALK**: Marche assurée de leader (4 frames)
3. **JUMP**: Saut d'ours puissant (4 frames)
4. **COMMAND**: Geste de commandement (3 frames) - OPTIONNEL

**Particularités**:
- Carrure large et imposante
- Casquette de capitaine peut être visible
- Expression calme et confiante

---

### **Kai (Ninjago)**

**Couleurs principales**:
- Rouge (#DC143C) pour la tenue de ninja
- Noir pour les détails
- Or/Doré pour les accents
- Chair pour le visage

**Animations requises**:
1. **IDLE**: Position de combat ninja (3 frames)
2. **WALK**: Marche silencieuse (4 frames)
3. **JUMP**: Saut ninja avec roulade (5 frames)
4. **ATTACK**: Coup de katana ou spinjitzu (6 frames) - OPTIONNEL

**Particularités**:
- Masque ninja couvrant le bas du visage
- Symbole du feu sur la tenue
- Katana ou épées en option

---

### **Lloyd (Ninjago)**

**Couleurs principales**:
- Vert (#00AA00) pour la tenue de ninja
- Or/Doré pour les accents (ninja d'or)
- Noir pour les détails
- Blond pour les cheveux (si visibles)

**Animations requises**:
1. **IDLE**: Position de leader (3 frames)
2. **WALK**: Marche confiante (4 frames)
3. **JUMP**: Saut ninja élégant (5 frames)
4. **ENERGY**: Pouvoir d'énergie verte (6 frames) - OPTIONNEL

**Particularités**:
- Peut avoir aura dorée (ninja d'or)
- Masque ninja
- Expression de détermination

---

### **SpongeBob SquarePants**

**Couleurs principales**:
- Jaune (#FFFF00) pour le corps
- Blanc pour la chemise
- Rouge (#FF0000) pour la cravate
- Marron pour le pantalon
- Noir pour les chaussures

**Animations requises**:
1. **IDLE**: Sourire énorme, position joyeuse (3 frames)
2. **WALK**: Marche rebondissante (6 frames, très cartoonesque)
3. **JUMP**: Saut hyperactif (4 frames)
4. **LAUGH**: Rire caractéristique (4 frames) - OPTIONNEL

**Particularités**:
- Forme carrée bien définie
- Pores visibles sur le corps (texture éponge)
- Grands yeux expressifs
- Dents proéminentes

---

### **Patrick Star**

**Couleurs principales**:
- Rose (#FFC0CB) pour le corps
- Vert (#00FF00) pour le short avec motif violet
- Rouge pour la bouche

**Animations requises**:
1. **IDLE**: Position détendue, ventre en avant (2 frames)
2. **WALK**: Marche lente et maladroite (4 frames)
3. **JUMP**: Saut lourd (3 frames)
4. **CONFUSED**: Expression perdue (2 frames) - OPTIONNEL

**Particularités**:
- Forme d'étoile de mer (5 branches)
- Ventre rond et proéminent
- Expression niaise/heureuse
- Pas de cou visible

---

### **Blippi**

**Couleurs principales**:
- Bleu (#0066FF) pour la chemise
- Orange (#FF8C00) pour la cravate et bretelles
- Bleu clair pour le pantalon
- Chair pour le visage
- Lunettes et casquette bleue/orange

**Animations requises**:
1. **IDLE**: Position énergique, pouce levé (3 frames)
2. **WALK**: Marche dynamique et éducative (6 frames)
3. **JUMP**: Saut enthousiaste (4 frames)
4. **WAVE**: Salut amical (3 frames) - OPTIONNEL

**Particularités**:
- Casquette bleue et orange toujours visible
- Lunettes
- Nœud papillon orange
- Expression joyeuse et éducative

---

### **Mario**

**Couleurs principales**:
- Rouge (#FF0000) pour la casquette et chemise
- Bleu (#0000FF) pour la salopette
- Chair pour le visage et mains (gants blancs)
- Marron pour les chaussures
- Noir pour la moustache

**Animations requises**:
1. **IDLE**: Position classique (2 frames)
2. **WALK**: Marche iconique (4 frames)
3. **JUMP**: Saut poing levé (4 frames, le saut classique de Mario)
4. **FIREBALL**: Lancer boule de feu (3 frames) - OPTIONNEL

**Particularités**:
- Casquette rouge avec M blanc
- Moustache noire épaisse
- Gants blancs
- Expression souriante

---

### **Luigi**

**Couleurs principales**:
- Vert (#00AA00) pour la casquette et chemise
- Bleu (#0000FF) pour la salopette
- Chair pour le visage et mains (gants blancs)
- Marron pour les chaussures
- Noir pour la moustache

**Animations requises**:
1. **IDLE**: Position légèrement nerveuse (3 frames)
2. **WALK**: Marche plus hésitante que Mario (4 frames)
3. **JUMP**: Saut plus haut que Mario (5 frames, signature de Luigi)
4. **SCARED**: Expression effrayée (2 frames) - OPTIONNEL

**Particularités**:
- Casquette verte avec L blanc
- Moustache noire (légèrement différente de Mario)
- Gants blancs
- Expression plus timide/nerveuse que Mario
- Jambes légèrement plus longues

---

## Organisation des Fichiers

### Structure Recommandée

```
game/assets/sprites/characters/
├── sonic/
│   ├── sonic-spritesheet.png (toutes animations en une image)
│   └── sonic-config.json (configuration des frames)
├── shadow/
│   ├── shadow-spritesheet.png
│   └── shadow-config.json
├── knuckles/
│   ├── knuckles-spritesheet.png
│   └── knuckles-config.json
... (etc pour chaque personnage)
```

### Fichier de Configuration JSON (Exemple)

Chaque personnage devrait avoir un fichier JSON associé décrivant les frames:

```json
{
  "name": "sonic",
  "frameWidth": 64,
  "frameHeight": 64,
  "animations": {
    "idle": {
      "frames": [0, 1, 2],
      "frameRate": 6,
      "repeat": -1
    },
    "walk": {
      "frames": [3, 4, 5, 6, 7, 8],
      "frameRate": 10,
      "repeat": -1
    },
    "jump": {
      "frames": [9, 10, 11, 12],
      "frameRate": 8,
      "repeat": 0
    },
    "hit": {
      "frames": [13],
      "frameRate": 1,
      "repeat": 0
    }
  }
}
```

## Guide de Style Artistique

### Cohérence Visuelle

**Tous les sprites doivent suivre le même style**:
- Style: Pixel art OU cartoon simplifié (cohérent entre tous les personnages)
- Contours: Épaisseur uniforme (1-2 pixels de noir)
- Ombres: Positionnées de manière cohérente (ex: source lumière en haut à gauche)
- Saturation: Couleurs vives mais pas trop saturées

### Lisibilité

- Silhouettes claires et reconnaissables
- Couleurs contrastées pour chaque personnage
- Détails simplifiés mais caractéristiques
- Proportions cartoon (tête plus grande que le corps)

### Optimisation

- Compression PNG optimisée (outils: TinyPNG, pngquant)
- Pas de détails inutiles
- Palette de couleurs limitée par sprite (8-16 couleurs max)

## Intégration dans Phaser 3

### Chargement dans le Preloader

```javascript
// Charger le spritesheet
this.load.spritesheet('sonic', 'assets/sprites/characters/sonic/sonic-spritesheet.png', {
    frameWidth: 64,
    frameHeight: 64
});

// Charger la config JSON (optionnel)
this.load.json('sonic-config', 'assets/sprites/characters/sonic/sonic-config.json');
```

### Création des Animations

```javascript
// Dans la méthode create()
this.anims.create({
    key: 'sonic-idle',
    frames: this.anims.generateFrameNumbers('sonic', { start: 0, end: 2 }),
    frameRate: 6,
    repeat: -1
});

this.anims.create({
    key: 'sonic-walk',
    frames: this.anims.generateFrameNumbers('sonic', { start: 3, end: 8 }),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'sonic-jump',
    frames: this.anims.generateFrameNumbers('sonic', { start: 9, end: 12 }),
    frameRate: 8,
    repeat: 0
});
```

### Utilisation dans le Jeu

```javascript
// Créer le sprite
const player = this.physics.add.sprite(100, 100, 'sonic');

// Jouer une animation
player.play('sonic-idle');

// Changer d'animation selon l'état
if (player.body.velocity.x !== 0) {
    player.play('sonic-walk', true);
} else {
    player.play('sonic-idle', true);
}

if (player.body.velocity.y < 0) {
    player.play('sonic-jump', true);
}
```

## Checklist Finale

Avant de considérer un sprite comme terminé:

- [ ] Toutes les animations essentielles sont présentes (IDLE, WALK, JUMP, HIT)
- [ ] Les dimensions sont correctes (64x64 ou 128x128)
- [ ] Le fond est transparent
- [ ] Les couleurs correspondent au personnage original
- [ ] Le style est cohérent avec les autres sprites
- [ ] Le fichier JSON de configuration est créé
- [ ] Le sprite a été testé dans Phaser
- [ ] Les animations se jouent correctement en boucle
- [ ] La taille du fichier est optimisée (<50KB par spritesheet idéalement)
- [ ] Les frames sont bien alignées dans la grille

## Ressources et Outils

### Outils de Création de Sprites
- **Aseprite** (payant, ~20€): Le meilleur pour le pixel art
- **Piskel** (gratuit, en ligne): Éditeur pixel art simple
- **GraphicsGale** (gratuit): Bon pour les animations
- **GIMP** (gratuit): Pour l'édition générale

### Outils d'Optimisation
- **TinyPNG**: Compression PNG sans perte de qualité
- **pngquant**: Réduction de palette de couleurs
- **ImageOptim** (Mac): Optimisation automatique

### Ressources pour Apprendre
- Lospec.com: Palettes de couleurs pixel art
- OpenGameArt.org: Exemples de sprites (pour inspiration uniquement)
- PixelJoint.com: Tutoriels et communauté

---

**Note importante**: Ces sprites doivent respecter les droits d'auteur. Pour un usage commercial, assurez-vous d'avoir les licences appropriées pour chaque personnage. Pour un usage personnel/éducatif, créez des versions inspirées mais distinctes des originaux.
