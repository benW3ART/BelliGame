import { GameConfig } from '../config.js';

export default class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectScene' });
    }

    create() {
        const { width, height } = this.game.config;

        // Background
        this.add.rectangle(0, 0, width, height, 0x667eea).setOrigin(0);

        // Titre
        this.add.text(width / 2, 80, 'CHOISIS TON HÉROS', {
            fontSize: '52px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Grille de personnages
        const cols = 4;
        const rows = 3;
        const startX = 200;
        const startY = 200;
        const spacingX = 250;
        const spacingY = 180;

        GameConfig.characters.forEach((char, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = startX + col * spacingX;
            const y = startY + row * spacingY;

            this.createCharacterCard(x, y, char);
        });

        // Bouton retour
        const backBtn = this.add.text(80, height - 80, '← RETOUR', {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 20, y: 10 }
        }).setInteractive({ useHandCursor: true });

        backBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    createCharacterCard(x, y, character) {
        const card = this.add.container(x, y);

        // Carte de fond
        const bg = this.add.rectangle(0, 0, 200, 140, 0x34495e);
        bg.setStrokeStyle(4, character.color);

        // Cercle représentant le personnage
        const avatar = this.add.circle(0, -20, 40, character.color);

        // Nom du personnage
        const name = this.add.text(0, 40, character.name, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: 180 }
        }).setOrigin(0.5);

        // Indicateur de sélection
        let selected = false;
        if (window.gameState.character === character.id) {
            selected = true;
            bg.setFillStyle(0x2c3e50);
            const checkmark = this.add.text(70, -60, '✓', {
                fontSize: '32px',
                color: '#4CAF50'
            });
            card.add(checkmark);
        }

        card.add([bg, avatar, name]);
        card.setSize(200, 140);
        card.setInteractive({ useHandCursor: true });

        // Effet hover
        card.on('pointerover', () => {
            this.tweens.add({
                targets: card,
                scaleX: 1.05,
                scaleY: 1.05,
                duration: 200
            });
        });

        card.on('pointerout', () => {
            this.tweens.add({
                targets: card,
                scaleX: 1,
                scaleY: 1,
                duration: 200
            });
        });

        // Sélection du personnage
        card.on('pointerdown', () => {
            window.gameState.character = character.id;
            window.gameState.saveState();

            // Effet de sélection
            this.tweens.add({
                targets: card,
                scaleX: 0.95,
                scaleY: 0.95,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    // Aller à la carte du monde
                    this.scene.start('MapScene');
                }
            });
        });

        return card;
    }
}
