// Système de génération de sprites pour les personnages
// Chaque personnage a un style unique inspiré des originaux

export class CharacterSprites {
    static createSonic(scene) {
        const graphics = scene.add.graphics();
        const container = scene.add.container(0, 0);

        // Corps bleu (style hérisson rapide)
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillCircle(0, 0, 25); // Corps principal

        // Ventre beige
        graphics.fillStyle(0xFFE4B5, 1);
        graphics.fillEllipse(0, 5, 18, 22);

        // Épines dorsales (3 pointes stylisées)
        graphics.fillStyle(0x0044CC, 1);
        graphics.beginPath();
        graphics.moveTo(-20, -10);
        graphics.lineTo(-30, -20);
        graphics.lineTo(-15, -5);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(-15, -15);
        graphics.lineTo(-20, -28);
        graphics.lineTo(-10, -12);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(-5, -18);
        graphics.lineTo(-8, -30);
        graphics.lineTo(0, -15);
        graphics.closePath();
        graphics.fillPath();

        // Yeux (grands yeux connectés style cartoon)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-5, -5, 12, 14);
        graphics.fillEllipse(5, -5, 12, 14);

        // Pupilles vertes
        graphics.fillStyle(0x00FF00, 1);
        graphics.fillCircle(-5, -4, 5);
        graphics.fillCircle(5, -4, 5);

        // Reflets dans les yeux
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-6, -6, 2);
        graphics.fillCircle(4, -6, 2);

        // Nez noir
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, 3, 3);

        // Sourire
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 3, 8, 0.2, Math.PI - 0.2);
        graphics.strokePath();

        // Chaussures rouges (simplifiées)
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillEllipse(-8, 22, 10, 8);
        graphics.fillEllipse(8, 22, 10, 8);

        // Bande blanche sur chaussures
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-12, 20, 8, 3);
        graphics.fillRect(4, 20, 8, 3);

        const texture = graphics.generateTexture('sonic', 60, 60);
        graphics.destroy();

        return texture;
    }

    static createShadow(scene) {
        const graphics = scene.add.graphics();

        // Corps noir avec des reflets rouges
        graphics.fillStyle(0x1a1a1a, 1);
        graphics.fillCircle(0, 0, 25);

        // Ventre blanc/gris
        graphics.fillStyle(0xCCCCCC, 1);
        graphics.fillEllipse(0, 5, 18, 22);

        // Épines dorsales (style Shadow - plus pointues)
        graphics.fillStyle(0x000000, 1);
        for (let i = 0; i < 3; i++) {
            graphics.beginPath();
            graphics.moveTo(-20 + i * 8, -10 - i * 3);
            graphics.lineTo(-25 + i * 8, -25 - i * 2);
            graphics.lineTo(-15 + i * 8, -8 - i * 3);
            graphics.closePath();
            graphics.fillPath();
        }

        // Traits rouges (signature Shadow)
        graphics.lineStyle(2, 0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(-18, -5);
        graphics.lineTo(-10, -8);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(10, -5);
        graphics.lineTo(18, -8);
        graphics.strokePath();

        // Yeux rouges intenses
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-5, -5, 11, 13);
        graphics.fillEllipse(5, -5, 11, 13);

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-5, -4, 5);
        graphics.fillCircle(5, -4, 5);

        // Reflets
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-6, -6, 2);
        graphics.fillCircle(4, -6, 2);

        // Expression sérieuse
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-8, 8);
        graphics.lineTo(8, 8);
        graphics.strokePath();

        // Chaussures avec jets (style Shadow)
        graphics.fillStyle(0x8B0000, 1);
        graphics.fillEllipse(-8, 22, 11, 9);
        graphics.fillEllipse(8, 22, 11, 9);

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-12, 19, 8, 4);
        graphics.fillRect(4, 19, 8, 4);

        const texture = graphics.generateTexture('shadow', 60, 60);
        graphics.destroy();
        return texture;
    }

    static createKnuckles(scene) {
        const graphics = scene.add.graphics();

        // Corps rouge
        graphics.fillStyle(0xCC0000, 1);
        graphics.fillCircle(0, 0, 26);

        // Torse musclé blanc
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(0, 8, 16, 20);

        // Dreadlocks rouges (signature Knuckles)
        graphics.fillStyle(0xAA0000, 1);
        graphics.fillEllipse(-12, -8, 8, 20);
        graphics.fillEllipse(12, -8, 8, 20);
        graphics.fillEllipse(0, -10, 6, 16);

        // Yeux violets déterminés
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -4, 10, 11);
        graphics.fillEllipse(6, -4, 10, 11);

        graphics.fillStyle(0x800080, 1);
        graphics.fillCircle(-5, -3, 4);
        graphics.fillCircle(5, -3, 4);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-6, -5, 2);
        graphics.fillCircle(4, -5, 2);

        // Sourcils froncés
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-12, -8);
        graphics.lineTo(-4, -6);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(12, -8);
        graphics.lineTo(4, -6);
        graphics.strokePath();

        // Chaussures vertes et jaunes
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillEllipse(-9, 23, 12, 9);
        graphics.fillEllipse(9, 23, 12, 9);

        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillRect(-13, 21, 8, 3);
        graphics.fillRect(5, 21, 8, 3);

        // Gants avec pointes (signature)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-18, 5, 6, 8);
        graphics.fillEllipse(18, 5, 6, 8);

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-20, 3, 4, 2);
        graphics.fillRect(16, 3, 4, 2);

        const texture = graphics.generateTexture('knuckles', 70, 70);
        graphics.destroy();
        return texture;
    }

    static createKwazii(scene) {
        const graphics = scene.add.graphics();

        // Corps de chat orange (style pirate aventurier)
        graphics.fillStyle(0xFF8C00, 1);
        graphics.fillCircle(0, 0, 24);

        // Ventre crème
        graphics.fillStyle(0xFFE4C4, 1);
        graphics.fillEllipse(0, 6, 16, 20);

        // Oreilles de chat pointues
        graphics.fillStyle(0xFF8C00, 1);
        graphics.beginPath();
        graphics.moveTo(-18, -18);
        graphics.lineTo(-12, -28);
        graphics.lineTo(-8, -18);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(18, -18);
        graphics.lineTo(12, -28);
        graphics.lineTo(8, -18);
        graphics.closePath();
        graphics.fillPath();

        // Intérieur oreilles rose
        graphics.fillStyle(0xFFB6C1, 1);
        graphics.beginPath();
        graphics.moveTo(-16, -20);
        graphics.lineTo(-12, -26);
        graphics.lineTo(-10, -20);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(16, -20);
        graphics.lineTo(12, -26);
        graphics.lineTo(10, -20);
        graphics.closePath();
        graphics.fillPath();

        // Cache-œil de pirate (sur l'œil droit)
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(6, -3, 7);

        // Bande du cache-œil
        graphics.lineStyle(3, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, -3, 13, -0.3, 0.3);
        graphics.strokePath();

        // Œil gauche bleu vif (style aventurier)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -3, 11, 13);

        graphics.fillStyle(0x0099FF, 1);
        graphics.fillCircle(-6, -2, 5);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -4, 2);

        // Museau de chat
        graphics.fillStyle(0xFFB6C1, 1);
        graphics.fillCircle(0, 5, 5);

        // Nez de chat
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 3);
        graphics.lineTo(-2, 6);
        graphics.lineTo(2, 6);
        graphics.closePath();
        graphics.fillPath();

        // Moustaches
        graphics.lineStyle(1, 0x000000, 1);
        graphics.beginPath();
        graphics.moveTo(-6, 4);
        graphics.lineTo(-14, 2);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(-6, 6);
        graphics.lineTo(-14, 8);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(6, 4);
        graphics.lineTo(14, 2);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(6, 6);
        graphics.lineTo(14, 8);
        graphics.strokePath();

        // Tenue de pirate (gilet)
        graphics.fillStyle(0x4169E1, 1);
        graphics.fillRect(-10, 12, 20, 12);

        // Boutons dorés
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(0, 16, 2);
        graphics.fillCircle(0, 20, 2);

        const texture = graphics.generateTexture('kwazii', 70, 70);
        graphics.destroy();
        return texture;
    }

    static createBarnacle(scene) {
        const graphics = scene.add.graphics();

        // Corps d'ours polaire brun
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillCircle(0, 0, 26);

        // Ventre crème
        graphics.fillStyle(0xF5DEB3, 1);
        graphics.fillEllipse(0, 8, 18, 22);

        // Oreilles rondes d'ours
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillCircle(-16, -16, 8);
        graphics.fillCircle(16, -16, 8);

        graphics.fillStyle(0xD2B48C, 1);
        graphics.fillCircle(-16, -16, 5);
        graphics.fillCircle(16, -16, 5);

        // Yeux bleus courageux
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -4, 10, 12);
        graphics.fillEllipse(6, -4, 10, 12);

        graphics.fillStyle(0x1E90FF, 1);
        graphics.fillCircle(-6, -3, 4);
        graphics.fillCircle(6, -3, 4);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -5, 2);
        graphics.fillCircle(5, -5, 2);

        // Sourcils épais (air de leader)
        graphics.lineStyle(3, 0x654321, 1);
        graphics.beginPath();
        graphics.moveTo(-12, -9);
        graphics.lineTo(-4, -8);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(12, -9);
        graphics.lineTo(4, -8);
        graphics.strokePath();

        // Museau
        graphics.fillStyle(0xF5DEB3, 1);
        graphics.fillEllipse(0, 5, 12, 10);

        // Nez noir
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, 4, 4);

        // Sourire confiant
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 4, 6, 0.3, Math.PI - 0.3);
        graphics.strokePath();

        // Uniforme de capitaine (bleu marine)
        graphics.fillStyle(0x000080, 1);
        graphics.fillRect(-12, 14, 24, 14);

        // Insignes dorés
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(-10, 16, 4, 2);
        graphics.fillRect(6, 16, 4, 2);

        // Boutons
        graphics.fillCircle(-4, 19, 2);
        graphics.fillCircle(4, 19, 2);
        graphics.fillCircle(0, 24, 2);

        const texture = graphics.generateTexture('barnacle', 70, 70);
        graphics.destroy();
        return texture;
    }

    static createKai(scene) {
        const graphics = scene.add.graphics();

        // Tête (peau)
        graphics.fillStyle(0xFFDBAC, 1);
        graphics.fillCircle(0, -2, 22);

        // Cheveux bruns en épis (style ninja)
        graphics.fillStyle(0x4A2511, 1);
        graphics.beginPath();
        graphics.moveTo(-18, -16);
        graphics.lineTo(-20, -24);
        graphics.lineTo(-14, -18);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(-8, -20);
        graphics.lineTo(-10, -28);
        graphics.lineTo(-5, -22);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(2, -22);
        graphics.lineTo(0, -30);
        graphics.lineTo(5, -23);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(12, -20);
        graphics.lineTo(10, -28);
        graphics.lineTo(16, -21);
        graphics.closePath();
        graphics.fillPath();

        // Bandeau ninja rouge
        graphics.fillStyle(0xCC0000, 1);
        graphics.fillRect(-22, -10, 44, 6);

        // Yeux bruns déterminés
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -3, 9, 11);
        graphics.fillEllipse(6, -3, 9, 11);

        graphics.fillStyle(0x654321, 1);
        graphics.fillCircle(-6, -2, 4);
        graphics.fillCircle(6, -2, 4);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -4, 2);
        graphics.fillCircle(5, -4, 2);

        // Sourcils concentrés
        graphics.lineStyle(2, 0x4A2511, 1);
        graphics.beginPath();
        graphics.moveTo(-11, -7);
        graphics.lineTo(-5, -6);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(11, -7);
        graphics.lineTo(5, -6);
        graphics.strokePath();

        // Tenue ninja rouge
        graphics.fillStyle(0xB22222, 1);
        graphics.fillRect(-14, 8, 28, 18);

        // Ceinture dorée
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(-14, 18, 28, 3);

        // Symbole du feu sur la tenue
        graphics.fillStyle(0xFF4500, 1);
        graphics.beginPath();
        graphics.moveTo(0, 12);
        graphics.lineTo(-4, 16);
        graphics.lineTo(0, 14);
        graphics.lineTo(4, 16);
        graphics.closePath();
        graphics.fillPath();

        // Bras avec manches
        graphics.fillStyle(0xB22222, 1);
        graphics.fillRect(-20, 10, 6, 12);
        graphics.fillRect(14, 10, 6, 12);

        // Mains (gants noirs)
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-17, 22, 4);
        graphics.fillCircle(17, 22, 4);

        const texture = graphics.generateTexture('kai', 70, 70);
        graphics.destroy();
        return texture;
    }

    static createLloyd(scene) {
        const graphics = scene.add.graphics();

        // Tête (peau claire)
        graphics.fillStyle(0xFFE0BD, 1);
        graphics.fillCircle(0, -2, 22);

        // Cheveux blonds
        graphics.fillStyle(0xF0E68C, 1);
        graphics.beginPath();
        graphics.moveTo(-18, -18);
        graphics.lineTo(-22, -22);
        graphics.lineTo(-15, -20);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(-5, -22);
        graphics.lineTo(-8, -28);
        graphics.lineTo(-2, -23);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(5, -22);
        graphics.lineTo(3, -29);
        graphics.lineTo(8, -23);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(15, -20);
        graphics.lineTo(18, -26);
        graphics.lineTo(18, -21);
        graphics.closePath();
        graphics.fillPath();

        // Bandeau ninja vert
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillRect(-22, -10, 44, 6);

        // Yeux verts (ninja légendaire)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -3, 9, 11);
        graphics.fillEllipse(6, -3, 9, 11);

        graphics.fillStyle(0x00FF00, 1);
        graphics.fillCircle(-6, -2, 4);
        graphics.fillCircle(6, -2, 4);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -4, 2);
        graphics.fillCircle(5, -4, 2);

        // Lueur verte dans les yeux (pouvoir)
        graphics.fillStyle(0x7FFF00, 0.4);
        graphics.fillCircle(-6, -2, 6);
        graphics.fillCircle(6, -2, 6);

        // Tenue ninja verte
        graphics.fillStyle(0x228B22, 1);
        graphics.fillRect(-14, 8, 28, 18);

        // Ceinture dorée avec boucle
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillRect(-14, 18, 28, 3);
        graphics.fillRect(-3, 17, 6, 5);

        // Symbole dragon vert sur la tenue
        graphics.fillStyle(0x00FF00, 1);
        graphics.beginPath();
        graphics.arc(0, 13, 4, 0, Math.PI * 2);
        graphics.fillPath();

        graphics.lineStyle(2, 0x00FF00, 1);
        graphics.beginPath();
        graphics.moveTo(-3, 13);
        graphics.lineTo(-6, 10);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(3, 13);
        graphics.lineTo(6, 10);
        graphics.strokePath();

        // Bras avec manches vertes
        graphics.fillStyle(0x228B22, 1);
        graphics.fillRect(-20, 10, 6, 12);
        graphics.fillRect(14, 10, 6, 12);

        // Gants noirs
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-17, 22, 4);
        graphics.fillCircle(17, 22, 4);

        const texture = graphics.generateTexture('lloyd', 70, 70);
        graphics.destroy();
        return texture;
    }

    static createSpongeBob(scene) {
        const graphics = scene.add.graphics();

        // Corps carré jaune (éponge)
        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillRect(-18, -8, 36, 36);

        // Texture d'éponge (trous)
        graphics.fillStyle(0xF0E68C, 1);
        const holes = [
            [-12, -4], [-6, 2], [4, -2], [10, 6], [-8, 12], [6, 16], [-14, 20], [12, 22]
        ];
        holes.forEach(([x, y]) => {
            graphics.fillCircle(x, y, 3);
        });

        // Chemise blanche
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-14, 8, 28, 16);

        // Cravate rouge
        graphics.fillStyle(0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(0, 8);
        graphics.lineTo(-4, 12);
        graphics.lineTo(-2, 22);
        graphics.lineTo(2, 22);
        graphics.lineTo(4, 12);
        graphics.closePath();
        graphics.fillPath();

        // Nœud de cravate
        graphics.fillCircle(0, 8, 3);

        // Pantalon brun
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillRect(-14, 24, 28, 8);

        // Ceinture noire
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(-14, 24, 28, 2);

        // Boucle de ceinture
        graphics.fillStyle(0xC0C0C0, 1);
        graphics.fillRect(-3, 23, 6, 4);

        // Yeux énormes bleus (signature)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -10, 11);
        graphics.fillCircle(7, -10, 11);

        // Iris bleus
        graphics.fillStyle(0x4169E1, 1);
        graphics.fillCircle(-7, -9, 6);
        graphics.fillCircle(7, -9, 6);

        // Pupilles
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-7, -8, 3);
        graphics.fillCircle(7, -8, 3);

        // Reflets
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-9, -11, 3);
        graphics.fillCircle(5, -11, 3);

        // Cils (3 sur chaque œil)
        graphics.lineStyle(2, 0x000000, 1);
        for (let i = 0; i < 3; i++) {
            graphics.beginPath();
            graphics.moveTo(-13 + i * 3, -18);
            graphics.lineTo(-14 + i * 3, -22);
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(11 + i * 3, -18);
            graphics.lineTo(12 + i * 3, -22);
            graphics.strokePath();
        }

        // Nez long
        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillEllipse(0, 0, 4, 8);

        // Sourire caractéristique avec dents
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 2, 10, 0.2, Math.PI - 0.2);
        graphics.strokePath();

        // Dents carrées
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-6, 8, 5, 6);
        graphics.fillRect(1, 8, 5, 6);

        graphics.lineStyle(1, 0x000000, 1);
        graphics.strokeRect(-6, 8, 5, 6);
        graphics.strokeRect(1, 8, 5, 6);

        // Chaussures noires brillantes
        graphics.fillStyle(0x000000, 1);
        graphics.fillEllipse(-8, 34, 8, 5);
        graphics.fillEllipse(8, 34, 8, 5);

        graphics.fillStyle(0xFFFFFF, 0.3);
        graphics.fillEllipse(-9, 33, 4, 2);
        graphics.fillEllipse(7, 33, 4, 2);

        const texture = graphics.generateTexture('spongebob', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createPatrick(scene) {
        const graphics = scene.add.graphics();

        // Corps rose en étoile de mer
        graphics.fillStyle(0xFFB6C1, 1);

        // Centre du corps
        graphics.fillCircle(0, 4, 18);

        // 5 branches d'étoile
        const branches = [
            {angle: -Math.PI/2, length: 20}, // Haut
            {angle: -Math.PI/2 + (2*Math.PI)/5, length: 18}, // Haut droite
            {angle: -Math.PI/2 + 2*(2*Math.PI)/5, length: 18}, // Bas droite
            {angle: -Math.PI/2 + 3*(2*Math.PI)/5, length: 18}, // Bas gauche
            {angle: -Math.PI/2 + 4*(2*Math.PI)/5, length: 18}  // Haut gauche
        ];

        branches.forEach(branch => {
            graphics.fillCircle(
                Math.cos(branch.angle) * branch.length,
                4 + Math.sin(branch.angle) * branch.length,
                10
            );
        });

        // Texture (points roses foncés)
        graphics.fillStyle(0xFF1493, 1);
        const spots = [
            [-8, -6], [6, -4], [-10, 4], [8, 8], [0, 12], [-6, 16], [10, 14]
        ];
        spots.forEach(([x, y]) => {
            graphics.fillCircle(x, y, 2);
        });

        // Short vert avec motif
        graphics.fillStyle(0x32CD32, 1);
        graphics.beginPath();
        graphics.moveTo(-16, 16);
        graphics.lineTo(-16, 26);
        graphics.quadraticCurveTo(-12, 28, -8, 26);
        graphics.lineTo(-8, 16);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(16, 16);
        graphics.lineTo(16, 26);
        graphics.quadraticCurveTo(12, 28, 8, 26);
        graphics.lineTo(8, 16);
        graphics.closePath();
        graphics.fillPath();

        graphics.fillRect(-8, 16, 16, 12);

        // Motif fleurs sur le short
        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillCircle(-4, 20, 2);
        graphics.fillCircle(6, 22, 2);

        // Gros yeux ronds (un peu décalés)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-6, -4, 10);
        graphics.fillCircle(8, -2, 10);

        // Iris verts
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillCircle(-6, -3, 5);
        graphics.fillCircle(8, -1, 5);

        // Pupilles
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, -2, 2);
        graphics.fillCircle(8, 0, 2);

        // Reflets
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -5, 2);
        graphics.fillCircle(7, -3, 2);

        // Sourcils épais (air bête)
        graphics.lineStyle(3, 0xC71585, 1);
        graphics.beginPath();
        graphics.moveTo(-11, -12);
        graphics.lineTo(-4, -10);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(13, -10);
        graphics.lineTo(6, -8);
        graphics.strokePath();

        // Bouche souriante simple
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(2, 6, 8, 0.3, Math.PI - 0.3);
        graphics.strokePath();

        const texture = graphics.generateTexture('patrick', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createBlippi(scene) {
        const graphics = scene.add.graphics();

        // Tête (peau)
        graphics.fillStyle(0xFFDBAC, 1);
        graphics.fillCircle(0, -2, 22);

        // Cheveux bruns style Blippi
        graphics.fillStyle(0x4A2511, 1);
        graphics.fillEllipse(0, -20, 24, 12);

        // Casquette/chapeau bleu et orange
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillEllipse(0, -22, 26, 8);

        graphics.fillStyle(0xFF6600, 1);
        graphics.fillRect(-28, -24, 56, 4);

        // Lunettes caractéristiques
        graphics.lineStyle(3, 0xFF6600, 1);
        graphics.strokeCircle(-8, -4, 9);
        graphics.strokeCircle(8, -4, 9);

        // Pont des lunettes
        graphics.beginPath();
        graphics.moveTo(1, -4);
        graphics.lineTo(-1, -4);
        graphics.strokePath();

        // Yeux enthousiastes derrière lunettes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-8, -4, 7);
        graphics.fillCircle(8, -4, 7);

        graphics.fillStyle(0x4169E1, 1);
        graphics.fillCircle(-8, -3, 4);
        graphics.fillCircle(8, -3, 4);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-8, -2, 2);
        graphics.fillCircle(8, -2, 2);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-9, -4, 2);
        graphics.fillCircle(7, -4, 2);

        // Grand sourire amical
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, 4, 10, 0.2, Math.PI - 0.2);
        graphics.strokePath();

        // Dents
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-6, 10, 12, 5);
        graphics.lineStyle(1, 0x000000, 1);
        graphics.strokeRect(-6, 10, 12, 5);

        // Chemise bleue caractéristique
        graphics.fillStyle(0x0066FF, 1);
        graphics.fillRect(-16, 10, 32, 18);

        // Col orange
        graphics.fillStyle(0xFF6600, 1);
        graphics.beginPath();
        graphics.moveTo(-16, 10);
        graphics.lineTo(-10, 10);
        graphics.lineTo(-12, 16);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(16, 10);
        graphics.lineTo(10, 10);
        graphics.lineTo(12, 16);
        graphics.closePath();
        graphics.fillPath();

        // Nœud papillon orange
        graphics.fillStyle(0xFF6600, 1);
        graphics.fillRect(-8, 9, 16, 4);
        graphics.fillCircle(0, 11, 3);

        // Bretelles oranges
        graphics.lineStyle(6, 0xFF6600, 1);
        graphics.beginPath();
        graphics.moveTo(-8, 12);
        graphics.lineTo(-8, 26);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(8, 12);
        graphics.lineTo(8, 26);
        graphics.strokePath();

        const texture = graphics.generateTexture('blippi', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createMario(scene) {
        const graphics = scene.add.graphics();

        // Tête (peau)
        graphics.fillStyle(0xFFCBA4, 1);
        graphics.fillCircle(0, 0, 22);

        // Oreilles
        graphics.fillCircle(-18, 2, 7);
        graphics.fillCircle(18, 2, 7);

        // Casquette rouge avec M
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillEllipse(0, -18, 26, 10);
        graphics.fillRect(-22, -16, 44, 8);

        // Visière
        graphics.fillStyle(0x8B0000, 1);
        graphics.fillEllipse(0, -8, 24, 4);

        // Logo M blanc
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, -16, 8);

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-2, -20, 4, 8);
        graphics.fillRect(-6, -20, 2, 4);
        graphics.fillRect(4, -20, 2, 4);

        // Moustache noire caractéristique
        graphics.fillStyle(0x000000, 1);
        graphics.fillEllipse(-8, 6, 12, 6);
        graphics.fillEllipse(8, 6, 12, 6);

        // Courbe de la moustache
        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(-8, 5, 8, -0.5, -Math.PI + 0.5);
        graphics.strokePath();

        graphics.beginPath();
        graphics.arc(8, 5, 8, -Math.PI - 0.5, 0.5);
        graphics.strokePath();

        // Yeux bleus
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -2, 8, 10);
        graphics.fillEllipse(6, -2, 8, 10);

        graphics.fillStyle(0x4169E1, 1);
        graphics.fillCircle(-6, -1, 4);
        graphics.fillCircle(6, -1, 4);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, 0, 2);
        graphics.fillCircle(6, 0, 2);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -2, 2);
        graphics.fillCircle(5, -2, 2);

        // Nez rond
        graphics.fillStyle(0xFFB27F, 1);
        graphics.fillCircle(0, 4, 6);

        // Salopette bleue
        graphics.fillStyle(0x0000FF, 1);
        graphics.fillRect(-14, 12, 28, 16);

        // Bretelles
        graphics.fillRect(-10, 12, 4, 14);
        graphics.fillRect(6, 12, 4, 14);

        // Boutons jaunes
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(-8, 18, 3);
        graphics.fillCircle(8, 18, 3);

        // Chemise rouge
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-14, 12, 6, 6);
        graphics.fillRect(8, 12, 6, 6);

        // Manches
        graphics.fillRect(-20, 14, 6, 10);
        graphics.fillRect(14, 14, 6, 10);

        // Gants blancs
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-17, 24, 5);
        graphics.fillCircle(17, 24, 5);

        const texture = graphics.generateTexture('mario', 80, 80);
        graphics.destroy();
        return texture;
    }

    static createLuigi(scene) {
        const graphics = scene.add.graphics();

        // Tête (peau)
        graphics.fillStyle(0xFFCBA4, 1);
        graphics.fillCircle(0, 0, 22);

        // Oreilles
        graphics.fillCircle(-18, 2, 7);
        graphics.fillCircle(18, 2, 7);

        // Casquette verte avec L
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillEllipse(0, -18, 26, 10);
        graphics.fillRect(-22, -16, 44, 8);

        // Visière
        graphics.fillStyle(0x006400, 1);
        graphics.fillEllipse(0, -8, 24, 4);

        // Logo L blanc
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, -16, 8);

        graphics.fillStyle(0x00AA00, 1);
        graphics.fillRect(-2, -20, 4, 8);
        graphics.fillRect(-2, -13, 6, 2);

        // Moustache noire (plus fine que Mario)
        graphics.fillStyle(0x000000, 1);
        graphics.fillEllipse(-8, 6, 11, 5);
        graphics.fillEllipse(8, 6, 11, 5);

        graphics.lineStyle(2, 0x000000, 1);
        graphics.beginPath();
        graphics.arc(-8, 5, 7, -0.5, -Math.PI + 0.5);
        graphics.strokePath();

        graphics.beginPath();
        graphics.arc(8, 5, 7, -Math.PI - 0.5, 0.5);
        graphics.strokePath();

        // Yeux verts (différent de Mario)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-6, -2, 8, 11);
        graphics.fillEllipse(6, -2, 8, 11);

        graphics.fillStyle(0x228B22, 1);
        graphics.fillCircle(-6, -1, 4);
        graphics.fillCircle(6, -1, 4);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-6, 0, 2);
        graphics.fillCircle(6, 0, 2);

        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-7, -2, 2);
        graphics.fillCircle(5, -2, 2);

        // Nez rond
        graphics.fillStyle(0xFFB27F, 1);
        graphics.fillCircle(0, 4, 6);

        // Salopette bleue (identique à Mario)
        graphics.fillStyle(0x0000FF, 1);
        graphics.fillRect(-14, 12, 28, 16);

        graphics.fillRect(-10, 12, 4, 14);
        graphics.fillRect(6, 12, 4, 14);

        graphics.fillStyle(0xFFD700, 1);
        graphics.fillCircle(-8, 18, 3);
        graphics.fillCircle(8, 18, 3);

        // Chemise verte (différence principale)
        graphics.fillStyle(0x00AA00, 1);
        graphics.fillRect(-14, 12, 6, 6);
        graphics.fillRect(8, 12, 6, 6);

        graphics.fillRect(-20, 14, 6, 10);
        graphics.fillRect(14, 14, 6, 10);

        // Gants blancs
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-17, 24, 5);
        graphics.fillCircle(17, 24, 5);

        const texture = graphics.generateTexture('luigi', 80, 80);
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

        console.log('✅ Tous les sprites de personnages générés!');
        return sprites;
    }
}
