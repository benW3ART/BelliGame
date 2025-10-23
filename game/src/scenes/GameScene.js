import { GameConfig } from '../config.js';
import { CharacterSprites } from '../CharacterSprites.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.currentLevelData = data;
        this.levelNum = data.level;
        this.world = data.world;
        this.levelScore = 0;
        this.levelCoins = 0;
        this.enemiesKilled = 0;
        this.checkpointX = 0;
        this.currentPowerUp = null;
        this.powerUpTimer = null;
    }

    preload() {
        // Générer tous les sprites des personnages
        if (!this.textures.exists('sonic')) {
            CharacterSprites.generateAllSprites(this);
        }
    }

    create() {
        const { width, height } = this.game.config;

        // Démarrer l'UI Scene
        this.scene.launch('UIScene', { levelNum: this.levelNum });

        // Background avec couleur du monde
        this.add.rectangle(0, 0, width * 3, height, this.world.bgColor, 0.5).setOrigin(0).setScrollFactor(0.5);

        // Créer le niveau
        this.createLevel();

        // Créer le joueur
        this.createPlayer();

        // Créer les ennemis
        this.createEnemies();

        // Créer les items
        this.createItems();

        // Contrôles
        this.setupControls();

        // Caméra
        this.cameras.main.setBounds(0, 0, width * 3, height);
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

        // Physique
        this.physics.world.setBounds(0, 0, width * 3, height);

        // Compteurs de session
        this.sessionScore = 0;
        this.sessionCoins = 0;
    }

    createLevel() {
        const { width, height } = this.game.config;

        // Sol principal
        this.platforms = this.physics.add.staticGroup();

        // Créer un sol de base
        const groundY = height - 50;
        for (let x = 0; x < width * 3; x += 100) {
            const ground = this.add.rectangle(x, groundY, 100, 100, 0x8B4513);
            this.platforms.add(ground);
        }

        // Plateformes procédurales basées sur le niveau
        this.createPlatforms();

        // Refresh static body
        this.platforms.refresh();

        // Décorations
        this.createDecorations();

        // Checkpoint (drapeau)
        this.createCheckpoint(width * 1.5, height - 150);

        // Ligne d'arrivée
        this.createFinishLine(width * 2.8, height - 150);
    }

    createPlatforms() {
        const { width, height } = this.game.config;
        const platformColor = this.world.theme === 'forest' ? 0x228B22 :
                            this.world.theme === 'desert' ? 0xDEB887 :
                            this.world.theme === 'ocean' ? 0x4682B4 :
                            this.world.theme === 'ice' ? 0xB0E0E6 :
                            this.world.theme === 'city' ? 0x708090 : 0x8B008B;

        // Difficulté basée sur le niveau
        const difficulty = Math.min(this.levelNum / 20, 1);

        // Générer des plateformes procéduralement
        let currentX = 300;
        const maxX = width * 2.7;

        while (currentX < maxX) {
            const platformWidth = Phaser.Math.Between(100, 250);
            const platformHeight = 20;
            const platformY = Phaser.Math.Between(height - 400, height - 150);

            const platform = this.add.rectangle(currentX, platformY, platformWidth, platformHeight, platformColor);
            this.platforms.add(platform);

            // Ajouter des variations selon le monde
            if (this.world.theme === 'ice' && Math.random() < 0.3) {
                // Plateformes glissantes (visuellement différentes)
                platform.setAlpha(0.7);
            }

            // Espacement entre plateformes (augmente avec la difficulté)
            currentX += platformWidth + Phaser.Math.Between(150, 300 + difficulty * 200);
        }

        // Plateformes spéciales
        if (this.world.theme === 'forest') {
            this.createMovingPlatforms();
        } else if (this.world.theme === 'city') {
            this.createElevators();
        }
    }

    createMovingPlatforms() {
        const { width, height } = this.game.config;

        // 2-3 plateformes mouvantes
        for (let i = 0; i < 3; i++) {
            const x = width * 0.5 + i * 600;
            const y = height - 300;

            const platform = this.physics.add.image(x, y, null);
            const rect = this.add.rectangle(0, 0, 150, 20, 0x654321);
            platform.setSize(150, 20);

            // Animation de mouvement
            this.tweens.add({
                targets: platform,
                y: y - 100,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });

            // Ajouter au groupe de collisions mais pas statique
            if (!this.movingPlatforms) {
                this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
            }
            this.movingPlatforms.add(platform);
        }
    }

    createElevators() {
        const { width, height } = this.game.config;

        // Ascenseurs
        for (let i = 0; i < 2; i++) {
            const x = width + i * 800;
            const platform = this.physics.add.image(x, height - 200, null);
            platform.setSize(120, 20);

            this.tweens.add({
                targets: platform,
                y: height - 500,
                duration: 3000,
                yoyo: true,
                repeat: -1,
                ease: 'Linear'
            });

            if (!this.movingPlatforms) {
                this.movingPlatforms = this.physics.add.group({ allowGravity: false, immovable: true });
            }
            this.movingPlatforms.add(platform);
        }
    }

    createDecorations() {
        const { width, height } = this.game.config;

        // Ajouter des décorations selon le thème
        const decorEmojis = {
            forest: ['🌲', '🌳', '🍄', '🌻'],
            desert: ['🌵', '🏜️', '🦂'],
            ocean: ['🌊', '🐚', '⭐'],
            ice: ['❄️', '⛄', '🏔️'],
            city: ['🏢', '🚗', '💡'],
            castle: ['🏰', '⚔️', '👑']
        };

        const emojis = decorEmojis[this.world.theme] || ['🌟'];

        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(0, width * 3);
            const y = Phaser.Math.Between(50, height - 200);
            const emoji = Phaser.Utils.Array.GetRandom(emojis);

            this.add.text(x, y, emoji, {
                fontSize: '32px',
                alpha: 0.5
            }).setScrollFactor(0.7);
        }
    }

    createPlayer() {
        const { height } = this.game.config;
        const charData = GameConfig.characters.find(c => c.id === window.gameState.character);

        // Créer le joueur avec le sprite personnalisé
        this.player = this.physics.add.sprite(this.checkpointX + 100, height - 200, charData.id);
        this.player.setScale(0.8); // Ajuster la taille pour le gameplay

        // Physique
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0);
        this.player.setSize(50, 50);

        // Propriétés du personnage
        this.player.speed = charData.speed;
        this.player.jumpPower = charData.jumpPower;
        this.player.canDoubleJump = true;
        this.player.isInvincible = false;
        this.player.hasShield = false;
        this.player.characterId = charData.id;

        // Collisions
        this.physics.add.collider(this.player, this.platforms);
        if (this.movingPlatforms) {
            this.physics.add.collider(this.player, this.movingPlatforms);
        }
    }

    createEnemies() {
        this.enemies = this.physics.add.group();

        const { width, height } = this.game.config;
        const enemyCount = 5 + Math.floor(this.levelNum / 3);

        for (let i = 0; i < enemyCount; i++) {
            const x = Phaser.Math.Between(400, width * 2.5);
            const y = height - 200;

            const enemy = this.physics.add.sprite(x, y, null);
            enemy.setSize(40, 40);

            // Représentation visuelle
            const enemyColor = this.world.theme === 'forest' ? 0x8B4513 :
                             this.world.theme === 'desert' ? 0xFFD700 :
                             this.world.theme === 'ocean' ? 0x1E90FF :
                             this.world.theme === 'ice' ? 0x87CEEB :
                             this.world.theme === 'city' ? 0x696969 : 0x8B008B;

            const enemyCircle = this.add.circle(x, y, 20, enemyColor);
            const enemyFace = this.add.text(x, y, '😈', { fontSize: '24px' }).setOrigin(0.5);

            enemy.graphics = this.add.container(0, 0, [enemyCircle, enemyFace]);

            // IA basique: patrouille
            enemy.direction = Math.random() < 0.5 ? -1 : 1;
            enemy.speed = 50 + Math.random() * 50;

            this.enemies.add(enemy);
        }

        // Collisions
        this.physics.add.collider(this.enemies, this.platforms);
        if (this.movingPlatforms) {
            this.physics.add.collider(this.enemies, this.movingPlatforms);
        }

        // Collision joueur-ennemi
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    }

    createItems() {
        this.coins = this.physics.add.group();
        this.powerUps = this.physics.add.group();

        const { width, height } = this.game.config;

        // Pièces
        for (let i = 0; i < 30; i++) {
            const x = Phaser.Math.Between(100, width * 2.8);
            const y = Phaser.Math.Between(100, height - 200);

            const coin = this.physics.add.sprite(x, y, null);
            coin.setSize(30, 30);
            const coinGraphic = this.add.text(x, y, '💰', { fontSize: '30px' }).setOrigin(0.5);

            // Animation
            this.tweens.add({
                targets: coinGraphic,
                y: y - 10,
                duration: 1000,
                yoyo: true,
                repeat: -1
            });

            this.coins.add(coin);
        }

        // Power-ups (plus rares)
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(400, width * 2.5);
            const y = Phaser.Math.Between(100, height - 200);

            const powerUp = this.physics.add.sprite(x, y, null);
            powerUp.setSize(40, 40);

            const powerUpTypes = ['mushroom', 'star', 'fireball', 'shield', 'magnet'];
            powerUp.powerType = Phaser.Utils.Array.GetRandom(powerUpTypes);

            const icons = {
                mushroom: '🍄',
                star: '⭐',
                fireball: '🔥',
                shield: '🛡️',
                magnet: '🧲'
            };

            const powerUpGraphic = this.add.text(x, y, icons[powerUp.powerType], { fontSize: '35px' }).setOrigin(0.5);

            this.tweens.add({
                targets: powerUpGraphic,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 800,
                yoyo: true,
                repeat: -1
            });

            this.powerUps.add(powerUp);
        }

        // Collisions
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);
    }

    createCheckpoint(x, y) {
        this.checkpoint = this.physics.add.sprite(x, y, null);
        this.checkpoint.setSize(60, 100);

        const flag = this.add.text(x, y, '🚩', { fontSize: '60px' }).setOrigin(0.5);

        this.tweens.add({
            targets: flag,
            x: x + 10,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.player, this.checkpoint, this.reachedCheckpoint, null, this);
    }

    createFinishLine(x, y) {
        this.finishLine = this.physics.add.sprite(x, y, null);
        this.finishLine.setSize(80, 120);

        const finish = this.add.text(x, y, '🏁', { fontSize: '80px' }).setOrigin(0.5);

        this.tweens.add({
            targets: finish,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.physics.add.overlap(this.player, this.finishLine, this.levelComplete, null, this);
    }

    setupControls() {
        // Clavier
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        // Contrôles tactiles
        this.createTouchControls();
    }

    createTouchControls() {
        const { width, height } = this.game.config;

        // Conteneur pour les contrôles
        this.touchControls = this.add.container(0, 0).setScrollFactor(0).setDepth(100);

        // Boutons directionnels (gauche)
        const btnSize = 70;
        const btnY = height - 100;

        // Gauche
        this.leftBtn = this.createTouchButton(80, btnY, '◀️', btnSize);
        this.leftBtn.on('pointerdown', () => { this.touchLeft = true; });
        this.leftBtn.on('pointerup', () => { this.touchLeft = false; });
        this.leftBtn.on('pointerout', () => { this.touchLeft = false; });

        // Droite
        this.rightBtn = this.createTouchButton(200, btnY, '▶️', btnSize);
        this.rightBtn.on('pointerdown', () => { this.touchRight = true; });
        this.rightBtn.on('pointerup', () => { this.touchRight = false; });
        this.rightBtn.on('pointerout', () => { this.touchRight = false; });

        // Saut (droite)
        this.jumpBtn = this.createTouchButton(width - 200, btnY, '⬆️', btnSize);
        this.jumpBtn.on('pointerdown', () => { this.jump(); });

        // Attaque
        this.attackBtn = this.createTouchButton(width - 80, btnY, '⚔️', btnSize);
        this.attackBtn.on('pointerdown', () => { this.attack(); });

        this.touchLeft = false;
        this.touchRight = false;
    }

    createTouchButton(x, y, emoji, size) {
        const btn = this.add.container(x, y);

        const bg = this.add.circle(0, 0, size / 2, 0x34495e, 0.7);
        bg.setStrokeStyle(3, 0xffffff);

        const icon = this.add.text(0, 0, emoji, { fontSize: '40px' }).setOrigin(0.5);

        btn.add([bg, icon]);
        btn.setSize(size, size);
        btn.setInteractive({ useHandCursor: true });

        this.touchControls.add(btn);

        return btn;
    }

    update() {
        if (!this.player || !this.player.active) return;

        // Mettre à jour les ennemis
        this.updateEnemies();

        // Déplacements
        const onGround = this.player.body.touching.down;

        if (this.cursors.left.isDown || this.touchLeft) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setFlipX(true); // Flip horizontal vers la gauche
        } else if (this.cursors.right.isDown || this.touchRight) {
            this.player.setVelocityX(this.player.speed);
            this.player.setFlipX(false); // Direction normale (droite)
        } else {
            this.player.setVelocityX(0);
        }

        // Animation de saut (léger squash/stretch)
        if (!onGround && this.player.body.velocity.y < 0) {
            this.player.setScale(0.8, 0.85); // Stretch vers le haut
        } else if (!onGround && this.player.body.velocity.y > 0) {
            this.player.setScale(0.8, 0.75); // Squash en tombant
        } else {
            this.player.setScale(0.8, 0.8); // Taille normale
        }

        // Saut (clavier)
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.jump();
        }

        // Attaque (clavier)
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.attack();
        }

        // Réinitialiser le double saut au sol
        if (onGround) {
            this.player.canDoubleJump = true;
        }

        // Mort si tombe hors de l'écran
        if (this.player.y > this.game.config.height + 100) {
            this.playerDeath();
        }
    }

    jump() {
        const onGround = this.player.body.touching.down;

        if (onGround) {
            this.player.setVelocityY(-this.player.jumpPower);
        } else if (this.player.canDoubleJump) {
            this.player.setVelocityY(-400);
            this.player.canDoubleJump = false;
        }
    }

    attack() {
        // Animation d'attaque simple
        this.tweens.add({
            targets: this.player,
            scaleX: 1.0,
            scaleY: 1.0,
            duration: 100,
            yoyo: true,
            onComplete: () => {
                this.player.setScale(0.8);
            }
        });

        // Effet visuel d'attaque
        const attackCircle = this.add.circle(this.player.x, this.player.y, 50, 0xFFFFFF, 0.5);
        this.tweens.add({
            targets: attackCircle,
            scaleX: 2,
            scaleY: 2,
            alpha: 0,
            duration: 200,
            onComplete: () => attackCircle.destroy()
        });

        // Vérifier si des ennemis sont à proximité
        this.enemies.children.entries.forEach(enemy => {
            const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, enemy.x, enemy.y);
            if (distance < 80) {
                this.killEnemy(enemy);
            }
        });
    }

    updateEnemies() {
        this.enemies.children.entries.forEach(enemy => {
            if (!enemy.active) return;

            // Mouvement de patrouille
            enemy.setVelocityX(enemy.speed * enemy.direction);

            // Changer de direction aux bords ou aléatoirement
            if (enemy.x < 50 || enemy.x > this.game.config.width * 3 - 50 || Math.random() < 0.01) {
                enemy.direction *= -1;
            }

            // Mettre à jour la position graphique
            if (enemy.graphics) {
                enemy.graphics.setPosition(enemy.x, enemy.y);
            }
        });
    }

    collectCoin(player, coin) {
        coin.destroy();

        // Trouver et détruire le graphique de la pièce
        const coinGraphics = this.children.list.find(c =>
            c.type === 'Text' && c.text === '💰' &&
            Math.abs(c.x - coin.x) < 5 && Math.abs(c.y - coin.y) < 10
        );
        if (coinGraphics) coinGraphics.destroy();

        this.levelCoins++;
        this.sessionCoins++;
        window.gameState.addCoins(1);

        // Mettre à jour l'UI
        const uiScene = this.scene.get('UIScene');
        uiScene.events.emit('updateCoins', window.gameState.coins);
        uiScene.events.emit('updateScore', window.gameState.score);
    }

    collectPowerUp(player, powerUp) {
        const powerType = powerUp.powerType;
        powerUp.destroy();

        // Trouver et détruire le graphique
        const graphic = this.children.list.find(c =>
            c.type === 'Text' && Math.abs(c.x - powerUp.x) < 5 && Math.abs(c.y - powerUp.y) < 10
        );
        if (graphic) graphic.destroy();

        this.activatePowerUp(powerType);
    }

    activatePowerUp(type) {
        this.currentPowerUp = type;

        const uiScene = this.scene.get('UIScene');
        const powerUpConfig = GameConfig.powerUps.find(p => p.id === type);

        if (powerUpConfig && powerUpConfig.duration > 0) {
            uiScene.showPowerUp(type, powerUpConfig.duration);

            // Timer pour désactiver
            if (this.powerUpTimer) {
                this.powerUpTimer.remove();
            }

            this.powerUpTimer = this.time.delayedCall(powerUpConfig.duration, () => {
                this.deactivatePowerUp();
            });
        } else {
            uiScene.showPowerUp(type, -1);
        }

        // Effets spéciaux
        if (type === 'star') {
            this.player.isInvincible = true;
            // Effet lumineux autour du joueur
            this.player.setTint(0xFFFF00);
        } else if (type === 'shield') {
            this.player.hasShield = true;
            // Effet bleu pour le bouclier
            this.player.setTint(0x00AAFF);
        } else if (type === 'mushroom') {
            // Grandir!
            this.tweens.add({
                targets: this.player,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 300
            });
        } else if (type === 'magnet') {
            this.startMagnetEffect();
            // Effet magnétique violet
            this.player.setTint(0xFF00FF);
        }
    }

    deactivatePowerUp() {
        if (this.currentPowerUp === 'star') {
            this.player.isInvincible = false;
            this.player.clearTint();
        } else if (this.currentPowerUp === 'mushroom') {
            // Revenir à la taille normale
            this.tweens.add({
                targets: this.player,
                scaleX: 0.8,
                scaleY: 0.8,
                duration: 300
            });
        } else if (this.currentPowerUp === 'shield') {
            this.player.clearTint();
        } else if (this.currentPowerUp === 'magnet') {
            this.player.clearTint();
        }

        this.currentPowerUp = null;

        const uiScene = this.scene.get('UIScene');
        uiScene.removePowerUp();
    }

    startMagnetEffect() {
        // Attirer toutes les pièces proches
        this.magnetInterval = this.time.addEvent({
            delay: 100,
            callback: () => {
                this.coins.children.entries.forEach(coin => {
                    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, coin.x, coin.y);
                    if (distance < 300) {
                        this.physics.moveToObject(coin, this.player, 200);
                    }
                });
            },
            loop: true
        });

        // Arrêter après la durée
        this.time.delayedCall(10000, () => {
            if (this.magnetInterval) {
                this.magnetInterval.remove();
            }
        });
    }

    hitEnemy(player, enemy) {
        // Si invincible ou a un bouclier, tuer l'ennemi
        if (this.player.isInvincible) {
            this.killEnemy(enemy);
            return;
        }

        if (this.player.hasShield) {
            this.player.hasShield = false;
            this.killEnemy(enemy);
            const uiScene = this.scene.get('UIScene');
            uiScene.removePowerUp();
            return;
        }

        // Sinon, perdre une vie
        this.playerDeath();
    }

    killEnemy(enemy) {
        if (!enemy.active) return;

        enemy.destroy();
        if (enemy.graphics) {
            enemy.graphics.destroy();
        }

        this.enemiesKilled++;
        window.gameState.addScore(GameConfig.gameplay.enemyKillScore);

        const uiScene = this.scene.get('UIScene');
        uiScene.events.emit('updateScore', window.gameState.score);
    }

    playerDeath() {
        // Animation de mort
        this.player.setVelocity(0, 0);
        this.player.setActive(false);

        // Animation de mort (fade out et élévation)
        this.tweens.add({
            targets: this.player,
            alpha: 0,
            y: this.player.y - 100,
            angle: 360,
            duration: 500,
            onComplete: () => {
                this.respawn();
            }
        });
    }

    respawn() {
        const lives = window.gameState.loseLife();

        if (lives <= 0) {
            // Game over
            this.scene.stop('UIScene');
            this.scene.start('GameOverScene', { levelData: this.currentLevelData });
        } else {
            // Respawn au checkpoint
            this.player.setPosition(this.checkpointX + 100, this.game.config.height - 200);
            this.player.setActive(true);
            this.player.setAlpha(1);
            this.player.setAngle(0);
            this.player.setScale(0.8);

            const uiScene = this.scene.get('UIScene');
            uiScene.events.emit('updateLives', lives);

            // Invincibilité temporaire avec effet clignotant
            this.player.isInvincible = true;

            // Effet clignotant
            this.tweens.add({
                targets: this.player,
                alpha: 0.3,
                duration: 200,
                yoyo: true,
                repeat: 8,
                onComplete: () => {
                    this.player.setAlpha(1);
                }
            });

            this.time.delayedCall(2000, () => {
                this.player.isInvincible = false;
            });
        }
    }

    reachedCheckpoint(player, checkpoint) {
        if (!checkpoint.activated) {
            checkpoint.activated = true;
            this.checkpointX = checkpoint.x - 60;

            // Effet visuel
            this.tweens.add({
                targets: checkpoint,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 300,
                yoyo: true
            });

            // Message
            const checkpointText = this.add.text(checkpoint.x, checkpoint.y - 80, 'CHECKPOINT!', {
                fontSize: '32px',
                fontFamily: 'Arial Black',
                color: '#FFD700',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            this.tweens.add({
                targets: checkpointText,
                alpha: 0,
                y: checkpointText.y - 50,
                duration: 2000,
                onComplete: () => checkpointText.destroy()
            });
        }
    }

    levelComplete(player, finish) {
        if (this.levelCompleted) return;
        this.levelCompleted = true;

        // Arrêter le joueur
        this.player.setVelocity(0, 0);
        this.player.setActive(false);

        // Calculer les stats
        const stats = {
            score: this.sessionScore + window.gameState.score,
            coins: this.sessionCoins,
            enemiesKilled: this.enemiesKilled
        };

        // Sauvegarder
        window.gameState.saveState();

        // Transition vers l'écran de victoire
        this.cameras.main.fadeOut(1000);

        this.time.delayedCall(1000, () => {
            this.scene.stop('UIScene');
            this.scene.start('VictoryScene', {
                levelNum: this.levelNum,
                stats: stats,
                worlds: GameConfig.worlds
            });
        });
    }
}
