import { GameConfig } from '../config.js';

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    create(data) {
        const { width, height } = this.game.config;

        // Detect which scene we came from
        this.isBossLevel = false;
        if (data.levelData && data.levelData.world && data.levelData.level) {
            const world = data.levelData.world;
            this.isBossLevel = world.levels[world.levels.length - 1] === data.levelData.level;
        }

        // Background sombre
        this.add.rectangle(0, 0, width, height, 0x000000, 0.9).setOrigin(0);

        // Animation d'entrée
        this.cameras.main.fadeIn(500);

        // Titre "Game Over"
        const gameOverText = this.add.text(width / 2, height / 3, 'GAME OVER', {
            fontSize: '80px',
            fontFamily: 'Arial Black',
            color: '#e74c3c',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Animation du titre
        this.tweens.add({
            targets: gameOverText,
            scaleX: 1.05,
            scaleY: 1.05,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        // Message
        this.add.text(width / 2, height / 2, '😢 Oh non! Tu as perdu toutes tes vies!', {
            fontSize: '28px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Statistiques
        this.add.text(width / 2, height / 2 + 60,
            `Score final: ${window.gameState.score}\n` +
            `Pièces collectées: ${window.gameState.coins}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Boutons
        const btnY = height - 180;

        // Recommencer
        this.createButton(width / 2, btnY, '🔄 RECOMMENCER', 0x3498db, () => {
            // Restaurer les vies
            window.gameState.lives = GameConfig.gameplay.startingLives;
            window.gameState.saveState();

            // Restart appropriate scene
            if (this.isBossLevel) {
                this.scene.start('BossScene', data.levelData);
            } else {
                this.scene.start('GameScene', data.levelData);
            }
        });

        // Carte du monde
        this.createButton(width / 2, btnY + 80, '🗺️ CARTE DU MONDE', 0x9b59b6, () => {
            // Restaurer les vies
            window.gameState.lives = GameConfig.gameplay.startingLives;
            window.gameState.saveState();

            this.scene.start('MapScene');
        });
    }

    createButton(x, y, text, color, callback) {
        const button = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 450, 60, color);
        bg.setStrokeStyle(4, 0xffffff);

        const buttonText = this.add.text(0, 0, text, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        button.add([bg, buttonText]);
        button.setSize(450, 60);
        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 200
            });
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
        });

        button.on('pointerdown', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.95,
                scaleY: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: callback
            });
        });

        return button;
    }
}
