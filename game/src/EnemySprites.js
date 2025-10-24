// Système de génération de sprites pour les ennemis
// Chaque monde a ses propres ennemis avec un style unique

export class EnemySprites {
    // MONDE 1 - FORÊT MAGIQUE

    static createMole(scene) {
        const graphics = scene.add.graphics();

        // Corps de taupe brun
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillEllipse(0, 0, 35, 30);

        // Tête
        graphics.fillCircle(0, -8, 18);

        // Museau rose
        graphics.fillStyle(0xFFB6C1, 1);
        graphics.fillEllipse(0, -3, 14, 10);

        // Nez noir
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, -3, 4);

        // Yeux (petits, taupe aveugle)
        graphics.fillCircle(-6, -10, 2);
        graphics.fillCircle(6, -10, 2);

        // Dents
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-4, 2, 3, 4);
        graphics.fillRect(1, 2, 3, 4);

        // Pattes avant
        graphics.fillStyle(0x654321, 1);
        graphics.fillEllipse(-12, 8, 10, 6);
        graphics.fillEllipse(12, 8, 10, 6);

        // Griffes
        graphics.lineStyle(2, 0x000000, 1);
        for (let i = -1; i <= 1; i++) {
            graphics.beginPath();
            graphics.moveTo(-12 + i * 3, 10);
            graphics.lineTo(-12 + i * 3, 14);
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(12 + i * 3, 10);
            graphics.lineTo(12 + i * 3, 14);
            graphics.strokePath();
        }

        const texture = graphics.generateTexture('enemy_mole', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createBird(scene) {
        const graphics = scene.add.graphics();

        // Corps d'oiseau bleu
        graphics.fillStyle(0x4169E1, 1);
        graphics.fillEllipse(0, 0, 25, 20);

        // Tête
        graphics.fillCircle(0, -12, 12);

        // Ailes
        graphics.fillStyle(0x1E90FF, 1);
        graphics.beginPath();
        graphics.moveTo(-12, 0);
        graphics.lineTo(-22, -5);
        graphics.lineTo(-18, 5);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(12, 0);
        graphics.lineTo(22, -5);
        graphics.lineTo(18, 5);
        graphics.closePath();
        graphics.fillPath();

        // Yeux
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-4, -12, 5);
        graphics.fillCircle(4, -12, 5);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-4, -11, 2);
        graphics.fillCircle(4, -11, 2);

        // Bec jaune
        graphics.fillStyle(0xFFD700, 1);
        graphics.beginPath();
        graphics.moveTo(0, -8);
        graphics.lineTo(-4, -4);
        graphics.lineTo(4, -4);
        graphics.closePath();
        graphics.fillPath();

        // Queue
        graphics.fillStyle(0x4169E1, 1);
        graphics.beginPath();
        graphics.moveTo(0, 8);
        graphics.lineTo(-5, 15);
        graphics.lineTo(5, 15);
        graphics.closePath();
        graphics.fillPath();

        const texture = graphics.generateTexture('enemy_bird', 60, 60);
        graphics.destroy();
        return texture;
    }

    // MONDE 2 - DÉSERT DORÉ

    static createBeetle(scene) {
        const graphics = scene.add.graphics();

        // Corps de scarabée doré
        graphics.fillStyle(0xDAA520, 1);
        graphics.fillEllipse(0, 0, 30, 25);

        // Carapace brillante
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillEllipse(0, -3, 25, 20);

        // Ligne centrale
        graphics.lineStyle(2, 0x8B4513, 1);
        graphics.beginPath();
        graphics.moveTo(0, -12);
        graphics.lineTo(0, 8);
        graphics.strokePath();

        // Tête noire
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, -15, 10);

        // Mandibules
        graphics.lineStyle(3, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-5, -18);
        graphics.lineTo(-8, -22);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(5, -18);
        graphics.lineTo(8, -22);
        graphics.strokePath();

        // Antennes
        graphics.lineStyle(1, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-6, -20);
        graphics.lineTo(-10, -26);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(6, -20);
        graphics.lineTo(10, -26);
        graphics.strokePath();

        // Pattes (6)
        graphics.lineStyle(2, 0x8B4513, 1);
        for (let i = 0; i < 3; i++) {
            const y = -8 + i * 6;
            graphics.beginPath();
            graphics.moveTo(-12, y);
            graphics.lineTo(-18, y + 4);
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(12, y);
            graphics.lineTo(18, y + 4);
            graphics.strokePath();
        }

        const texture = graphics.generateTexture('enemy_beetle', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createSnake(scene) {
        const graphics = scene.add.graphics();

        // Corps de serpent ondulé
        graphics.lineStyle(12, 0xF4A460, 1);
        graphics.beginPath();
        graphics.moveTo(-20, 5);
        graphics.quadraticCurveTo(-10, -5, 0, 0);
        graphics.quadraticCurveTo(10, 5, 20, 0);
        graphics.strokePath();

        // Motifs
        graphics.fillStyle(0xD2691E, 1);
        for (let x = -15; x <= 15; x += 8) {
            graphics.fillCircle(x, Math.sin(x * 0.2) * 3, 4);
        }

        // Tête de serpent
        graphics.fillStyle(0xF4A460, 1);
        graphics.fillEllipse(22, 0, 12, 10);

        // Yeux rouges
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(24, -3, 3);
        graphics.fillCircle(24, 3, 3);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(25, -3, 1);
        graphics.fillCircle(25, 3, 1);

        // Langue fourchue
        graphics.lineStyle(2, 0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(28, 0);
        graphics.lineTo(32, -2);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(28, 0);
        graphics.lineTo(32, 2);
        graphics.strokePath();

        const texture = graphics.generateTexture('enemy_snake', 70, 60);
        graphics.destroy();
        return texture;
    }

    // MONDE 3 - OCÉAN INFINI

    static createFish(scene) {
        const graphics = scene.add.graphics();

        // Corps de poisson orange
        graphics.fillStyle(0xFF8C00, 1);
        graphics.fillEllipse(0, 0, 30, 18);

        // Rayures blanches
        graphics.fillStyle(0xFFFFFF, 1);
        for (let i = -10; i <= 10; i += 8) {
            graphics.fillRect(i - 2, -10, 3, 20);
        }

        // Queue
        graphics.fillStyle(0xFF8C00, 1);
        graphics.beginPath();
        graphics.moveTo(15, 0);
        graphics.lineTo(25, -8);
        graphics.lineTo(25, 8);
        graphics.closePath();
        graphics.fillPath();

        // Nageoires
        graphics.beginPath();
        graphics.moveTo(-8, -8);
        graphics.lineTo(-12, -14);
        graphics.lineTo(-6, -10);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(-8, 8);
        graphics.lineTo(-12, 14);
        graphics.lineTo(-6, 10);
        graphics.closePath();
        graphics.fillPath();

        // Œil
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -2, 5);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-7, -2, 2);

        const texture = graphics.generateTexture('enemy_fish', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createCrab(scene) {
        const graphics = scene.add.graphics();

        // Corps de crabe rouge
        graphics.fillStyle(0xFF4500, 1);
        graphics.fillEllipse(0, 0, 28, 20);

        // Carapace
        graphics.fillStyle(0xDC143C, 1);
        graphics.fillEllipse(0, -3, 24, 16);

        // Yeux sur tiges
        graphics.lineStyle(3, 0xFF4500, 1);
        graphics.beginPath();
        graphics.moveTo(-8, -8);
        graphics.lineTo(-8, -14);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(8, -8);
        graphics.lineTo(8, -14);
        graphics.strokePath();

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -15, 4);
        graphics.fillCircle(8, -15, 4);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-8, -15, 2);
        graphics.fillCircle(8, -15, 2);

        // Pinces
        graphics.fillStyle(0xFF4500, 1);
        graphics.fillEllipse(-18, 0, 10, 8);
        graphics.fillEllipse(18, 0, 10, 8);

        // Bout des pinces
        graphics.fillStyle(0x8B0000, 1);
        graphics.beginPath();
        graphics.moveTo(-22, -2);
        graphics.lineTo(-26, -4);
        graphics.lineTo(-24, 2);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(22, -2);
        graphics.lineTo(26, -4);
        graphics.lineTo(24, 2);
        graphics.closePath();
        graphics.fillPath();

        // Pattes
        graphics.lineStyle(2, 0xFF4500, 1);
        for (let i = -1; i <= 1; i++) {
            graphics.beginPath();
            graphics.moveTo(i * 6, 8);
            graphics.lineTo(i * 8, 14);
            graphics.strokePath();
        }

        const texture = graphics.generateTexture('enemy_crab', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createJellyfish(scene) {
        const graphics = scene.add.graphics();

        // Cloche de méduse
        graphics.fillStyle(0xFF69B4, 0.7);
        graphics.fillCircle(0, -8, 18);

        // Effet translucide
        graphics.fillStyle(0xFFB6C1, 0.5);
        graphics.fillCircle(0, -8, 14);

        // Taches
        graphics.fillStyle(0xFF1493, 0.6);
        graphics.fillCircle(-6, -10, 4);
        graphics.fillCircle(6, -10, 4);
        graphics.fillCircle(0, -6, 3);

        // Tentacules ondulants
        graphics.lineStyle(3, 0xFF69B4, 0.8);
        for (let i = -12; i <= 12; i += 6) {
            graphics.beginPath();
            graphics.moveTo(i, 6);
            graphics.quadraticCurveTo(i + 2, 12, i, 18);
            graphics.quadraticCurveTo(i - 2, 24, i, 30);
            graphics.strokePath();
        }

        // Yeux simples
        graphics.fillStyle(0x000000, 0.6);
        graphics.fillCircle(-6, -8, 2);
        graphics.fillCircle(6, -8, 2);

        const texture = graphics.generateTexture('enemy_jellyfish', 60, 60);
        graphics.destroy();
        return texture;
    }

    // MONDE 4 - MONTAGNE GLACÉE

    static createPenguin(scene) {
        const graphics = scene.add.graphics();

        // Corps noir
        graphics.fillStyle(0x000000, 1);
        graphics.fillEllipse(0, 0, 22, 28);

        // Ventre blanc
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(0, 4, 16, 20);

        // Tête
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, -16, 14);

        // Yeux
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-5, -16, 6);
        graphics.fillCircle(5, -16, 6);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-5, -15, 3);
        graphics.fillCircle(5, -15, 3);

        // Bec orange
        graphics.fillStyle(0xFF8C00, 1);
        graphics.beginPath();
        graphics.moveTo(0, -12);
        graphics.lineTo(-4, -8);
        graphics.lineTo(4, -8);
        graphics.closePath();
        graphics.fillPath();

        // Ailes/nageoires
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-11, -2);
        graphics.lineTo(-18, 4);
        graphics.lineTo(-14, 10);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(11, -2);
        graphics.lineTo(18, 4);
        graphics.lineTo(14, 10);
        graphics.closePath();
        graphics.fillPath();

        // Pattes oranges
        graphics.fillStyle(0xFF8C00, 1);
        graphics.fillEllipse(-6, 16, 8, 4);
        graphics.fillEllipse(6, 16, 8, 4);

        const texture = graphics.generateTexture('enemy_penguin', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createStalactite(scene) {
        const graphics = scene.add.graphics();

        // Stalactite de glace bleue
        graphics.fillStyle(0xB0E0E6, 1);
        graphics.beginPath();
        graphics.moveTo(0, -20);
        graphics.lineTo(-12, -8);
        graphics.lineTo(-8, 0);
        graphics.lineTo(-4, 8);
        graphics.lineTo(0, 20);
        graphics.lineTo(4, 8);
        graphics.lineTo(8, 0);
        graphics.lineTo(12, -8);
        graphics.closePath();
        graphics.fillPath();

        // Reflets lumineux
        graphics.fillStyle(0xFFFFFF, 0.6);
        graphics.beginPath();
        graphics.moveTo(-4, -12);
        graphics.lineTo(-6, -6);
        graphics.lineTo(-2, 0);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(4, 4);
        graphics.lineTo(2, 10);
        graphics.lineTo(3, 14);
        graphics.closePath();
        graphics.fillPath();

        // Contour glacé
        graphics.lineStyle(2, 0x87CEEB, 0.8);
        graphics.strokePath();

        const texture = graphics.generateTexture('enemy_stalactite', 60, 60);
        graphics.destroy();
        return texture;
    }

    // MONDE 5 - VILLE URBAINE

    static createRobot(scene) {
        const graphics = scene.add.graphics();

        // Corps du robot gris métallique
        graphics.fillStyle(0x808080, 1);
        graphics.fillRect(-12, -4, 24, 20);

        // Tête carrée
        graphics.fillStyle(0x696969, 1);
        graphics.fillRect(-10, -18, 20, 14);

        // Écran/visage
        graphics.fillStyle(0x00FFFF, 1);
        graphics.fillRect(-8, -16, 16, 10);

        // Yeux rouges (hostile)
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-6, -14, 4, 3);
        graphics.fillRect(2, -14, 4, 3);

        // Bouche mécanique
        graphics.lineStyle(2, 0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(-4, -8);
        graphics.lineTo(4, -8);
        graphics.strokePath();

        // Antenne
        graphics.lineStyle(2, 0x808080, 1);
        graphics.beginPath();
        graphics.moveTo(0, -18);
        graphics.lineTo(0, -24);
        graphics.strokePath();

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, -26, 3);

        // Bras mécaniques
        graphics.fillStyle(0x808080, 1);
        graphics.fillRect(-16, -2, 4, 12);
        graphics.fillRect(12, -2, 4, 12);

        // Mains/pinces
        graphics.fillStyle(0x696969, 1);
        graphics.fillRect(-18, 10, 8, 4);
        graphics.fillRect(10, 10, 8, 4);

        // Détails mécaniques
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(-6, 0, 2);
        graphics.fillCircle(6, 0, 2);
        graphics.fillCircle(0, 8, 2);

        const texture = graphics.generateTexture('enemy_robot', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createDrone(scene) {
        const graphics = scene.add.graphics();

        // Corps central du drone
        graphics.fillStyle(0x2F4F4F, 1);
        graphics.fillCircle(0, 0, 12);

        // Caméra/œil rouge
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, 0, 6);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, 0, 3);

        // Hélices (4 bras)
        graphics.fillStyle(0x696969, 1);
        const armLength = 16;

        // Bras diagonaux
        for (let i = 0; i < 4; i++) {
            const angle = (Math.PI / 4) + (i * Math.PI / 2);
            const x = Math.cos(angle) * armLength;
            const y = Math.sin(angle) * armLength;

            graphics.lineStyle(3, 0x696969, 1);
            graphics.beginPath();
            graphics.moveTo(0, 0);
            graphics.lineTo(x, y);
            graphics.strokePath();

            // Hélices rotatives
            graphics.fillStyle(0x87CEEB, 0.5);
            graphics.fillCircle(x, y, 6);
        }

        // LED clignotante
        graphics.fillStyle(0x00FF00, 0.8);
        graphics.fillCircle(0, -4, 2);

        const texture = graphics.generateTexture('enemy_drone', 60, 60);
        graphics.destroy();
        return texture;
    }

    // MONDE 6 - CHÂTEAU DU CHAOS

    static createGuardian(scene) {
        const graphics = scene.add.graphics();

        // Corps de gardien spectral violet
        graphics.fillStyle(0x8B008B, 0.8);
        graphics.fillEllipse(0, 4, 26, 32);

        // Effet fantomatique ondulant
        graphics.fillStyle(0x9370DB, 0.6);
        graphics.beginPath();
        graphics.moveTo(-13, 20);
        graphics.quadraticCurveTo(-15, 26, -10, 32);
        graphics.quadraticCurveTo(-5, 28, 0, 32);
        graphics.quadraticCurveTo(5, 28, 10, 32);
        graphics.quadraticCurveTo(15, 26, 13, 20);
        graphics.closePath();
        graphics.fillPath();

        // Capuche sombre
        graphics.fillStyle(0x4B0082, 1);
        graphics.fillCircle(0, -10, 16);

        // Visage caché (yeux brillants uniquement)
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-6, -10, 4);
        graphics.fillCircle(6, -10, 4);

        graphics.fillStyle(0xFFFF00, 0.8);
        graphics.fillCircle(-6, -10, 2);
        graphics.fillCircle(6, -10, 2);

        // Bras spectraux
        graphics.fillStyle(0x8B008B, 0.7);
        graphics.fillEllipse(-14, 4, 8, 20);
        graphics.fillEllipse(14, 4, 8, 20);

        // Symbole du chaos sur la poitrine
        graphics.lineStyle(2, 0xFF0000, 1);
        graphics.beginPath();
        graphics.arc(0, 4, 6, 0, Math.PI * 2);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(-6, 4);
        graphics.lineTo(6, 4);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(0, -2);
        graphics.lineTo(0, 10);
        graphics.strokePath();

        const texture = graphics.generateTexture('enemy_guardian', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createKnight(scene) {
        const graphics = scene.add.graphics();

        // Corps d'armure noire
        graphics.fillStyle(0x2F4F4F, 1);
        graphics.fillRect(-10, 0, 20, 24);

        // Casque
        graphics.fillStyle(0x36454F, 1);
        graphics.fillRect(-12, -16, 24, 16);

        // Visière rouge (hostile)
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-10, -12, 20, 4);

        // Cornes du casque
        graphics.fillStyle(0x8B0000, 1);
        graphics.beginPath();
        graphics.moveTo(-12, -16);
        graphics.lineTo(-16, -22);
        graphics.lineTo(-10, -18);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(12, -16);
        graphics.lineTo(16, -22);
        graphics.lineTo(10, -18);
        graphics.closePath();
        graphics.fillPath();

        // Épée (à droite)
        graphics.fillStyle(0xC0C0C0, 1);
        graphics.fillRect(12, -4, 4, 20);

        // Lame
        graphics.fillRect(13, -20, 2, 16);

        // Garde
        graphics.fillRect(10, -4, 8, 2);

        // Bouclier (à gauche)
        graphics.fillStyle(0x8B0000, 1);
        graphics.beginPath();
        graphics.moveTo(-16, 0);
        graphics.lineTo(-20, 8);
        graphics.lineTo(-16, 16);
        graphics.lineTo(-12, 8);
        graphics.closePath();
        graphics.fillPath();

        // Symbole sur bouclier
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(-16, 8, 3);

        // Jambes d'armure
        graphics.fillStyle(0x2F4F4F, 1);
        graphics.fillRect(-8, 24, 6, 8);
        graphics.fillRect(2, 24, 6, 8);

        const texture = graphics.generateTexture('enemy_knight', 60, 60);
        graphics.destroy();
        return texture;
    }

    // Générer tous les sprites d'ennemis
    static generateAllEnemySprites(scene) {
        const sprites = {
            // Monde 1 - Forêt
            mole: this.createMole(scene),
            bird: this.createBird(scene),

            // Monde 2 - Désert
            beetle: this.createBeetle(scene),
            snake: this.createSnake(scene),

            // Monde 3 - Océan
            fish: this.createFish(scene),
            crab: this.createCrab(scene),
            jellyfish: this.createJellyfish(scene),

            // Monde 4 - Glace
            penguin: this.createPenguin(scene),
            stalactite: this.createStalactite(scene),

            // Monde 5 - Ville
            robot: this.createRobot(scene),
            drone: this.createDrone(scene),

            // Monde 6 - Château
            guardian: this.createGuardian(scene),
            knight: this.createKnight(scene)
        };

        console.log('✅ Tous les sprites d\'ennemis générés!');
        return sprites;
    }
}
