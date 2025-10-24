import { GameConfig } from '../config.js';
import { CharacterSprites } from '../CharacterSprites.js';
import { BossSprites } from '../BossSprites.js';
import { ItemSprites } from '../ItemSprites.js';

export default class BossScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BossScene' });
    }

    init(data) {
        // Validate input data
        if (!data || !data.level || !data.world) {
            console.error('BossScene initialized with invalid data:', data);
            // Use safe defaults (first boss level)
            this.currentLevelData = { level: 4, world: GameConfig.worlds[0] };
            this.levelNum = 4;
            this.world = GameConfig.worlds[0];
        } else {
            this.currentLevelData = data; // Store for restart functionality
            this.levelNum = data.level;
            this.world = data.world;
        }

        this.bossData = this.getBossData();
        this.bossHealth = 100;
        this.bossMaxHealth = 100;
        this.bossPhase = 1;
        this.bossAttackTimer = 0;
        this.playerHits = 0;
        this.bossDefeatedFlag = false;
        this.playerDying = false;
        this.invincibilityTimer = null;
    }

    preload() {
        // Générer sprites si nécessaire
        if (!this.textures.exists('sonic')) {
            CharacterSprites.generateAllSprites(this);
        }
        if (!this.textures.exists('boss_grumf')) {
            BossSprites.generateAllBossSprites(this);
        }
        if (!this.textures.exists('item_heart')) {
            ItemSprites.generateAllItemSprites(this);
        }
    }

    create() {
        const { width, height } = this.game.config;

        // Démarrer l'UI
        this.scene.launch('UIScene', { levelNum: this.levelNum });

        // Background
        this.add.rectangle(0, 0, width, height, this.world.bgColor, 0.7).setOrigin(0);

        // Message de début de combat
        this.showBossIntro();

        // Créer le sol
        this.createArena();

        // Créer le joueur
        this.createPlayer();

        // Créer le boss après l'intro
        this.time.delayedCall(3000, () => {
            this.createBoss();
            this.startBossFight();
        });

        // Contrôles
        this.setupControls();

        // Caméra
        this.cameras.main.setBounds(0, 0, width, height);
    }

    showBossIntro() {
        const { width, height } = this.game.config;

        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.8).setOrigin(0);

        const bossName = this.add.text(width / 2, height / 3, this.bossData.name, {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            color: '#FF0000',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5);

        const warning = this.add.text(width / 2, height / 2, '⚠️ COMBAT DE BOSS! ⚠️', {
            fontSize: '48px',
            fontFamily: 'Arial Black',
            color: '#FFFF00',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Animation
        this.tweens.add({
            targets: [bossName, warning],
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 500,
            yoyo: true,
            repeat: 2
        });

        this.time.delayedCall(2800, () => {
            overlay.destroy();
            bossName.destroy();
            warning.destroy();
        });
    }

    createArena() {
        const { width, height } = this.game.config;

        this.platforms = this.physics.add.staticGroup();

        // Sol de l'arène
        const groundY = height - 50;
        for (let x = 0; x < width; x += 100) {
            const ground = this.add.rectangle(x, groundY, 100, 100, 0x8B4513);
            this.platforms.add(ground);
        }

        // Quelques plateformes pour esquiver
        const platformData = [
            { x: width * 0.2, y: height - 250, w: 150 },
            { x: width * 0.5, y: height - 300, w: 150 },
            { x: width * 0.8, y: height - 250, w: 150 }
        ];

        platformData.forEach(p => {
            const platform = this.add.rectangle(p.x, p.y, p.w, 20, 0x696969);
            this.platforms.add(platform);
        });

        this.platforms.refresh();
    }

    createPlayer() {
        const { height } = this.game.config;
        const charData = GameConfig.characters.find(c => c.id === window.gameState.character) || GameConfig.characters[0];

        this.player = this.physics.add.sprite(200, height - 200, charData.id);
        this.player.setScale(0.8);
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0);
        this.player.setSize(50, 50);

        this.player.speed = charData.speed;
        this.player.jumpPower = charData.jumpPower;
        this.player.canDoubleJump = true;
        this.player.isInvincible = false;

        this.physics.add.collider(this.player, this.platforms);

        // Projectiles du joueur
        this.playerProjectiles = this.physics.add.group();
    }

    createBoss() {
        const { width, height } = this.game.config;

        this.boss = this.physics.add.sprite(width - 300, height - 250, this.bossData.sprite);
        this.boss.setScale(1.2);
        this.boss.setCollideWorldBounds(true);
        this.boss.setImmovable(true);

        // Barre de vie du boss
        this.createBossHealthBar();

        // Projectiles du boss
        this.bossProjectiles = this.physics.add.group();

        // Collisions
        this.physics.add.collider(this.boss, this.platforms);
        this.physics.add.overlap(this.player, this.boss, this.playerHitBoss, null, this);
        this.physics.add.overlap(this.player, this.bossProjectiles, this.playerHitByProjectile, null, this);
        this.physics.add.overlap(this.boss, this.playerProjectiles, this.bossHitByProjectile, null, this);
    }

    createBossHealthBar() {
        const { width } = this.game.config;

        this.bossHealthBarBg = this.add.rectangle(width / 2, 50, 600, 30, 0x000000).setScrollFactor(0);
        this.bossHealthBar = this.add.rectangle(width / 2, 50, 600, 30, 0xFF0000).setScrollFactor(0);

        this.bossNameText = this.add.text(width / 2, 30, this.bossData.name, {
            fontSize: '24px',
            fontFamily: 'Arial Black',
            color: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0);
    }

    getBossData() {
        const bossMap = {
            4: { name: 'Grumf la Taupe Géante', sprite: 'boss_grumf', pattern: 'charge' },
            8: { name: 'Scaraboss', sprite: 'boss_scaraboss', pattern: 'projectiles' },
            12: { name: 'Capitaine Piranha', sprite: 'boss_captain_piranha', pattern: 'jump' },
            15: { name: 'Yéti Frost', sprite: 'boss_yeti', pattern: 'freeze' },
            18: { name: 'RoboChef', sprite: 'boss_robochef', pattern: 'lasers' },
            20: { name: 'Dr Chaos', sprite: 'boss_dr_chaos', pattern: 'chaos' }
        };

        return bossMap[this.levelNum] || bossMap[4];
    }

    setupControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        // Contrôles tactiles simplifiés pour boss
        this.createTouchControls();
    }

    createTouchControls() {
        const { width, height } = this.game.config;

        this.touchControls = this.add.container(0, 0).setScrollFactor(0).setDepth(100);

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

        // Saut
        this.jumpBtn = this.createTouchButton(width - 200, btnY, '⬆️', btnSize);
        this.jumpBtn.on('pointerdown', () => { this.jump(); });

        // Attaque
        this.attackBtn = this.createTouchButton(width - 80, btnY, '⚔️', btnSize);
        this.attackBtn.on('pointerdown', () => { this.shootProjectile(); });

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

    startBossFight() {
        this.bossActive = true;
        this.bossAttackTimer = this.time.addEvent({
            delay: 2000,
            callback: this.bossAttack,
            callbackScope: this,
            loop: true
        });
    }

    update() {
        if (!this.player || !this.player.active) return;

        // Déplacements joueur
        const onGround = this.player.body.touching.down;

        if (this.cursors.left.isDown || this.touchLeft) {
            this.player.setVelocityX(-this.player.speed);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown || this.touchRight) {
            this.player.setVelocityX(this.player.speed);
            this.player.setFlipX(false);
        } else {
            this.player.setVelocityX(0);
        }

        // Saut
        if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.jump();
        }

        // Attaque/Tir
        if (Phaser.Input.Keyboard.JustDown(this.attackKey)) {
            this.shootProjectile();
        }

        // Réinitialiser double saut
        if (onGround) {
            this.player.canDoubleJump = true;
        }

        // Comportement du boss
        if (this.boss && this.bossActive) {
            this.updateBoss();
        }

        // Mort si tombe
        if (this.player.y > this.game.config.height + 100) {
            this.playerDeath();
        }
    }

    jump() {
        const onGround = this.player.body.touching.down;

        if (onGround) {
            this.player.setVelocityY(-this.player.jumpPower);
        } else if (this.player.canDoubleJump) {
            this.player.setVelocityY(-this.player.jumpPower);
            this.player.canDoubleJump = false;
        }
    }

    shootProjectile() {
        if (!this.player.active) return;

        const projectile = this.physics.add.sprite(this.player.x, this.player.y, null);
        const projGraphic = this.add.circle(this.player.x, this.player.y, 8, 0xFFFF00);

        projectile.setVelocityX(this.player.flipX ? -400 : 400);
        projectile.setSize(16, 16);
        projectile.graphic = projGraphic;

        this.playerProjectiles.add(projectile);

        // Détruire après 2 secondes
        this.time.delayedCall(2000, () => {
            if (projectile.active) {
                projGraphic.destroy();
                projectile.destroy();
            }
        });
    }

    updateBoss() {
        // Mouvement simple du boss (patrouille)
        if (!this.boss.body) return;

        if (this.bossData.pattern !== 'stationary') {
            if (!this.boss.direction) {
                this.boss.direction = 1;
            }

            this.boss.setVelocityX(this.boss.direction * 100);

            if (this.boss.x < 200 || this.boss.x > this.game.config.width - 200) {
                this.boss.direction *= -1;
            }
        }

        // Mettre à jour les projectiles visuels
        this.playerProjectiles.children.entries.forEach(proj => {
            if (proj.graphic) {
                proj.graphic.setPosition(proj.x, proj.y);
            }
        });

        this.bossProjectiles.children.entries.forEach(proj => {
            if (proj.graphic) {
                proj.graphic.setPosition(proj.x, proj.y);
            }
        });
    }

    bossAttack() {
        if (!this.boss || !this.boss.active) return;

        // Patterns d'attaque selon le boss
        switch (this.bossData.pattern) {
            case 'projectiles':
                this.bossShootProjectile();
                break;
            case 'charge':
                this.bossCharge();
                break;
            case 'lasers':
                this.bossLaserAttack();
                break;
            default:
                this.bossShootProjectile();
        }
    }

    bossShootProjectile() {
        const projectile = this.physics.add.sprite(this.boss.x, this.boss.y, null);
        const projGraphic = this.add.circle(this.boss.x, this.boss.y, 12, 0xFF0000);

        // Viser le joueur
        this.physics.moveToObject(projectile, this.player, 300);

        projectile.setSize(24, 24);
        projectile.graphic = projGraphic;

        this.bossProjectiles.add(projectile);

        this.time.delayedCall(3000, () => {
            if (projectile.active) {
                projGraphic.destroy();
                projectile.destroy();
            }
        });
    }

    bossCharge() {
        // Charge rapide vers le joueur
        const chargeSpeed = this.player.x > this.boss.x ? 400 : -400;
        this.boss.setVelocityX(chargeSpeed);

        this.time.delayedCall(500, () => {
            this.boss.setVelocityX(0);
        });
    }

    bossLaserAttack() {
        // Créer un laser horizontal
        const laser = this.add.rectangle(this.boss.x, this.boss.y, 800, 20, 0xFF0000, 0.7);

        const laserPhysics = this.physics.add.existing(laser);
        laserPhysics.body.setAllowGravity(false);

        this.bossProjectiles.add(laserPhysics);

        this.tweens.add({
            targets: laser,
            alpha: 0,
            duration: 1000,
            onComplete: () => laser.destroy()
        });
    }

    playerHitBoss() {
        if (this.player.isInvincible) return;

        // Contact direct avec le boss fait des dégâts au joueur
        this.playerTakeDamage();
    }

    bossHitByProjectile(boss, projectile) {
        // Destroy graphic first, then projectile
        if (projectile.graphic) {
            projectile.graphic.destroy();
        }
        projectile.destroy();

        // Boss prend des dégâts
        this.bossHealth -= 10;
        this.playerHits++;

        // Effet visuel
        this.tweens.add({
            targets: boss,
            tint: 0xFFFFFF,
            duration: 100,
            yoyo: true,
            onComplete: () => boss.clearTint()
        });

        // Mettre à jour barre de vie
        const healthPercent = this.bossHealth / this.bossMaxHealth;
        this.bossHealthBar.displayWidth = 600 * healthPercent;

        if (this.bossHealth <= 0) {
            this.bossDefeated();
        } else if (this.bossHealth <= 50 && this.bossPhase === 1) {
            // Phase 2 du boss
            this.bossPhase = 2;
            this.bossAttackTimer.delay = 1500; // Plus rapide
        }
    }

    playerHitByProjectile(player, projectile) {
        // Destroy graphic first, then projectile
        if (projectile.graphic) {
            projectile.graphic.destroy();
        }
        projectile.destroy();

        this.playerTakeDamage();
    }

    playerTakeDamage() {
        if (this.player.isInvincible) return;

        const lives = window.gameState.loseLife();
        const uiScene = this.scene.get('UIScene');
        if (uiScene) {
            uiScene.events.emit('updateLives', lives);
        }

        if (lives <= 0) {
            this.playerDeath();
        } else {
            // Invincibilité temporaire
            this.player.isInvincible = true;

            // Clear any existing invincibility timer
            if (this.invincibilityTimer) {
                this.invincibilityTimer.remove();
            }

            this.tweens.add({
                targets: this.player,
                alpha: 0.3,
                duration: 150,
                yoyo: true,
                repeat: 5
            });

            this.invincibilityTimer = this.time.delayedCall(1500, () => {
                if (this.player && this.player.active) {
                    this.player.isInvincible = false;
                    this.player.setAlpha(1);
                }
            });
        }
    }

    playerDeath() {
        // Guard against multiple death triggers
        if (this.playerDying) return;
        this.playerDying = true;

        this.player.setActive(false);
        this.bossActive = false;

        // Clean up boss attack timer
        if (this.bossAttackTimer) {
            this.bossAttackTimer.remove();
            this.bossAttackTimer = null;
        }

        this.scene.stop('UIScene');
        this.scene.start('GameOverScene', { levelData: { level: this.levelNum, world: this.world } });
    }

    bossDefeated() {
        // Guard against multiple calls
        if (this.bossDefeatedFlag) return;
        this.bossDefeatedFlag = true;

        this.bossActive = false;

        if (this.bossAttackTimer) {
            this.bossAttackTimer.remove();
        }

        // Animation de mort du boss
        this.tweens.add({
            targets: this.boss,
            alpha: 0,
            scaleX: 0,
            scaleY: 0,
            angle: 360,
            duration: 1500,
            onComplete: () => {
                this.boss.destroy();
                this.showVictory();
            }
        });

        // Explosion
        for (let i = 0; i < 20; i++) {
            const particle = this.add.circle(this.boss.x, this.boss.y, Phaser.Math.Between(5, 15), 0xFFFF00);
            const angle = Math.random() * Math.PI * 2;
            const speed = Phaser.Math.Between(50, 200);

            this.tweens.add({
                targets: particle,
                x: this.boss.x + Math.cos(angle) * speed,
                y: this.boss.y + Math.sin(angle) * speed,
                alpha: 0,
                duration: 1000,
                onComplete: () => particle.destroy()
            });
        }
    }

    showVictory() {
        const { width, height } = this.game.config;

        const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0).setScrollFactor(0);

        const victoryText = this.add.text(width / 2, height / 2 - 100, '🏆 BOSS VAINCU! 🏆', {
            fontSize: '64px',
            fontFamily: 'Arial Black',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 8
        }).setOrigin(0.5).setScrollFactor(0);

        this.tweens.add({
            targets: victoryText,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.time.delayedCall(3000, () => {
            // Débloquer le niveau suivant et aller à la victoire
            const nextLevel = this.levelNum + 1;
            window.gameState.unlockLevel(nextLevel);
            window.gameState.currentLevel = nextLevel;
            window.gameState.addScore(1000); // Bonus boss
            window.gameState.saveState();

            this.scene.stop('UIScene');
            this.scene.start('VictoryScene', {
                levelNum: this.levelNum,
                stats: {
                    score: window.gameState.score,
                    coins: window.gameState.coins,
                    enemiesKilled: 1 // Le boss
                },
                worlds: GameConfig.worlds
            });
        });
    }

    shutdown() {
        // Clean up all resources when scene stops

        // Clear boss attack timer
        if (this.bossAttackTimer) {
            this.bossAttackTimer.remove();
            this.bossAttackTimer = null;
        }

        // Clear invincibility timer
        if (this.invincibilityTimer) {
            this.invincibilityTimer.remove();
            this.invincibilityTimer = null;
        }

        // Clear all projectiles
        if (this.playerProjectiles) {
            this.playerProjectiles.children.entries.forEach(proj => {
                if (proj.graphic) {
                    proj.graphic.destroy();
                }
            });
            this.playerProjectiles.clear(true, true);
        }

        if (this.bossProjectiles) {
            this.bossProjectiles.children.entries.forEach(proj => {
                if (proj.graphic) {
                    proj.graphic.destroy();
                }
            });
            this.bossProjectiles.clear(true, true);
        }

        // Reset state
        this.bossActive = false;
        this.touchLeft = false;
        this.touchRight = false;
    }
}
