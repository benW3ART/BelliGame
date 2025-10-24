// Système de génération de sprites améliorés pour les personnages
// Sprites procéduraux avec plus de détails, ombres et couleurs

export class CharacterSprites {
    static createSonic(scene) {
        const graphics = scene.add.graphics();

        // Corps bleu avec ombre
        graphics.fillStyle(0x0044AA, 1);
        graphics.fillCircle(0, 2, 26);
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillCircle(0, 0, 25);

        // Ventre beige avec ombre
        graphics.fillStyle(0xF5D7A1, 1);
        graphics.fillEllipse(0, 6, 16, 20);
        graphics.fillStyle(0xFFE4B5, 1);
        graphics.fillEllipse(0, 5, 16, 20);

        // Épines dorsales avec volume
        const spikes = [
            { x: -22, y: -12, angle: -30 },
            { x: -17, y: -16, angle: -20 },
            { x: -8, y: -19, angle: -10 }
        ];

        spikes.forEach(spike => {
            // Ombre de l'épine
            graphics.fillStyle(0x0044CC, 1);
            graphics.beginPath();
            graphics.moveTo(spike.x, spike.y);
            graphics.lineTo(spike.x - 12, spike.y - 14);
            graphics.lineTo(spike.x + 8, spike.y - 4);
            graphics.closePath();
            graphics.fillPath();

            // Épine principale
            graphics.fillStyle(0x0066FF, 1);
            graphics.beginPath();
            graphics.moveTo(spike.x, spike.y);
            graphics.lineTo(spike.x - 10, spike.y - 12);
            graphics.lineTo(spike.x + 6, spike.y - 3);
            graphics.closePath();
            graphics.fillPath();
        });

        // Contour noir pour tout le corps
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeCircle(0, 0, 25);

        // Yeux blancs connectés
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -6, 14, 16);
        graphics.fillEllipse(6, -6, 14, 16);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeEllipse(-6, -6, 14, 16);
        graphics.strokeEllipse(6, -6, 14, 16);

        // Pupilles noires avec reflets
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, -4, 6);
        graphics.fillCircle(6, -4, 6);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -6, 2.5);
        graphics.fillCircle(4, -6, 2.5);

        // Nez noir brillant
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, 3, 4);
        graphics.fillStyle(0x333333, 1);
        graphics.fillCircle(-1, 2, 1.5);

        // Sourire
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 4, 9, 0.3, Math.PI - 0.3);
        graphics.strokePath();

        // Chaussures rouges avec détails
        graphics.fillStyle(0xBB0000, 1);
        graphics.fillEllipse(-9, 24, 12, 9);
        graphics.fillEllipse(9, 24, 12, 9);
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillEllipse(-9, 23, 12, 9);
        graphics.fillEllipse(9, 23, 12, 9);

        // Bande blanche épaisse
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-14, 21, 10, 4);
        graphics.fillRect(4, 21, 10, 4);

        // Contours chaussures
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeEllipse(-9, 23, 12, 9);
        graphics.strokeEllipse(9, 23, 12, 9);

        const texture = graphics.generateTexture('sonic', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createMario(scene) {
        const graphics = scene.add.graphics();

        // Casquette rouge avec volume
        graphics.fillStyle(0xCC0000, 1);
        graphics.fillCircle(0, -8, 18);
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, -10, 18);

        // Visière de la casquette
        graphics.fillStyle(0xAA0000, 1);
        graphics.fillRect(-18, -3, 36, 6);
        graphics.fillStyle(0xCC0000, 1);
        graphics.fillRect(-18, -4, 36, 6);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(-18, -4, 36, 6);

        // Logo M sur casquette
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, -10, 6);
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(-2, -12);
        graphics.lineTo(-2, -8);
        graphics.lineTo(0, -10);
        graphics.lineTo(2, -8);
        graphics.lineTo(2, -12);
        graphics.fillPath();

        // Visage avec ombre
        graphics.fillStyle(0xFFCC99, 1);
        graphics.fillCircle(0, 4, 18);
        graphics.fillStyle(0xFFDDAAA, 1);
        graphics.fillCircle(0, 3, 17);

        // Cheveux sous la casquette
        graphics.fillStyle(0x4B3621, 1);
        graphics.fillRect(-16, -2, 8, 4);
        graphics.fillRect(8, -2, 8, 4);

        // Yeux
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, 0, 5);
        graphics.fillCircle(6, 0, 5);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -1, 2);
        graphics.fillCircle(5, -1, 2);

        // Grosse moustache noire
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-15, 8);
        graphics.quadraticCurveTo(-8, 6, 0, 8);
        graphics.quadraticCurveTo(8, 6, 15, 8);
        graphics.lineTo(12, 12);
        graphics.quadraticCurveTo(0, 10, -12, 12);
        graphics.closePath();
        graphics.fillPath();

        // Nez rond
        graphics.fillStyle(0xFFBB88, 1);
        graphics.fillCircle(0, 6, 6);
        graphics.fillStyle(0xFFCC99, 1);
        graphics.fillCircle(0, 5, 6);

        // Salopette bleue
        graphics.fillStyle(0x0033AA, 1);
        graphics.fillRect(-14, 18, 28, 14);
        graphics.fillStyle(0x0044CC, 1);
        graphics.fillRect(-14, 16, 28, 14);

        // Bretelles
        graphics.fillStyle(0x0044CC, 1);
        graphics.fillRect(-10, 8, 5, 10);
        graphics.fillRect(5, 8, 5, 10);

        // Boutons jaunes
        graphics.fillStyle(0xFFDD00, 1);
        graphics.fillCircle(-7, 12, 3);
        graphics.fillCircle(7, 12, 3);
        graphics.lineStyle(1, 0x000000, 1);
        graphics.strokeCircle(-7, 12, 3);
        graphics.strokeCircle(7, 12, 3);

        // Chemise rouge sous la salopette
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-14, 14, 28, 6);

        // Gants blancs
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-20, 20, 6);
        graphics.fillCircle(20, 20, 6);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeCircle(-20, 20, 6);
        graphics.strokeCircle(20, 20, 6);

        // Chaussures marron
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillEllipse(-8, 32, 10, 7);
        graphics.fillEllipse(8, 32, 10, 7);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeEllipse(-8, 32, 10, 7);
        graphics.strokeEllipse(8, 32, 10, 7);

        const texture = graphics.generateTexture('mario', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createLuigi(scene) {
        const graphics = scene.add.graphics();

        // Même structure que Mario mais en vert
        // Casquette verte
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillCircle(0, -8, 18);
        graphics.fillStyle(0x00CC00, 1);
        graphics.fillCircle(0, -10, 18);

        graphics.fillStyle(0x008800, 1);
        graphics.fillRect(-18, -3, 36, 6);
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillRect(-18, -4, 36, 6);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(-18, -4, 36, 6);

        // Logo L
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, -10, 6);
        graphics.fillStyle(0x00CC00, 1);
        graphics.fillRect(-2, -14, 3, 8);
        graphics.fillRect(-2, -7, 4, 3);

        // Visage (un peu plus pâle que Mario)
        graphics.fillStyle(0xFFDDB8, 1);
        graphics.fillCircle(0, 3, 17);

        // Cheveux
        graphics.fillStyle(0x3B2611, 1);
        graphics.fillRect(-16, -2, 8, 4);
        graphics.fillRect(8, -2, 8, 4);

        // Yeux
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, 0, 5);
        graphics.fillCircle(6, 0, 5);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -1, 2);
        graphics.fillCircle(5, -1, 2);

        // Moustache (un peu plus fine que Mario)
        graphics.fillStyle(0x2B1B01, 1);
        graphics.beginPath();
        graphics.moveTo(-14, 8);
        graphics.quadraticCurveTo(-7, 6, 0, 8);
        graphics.quadraticCurveTo(7, 6, 14, 8);
        graphics.lineTo(11, 11);
        graphics.quadraticCurveTo(0, 9, -11, 11);
        graphics.closePath();
        graphics.fillPath();

        // Nez
        graphics.fillStyle(0xFFCC99, 1);
        graphics.fillCircle(0, 5, 6);

        // Salopette bleue (identique)
        graphics.fillStyle(0x0044CC, 1);
        graphics.fillRect(-14, 16, 28, 14);
        graphics.fillRect(-10, 8, 5, 10);
        graphics.fillRect(5, 8, 5, 10);

        graphics.fillStyle(0xFFDD00, 1);
        graphics.fillCircle(-7, 12, 3);
        graphics.fillCircle(7, 12, 3);

        // Chemise verte
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillRect(-14, 14, 28, 6);

        // Gants blancs
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-20, 20, 6);
        graphics.fillCircle(20, 20, 6);

        // Chaussures marron
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillEllipse(-8, 32, 10, 7);
        graphics.fillEllipse(8, 32, 10, 7);

        const texture = graphics.generateTexture('luigi', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createShadow(scene) {
        const graphics = scene.add.graphics();

        // Version sombre de Sonic avec rayures rouges
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, 0, 25);

        // Ventre gris
        graphics.fillStyle(0xAAAAAA, 1);
        graphics.fillEllipse(0, 5, 16, 20);

        // Épines avec rayures rouges
        const spikes = [
            { x: -22, y: -12 },
            { x: -17, y: -16 },
            { x: -8, y: -19 }
        ];

        spikes.forEach(spike => {
            graphics.fillStyle(0x000000, 1);
            graphics.beginPath();
            graphics.moveTo(spike.x, spike.y);
            graphics.lineTo(spike.x - 10, spike.y - 12);
            graphics.lineTo(spike.x + 6, spike.y - 3);
            graphics.closePath();
            graphics.fillPath();

            // Rayure rouge
            graphics.fillStyle(0xCC0000, 1);
            graphics.beginPath();
            graphics.moveTo(spike.x - 3, spike.y - 3);
            graphics.lineTo(spike.x - 6, spike.y - 7);
            graphics.lineTo(spike.x - 2, spike.y - 5);
            graphics.closePath();
            graphics.fillPath();
        });

        // Yeux rouges intenses
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -6, 14, 16);
        graphics.fillEllipse(6, -6, 14, 16);

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-6, -4, 6);
        graphics.fillCircle(6, -4, 6);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -6, 2);
        graphics.fillCircle(4, -6, 2);

        // Chaussures avec fusée rouge
        graphics.fillStyle(0x000000, 1);
        graphics.fillEllipse(-9, 23, 12, 9);
        graphics.fillEllipse(9, 23, 12, 9);

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-13, 21, 8, 4);
        graphics.fillRect(5, 21, 8, 4);

        const texture = graphics.generateTexture('shadow', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createKnuckles(scene) {
        const graphics = scene.add.graphics();

        // Corps rouge musclé
        graphics.fillStyle(0xCC0000, 1);
        graphics.fillCircle(0, 0, 26);
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, 0, 25);

        // Ventre blanc
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-12, -5, 24, 20);

        // Dreadlocks rouges
        graphics.fillStyle(0xCC0000, 1);
        for (let i = 0; i < 3; i++) {
            graphics.fillRect(-16 + i * 8, -15, 6, 25);
        }

        // Yeux violets
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -6, 12, 14);
        graphics.fillEllipse(6, -6, 12, 14);

        graphics.fillStyle(0x9900CC, 1);
        graphics.fillCircle(-6, -4, 5);
        graphics.fillCircle(6, -4, 5);

        // Gants à pointes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-22, 18, 8);
        graphics.fillCircle(22, 18, 8);

        graphics.fillStyle(0xAAAAAA, 1);
        // Pointes sur les gants
        graphics.fillRect(-26, 16, 3, 8);
        graphics.fillRect(-22, 14, 3, 8);
        graphics.fillRect(-18, 16, 3, 8);
        graphics.fillRect(18, 16, 3, 8);
        graphics.fillRect(22, 14, 3, 8);
        graphics.fillRect(26, 16, 3, 8);

        // Chaussures vertes
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillEllipse(-9, 30, 12, 9);
        graphics.fillEllipse(9, 30, 12, 9);

        const texture = graphics.generateTexture('knuckles', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createKwazii(scene) {
        const graphics = scene.add.graphics();

        // Chat orange
        graphics.fillStyle(0xFF8800, 1);
        graphics.fillCircle(0, 0, 24);

        // Ventre clair
        graphics.fillStyle(0xFFCC99, 1);
        graphics.fillEllipse(0, 5, 16, 20);

        // Oreilles de chat
        graphics.fillStyle(0xFF8800, 1);
        graphics.beginPath();
        graphics.moveTo(-18, -18);
        graphics.lineTo(-25, -28);
        graphics.lineTo(-12, -20);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(18, -18);
        graphics.lineTo(25, -28);
        graphics.lineTo(12, -20);
        graphics.closePath();
        graphics.fillPath();

        // Intérieur oreilles rose
        graphics.fillStyle(0xFFBBCC, 1);
        graphics.beginPath();
        graphics.moveTo(-18, -18);
        graphics.lineTo(-22, -24);
        graphics.lineTo(-15, -19);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(18, -18);
        graphics.lineTo(22, -24);
        graphics.lineTo(15, -19);
        graphics.closePath();
        graphics.fillPath();

        // Gros yeux de chat
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -4, 8);
        graphics.fillCircle(7, -4, 8);

        graphics.fillStyle(0x00AA00, 1);
        graphics.fillEllipse(-7, -4, 3, 8);
        graphics.fillEllipse(7, -4, 3, 8);

        // Museau
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, 5, 8);

        graphics.fillStyle(0xFFAAAA, 1);
        graphics.fillCircle(0, 4, 3);

        // Bandana de pirate
        graphics.fillStyle(0x0044AA, 1);
        graphics.fillRect(-24, -12, 48, 6);
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillRect(-22, -12, 44, 5);

        // Uniform Octonauts orange
        graphics.fillStyle(0xFF6600, 1);
        graphics.fillRect(-16, 16, 32, 16);

        const texture = graphics.generateTexture('kwazii', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createBarnacle(scene) {
        const graphics = scene.add.graphics();

        // Ours polaire blanc
        graphics.fillStyle(0xEEEEFF, 1);
        graphics.fillCircle(0, 0, 26);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, 0, 25);

        // Oreilles rondes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-20, -15, 10);
        graphics.fillCircle(20, -15, 10);

        graphics.fillStyle(0xFFDDDD, 1);
        graphics.fillCircle(-20, -15, 6);
        graphics.fillCircle(20, -15, 6);

        // Yeux
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-7, -4, 4);
        graphics.fillCircle(7, -4, 4);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -5, 1.5);
        graphics.fillCircle(6, -5, 1.5);

        // Museau
        graphics.fillStyle(0x333333, 1);
        graphics.fillCircle(0, 6, 5);

        // Uniform Octonauts bleu
        graphics.fillStyle(0x0044AA, 1);
        graphics.fillRect(-18, 18, 36, 16);
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillRect(-18, 16, 36, 14);

        // Badge de capitaine
        graphics.fillStyle(0xFFDD00, 1);
        graphics.fillCircle(0, 24, 5);
        graphics.fillStyle(0xFF8800, 1);
        graphics.beginPath();
        graphics.moveTo(0, 20);
        graphics.lineTo(-3, 26);
        graphics.lineTo(0, 24);
        graphics.lineTo(3, 26);
        graphics.closePath();
        graphics.fillPath();

        const texture = graphics.generateTexture('barnacle', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createKai(scene) {
        const graphics = scene.add.graphics();

        // Ninja rouge
        graphics.fillStyle(0xCC0000, 1);
        graphics.fillCircle(0, 0, 24);
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, 0, 23);

        // Masque ninja avec yeux visibles
        graphics.fillStyle(0xAA0000, 1);
        graphics.fillRect(-22, -10, 44, 14);

        // Fente pour les yeux
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(-16, -6, 10, 5);
        graphics.fillRect(6, -6, 10, 5);

        // Yeux brillants
        graphics.fillStyle(0x00FFFF, 1);
        graphics.fillRect(-14, -5, 6, 3);
        graphics.fillRect(8, -5, 6, 3);

        // Kanji du feu sur le front
        graphics.fillStyle(0xFFDD00, 1);
        graphics.fillRect(-2, -14, 4, 6);
        graphics.fillRect(-4, -12, 8, 2);

        // Tenue de ninja avec armure
        graphics.fillStyle(0x660000, 1);
        graphics.fillRect(-18, 16, 36, 16);

        // Plastron doré
        graphics.fillStyle(0xCC9900, 1);
        graphics.fillRect(-14, 18, 28, 10);
        graphics.fillStyle(0xFFBB00, 1);
        graphics.fillRect(-13, 18, 26, 9);

        const texture = graphics.generateTexture('kai', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createLloyd(scene) {
        const graphics = scene.add.graphics();

        // Ninja vert avec dragon doré
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillCircle(0, 0, 24);
        graphics.fillStyle(0x00CC00, 1);
        graphics.fillCircle(0, 0, 23);

        // Masque ninja
        graphics.fillStyle(0x008800, 1);
        graphics.fillRect(-22, -10, 44, 14);

        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(-16, -6, 10, 5);
        graphics.fillRect(6, -6, 10, 5);

        // Yeux verts énergétiques
        graphics.fillStyle(0x00FF00, 1);
        graphics.fillRect(-14, -5, 6, 3);
        graphics.fillRect(8, -5, 6, 3);

        // Symbole dragon d'or
        graphics.fillStyle(0xFFDD00, 1);
        graphics.fillCircle(0, -12, 5);
        graphics.beginPath();
        graphics.moveTo(0, -12);
        graphics.lineTo(-4, -8);
        graphics.lineTo(4, -8);
        graphics.closePath();
        graphics.fillPath();

        // Tenue de ninja vert
        graphics.fillStyle(0x006600, 1);
        graphics.fillRect(-18, 16, 36, 16);

        // Plastron doré du dragon
        graphics.fillStyle(0xFFBB00, 1);
        graphics.fillRect(-13, 18, 26, 9);

        const texture = graphics.generateTexture('lloyd', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createSpongeBob(scene) {
        const graphics = scene.add.graphics();

        // Éponge carrée jaune avec texture
        graphics.fillStyle(0xF0D000, 1);
        graphics.fillRect(-18, -18, 36, 36);
        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillRect(-17, -17, 34, 34);

        // Pores d'éponge (texture)
        graphics.fillStyle(0xEEDD00, 1);
        for (let i = 0; i < 12; i++) {
            const x = -14 + (i % 4) * 10;
            const y = -14 + Math.floor(i / 4) * 10;
            graphics.fillCircle(x, y, 2);
        }

        // Contours
        graphics.lineStyle(3, 0x000000, 1);
        graphics.strokeRect(-17, -17, 34, 34);

        // Chemise blanche avec cravate
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-16, 4, 32, 14);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(-16, 4, 32, 14);

        // Cravate rouge
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 6);
        graphics.lineTo(-4, 8);
        graphics.lineTo(-3, 16);
        graphics.lineTo(3, 16);
        graphics.lineTo(4, 8);
        graphics.closePath();
        graphics.fillPath();
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokePath();

        // Yeux énormes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-6, -6, 10);
        graphics.fillCircle(6, -6, 10);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeCircle(-6, -6, 10);
        graphics.strokeCircle(6, -6, 10);

        // Pupilles bleues
        graphics.fillStyle(0x0099FF, 1);
        graphics.fillCircle(-6, -4, 6);
        graphics.fillCircle(6, -4, 6);
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, -3, 4);
        graphics.fillCircle(6, -3, 4);

        // Reflets
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -6, 2);
        graphics.fillCircle(4, -6, 2);

        // Sourire géant
        graphics.lineStyle(3, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 2, 10, 0.2, Math.PI - 0.2);
        graphics.strokePath();

        // Dents proéminentes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-6, 4, 5, 8);
        graphics.fillRect(1, 4, 5, 8);
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(-6, 4, 5, 8);
        graphics.strokeRect(1, 4, 5, 8);

        // Pantalon marron
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillRect(-18, 18, 36, 14);

        const texture = graphics.generateTexture('spongebob', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createPatrick(scene) {
        const graphics = scene.add.graphics();

        // Corps rose en étoile de mer
        graphics.fillStyle(0xFFAACC, 1);
        graphics.fillCircle(0, 4, 20);
        graphics.fillStyle(0xFFBBDD, 1);
        graphics.fillCircle(0, 4, 19);

        // 5 branches d'étoile
        const branches = [
            {angle: -Math.PI/2, length: 20},
            {angle: -Math.PI/2 + (2*Math.PI)/5, length: 18},
            {angle: -Math.PI/2 + 2*(2*Math.PI)/5, length: 18},
            {angle: -Math.PI/2 + 3*(2*Math.PI)/5, length: 18},
            {angle: -Math.PI/2 + 4*(2*Math.PI)/5, length: 18}
        ];

        branches.forEach(branch => {
            const x = Math.cos(branch.angle) * branch.length;
            const y = 4 + Math.sin(branch.angle) * branch.length;
            graphics.fillStyle(0xFFBBDD, 1);
            graphics.fillCircle(x, y, 11);
            graphics.fillStyle(0xFFCCEE, 1);
            graphics.fillCircle(x, y, 10);
        });

        // Texture (points roses foncés)
        graphics.fillStyle(0xFF88AA, 1);
        const spots = [
            [-8, -6], [6, -4], [-10, 4], [8, 8],
            [0, 12], [-6, 16], [10, 14], [2, 0]
        ];
        spots.forEach(([x, y]) => {
            graphics.fillCircle(x, y, 2);
        });

        // Short vert avec motif fleurs
        graphics.fillStyle(0x228B22, 1);
        graphics.fillRect(-18, 16, 36, 14);
        graphics.fillStyle(0x32CD32, 1);
        graphics.fillRect(-17, 16, 34, 12);

        // Fleurs sur short
        graphics.fillStyle(0xFF00FF, 1);
        graphics.fillCircle(-8, 22, 3);
        graphics.fillCircle(8, 22, 3);
        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillCircle(-8, 22, 1.5);
        graphics.fillCircle(8, 22, 1.5);

        // Yeux décalés
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-6, -2, 8);
        graphics.fillCircle(8, -4, 8);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, -1, 5);
        graphics.fillCircle(8, -3, 5);

        // Bouche simple
        graphics.lineStyle(3, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 6, 6, 0.3, Math.PI - 0.3);
        graphics.strokePath();

        const texture = graphics.generateTexture('patrick', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createBlippi(scene) {
        const graphics = scene.add.graphics();

        // Visage
        graphics.fillStyle(0xFFCCAA, 1);
        graphics.fillCircle(0, 0, 22);
        graphics.fillStyle(0xFFDDCC, 1);
        graphics.fillCircle(0, 0, 21);

        // Cheveux châtains (coiffés)
        graphics.fillStyle(0x8B6914, 1);
        graphics.fillEllipse(0, -18, 24, 12);
        graphics.fillRect(-20, -18, 40, 10);

        // Casquette bleue Blippi
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillCircle(0, -12, 20);
        graphics.fillRect(-22, -8, 44, 6);

        // Logo sur la casquette
        graphics.fillStyle(0xFF6600, 1);
        graphics.fillCircle(0, -12, 6);
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-1, -15, 2, 6);

        // Yeux avec lunettes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, 0, 8);
        graphics.fillCircle(8, 0, 8);

        // Monture de lunettes
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeCircle(-8, 0, 8);
        graphics.strokeCircle(8, 0, 8);
        graphics.strokeRect(-10, -2, 4, 2); // pont

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-8, 1, 4);
        graphics.fillCircle(8, 1, 4);

        // Sourire enthousiaste
        graphics.lineStyle(3, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 4, 10, 0.2, Math.PI - 0.2);
        graphics.strokePath();

        // Noeud papillon orange
        graphics.fillStyle(0xFF6600, 1);
        graphics.beginPath();
        graphics.moveTo(-12, 16);
        graphics.lineTo(-18, 12);
        graphics.lineTo(-12, 8);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(12, 16);
        graphics.lineTo(18, 12);
        graphics.lineTo(12, 8);
        graphics.closePath();
        graphics.fillPath();

        graphics.fillCircle(0, 12, 3);

        // Chemise bleue
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillRect(-18, 18, 36, 14);

        const texture = graphics.generateTexture('blippi', 80, 80);
        graphics.destroy();
        return texture;
    }

    static generateAllSprites(scene) {
        const sprites = {
            sonic: this.createSonic(scene),
            shadow: this.createShadow(scene),
            knuckles: this.createKnuckles(scene),
            kwazii: this.createKwazii(scene),
            barnacle: this.createBarnacle(scene),
            kai: this.createKai(scene),
            lloyd: this.createLloyd(scene),
            spongebob: this.createSpongeBob(scene),
            patrick: this.createPatrick(scene),
            blippi: this.createBlippi(scene),
            mario: this.createMario(scene),
            luigi: this.createLuigi(scene)
        };

        console.log('✅ Tous les sprites de personnages générés (version améliorée)!');
        return sprites;
    }
}
