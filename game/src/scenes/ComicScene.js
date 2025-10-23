import { GameConfig } from '../config.js';

export default class ComicScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ComicScene' });
    }

    create(data) {
        const { width, height } = this.game.config;
        const world = GameConfig.worlds.find(w => w.id === data.worldId);

        // Background
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0);

        // Titre
        this.add.text(width / 2, 50, `Monde ${world.id}: ${world.name}`, {
            fontSize: '40px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Planches de BD simplifiées (2-3 cases)
        const comics = this.getComicPanels(world.id);

        const panelWidth = 350;
        const panelHeight = 250;
        const startX = (width - (panelWidth * comics.length + 50 * (comics.length - 1))) / 2;
        const startY = 150;

        comics.forEach((comic, index) => {
            const x = startX + index * (panelWidth + 50);
            this.createComicPanel(x, startY, panelWidth, panelHeight, comic.text, comic.emoji);
        });

        // Bouton continuer
        const continueBtn = this.add.text(width / 2, height - 100, 'CONTINUER ▶️', {
            fontSize: '32px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            backgroundColor: '#4CAF50',
            padding: { x: 30, y: 15 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        continueBtn.on('pointerdown', () => {
            this.scene.start('GameScene', { level: data.levelNum, world: world });
        });

        // Animation d'entrée
        this.cameras.main.fadeIn(1000);
    }

    createComicPanel(x, y, width, height, text, emoji) {
        // Bordure de la case
        const panel = this.add.rectangle(x, y, width, height, 0xffffff);
        panel.setStrokeStyle(6, 0x000000);

        // Emoji/illustration
        const icon = this.add.text(x, y - 50, emoji, {
            fontSize: '80px'
        }).setOrigin(0.5);

        // Texte
        const textObj = this.add.text(x, y + 60, text, {
            fontSize: '18px',
            fontFamily: 'Arial',
            color: '#000000',
            align: 'center',
            wordWrap: { width: width - 40 }
        }).setOrigin(0.5);

        return this.add.container(0, 0, [panel, icon, textObj]);
    }

    getComicPanels(worldId) {
        const comics = {
            2: [
                { emoji: '🏜️', text: 'Après la forêt,\nvoici le désert doré!' },
                { emoji: '🪲', text: 'Attention aux scarabées\nde Dr Chaos!' },
                { emoji: '💎', text: 'Le cristal est\nquelque part ici!' }
            ],
            3: [
                { emoji: '🌊', text: 'L\'océan infini\ns\'étend devant nous!' },
                { emoji: '🐟', text: 'Les créatures marines\nsont contrôlées!' },
                { emoji: '💪', text: 'Libérons-les!' }
            ],
            4: [
                { emoji: '🏔️', text: 'La montagne glacée\nest dangereuse!' },
                { emoji: '❄️', text: 'Attention aux\nplateformes glissantes!' }
            ],
            5: [
                { emoji: '🏙️', text: 'La ville urbaine\nest sous contrôle!' },
                { emoji: '🤖', text: 'Les robots de Dr Chaos\npatrouillent!' }
            ],
            6: [
                { emoji: '🏰', text: 'Le château du Chaos\nse dresse devant nous!' },
                { emoji: '😈', text: 'Dr Chaos nous attend!' },
                { emoji: '⚔️', text: 'C\'est le combat final!' }
            ]
        };

        return comics[worldId] || [
            { emoji: '🎮', text: 'Une nouvelle\naventure commence!' }
        ];
    }
}
