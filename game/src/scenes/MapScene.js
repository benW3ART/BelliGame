import { GameConfig } from '../config.js';

export default class MapScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MapScene' });
    }

    create() {
        const { width, height } = this.game.config;

        // Background
        this.add.rectangle(0, 0, width, height, 0x87CEEB).setOrigin(0);

        // Nuages animés
        this.createClouds();

        // Titre
        this.add.text(width / 2, 50, 'CARTE DU MONDE', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Informations du joueur
        const charData = GameConfig.characters.find(c => c.id === window.gameState.character);
        this.add.text(50, 50, `Héros: ${charData.name}`, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });

        this.add.text(50, 90, `⭐ Score: ${window.gameState.score}`, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });

        this.add.text(50, 130, `💰 Pièces: ${window.gameState.coins}`, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });

        this.add.text(50, 170, `❤️ Vies: ${window.gameState.lives}`, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 10, y: 5 }
        });

        // Chemin avec les niveaux
        this.createLevelPath();

        // Boutons
        const btnY = height - 70;

        const changeCharBtn = this.add.text(150, btnY, '🎭 CHANGER DE HÉROS', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#3498db',
            padding: { x: 15, y: 10 }
        }).setInteractive({ useHandCursor: true });

        changeCharBtn.on('pointerdown', () => {
            this.scene.start('CharacterSelectScene');
        });

        const menuBtn = this.add.text(width - 150, btnY, '🏠 MENU', {
            fontSize: '20px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 15, y: 10 }
        }).setOrigin(1, 0).setInteractive({ useHandCursor: true });

        menuBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    createClouds() {
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(0, this.game.config.width);
            const y = Phaser.Math.Between(100, 300);
            const cloud = this.add.ellipse(x, y, 150, 80, 0xffffff, 0.6);

            this.tweens.add({
                targets: cloud,
                x: x + this.game.config.width,
                duration: Phaser.Math.Between(20000, 40000),
                repeat: -1
            });
        }
    }

    createLevelPath() {
        const { width, height } = this.game.config;

        // Créer un chemin sinueux pour les niveaux
        const pathPoints = [
            { x: 150, y: 250 }, { x: 250, y: 280 }, { x: 350, y: 250 }, { x: 450, y: 280 },
            { x: 550, y: 250 }, { x: 650, y: 280 }, { x: 750, y: 250 }, { x: 850, y: 280 },
            { x: 950, y: 250 }, { x: 1050, y: 280 }, { x: 150, y: 400 }, { x: 250, y: 430 },
            { x: 350, y: 400 }, { x: 450, y: 430 }, { x: 550, y: 400 }, { x: 650, y: 430 },
            { x: 750, y: 400 }, { x: 850, y: 430 }, { x: 950, y: 400 }, { x: 1050, y: 430 }
        ];

        // Dessiner le chemin
        for (let i = 0; i < pathPoints.length - 1; i++) {
            const line = this.add.line(
                0, 0,
                pathPoints[i].x, pathPoints[i].y,
                pathPoints[i + 1].x, pathPoints[i + 1].y,
                0x8B4513
            ).setOrigin(0).setLineWidth(8);
        }

        // Créer les niveaux
        for (let i = 1; i <= 20; i++) {
            const point = pathPoints[i - 1];
            const world = GameConfig.worlds.find(w => w.levels.includes(i));
            const isUnlocked = window.gameState.unlockedLevels.includes(i);
            const isCurrent = window.gameState.currentLevel === i;

            this.createLevelNode(point.x, point.y, i, world, isUnlocked, isCurrent);
        }
    }

    createLevelNode(x, y, levelNum, world, isUnlocked, isCurrent) {
        const node = this.add.container(x, y);

        // Cercle du niveau
        const circle = this.add.circle(0, 0, 35, isUnlocked ? world.bgColor : 0x95a5a6);
        circle.setStrokeStyle(4, isCurrent ? 0xFFFF00 : 0xffffff);

        // Numéro du niveau
        const number = this.add.text(0, 0, levelNum.toString(), {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Icône de verrouillage si non débloqué
        if (!isUnlocked) {
            const lock = this.add.text(0, 0, '🔒', {
                fontSize: '24px'
            }).setOrigin(0.5);
            node.add([circle, lock]);
        } else {
            node.add([circle, number]);

            // Étoile si c'est un boss
            if (world.levels[world.levels.length - 1] === levelNum) {
                const star = this.add.text(0, -50, '👑', {
                    fontSize: '32px'
                }).setOrigin(0.5);
                node.add(star);

                this.tweens.add({
                    targets: star,
                    y: -55,
                    duration: 1000,
                    yoyo: true,
                    repeat: -1
                });
            }

            // Rendre cliquable
            node.setSize(70, 70);
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
                this.showLevelInfo(x, y - 80, levelNum, world);
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

        this.levelInfo = this.add.text(x, y, text, {
            fontSize: '20px',
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
        // Si c'est le premier niveau d'un monde (sauf le premier monde), montrer la BD
        if (world.levels[0] === levelNum && world.id > 1) {
            this.scene.start('ComicScene', { worldId: world.id, levelNum: levelNum });
        } else {
            this.scene.start('GameScene', { level: levelNum, world: world });
        }
    }
}
