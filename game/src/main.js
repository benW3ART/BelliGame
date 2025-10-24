import { GameConfig, GameState } from './config.js';
import MenuScene from './scenes/MenuScene.js';
import CharacterSelectScene from './scenes/CharacterSelectScene.js';
import MapScene from './scenes/MapScene.js';
import UIScene from './scenes/UIScene.js';
import GameScene from './scenes/GameScene.js';
import BossScene from './scenes/BossScene.js';
import PauseScene from './scenes/PauseScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import VictoryScene from './scenes/VictoryScene.js';
import ComicScene from './scenes/ComicScene.js';

// Instance globale de l'état du jeu
window.gameState = new GameState();

// Configuration de Phaser - Mobile First
const config = {
    type: Phaser.AUTO,
    width: GameConfig.width,
    height: GameConfig.height,
    parent: 'game-container',
    backgroundColor: '#667eea',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: GameConfig.gameplay.gravity },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GameConfig.width,
        height: GameConfig.height
    },
    scene: [
        MenuScene,
        CharacterSelectScene,
        MapScene,
        GameScene,
        BossScene,
        UIScene,
        PauseScene,
        GameOverScene,
        VictoryScene,
        ComicScene
    ],
    pixelArt: false,
    roundPixels: true,
    input: {
        activePointers: 3
    },
    dom: {
        createContainer: true
    }
};

// Initialiser le jeu une fois que le DOM est prêt
window.addEventListener('load', () => {
    // Cacher l'écran de chargement
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }

    // Créer l'instance du jeu
    const game = new Phaser.Game(config);

    // Ajouter l'instance du jeu à window pour pouvoir y accéder globalement
    window.game = game;

    console.log('🎮 Jeu initialisé - Une aventure créée par Papa, Elon et Andy !');
});

// Service Worker pour PWA (si disponible)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(() => {
        console.log('Service Worker enregistré');
    }).catch(err => {
        console.log('Service Worker non disponible', err);
    });
}
