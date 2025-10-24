export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PauseScene' });
    }

    create() {
        const { width, height } = this.game.config;

        // Detect which game scene is paused
        this.pausedScene = this.scene.isPaused('GameScene') ? 'GameScene' : 'BossScene';

        // Overlay semi-transparent
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);

        // Titre
        this.add.text(width / 2, height / 2 - 150, 'PAUSE', {
            fontSize: '72px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Boutons
        const btnSpacing = 80;
        let currentY = height / 2 - 30;

        // Reprendre
        this.createButton(width / 2, currentY, '▶️ REPRENDRE', 0x4CAF50, () => {
            this.scene.stop();
            this.scene.resume(this.pausedScene);
        });

        currentY += btnSpacing;

        // Recommencer le niveau
        this.createButton(width / 2, currentY, '🔄 RECOMMENCER', 0x3498db, () => {
            this.scene.stop();
            this.scene.stop(this.pausedScene);
            this.scene.stop('UIScene');

            const pausedSceneRef = this.scene.get(this.pausedScene);
            if (pausedSceneRef && pausedSceneRef.currentLevelData) {
                this.scene.start(this.pausedScene, pausedSceneRef.currentLevelData);
            }
        });

        currentY += btnSpacing;

        // Carte du monde
        this.createButton(width / 2, currentY, '🗺️ CARTE DU MONDE', 0x9b59b6, () => {
            this.scene.stop();
            this.scene.stop(this.pausedScene);
            this.scene.stop('UIScene');
            this.scene.start('MapScene');
        });

        currentY += btnSpacing;

        // Menu principal
        this.createButton(width / 2, currentY, '🏠 MENU PRINCIPAL', 0xe74c3c, () => {
            this.scene.stop();
            this.scene.stop(this.pausedScene);
            this.scene.stop('UIScene');
            this.scene.start('MenuScene');
        });

        // Options (musique et sons)
        currentY += btnSpacing + 20;

        const musicToggle = this.createToggle(width / 2 - 100, currentY, window.gameState.musicEnabled, (value) => {
            window.gameState.musicEnabled = value;
            window.gameState.saveState();
            // TODO: Mettre à jour la musique du jeu
        });

        this.add.text(width / 2 + 20, currentY, '🎵 Musique', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);

        currentY += 50;

        const sfxToggle = this.createToggle(width / 2 - 100, currentY, window.gameState.sfxEnabled, (value) => {
            window.gameState.sfxEnabled = value;
            window.gameState.saveState();
        });

        this.add.text(width / 2 + 20, currentY, '🔊 Sons', {
            fontSize: '24px',
            color: '#ffffff'
        }).setOrigin(0, 0.5);
    }

    createButton(x, y, text, color, callback) {
        const button = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 400, 60, color);
        bg.setStrokeStyle(4, 0xffffff);

        const buttonText = this.add.text(0, 0, text, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        button.add([bg, buttonText]);
        button.setSize(400, 60);
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

    createToggle(x, y, initialState, callback) {
        const container = this.add.container(x, y);

        const bg = this.add.rectangle(0, 0, 80, 40, initialState ? 0x4CAF50 : 0x95a5a6, 1);
        bg.setStrokeStyle(2, 0xffffff);

        const handle = this.add.circle(initialState ? 20 : -20, 0, 15, 0xffffff);

        container.add([bg, handle]);
        container.setSize(80, 40);
        container.setInteractive({ useHandCursor: true });

        let state = initialState;

        container.on('pointerdown', () => {
            state = !state;
            bg.setFillStyle(state ? 0x4CAF50 : 0x95a5a6);
            this.tweens.add({
                targets: handle,
                x: state ? 20 : -20,
                duration: 200
            });
            callback(state);
        });

        return container;
    }
}
