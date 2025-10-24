export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
    }

    create(data) {
        const { width, height } = this.game.config;

        // HUD Container
        this.hudContainer = this.add.container(0, 0);

        // Score
        this.scoreText = this.add.text(20, 20, `⭐ ${window.gameState.score}`, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Pièces
        this.coinsText = this.add.text(20, 60, `💰 ${window.gameState.coins}`, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Vies
        this.livesText = this.add.text(20, 100, `❤️ ${window.gameState.lives}`, {
            fontSize: '28px',
            fontFamily: 'Arial Black',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        });

        // Niveau actuel
        if (data && data.levelNum) {
            this.levelText = this.add.text(width / 2, 20, `Niveau ${data.levelNum}`, {
                fontSize: '24px',
                fontFamily: 'Arial Black',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5, 0);
        }

        // Bouton pause
        const pauseBtn = this.add.text(width - 80, 20, '⏸️', {
            fontSize: '40px',
            backgroundColor: '#34495e',
            padding: { x: 10, y: 5 }
        }).setInteractive({ useHandCursor: true });

        pauseBtn.on('pointerdown', () => {
            // Detect which game scene is running
            const gameSceneActive = this.scene.isActive('GameScene');
            const bossSceneActive = this.scene.isActive('BossScene');

            if (gameSceneActive) {
                this.scene.pause('GameScene');
            } else if (bossSceneActive) {
                this.scene.pause('BossScene');
            }

            this.scene.launch('PauseScene');
        });

        this.hudContainer.add([this.scoreText, this.coinsText, this.livesText, pauseBtn]);
        if (this.levelText) {
            this.hudContainer.add(this.levelText);
        }

        // Écouter les événements de mise à jour
        this.events.on('updateScore', this.updateScore, this);
        this.events.on('updateCoins', this.updateCoins, this);
        this.events.on('updateLives', this.updateLives, this);

        // Affichage temporaire des power-ups actifs
        this.powerUpContainer = this.add.container(width - 150, height - 100);
    }

    shutdown() {
        // Clean up event listeners to prevent memory leaks
        this.events.off('updateScore', this.updateScore, this);
        this.events.off('updateCoins', this.updateCoins, this);
        this.events.off('updateLives', this.updateLives, this);
    }

    updateScore(score) {
        this.scoreText.setText(`⭐ ${score}`);

        // Animation
        this.tweens.add({
            targets: this.scoreText,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            yoyo: true
        });
    }

    updateCoins(coins) {
        this.coinsText.setText(`💰 ${coins}`);

        // Animation
        this.tweens.add({
            targets: this.coinsText,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            yoyo: true
        });
    }

    updateLives(lives) {
        this.livesText.setText(`❤️ ${lives}`);

        // Animation
        this.tweens.add({
            targets: this.livesText,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            yoyo: true
        });
    }

    showPowerUp(powerUpType, duration) {
        // Supprimer les anciens power-ups affichés
        this.powerUpContainer.removeAll(true);

        const icons = {
            mushroom: '🍄',
            star: '⭐',
            fireball: '🔥',
            laser: '⚡',
            shield: '🛡️',
            magnet: '🧲',
            clock: '⏰'
        };

        const text = this.add.text(0, 0, icons[powerUpType] || '💫', {
            fontSize: '40px'
        });

        this.powerUpContainer.add(text);

        // Si c'est temporaire, afficher une barre de temps
        if (duration > 0) {
            const timerBg = this.add.rectangle(0, 50, 100, 10, 0x000000, 0.5);
            const timerBar = this.add.rectangle(-50, 50, 100, 10, 0x4CAF50, 1).setOrigin(0, 0.5);

            this.powerUpContainer.add([timerBg, timerBar]);

            this.tweens.add({
                targets: timerBar,
                scaleX: 0,
                duration: duration,
                onComplete: () => {
                    this.powerUpContainer.removeAll(true);
                }
            });
        }
    }

    removePowerUp() {
        this.powerUpContainer.removeAll(true);
    }
}
