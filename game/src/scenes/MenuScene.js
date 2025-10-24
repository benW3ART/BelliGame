export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        // Créer des assets de base procéduralement
        this.createPlaceholderAssets();
    }

    createPlaceholderAssets() {
        // Titre du jeu
        const graphics = this.add.graphics();

        // Background gradient
        graphics.fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1);
        graphics.fillRect(0, 0, this.game.config.width, this.game.config.height);

        // Destroy graphics after use to prevent memory leak
        graphics.destroy();
    }

    create() {
        const { width, height } = this.game.config;

        // Background
        this.add.rectangle(0, 0, width, height, 0x667eea).setOrigin(0);

        // Étoiles animées en arrière-plan
        this.createStars();

        // Titre du jeu avec style cartoon
        const titleText = 'UNE AVENTURE\nCRÉÉE PAR\nPAPA, ELON\nET ANDY';
        const title = this.add.text(width / 2, 150, titleText, {
            fontSize: '56px',
            fontFamily: 'Arial Black, sans-serif',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#000000',
                blur: 8,
                fill: true
            }
        }).setOrigin(0.5);

        // Animation du titre
        this.tweens.add({
            targets: title,
            y: 140,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Boutons du menu
        const buttonY = 420;
        const buttonSpacing = 80;

        this.createButton(width / 2, buttonY, 'JOUER', () => {
            this.scene.start('CharacterSelectScene');
        });

        // Bouton "Reprendre" seulement si une partie existe
        if (window.gameState.currentLevel > 1 || window.gameState.score > 0) {
            this.createButton(width / 2, buttonY + buttonSpacing, 'REPRENDRE', () => {
                this.scene.start('MapScene');
            });
        }

        this.createButton(width / 2, buttonY + buttonSpacing * 2, 'OPTIONS', () => {
            this.showOptionsModal();
        });

        this.createButton(width / 2, buttonY + buttonSpacing * 3, 'CRÉDITS', () => {
            this.showCredits();
        });

        // Version du jeu
        this.add.text(width - 10, height - 10, 'v1.0', {
            fontSize: '16px',
            color: '#ffffff',
            alpha: 0.5
        }).setOrigin(1);

        // Instructions pour mobile
        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS) {
            this.add.text(width / 2, height - 40, 'Utilisez les contrôles tactiles en jeu', {
                fontSize: '18px',
                color: '#ffffff',
                alpha: 0.7
            }).setOrigin(0.5);
        }
    }

    createStars() {
        for (let i = 0; i < 50; i++) {
            const x = Phaser.Math.Between(0, this.game.config.width);
            const y = Phaser.Math.Between(0, this.game.config.height);
            const star = this.add.circle(x, y, 2, 0xffffff, 0.8);

            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: Phaser.Math.Between(1000, 3000),
                yoyo: true,
                repeat: -1
            });
        }
    }

    createButton(x, y, text, callback) {
        const button = this.add.container(x, y);

        // Rectangle du bouton
        const bg = this.add.rectangle(0, 0, 400, 60, 0x4CAF50);
        bg.setStrokeStyle(4, 0xffffff);

        // Ombre du bouton
        const shadow = this.add.rectangle(4, 4, 400, 60, 0x000000, 0.3);

        // Texte du bouton
        const buttonText = this.add.text(0, 0, text, {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        button.add([shadow, bg, buttonText]);
        button.setSize(400, 60);
        button.setInteractive({ useHandCursor: true });

        // Effets hover
        button.on('pointerover', () => {
            this.tweens.add({
                targets: bg,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 200
            });
            bg.setFillStyle(0x66BB6A);
        });

        button.on('pointerout', () => {
            this.tweens.add({
                targets: bg,
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
            bg.setFillStyle(0x4CAF50);
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

    showOptionsModal() {
        const { width, height } = this.game.config;

        // Overlay sombre
        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7).setOrigin(0);
        overlay.setInteractive();

        // Fenêtre modale
        const modalBg = this.add.rectangle(width / 2, height / 2, 600, 400, 0x2c3e50);
        modalBg.setStrokeStyle(4, 0xffffff);

        const titleModal = this.add.text(width / 2, height / 2 - 150, 'OPTIONS', {
            fontSize: '40px',
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);

        // Options musique
        const musicText = this.add.text(width / 2 - 200, height / 2 - 50, 'Musique:', {
            fontSize: '28px',
            color: '#ffffff'
        });

        const musicToggle = this.createToggle(width / 2 + 100, height / 2 - 50, window.gameState.musicEnabled, (value) => {
            window.gameState.musicEnabled = value;
            window.gameState.saveState();
        });

        // Options sons
        const sfxText = this.add.text(width / 2 - 200, height / 2 + 20, 'Sons:', {
            fontSize: '28px',
            color: '#ffffff'
        });

        const sfxToggle = this.createToggle(width / 2 + 100, height / 2 + 20, window.gameState.sfxEnabled, (value) => {
            window.gameState.sfxEnabled = value;
            window.gameState.saveState();
        });

        // Bouton plein écran
        const fullscreenBtn = this.add.text(width / 2, height / 2 + 90, '📺 PLEIN ÉCRAN', {
            fontSize: '24px',
            color: '#4CAF50',
            backgroundColor: '#34495e',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        fullscreenBtn.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        // Bouton fermer
        const closeBtn = this.add.text(width / 2, height / 2 + 150, 'FERMER', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            modalBg.destroy();
            titleModal.destroy();
            musicText.destroy();
            musicToggle.destroy();
            sfxText.destroy();
            sfxToggle.destroy();
            fullscreenBtn.destroy();
            closeBtn.destroy();
        });
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

    showCredits() {
        const { width, height } = this.game.config;

        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);
        overlay.setInteractive();

        const creditsText = this.add.text(width / 2, height / 2,
            '🎮 UNE AVENTURE CRÉÉE PAR\nPAPA, ELON ET ANDY\n\n' +
            '❤️ Avec amour pour Elon et Andy ❤️\n\n' +
            'Développé avec Phaser 3\n' +
            'JavaScript ES6+\n\n' +
            '© 2025', {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        const closeBtn = this.add.text(width / 2, height - 100, 'FERMER', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            creditsText.destroy();
            closeBtn.destroy();
        });
    }
}
