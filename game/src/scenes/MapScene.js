import { GameConfig } from '../config.js';

export default class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
        this.uiElements = [];
        this.levelInfo = null;
    }

    create() {
        this.createUI();

        // Écouter les changements de taille
        this.scale.on('resize', this.resize, this);
    }

    createUI() {
        // Nettoyer les éléments existants
        this.uiElements.forEach(el => {
            if (el.destroy) el.destroy();
        });
        this.uiElements = [];

        if (this.levelInfo) {
            this.levelInfo.destroy();
            this.levelInfo = null;
        }

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const isMobile = width < 768;

        // Background plein écran
        const bg = this.add.rectangle(width / 2, height / 2, width * 2, height * 2, 0x87CEEB);
        this.uiElements.push(bg);

        // Nuages animés
        this.createClouds();

        // Titre responsive
        const titleSize = Math.min(width * 0.075, 48);
        const title = this.add.text(width / 2, height * 0.06, 'CARTE DU MONDE', {
            fontSize: `${titleSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: Math.max(4, titleSize * 0.125)
        }).setOrigin(0.5);
        this.uiElements.push(title);

        // Informations du joueur - responsive
        const charData = GameConfig.characters.find(c => c.id === window.gameState.character) || GameConfig.characters[0];
        const infoSize = Math.min(width * 0.03, 24);
        const infoPadding = isMobile ? 5 : 10;
        const infoX = width * 0.05;
        let infoY = height * 0.14;

        const infos = [
            `Héros: ${charData.name}`,
            `⭐ Score: ${window.gameState.score}`,
            `💰 Pièces: ${window.gameState.coins}`,
            `❤️ Vies: ${window.gameState.lives}`
        ];

        infos.forEach((text, index) => {
            const info = this.add.text(infoX, infoY + index * (infoSize + 15), text, {
                fontSize: `${infoSize}px`,
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: infoPadding, y: infoPadding / 2 }
            });
            this.uiElements.push(info);
        });

        // Chemin avec les niveaux - adaptatif
        this.createLevelPath();

        // Boutons - responsive
        const btnSize = Math.min(width * 0.025, 20);
        const btnY = height * 0.95;

        const changeCharBtn = this.add.text(width * 0.15, btnY, '🎭 CHANGER DE HÉROS', {
            fontSize: `${btnSize}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#3498db',
            padding: { x: 15, y: 10 }
        }).setOrigin(0.5, 1).setInteractive({ useHandCursor: true });
        this.uiElements.push(changeCharBtn);

        changeCharBtn.on('pointerdown', () => {
            this.scene.start('CharacterSelectScene');
        });

        const menuBtn = this.add.text(width * 0.85, btnY, '🏠 MENU', {
            fontSize: `${btnSize}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 15, y: 10 }
        }).setOrigin(0.5, 1).setInteractive({ useHandCursor: true });
        this.uiElements.push(menuBtn);

        menuBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    createClouds() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const cloudCount = Math.min(5, Math.floor(width / 250));

        for (let i = 0; i < cloudCount; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(height * 0.1, height * 0.35);
            const cloudWidth = Math.min(150, width * 0.15);
            const cloud = this.add.ellipse(x, y, cloudWidth, cloudWidth * 0.5, 0xffffff, 0.6);
            this.uiElements.push(cloud);

            this.tweens.add({
                targets: cloud,
                x: x + width,
                duration: Phaser.Math.Between(20000, 40000),
                repeat: -1
            });
        }
    }

    createLevelPath() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const isMobile = width < 768;

        // Calculer les positions des niveaux de manière responsive
        const cols = isMobile ? 4 : 5;
        const rows = Math.ceil(20 / cols);

        const availableWidth = width * 0.9;
        const availableHeight = height * 0.5;
        const nodeSize = Math.min(70, (availableWidth / cols) - 20, (availableHeight / rows) - 20);
        const spacingX = (availableWidth - (nodeSize * cols)) / (cols + 1);
        const spacingY = (availableHeight - (nodeSize * rows)) / (rows + 1);

        const startX = (width - availableWidth) / 2 + spacingX + nodeSize / 2;
        const startY = height * 0.35 + spacingY + nodeSize / 2;

        // Dessiner les chemins entre les niveaux
        for (let i = 0; i < 19; i++) {
            const col1 = i % cols;
            const row1 = Math.floor(i / cols);
            const x1 = startX + col1 * (nodeSize + spacingX);
            const y1 = startY + row1 * (nodeSize + spacingY);

            const col2 = (i + 1) % cols;
            const row2 = Math.floor((i + 1) / cols);
            const x2 = startX + col2 * (nodeSize + spacingX);
            const y2 = startY + row2 * (nodeSize + spacingY);

            const line = this.add.line(
                0, 0, x1, y1, x2, y2, 0x8B4513
            ).setOrigin(0).setLineWidth(4);
            this.uiElements.push(line);
        }

        // Créer les niveaux
        for (let i = 1; i <= 20; i++) {
            const col = (i - 1) % cols;
            const row = Math.floor((i - 1) / cols);
            const x = startX + col * (nodeSize + spacingX);
            const y = startY + row * (nodeSize + spacingY);

            const world = GameConfig.worlds.find(w => w.levels.includes(i));
            const isUnlocked = window.gameState.unlockedLevels.includes(i);
            const isCurrent = window.gameState.currentLevel === i;

            const node = this.createLevelNode(x, y, i, world, isUnlocked, isCurrent, nodeSize);
            if (node) {
                this.uiElements.push(node);
            }
        }
    }

    createLevelNode(x, y, levelNum, world, isUnlocked, isCurrent, size) {
        // Safety check: if world is null, skip this level node
        if (!world) {
            console.warn(`No world found for level ${levelNum}`);
            return null;
        }

        const node = this.add.container(x, y);

        // Cercle du niveau - taille adaptive
        const radius = size / 2;
        const circle = this.add.circle(0, 0, radius, isUnlocked ? world.bgColor : 0x95a5a6);
        circle.setStrokeStyle(4, isCurrent ? 0xFFFF00 : 0xffffff);

        // Numéro du niveau - taille adaptive
        const numberSize = Math.min(28, size * 0.4);
        const number = this.add.text(0, 0, levelNum.toString(), {
            fontSize: `${numberSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Icône de verrouillage si non débloqué
        if (!isUnlocked) {
            const lockSize = Math.min(24, size * 0.35);
            const lock = this.add.text(0, 0, '🔒', {
                fontSize: `${lockSize}px`
            }).setOrigin(0.5);
            node.add([circle, lock]);
        } else {
            node.add([circle, number]);

            // Étoile si c'est un boss
            if (world.levels[world.levels.length - 1] === levelNum) {
                const starSize = Math.min(32, size * 0.45);
                const star = this.add.text(0, -radius - 20, '👑', {
                    fontSize: `${starSize}px`
                }).setOrigin(0.5);
                node.add(star);

                this.tweens.add({
                    targets: star,
                    y: -radius - 25,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1
                });
            }

            // Rendre cliquable
            node.setSize(size, size);
            node.setInteractive({ useHandCursor: true });

            // Animation du niveau actuel
            if (isCurrent) {
                this.tweens.add({
                    targets: circle,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 800,
                    yoyo: true,
                    repeat: -1
                });
            }

            // Effet hover
            node.on('pointerover', () => {
                this.tweens.add({
                    targets: node,
                    scaleX: 1.15,
                    scaleY: 1.15,
                    duration: 200
                });

                // Afficher info du niveau
                this.showLevelInfo(x, y - radius - 30, levelNum, world);
            });

            node.on('pointerout', () => {
                this.tweens.add({
                    targets: node,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 200
                });

                // Cacher info
                this.hideLevelInfo();
            });

            // Lancer le niveau
            node.on('pointerdown', () => {
                this.tweens.add({
                    targets: node,
                    scaleX: 0.9,
                    scaleY: 0.9,
                    duration: 100,
                    yoyo: true,
                    onComplete: () => {
                        window.gameState.currentLevel = levelNum;
                        window.gameState.saveState();
                        this.startLevel(levelNum, world);
                    }
                });
            });
        }

        return node;
    }

    showLevelInfo(x, y, levelNum, world) {
        if (this.levelInfo) {
            this.levelInfo.destroy();
        }

        const isBoss = world.levels[world.levels.length - 1] === levelNum;
        const text = isBoss
            ? `Niveau ${levelNum}\n${world.name}\n⚔️ BOSS: ${world.boss}`
            : `Niveau ${levelNum}\n${world.name}`;

        const fontSize = Math.min(20, this.cameras.main.width * 0.025);
        this.levelInfo = this.add.text(x, y, text, {
            fontSize: `${fontSize}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 15, y: 10 },
            align: 'center'
        }).setOrigin(0.5);
    }

    hideLevelInfo() {
        if (this.levelInfo) {
            this.levelInfo.destroy();
            this.levelInfo = null;
        }
    }

    startLevel(levelNum, world) {
        // Vérifier si c'est un niveau de boss
        const isBossLevel = world.levels[world.levels.length - 1] === levelNum;

        // Si c'est le premier niveau d'un monde (sauf le premier monde), montrer la BD
        if (world.levels[0] === levelNum && world.id > 1) {
            this.scene.start('ComicScene', { worldId: world.id, levelNum: levelNum });
        } else if (isBossLevel) {
            // Lancer le combat de boss
            this.scene.start('BossScene', { level: levelNum, world: world });
        } else {
            // Niveau normal
            this.scene.start('GameScene', { level: levelNum, world: world });
        }
    }

    resize(gameSize) {
        // Recréer l'interface avec les nouvelles dimensions
        this.createUI();
    }

    shutdown() {
        this.scale.off('resize', this.resize, this);
    }
}
