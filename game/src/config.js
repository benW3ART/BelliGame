// Configuration globale du jeu
export const GameConfig = {
    // Dimensions
    width: 1280,
    height: 720,

    // Personnages jouables
    characters: [
        { id: 'sonic', name: 'Sonic', color: 0x0066FF, speed: 250, jumpPower: 450 },
        { id: 'shadow', name: 'Shadow', color: 0x000000, speed: 240, jumpPower: 440 },
        { id: 'knuckles', name: 'Knuckles', color: 0xFF0000, speed: 220, jumpPower: 480 },
        { id: 'kwazii', name: 'Kwazii', color: 0xFFA500, speed: 230, jumpPower: 450 },
        { id: 'barnacle', name: 'Capitaine Barnacle', color: 0x8B4513, speed: 210, jumpPower: 440 },
        { id: 'kai', name: 'Kai', color: 0xFF4500, speed: 240, jumpPower: 450 },
        { id: 'lloyd', name: 'Lloyd', color: 0x00FF00, speed: 240, jumpPower: 450 },
        { id: 'spongebob', name: 'Bob l\'éponge', color: 0xFFFF00, speed: 220, jumpPower: 460 },
        { id: 'patrick', name: 'Patrick', color: 0xFFC0CB, speed: 200, jumpPower: 430 },
        { id: 'blippi', name: 'Blippi', color: 0x87CEEB, speed: 230, jumpPower: 450 },
        { id: 'mario', name: 'Mario', color: 0xFF0000, speed: 230, jumpPower: 460 },
        { id: 'luigi', name: 'Luigi', color: 0x00FF00, speed: 220, jumpPower: 480 }
    ],

    // Mondes et niveaux
    worlds: [
        {
            id: 1,
            name: 'Forêt magique',
            theme: 'forest',
            levels: [1, 2, 3, 4],
            boss: 'Grumf la Taupe Géante',
            bgColor: 0x228B22,
            musicKey: 'music_forest',
            enemies: ['mole', 'bird']
        },
        {
            id: 2,
            name: 'Désert doré',
            theme: 'desert',
            levels: [5, 6, 7, 8],
            boss: 'Scaraboss',
            bgColor: 0xFFD700,
            musicKey: 'music_desert',
            enemies: ['beetle', 'snake']
        },
        {
            id: 3,
            name: 'Océan infini',
            theme: 'ocean',
            levels: [9, 10, 11, 12],
            boss: 'Capitaine Piranha',
            bgColor: 0x4169E1,
            musicKey: 'music_ocean',
            enemies: ['fish', 'crab', 'jellyfish']
        },
        {
            id: 4,
            name: 'Montagne glacée',
            theme: 'ice',
            levels: [13, 14, 15],
            boss: 'Yéti Frost',
            bgColor: 0xB0E0E6,
            musicKey: 'music_ice',
            enemies: ['penguin', 'stalactite']
        },
        {
            id: 5,
            name: 'Ville urbaine',
            theme: 'city',
            levels: [16, 17, 18],
            boss: 'RoboChef',
            bgColor: 0x708090,
            musicKey: 'music_city',
            enemies: ['robot', 'drone']
        },
        {
            id: 6,
            name: 'Château du Chaos',
            theme: 'castle',
            levels: [19, 20],
            boss: 'Dr Chaos',
            bgColor: 0x8B008B,
            musicKey: 'music_castle',
            enemies: ['guardian', 'knight']
        }
    ],

    // Items et power-ups
    powerUps: [
        { id: 'mushroom', name: 'Champignon géant', duration: -1, rarity: 0.3 },
        { id: 'star', name: 'Étoile', duration: 8000, rarity: 0.1 },
        { id: 'fireball', name: 'Boule de feu', duration: 15000, rarity: 0.2 },
        { id: 'laser', name: 'Rayon laser', duration: 12000, rarity: 0.15 },
        { id: 'shield', name: 'Bouclier', duration: -1, rarity: 0.25 },
        { id: 'magnet', name: 'Aimant', duration: 10000, rarity: 0.2 },
        { id: 'clock', name: 'Horloge', duration: 5000, rarity: 0.15 }
    ],

    // Paramètres de gameplay
    gameplay: {
        gravity: 1000,
        playerSpeed: 230,
        jumpPower: 450,
        doubleJumpPower: 400,
        startingLives: 3,
        coinValue: 10,
        enemyKillScore: 50
    },

    // Paramètres audio
    audio: {
        musicVolume: 0.5,
        sfxVolume: 0.7
    }
};

// État du jeu (sauvegarde)
export class GameState {
    constructor() {
        this.loadState();
    }

    loadState() {
        const saved = localStorage.getItem('gameState');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentLevel = data.niveau || 1;
            this.character = data.personnage || 'sonic';
            this.lives = data.vies || GameConfig.gameplay.startingLives;
            this.score = data.score || 0;
            this.coins = data.pieces || 0;
            this.unlockedLevels = data.unlockedLevels || [1];
            this.musicEnabled = data.musicEnabled !== undefined ? data.musicEnabled : true;
            this.sfxEnabled = data.sfxEnabled !== undefined ? data.sfxEnabled : true;
        } else {
            this.reset();
        }
    }

    saveState() {
        const data = {
            niveau: this.currentLevel,
            personnage: this.character,
            vies: this.lives,
            score: this.score,
            pieces: this.coins,
            unlockedLevels: this.unlockedLevels,
            musicEnabled: this.musicEnabled,
            sfxEnabled: this.sfxEnabled
        };
        localStorage.setItem('gameState', JSON.stringify(data));
    }

    reset() {
        this.currentLevel = 1;
        this.character = 'sonic';
        this.lives = GameConfig.gameplay.startingLives;
        this.score = 0;
        this.coins = 0;
        this.unlockedLevels = [1];
        this.musicEnabled = true;
        this.sfxEnabled = true;
        this.saveState();
    }

    unlockLevel(level) {
        if (!this.unlockedLevels.includes(level)) {
            this.unlockedLevels.push(level);
            this.saveState();
        }
    }

    addScore(points) {
        this.score += points;
        this.saveState();
    }

    addCoins(amount) {
        this.coins += amount;
        this.addScore(amount * GameConfig.gameplay.coinValue);
        this.saveState();
    }

    loseLife() {
        this.lives--;
        this.saveState();
        return this.lives;
    }

    addLife() {
        this.lives++;
        this.saveState();
    }
}
