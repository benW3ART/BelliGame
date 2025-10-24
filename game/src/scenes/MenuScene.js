export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        this.uiElements = [];
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
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);

        // Destroy graphics after use to prevent memory leak
        graphics.destroy();
    }

    create() {
        this.createUI();
    }

    createUI() {
        // Nettoyer les éléments existants
        this.uiElements.forEach(el => el.destroy());
        this.uiElements = [];

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background adaptatif
        const bg = this.add.rectangle(0, 0, width * 2, height * 2, 0x667eea).setOrigin(0.5);
        bg.setPosition(width / 2, height / 2);
        this.uiElements.push(bg);

        // Étoiles animées en arrière-plan
        this.createStars();

        // Titre responsive
        const titleText = 'UNE AVENTURE\nCRÉÉE PAR\nPAPA, ELON\nET ANDY';
        const titleSize = Math.max(24, Math.min(56, width * 0.07));
        const title = this.add.text(width / 2, height * 0.2, titleText, {
            fontSize: `${titleSize}px`,
            fontFamily: 'Arial Black, sans-serif',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: Math.max(4, titleSize * 0.14),
            align: 'center',
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#000000',
                blur: 8,
                fill: true
            }
        }).setOrigin(0.5);
        this.uiElements.push(title);

        // Animation du titre
        this.tweens.add({
            targets: title,
            y: height * 0.2 - 10,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Boutons du menu - responsive
        const buttonY = height * 0.5;
        const buttonSpacing = Math.min(80, height * 0.12);
        const buttonWidth = Math.min(400, width * 0.8);
        const buttonHeight = Math.min(60, height * 0.08);
        const fontSize = Math.max(18, Math.min(32, width * 0.04));

        let currentY = buttonY;

        const playBtn = this.createButton(width / 2, currentY, buttonWidth, buttonHeight, fontSize, 'JOUER', () => {
            this.scene.start('CharacterSelectScene');
        });
        this.uiElements.push(playBtn);
        currentY += buttonSpacing;

        // Bouton "Reprendre" seulement si une partie existe
        if (window.gameState.currentLevel > 1 || window.gameState.score > 0) {
            const resumeBtn = this.createButton(width / 2, currentY, buttonWidth, buttonHeight, fontSize, 'REPRENDRE', () => {
                this.scene.start('MapScene');
            });
            this.uiElements.push(resumeBtn);
            currentY += buttonSpacing;
        }

        const optionsBtn = this.createButton(width / 2, currentY, buttonWidth, buttonHeight, fontSize, 'OPTIONS', () => {
            this.showOptionsModal();
        });
        this.uiElements.push(optionsBtn);
        currentY += buttonSpacing;

        const creditsBtn = this.createButton(width / 2, currentY, buttonWidth, buttonHeight, fontSize, 'CRÉDITS', () => {
            this.showCredits();
        });
        this.uiElements.push(creditsBtn);

        // Version du jeu - responsive
        const versionSize = Math.max(12, Math.min(16, width * 0.02));
        const version = this.add.text(width - 10, height - 10, 'v1.0', {
            fontSize: `${versionSize}px`,
            color: '#ffffff',
            alpha: 0.5
        }).setOrigin(1);
        this.uiElements.push(version);

        // Instructions pour mobile
        if (this.sys.game.device.os.android || this.sys.game.device.os.iOS || width < 768) {
            const instructionSize = Math.max(14, Math.min(18, width * 0.025));
            const instruction = this.add.text(width / 2, height - height * 0.08, 'Utilisez les contrôles tactiles en jeu', {
                fontSize: `${instructionSize}px`,
                color: '#ffffff',
                alpha: 0.7,
                align: 'center',
                wordWrap: { width: width * 0.9 }
            }).setOrigin(0.5);
            this.uiElements.push(instruction);
        }
    }

    createStars() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const starCount = Math.min(50, Math.floor((width * height) / 10000));

        for (let i = 0; i < starCount; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(0, height);
            const size = Math.max(1, width * 0.0025);
            const star = this.add.circle(x, y, size, 0xffffff, 0.8);
            this.uiElements.push(star);

            this.tweens.add({
                targets: star,
                alpha: 0.2,
                duration: Phaser.Math.Between(1000, 3000),
                yoyo: true,
                repeat: -1
            });
        }
    }

    createButton(x, y, width, height, fontSize, text, callback) {
        const button = this.add.container(x, y);

        // Ombre du bouton
        const shadow = this.add.rectangle(4, 4, width, height, 0x000000, 0.3);

        // Rectangle du bouton
        const bg = this.add.rectangle(0, 0, width, height, 0x4CAF50);
        bg.setStrokeStyle(4, 0xffffff);

        // Texte du bouton
        const buttonText = this.add.text(0, 0, text, {
            fontSize: `${fontSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: Math.max(2, fontSize * 0.125)
        }).setOrigin(0.5);

        button.add([shadow, bg, buttonText]);
        button.setSize(width, height);
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
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Overlay sombre
        const overlay = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.7).setOrigin(0.5);
        overlay.setPosition(width / 2, height / 2);
        overlay.setInteractive();
        overlay.setDepth(1000);

        // Fenêtre modale responsive
        const modalWidth = Math.min(600, width * 0.9);
        const modalHeight = Math.min(400, height * 0.7);
        const modalBg = this.add.rectangle(width / 2, height / 2, modalWidth, modalHeight, 0x2c3e50);
        modalBg.setStrokeStyle(4, 0xffffff);
        modalBg.setDepth(1001);

        const titleSize = Math.max(24, Math.min(40, width * 0.05));
        const titleModal = this.add.text(width / 2, height / 2 - modalHeight * 0.35, 'OPTIONS', {
            fontSize: `${titleSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff'
        }).setOrigin(0.5);
        titleModal.setDepth(1001);

        const optionSize = Math.max(18, Math.min(28, width * 0.035));

        // Options musique
        const musicText = this.add.text(width / 2 - modalWidth * 0.3, height / 2 - modalHeight * 0.1, 'Musique:', {
            fontSize: `${optionSize}px`,
            color: '#ffffff'
        });
        musicText.setDepth(1001);

        const musicToggle = this.createToggle(width / 2 + modalWidth * 0.15, height / 2 - modalHeight * 0.1, window.gameState.musicEnabled, (value) => {
            window.gameState.musicEnabled = value;
            window.gameState.saveState();
        });
        musicToggle.setDepth(1001);

        // Options sons
        const sfxText = this.add.text(width / 2 - modalWidth * 0.3, height / 2, 'Sons:', {
            fontSize: `${optionSize}px`,
            color: '#ffffff'
        });
        sfxText.setDepth(1001);

        const sfxToggle = this.createToggle(width / 2 + modalWidth * 0.15, height / 2, window.gameState.sfxEnabled, (value) => {
            window.gameState.sfxEnabled = value;
            window.gameState.saveState();
        });
        sfxToggle.setDepth(1001);

        // Bouton plein écran
        const btnSize = Math.max(18, Math.min(24, width * 0.03));
        const fullscreenBtn = this.add.text(width / 2, height / 2 + modalHeight * 0.18, '📺 PLEIN ÉCRAN', {
            fontSize: `${btnSize}px`,
            color: '#4CAF50',
            backgroundColor: '#34495e',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        fullscreenBtn.setDepth(1001);

        fullscreenBtn.on('pointerdown', () => {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });

        // Bouton fermer
        const closeBtnSize = Math.max(20, Math.min(28, width * 0.035));
        const closeBtn = this.add.text(width / 2, height / 2 + modalHeight * 0.35, 'FERMER', {
            fontSize: `${closeBtnSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.setDepth(1001);

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
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const overlay = this.add.rectangle(0, 0, width * 2, height * 2, 0x000000, 0.8).setOrigin(0.5);
        overlay.setPosition(width / 2, height / 2);
        overlay.setInteractive();
        overlay.setDepth(1000);

        const creditSize = Math.max(20, Math.min(32, width * 0.04));
        const creditsText = this.add.text(width / 2, height / 2,
            '🎮 UNE AVENTURE CRÉÉE PAR\nPAPA, ELON ET ANDY\n\n' +
            '❤️ Avec amour pour Elon et Andy ❤️\n\n' +
            'Développé avec Phaser 3\n' +
            'JavaScript ES6+\n\n' +
            '© 2025', {
            fontSize: `${creditSize}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            lineSpacing: 10,
            wordWrap: { width: width * 0.9 }
        }).setOrigin(0.5);
        creditsText.setDepth(1001);

        const closeBtnSize = Math.max(20, Math.min(28, width * 0.035));
        const closeBtn = this.add.text(width / 2, height - height * 0.15, 'FERMER', {
            fontSize: `${closeBtnSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 30, y: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.setDepth(1001);

        closeBtn.on('pointerdown', () => {
            overlay.destroy();
            creditsText.destroy();
            closeBtn.destroy();
        });
    }
}
