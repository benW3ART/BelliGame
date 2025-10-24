# 🎨 Documentation des Sprites

## Système de Génération de Sprites

Ce jeu utilise un système unique de **génération procédurale de sprites** via l'API Graphics de Phaser 3. Les sprites sont dessinés en temps réel avec du code JavaScript, ce qui les rend légers, modifiables et totalement personnalisables.

## Avantages de ce Système

✅ **Pas de fichiers images** - Tout est généré par code
✅ **Poids ultra-léger** - Pas d'assets à charger
✅ **Haute qualité** - Les sprites sont vectoriels
✅ **Personnalisable** - Changez les couleurs/formes facilement
✅ **Pas de droits d'auteur** - Créations originales inspirées

## Les 12 Personnages

Chaque personnage est dessiné avec des formes géométriques et possède des caractéristiques uniques:

### 🔵 Sonic
- Corps bleu vif avec ventre beige
- Épines dorsales caractéristiques (3 pointes)
- Grands yeux verts connectés
- Chaussures rouges avec bande blanche
- **Inspiration**: Hérisson rapide, mais avec un design simplifié

### ⚫ Shadow
- Corps noir avec reflets rouges
- Traits rouges sur le côté (signature)
- Yeux rouges intenses
- Chaussures sombres avec jets
- **Inspiration**: Version sombre du hérisson, aspect mystérieux

### 🔴 Knuckles
- Corps rouge musclé
- Dreadlocks caractéristiques (3 mèches)
- Yeux violets déterminés
- Sourcils froncés
- Gants blancs avec pointes rouges
- **Inspiration**: Échidné fort, style guerrier

### 🟠 Kwazii (Octonauts)
- Corps de chat orange
- Oreilles pointues avec intérieur rose
- Cache-œil de pirate sur l'œil droit
- Œil bleu vif
- Moustaches de chat
- Gilet bleu avec boutons dorés
- **Inspiration**: Chat pirate aventurier

### 🟤 Capitaine Barnacle
- Corps d'ours polaire brun
- Oreilles rondes
- Yeux bleus courageux
- Sourcils épais (air de leader)
- Uniforme de capitaine bleu marine
- Insignes dorés
- **Inspiration**: Ours leader, air noble et courageux

### 🔥 Kai (Ninjago)
- Peau claire avec cheveux bruns en épis
- Bandeau ninja rouge
- Yeux bruns concentrés
- Tenue ninja rouge
- Ceinture dorée
- Symbole du feu sur la tenue
- **Inspiration**: Ninja maître du feu

### 🟢 Lloyd (Ninjago)
- Cheveux blonds
- Bandeau ninja vert
- Yeux verts avec lueur (pouvoir)
- Tenue ninja verte
- Symbole du dragon
- **Inspiration**: Ninja légendaire, ninja vert

### 🟡 Bob l'éponge
- Corps carré jaune avec texture d'éponge
- Énormes yeux bleus avec cils
- Chemise blanche et cravate rouge
- Pantalon brun avec ceinture
- Nez long caractéristique
- Dents carrées visibles
- Chaussures noires brillantes
- **Inspiration**: Éponge de mer joyeuse

### 💗 Patrick
- Corps rose en forme d'étoile de mer (5 branches)
- Points roses foncés (texture)
- Gros yeux ronds décalés (regard "bête")
- Short vert avec motif fleurs
- Sourcils épais
- **Inspiration**: Étoile de mer simplette

### 🔵 Blippi
- Peau claire avec cheveux bruns
- Casquette bleue et orange
- Lunettes oranges caractéristiques
- Yeux enthousiastes
- Grand sourire
- Chemise bleue avec col orange
- Nœud papillon orange
- Bretelles oranges
- **Inspiration**: Éducateur joyeux et coloré

### 🔴 Mario
- Casquette rouge avec logo M blanc
- Grosse moustache noire
- Yeux bleus
- Nez rond
- Salopette bleue avec bretelles
- Chemise rouge
- Gants blancs
- **Inspiration**: Plombier héroïque classique

### 🟢 Luigi
- Casquette verte avec logo L blanc
- Moustache noire plus fine que Mario
- Yeux verts (différence avec Mario)
- Salopette bleue
- Chemise verte (différence principale)
- Gants blancs
- **Inspiration**: Frère de Mario, plus élancé

## Comment Modifier un Sprite

Les sprites sont définis dans `/game/src/CharacterSprites.js`. Chaque personnage a sa propre méthode statique (ex: `createSonic(scene)`).

### Exemple de modification

```javascript
// Changer la couleur de Sonic
graphics.fillStyle(0x0066FF, 1); // Bleu actuel
// Changez en:
graphics.fillStyle(0xFF6600, 1); // Orange
```

### Structure d'un sprite

```javascript
static createPersonnage(scene) {
    const graphics = scene.add.graphics();

    // 1. Dessiner le corps
    graphics.fillStyle(couleur, opacité);
    graphics.fillCircle(x, y, rayon);

    // 2. Dessiner les détails
    graphics.fillStyle(autreCouleur, opacité);
    graphics.fillEllipse(x, y, largeur, hauteur);

    // 3. Générer la texture
    const texture = graphics.generateTexture('nom', largeur, hauteur);
    graphics.destroy();

    return texture;
}
```

## Formes Disponibles

- `fillCircle(x, y, radius)` - Cercle
- `fillEllipse(x, y, width, height)` - Ovale
- `fillRect(x, y, width, height)` - Rectangle
- `beginPath()` + `moveTo()` + `lineTo()` + `closePath()` - Formes personnalisées
- `arc(x, y, radius, startAngle, endAngle)` - Arc de cercle
- `lineStyle(width, color, alpha)` - Style de ligne
- `strokeCircle()`, `strokeRect()` - Contours

## Animations

Les sprites utilisent les animations de Phaser:

- **Squash/Stretch** - En sautant
- **Flip** - Change de direction
- **Scale** - Grandit avec le champignon
- **Tint** - Changement de couleur avec les power-ups
- **Alpha** - Clignotement après respawn
- **Rotation** - Effet de mort

## Performance

- Les textures sont générées **une seule fois** au démarrage
- Stockées dans le cache de Phaser
- Réutilisées pour toutes les instances
- Très performant même sur mobile

## Ajouter un Nouveau Personnage

1. Créer une méthode `createNouveauPersonnage(scene)` dans `CharacterSprites.js`
2. Dessiner le personnage avec graphics
3. Générer la texture avec `generateTexture('id', width, height)`
4. Ajouter le personnage dans `config.js`:

```javascript
{
    id: 'nouveau',
    name: 'Nouveau Héros',
    color: 0xFF00FF,
    speed: 230,
    jumpPower: 450
}
```

5. Appeler la génération dans `generateAllSprites()`:

```javascript
nouveau: this.createNouveauPersonnage(scene)
```

## Différences avec les Originaux

Tous les personnages sont **inspirés** des originaux mais avec des différences notables:

- Style simplifié et géométrique
- Proportions ajustées
- Détails stylisés
- Couleurs similaires mais pas identiques
- Formes plus simples et cartoon

Cela permet d'avoir des personnages **reconnaissables** tout en restant **originaux** et sans problème de droits d'auteur.

---

**Créé avec ❤️ pour Elon et Andy**
