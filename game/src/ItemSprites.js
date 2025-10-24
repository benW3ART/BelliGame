// Système de génération de sprites pour les items et power-ups

export class ItemSprites {
    // PIÈCE ANIMÉE
    static createCoin(scene) {
        const graphics = scene.add.graphics();

        // Pièce dorée
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(0, 0, 14);

        // Reflet brillant
        graphics.fillStyle(0xFFFACD, 1);
        graphics.fillCircle(-4, -4, 6);

        // Contour
        graphics.lineStyle(2, 0xDAA520, 1);
        graphics.strokeCircle(0, 0, 14);

        // Symbole $ ou motif
        graphics.fillStyle(0xDAA520, 1);
        graphics.fillRect(-2, -8, 4, 16);
        graphics.fillRect(-6, -6, 12, 3);
        graphics.fillRect(-6, 3, 12, 3);

        const texture = graphics.generateTexture('item_coin', 32, 32);
        graphics.destroy();
        return texture;
    }

    // CHAMPIGNON GÉANT
    static createMushroom(scene) {
        const graphics = scene.add.graphics();

        // Tige blanche
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-6, 4, 12, 16);

        // Chapeau rouge avec points blancs
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, 0, 16);

        // Points blancs
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -2, 4);
        graphics.fillCircle(0, -6, 5);
        graphics.fillCircle(8, -2, 4);
        graphics.fillCircle(-4, 4, 3);
        graphics.fillCircle(5, 3, 3);

        // Contour du chapeau
        graphics.lineStyle(2, 0x8B0000, 1);
        graphics.strokeCircle(0, 0, 16);

        // Base de la tige
        graphics.fillStyle(0xF5F5DC, 1);
        graphics.fillRect(-7, 18, 14, 3);

        const texture = graphics.generateTexture('item_mushroom', 40, 40);
        graphics.destroy();
        return texture;
    }

    // ÉTOILE D'INVINCIBILITÉ
    static createStar(scene) {
        const graphics = scene.add.graphics();

        // Étoile jaune brillante à 5 branches
        graphics.fillStyle(0xFFFF00, 1);

        const points = [];
        const outerRadius = 16;
        const innerRadius = 7;

        for (let i = 0; i < 10; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (i * Math.PI) / 5 - Math.PI / 2;
            points.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius
            });
        }

        graphics.beginPath();
        graphics.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            graphics.lineTo(points[i].x, points[i].y);
        }
        graphics.closePath();
        graphics.fillPath();

        // Contour orange
        graphics.lineStyle(2, 0xFFA500, 1);
        graphics.strokePath();

        // Centre brillant
        graphics.fillStyle(0xFFFFFF, 0.8);
        graphics.fillCircle(0, 0, 5);

        const texture = graphics.generateTexture('item_star', 40, 40);
        graphics.destroy();
        return texture;
    }

    // BOULE DE FEU
    static createFireball(scene) {
        const graphics = scene.add.graphics();

        // Flamme rouge-orange
        graphics.fillStyle(0xFF4500, 1);
        graphics.fillCircle(0, 0, 14);

        // Cœur jaune
        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillCircle(0, 0, 9);

        // Centre blanc brillant
        graphics.fillStyle(0xFFFFFF, 0.8);
        graphics.fillCircle(-2, -2, 4);

        // Flammes stylisées autour
        graphics.fillStyle(0xFF8C00, 0.7);
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            const x = Math.cos(angle) * 12;
            const y = Math.sin(angle) * 12;

            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + Math.cos(angle) * 6, y + Math.sin(angle) * 6);
            graphics.lineTo(x + Math.cos(angle + 0.5) * 4, y + Math.sin(angle + 0.5) * 4);
            graphics.closePath();
            graphics.fillPath();
        }

        const texture = graphics.generateTexture('item_fireball', 40, 40);
        graphics.destroy();
        return texture;
    }

    // RAYON LASER
    static createLaser(scene) {
        const graphics = scene.add.graphics();

        // Base technologique
        graphics.fillStyle(0x4169E1, 1);
        graphics.fillRect(-12, -8, 24, 16);

        // Éclair électrique
        graphics.fillStyle(0x00FFFF, 1);
        graphics.beginPath();
        graphics.moveTo(-8, -6);
        graphics.lineTo(-2, 0);
        graphics.lineTo(-4, 0);
        graphics.lineTo(2, 6);
        graphics.lineTo(8, -2);
        graphics.lineTo(4, -2);
        graphics.lineTo(6, -6);
        graphics.closePath();
        graphics.fillPath();

        // Effet lumineux
        graphics.fillStyle(0xFFFFFF, 0.6);
        graphics.fillCircle(-4, -3, 3);
        graphics.fillCircle(2, 2, 3);

        // Contour
        graphics.lineStyle(2, 0x1E90FF, 1);
        graphics.strokeRect(-12, -8, 24, 16);

        const texture = graphics.generateTexture('item_laser', 40, 40);
        graphics.destroy();
        return texture;
    }

    // BOUCLIER
    static createShield(scene) {
        const graphics = scene.add.graphics();

        // Bouclier bleu métallique
        graphics.fillStyle(0x4169E1, 1);

        // Forme de bouclier classique
        graphics.beginPath();
        graphics.moveTo(0, -16);
        graphics.lineTo(-12, -8);
        graphics.lineTo(-12, 8);
        graphics.lineTo(0, 16);
        graphics.lineTo(12, 8);
        graphics.lineTo(12, -8);
        graphics.closePath();
        graphics.fillPath();

        // Reflet métallique
        graphics.fillStyle(0x87CEEB, 0.6);
        graphics.beginPath();
        graphics.moveTo(-6, -12);
        graphics.lineTo(-10, -6);
        graphics.lineTo(-8, 2);
        graphics.lineTo(-4, -8);
        graphics.closePath();
        graphics.fillPath();

        // Croix centrale
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-2, -8, 4, 16);
        graphics.fillRect(-8, -2, 16, 4);

        // Contour
        graphics.lineStyle(2, 0x1E90FF, 1);
        graphics.beginPath();
        graphics.moveTo(0, -16);
        graphics.lineTo(-12, -8);
        graphics.lineTo(-12, 8);
        graphics.lineTo(0, 16);
        graphics.lineTo(12, 8);
        graphics.lineTo(12, -8);
        graphics.closePath();
        graphics.strokePath();

        const texture = graphics.generateTexture('item_shield', 40, 40);
        graphics.destroy();
        return texture;
    }

    // AIMANT
    static createMagnet(scene) {
        const graphics = scene.add.graphics();

        // Forme d'aimant en U
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-14, -12, 8, 20);

        graphics.fillStyle(0x0000FF, 1);
        graphics.fillRect(6, -12, 8, 20);

        // Base horizontale
        graphics.fillStyle(0xC0C0C0, 1);
        graphics.fillRect(-14, 8, 28, 6);

        // Lignes de force magnétique
        graphics.lineStyle(2, 0xFF00FF, 0.6);

        for (let i = 0; i < 3; i++) {
            const offset = (i - 1) * 6;

            // Lignes courbes
            graphics.beginPath();
            graphics.arc(-10, -2, 8 + i * 4, -Math.PI, 0);
            graphics.strokePath();

            graphics.beginPath();
            graphics.arc(10, -2, 8 + i * 4, Math.PI, 0);
            graphics.strokePath();
        }

        // Symboles + et -
        graphics.fillStyle(0xFFFFFF, 1);

        // + sur rouge
        graphics.fillRect(-12, -5, 4, 1);
        graphics.fillRect(-10, -7, 1, 4);

        // - sur bleu
        graphics.fillRect(8, -5, 4, 1);

        const texture = graphics.generateTexture('item_magnet', 40, 40);
        graphics.destroy();
        return texture;
    }

    // HORLOGE (Ralentissement)
    static createClock(scene) {
        const graphics = scene.add.graphics();

        // Cadran de l'horloge
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, 0, 16);

        // Contour doré
        graphics.lineStyle(3, 0xFFD700, 1);
        graphics.strokeCircle(0, 0, 16);

        // Marques des heures
        graphics.fillStyle(0x000000, 1);
        for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI * 2) / 12 - Math.PI / 2;
            const x = Math.cos(angle) * 12;
            const y = Math.sin(angle) * 12;
            graphics.fillCircle(x, y, 1.5);
        }

        // Aiguilles
        graphics.lineStyle(2, 0x000000, 1);

        // Aiguille des heures
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(0, -6);
        graphics.strokePath();

        // Aiguille des minutes
        graphics.lineStyle(1.5, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(8, 0);
        graphics.strokePath();

        // Centre
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, 0, 2);

        const texture = graphics.generateTexture('item_clock', 40, 40);
        graphics.destroy();
        return texture;
    }

    // VIE SUPPLÉMENTAIRE (Coeur)
    static createHeart(scene) {
        const graphics = scene.add.graphics();

        // Cœur rouge
        graphics.fillStyle(0xFF1493, 1);

        // Forme de cœur avec deux cercles et un triangle
        graphics.fillCircle(-6, -4, 8);
        graphics.fillCircle(6, -4, 8);

        graphics.beginPath();
        graphics.moveTo(-12, -2);
        graphics.lineTo(0, 12);
        graphics.lineTo(12, -2);
        graphics.arc(6, -4, 8, 0.3, Math.PI - 0.3, true);
        graphics.arc(-6, -4, 8, 0.3, Math.PI - 0.3, false);
        graphics.closePath();
        graphics.fillPath();

        // Reflet brillant
        graphics.fillStyle(0xFFFFFF, 0.6);
        graphics.fillCircle(-4, -6, 4);

        // Contour
        graphics.lineStyle(2, 0xC71585, 1);
        graphics.strokePath();

        const texture = graphics.generateTexture('item_heart', 32, 32);
        graphics.destroy();
        return texture;
    }

    // CHECKPOINT FLAG
    static createCheckpointFlag(scene) {
        const graphics = scene.add.graphics();

        // Mât
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillRect(-2, -40, 4, 60);

        // Drapeau à damier
        const squareSize = 8;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                const isWhite = (row + col) % 2 === 0;
                graphics.fillStyle(isWhite ? 0xFFFFFF : 0x000000, 1);
                graphics.fillRect(
                    2 + col * squareSize,
                    -40 + row * squareSize,
                    squareSize,
                    squareSize
                );
            }
        }

        // Effet de vent
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(2, -40);
        graphics.quadraticCurveTo(26, -36, 34, -40);
        graphics.lineTo(34, -16);
        graphics.quadraticCurveTo(26, -12, 2, -16);
        graphics.closePath();
        graphics.strokePath();

        const texture = graphics.generateTexture('item_checkpoint', 60, 80);
        graphics.destroy();
        return texture;
    }

    // FINISH FLAG
    static createFinishFlag(scene) {
        const graphics = scene.add.graphics();

        // Mât doré
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(-3, -50, 6, 70);

        // Drapeau à damier noir et blanc (plus grand)
        const squareSize = 10;
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                const isBlack = (row + col) % 2 === 0;
                graphics.fillStyle(isBlack ? 0x000000 : 0xFFFFFF, 1);
                graphics.fillRect(
                    3 + col * squareSize,
                    -50 + row * squareSize,
                    squareSize,
                    squareSize
                );
            }
        }

        // Contour du drapeau
        graphics.lineStyle(3, 0x000000, 1);
        graphics.strokeRect(3, -50, 40, 40);

        // Boule dorée en haut
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(0, -52, 6);

        // Effet brillant
        graphics.fillStyle(0xFFFFFF, 0.6);
        graphics.fillCircle(-2, -54, 3);

        const texture = graphics.generateTexture('item_finish', 60, 80);
        graphics.destroy();
        return texture;
    }

    // Générer tous les sprites d'items
    static generateAllItemSprites(scene) {
        const sprites = {
            coin: this.createCoin(scene),
            mushroom: this.createMushroom(scene),
            star: this.createStar(scene),
            fireball: this.createFireball(scene),
            laser: this.createLaser(scene),
            shield: this.createShield(scene),
            magnet: this.createMagnet(scene),
            clock: this.createClock(scene),
            heart: this.createHeart(scene),
            checkpoint: this.createCheckpointFlag(scene),
            finish: this.createFinishFlag(scene)
        };

        console.log('✅ Tous les sprites d\'items générés!');
        return sprites;
    }
}
