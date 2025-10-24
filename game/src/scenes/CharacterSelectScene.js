import { GameConfig } from '../config.js';
import { CharacterSprites } from '../CharacterSprites.js';

export default class CharacterSelectScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectScene' });
        this.uiElements = [];
    }

    preload() {
        // Générer tous les sprites des personnages si pas déjà fait
        if (!this.textures.exists('sonic')) {
            CharacterSprites.generateAllSprites(this);
        }
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

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Background plein écran
        const bg = this.add.rectangle(width / 2, height / 2, width * 2, height * 2, 0x667eea);
        this.uiElements.push(bg);

        // Titre responsive
        const titleSize = Math.min(width * 0.08, 52);
        const title = this.add.text(width / 2, height * 0.1, 'CHOISIS TON HÉROS', {
            fontSize: `${titleSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: Math.max(4, titleSize * 0.15)
        }).setOrigin(0.5);
        this.uiElements.push(title);

        // Grille responsive de personnages
        const isMobile = width < 768;
        const cols = isMobile ? 2 : 4;
        const rows = Math.ceil(GameConfig.characters.length / cols);

        // Calculer les dimensions des cartes
        const availableWidth = width * 0.9;
        const availableHeight = height * 0.7;
        const cardWidth = Math.min(200, (availableWidth / cols) - 20);
        const cardHeight = Math.min(140, cardWidth * 0.7);
        const spacingX = (availableWidth - (cardWidth * cols)) / (cols + 1);
        const spacingY = Math.min(30, (availableHeight - (cardHeight * rows)) / (rows + 1));

        const startX = (width - availableWidth) / 2 + spacingX + cardWidth / 2;
        const startY = height * 0.2 + spacingY + cardHeight / 2;

        GameConfig.characters.forEach((char, index) => {
            const col = index % cols;
            const row = Math.floor(index / cols);
            const x = startX + col * (cardWidth + spacingX);
            const y = startY + row * (cardHeight + spacingY);

            const card = this.createCharacterCard(x, y, cardWidth, cardHeight, char);
            this.uiElements.push(card);
        });

        // Bouton retour responsive
        const btnSize = Math.min(width * 0.035, 28);
        const backBtn = this.add.text(width * 0.05, height * 0.95, '← RETOUR', {
            fontSize: `${btnSize}px`,
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#e74c3c',
            padding: { x: 20, y: 10 }
        }).setOrigin(0, 1).setInteractive({ useHandCursor: true });
        this.uiElements.push(backBtn);

        backBtn.on('pointerdown', () => {
            this.scene.start('MenuScene');
        });
    }

    createCharacterCard(x, y, cardWidth, cardHeight, character) {
        const card = this.add.container(x, y);

        // Carte de fond
        const bg = this.add.rectangle(0, 0, cardWidth, cardHeight, 0x34495e);
        bg.setStrokeStyle(4, character.color);

        // Sprite du personnage - taille adaptive
        const spriteScale = Math.min(0.5, cardWidth / 160);
        const avatar = this.add.sprite(0, -cardHeight * 0.15, character.id);
        avatar.setScale(spriteScale);

        // Nom du personnage - taille adaptive
        const nameSize = Math.min(16, cardWidth * 0.08);
        const name = this.add.text(0, cardHeight * 0.35, character.name, {
            fontSize: `${nameSize}px`,
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: cardWidth - 20 }
        }).setOrigin(0.5);

        // Indicateur de sélection
        if (window.gameState.character === character.id) {
            bg.setFillStyle(0x2c3e50);
            const checkmark = this.add.text(cardWidth * 0.35, -cardHeight * 0.42, '✓', {
                fontSize: `${Math.min(32, cardWidth * 0.16)}px`,
                color: '#4CAF50'
            });
            card.add(checkmark);
        }

        card.add([bg, avatar, name]);
        card.setSize(cardWidth, cardHeight);
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

    resize(gameSize) {
        // Recréer l'interface avec les nouvelles dimensions
        this.createUI();
    }

    shutdown() {
        this.scale.off('resize', this.resize, this);
    }
}
