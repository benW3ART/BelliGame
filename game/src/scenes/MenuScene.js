export default class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background plein écran
        const bg = this.add.rectangle(width / 2, height / 2, width * 2, height * 2, 0x667eea);

        // Titre responsive - toujours centré
        const titleSize = Math.min(width * 0.1, 60);
        const title = this.add.text(width / 2, height * 0.3, 'BELLIGAME', {
            fontSize: `${titleSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: Math.max(4, titleSize * 0.1),
            align: 'center'
        }).setOrigin(0.5);

        // Sous-titre
        const subtitleSize = Math.min(width * 0.04, 24);
        const subtitle = this.add.text(width / 2, height * 0.42, 'Une aventure par Papa, Elon et Andy', {
            fontSize: `${subtitleSize}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // UN SEUL GROS BOUTON JOUER - centré
        const buttonWidth = Math.min(width * 0.7, 400);
        const buttonHeight = Math.min(height * 0.12, 80);
        const buttonFontSize = Math.min(width * 0.08, 48);

        const playButton = this.createButton(
            width / 2,
            height * 0.6,
            buttonWidth,
            buttonHeight,
            buttonFontSize,
            'JOUER',
            () => {
                // Définir un personnage par défaut
                if (!window.gameState.character) {
                    window.gameState.character = 'sonic';
                }
                // Lancer directement le niveau 1
                window.gameState.currentLevel = 1;
                this.scene.start('GameScene', { level: 1 });
            }
        );

        // Adapter au resize
        this.scale.on('resize', (gameSize) => {
            const newWidth = gameSize.width;
            const newHeight = gameSize.height;

            bg.setPosition(newWidth / 2, newHeight / 2);

            const newTitleSize = Math.min(newWidth * 0.1, 60);
            title.setFontSize(newTitleSize);
            title.setStroke('#000000', Math.max(4, newTitleSize * 0.1));
            title.setPosition(newWidth / 2, newHeight * 0.3);

            const newSubtitleSize = Math.min(newWidth * 0.04, 24);
            subtitle.setFontSize(newSubtitleSize);
            subtitle.setPosition(newWidth / 2, newHeight * 0.42);

            const newButtonWidth = Math.min(newWidth * 0.7, 400);
            const newButtonHeight = Math.min(newHeight * 0.12, 80);
            playButton.setPosition(newWidth / 2, newHeight * 0.6);
            // Mettre à jour la taille du bouton
            playButton.list[0].width = newButtonWidth;
            playButton.list[0].height = newButtonHeight;
            playButton.list[1].width = newButtonWidth;
            playButton.list[1].height = newButtonHeight;

            const newButtonFontSize = Math.min(newWidth * 0.08, 48);
            playButton.list[2].setFontSize(newButtonFontSize);
        });
    }

    createButton(x, y, width, height, fontSize, text, callback) {
        const button = this.add.container(x, y);

        // Ombre
        const shadow = this.add.rectangle(6, 6, width, height, 0x000000, 0.3);

        // Background
        const bg = this.add.rectangle(0, 0, width, height, 0x4CAF50);
        bg.setStrokeStyle(6, 0xffffff);

        // Texte
        const buttonText = this.add.text(0, 0, text, {
            fontSize: `${fontSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: Math.max(3, fontSize * 0.08)
        }).setOrigin(0.5);

        button.add([shadow, bg, buttonText]);
        button.setSize(width, height);
        button.setInteractive(new Phaser.Geom.Rectangle(-width/2, -height/2, width, height), Phaser.Geom.Rectangle.Contains);

        // Effets tactiles
        button.on('pointerdown', () => {
            this.tweens.add({
                targets: button,
                scaleX: 0.9,
                scaleY: 0.9,
                duration: 100,
                yoyo: true,
                onComplete: callback
            });
        });

        button.on('pointerover', () => {
            bg.setFillStyle(0x66BB6A);
        });

        button.on('pointerout', () => {
            bg.setFillStyle(0x4CAF50);
        });

        return button;
    }
}
