export default class VictoryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'VictoryScene' });
    }

    create(data) {
        const { width, height } = this.game.config;

        // Background avec confettis
        this.add.rectangle(0, 0, width, height, 0x4CAF50, 0.3).setOrigin(0);

        // Confettis animés
        this.createConfetti();

        // Animation d'entrée
        this.cameras.main.fadeIn(500);

        // Titre "Victoire!"
        const victoryText = this.add.text(width / 2, 120, '🎉 VICTOIRE! 🎉', {
            fontSize: '72px',
            fontFamily: 'Arial Black',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        // Animation du titre
        this.tweens.add({
            targets: victoryText,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Message de félicitation
        const isFinalLevel = data.levelNum === 20;
        const message = isFinalLevel
            ? '🏆 Bravo! Tu as restauré tous les cristaux!\n🎊 Dr Chaos est vaincu! 🎊'
            : `✨ Niveau ${data.levelNum} terminé! ✨`;

        this.add.text(width / 2, 250, message, {
            fontSize: '32px',
            fontFamily: 'Arial',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
            align: 'center',
            lineSpacing: 10
        }).setOrigin(0.5);

        // Statistiques du niveau
        const stats = data.stats || {};
        this.add.text(width / 2, 350,
            `⭐ Score: ${stats.score || 0}\n` +
            `💰 Pièces: ${stats.coins || 0}\n` +
            `🎯 Ennemis battus: ${stats.enemiesKilled || 0}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 20, y: 15 },
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        // Boutons
        const btnY = height - 200;

        if (isFinalLevel) {
            // Écran de fin
            this.add.text(width / 2, btnY - 60,
                '🌟 Une aventure créée par Papa, Elon et Andy 🌟', {
                fontSize: '26px',
                fontFamily: 'Arial Black',
                color: '#FFD700',
                stroke: '#000000',
                strokeThickness: 3
            }).setOrigin(0.5);

            this.createButton(width / 2, btnY + 20, '🏠 MENU PRINCIPAL', 0x9b59b6, () => {
                this.scene.start('MenuScene');
            });
        } else {
            // Niveau suivant
            this.createButton(width / 2, btnY, '➡️ NIVEAU SUIVANT', 0x4CAF50, () => {
                // Débloquer le niveau suivant
                const nextLevel = data.levelNum + 1;
                window.gameState.unlockLevel(nextLevel);
                window.gameState.currentLevel = nextLevel;
                window.gameState.saveState();

                // Vérifier si c'est un nouveau monde
                const nextWorld = data.worlds.find(w => w.levels.includes(nextLevel));

                // Vérifier si c'est un niveau de boss
                const isBossLevel = nextWorld && nextWorld.levels[nextWorld.levels.length - 1] === nextLevel;

                if (nextWorld && nextWorld.levels[0] === nextLevel && nextWorld.id > 1) {
                    // Premier niveau d'un nouveau monde -> montrer BD
                    this.scene.start('ComicScene', { worldId: nextWorld.id, levelNum: nextLevel });
                } else if (isBossLevel) {
                    // Niveau de boss
                    this.scene.start('BossScene', { level: nextLevel, world: nextWorld });
                } else {
                    // Niveau normal
                    this.scene.start('GameScene', { level: nextLevel, world: nextWorld });
                }
            });

            this.createButton(width / 2, btnY + 80, '🗺️ CARTE DU MONDE', 0x3498db, () => {
                this.scene.start('MapScene');
            });
        }
    }

    createConfetti() {
        const { width, height } = this.game.config;
        const colors = [0xFF6B6B, 0x4ECDC4, 0xFFE66D, 0x95E1D3, 0xF38181];

        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(0, width);
            const y = Phaser.Math.Between(-100, 0);
            const color = Phaser.Utils.Array.GetRandom(colors);

            const confetti = this.add.rectangle(x, y, 10, 20, color);

            this.tweens.add({
                targets: confetti,
                y: height + 100,
                rotation: Phaser.Math.Between(-10, 10),
                duration: Phaser.Math.Between(2000, 4000),
                repeat: -1,
                delay: Phaser.Math.Between(0, 2000)
            });
        }
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
