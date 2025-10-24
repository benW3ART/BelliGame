// Système de génération de sprites pour les 6 boss

export class BossSprites {
    // BOSS 1 - Grumf la Taupe Géante (Forêt)
    static createGrumf(scene) {
        const graphics = scene.add.graphics();

        // Corps massif de taupe
        graphics.fillStyle(0x654321, 1);
        graphics.fillEllipse(0, 10, 70, 60);

        // Tête énorme
        graphics.fillCircle(0, -20, 45);

        // Museau rose géant
        graphics.fillStyle(0xFFB6C1, 1);
        graphics.fillEllipse(0, -10, 35, 25);

        // Nez noir massif
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(0, -10, 12);

        // Yeux petits (taupe)
        graphics.fillCircle(-15, -25, 4);
        graphics.fillCircle(15, -25, 4);

        // Dents de boss proéminentes
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-12, 5, 8, 12);
        graphics.fillRect(4, 5, 8, 12);

        // Contour noir des dents
        graphics.lineStyle(2, 0x000000, 1);
        graphics.strokeRect(-12, 5, 8, 12);
        graphics.strokeRect(4, 5, 8, 12);

        // Pattes avant massives avec griffes
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillEllipse(-40, 20, 25, 18);
        graphics.fillEllipse(40, 20, 25, 18);

        // Griffes redoutables
        graphics.lineStyle(4, 0x000000, 1);
        for (let i = -1; i <= 1; i++) {
            graphics.beginPath();
            graphics.moveTo(-40 + i * 8, 28);
            graphics.lineTo(-40 + i * 8, 40);
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(40 + i * 8, 28);
            graphics.lineTo(40 + i * 8, 40);
            graphics.strokePath();
        }

        // Cicatrices de combat
        graphics.lineStyle(3, 0x8B0000, 1);
        graphics.beginPath();
        graphics.moveTo(-25, -30);
        graphics.lineTo(-15, -25);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(20, -28);
        graphics.lineTo(28, -22);
        graphics.strokePath();

        // Effet de boss (aura sombre)
        graphics.lineStyle(3, 0xFF0000, 0.5);
        graphics.strokeEllipse(0, 0, 75, 70);

        const texture = graphics.generateTexture('boss_grumf', 160, 160);
        graphics.destroy();
        return texture;
    }

    // BOSS 2 - Scaraboss (Désert)
    static createScaraboss(scene) {
        const graphics = scene.add.graphics();

        // Corps de scarabée géant doré
        graphics.fillStyle(0xB8860B, 1);
        graphics.fillEllipse(0, 10, 65, 55);

        // Carapace brillante avec motifs
        graphics.fillStyle(0xFFD700, 1);
        graphics.fillEllipse(0, 5, 55, 45);

        // Motifs sur la carapace
        graphics.fillStyle(0xDAA520, 1);
        for (let i = -20; i <= 20; i += 12) {
            graphics.fillCircle(i, 0, 6);
            graphics.fillCircle(i, 12, 5);
        }

        // Tête de scarabée avec mandibules
        graphics.fillStyle(0x8B4513, 1);
        graphics.fillCircle(0, -30, 25);

        // Mandibules massives
        graphics.fillStyle(0x654321, 1);
        graphics.beginPath();
        graphics.moveTo(-15, -20);
        graphics.lineTo(-35, -15);
        graphics.lineTo(-30, -10);
        graphics.lineTo(-12, -15);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(15, -20);
        graphics.lineTo(35, -15);
        graphics.lineTo(30, -10);
        graphics.lineTo(12, -15);
        graphics.closePath();
        graphics.fillPath();

        // Yeux rouges de boss
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-10, -28, 6);
        graphics.fillCircle(10, -28, 6);

        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillCircle(-10, -28, 3);
        graphics.fillCircle(10, -28, 3);

        // Corne dorsale (comme un rhinocéros)
        graphics.fillStyle(0x8B4513, 1);
        graphics.beginPath();
        graphics.moveTo(0, -10);
        graphics.lineTo(-8, -35);
        graphics.lineTo(8, -35);
        graphics.closePath();
        graphics.fillPath();

        // Pattes multiples (6 visibles)
        graphics.lineStyle(5, 0x654321, 1);
        for (let i = 0; i < 3; i++) {
            const x = -30 + i * 15;
            const y = 20 + i * 8;

            graphics.beginPath();
            graphics.moveTo(-x, y);
            graphics.lineTo(-x - 15, y + 20);
            graphics.strokePath();

            graphics.beginPath();
            graphics.moveTo(x, y);
            graphics.lineTo(x + 15, y + 20);
            graphics.strokePath();
        }

        // Aura de sable doré
        graphics.lineStyle(4, 0xFFD700, 0.6);
        graphics.strokeEllipse(0, 10, 70, 60);

        const texture = graphics.generateTexture('boss_scaraboss', 160, 160);
        graphics.destroy();
        return texture;
    }

    // BOSS 3 - Capitaine Piranha (Océan)
    static createCaptainPiranha(scene) {
        const graphics = scene.add.graphics();

        // Corps de piranha géant
        graphics.fillStyle(0xFF4500, 1);
        graphics.fillEllipse(0, 0, 70, 50);

        // Ventre plus clair
        graphics.fillStyle(0xFF6347, 1);
        graphics.fillEllipse(0, 10, 55, 35);

        // Nageoires dorsales agressives
        graphics.fillStyle(0xDC143C, 1);
        graphics.beginPath();
        graphics.moveTo(-20, -15);
        graphics.lineTo(-25, -40);
        graphics.lineTo(-10, -20);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(0, -20);
        graphics.lineTo(0, -45);
        graphics.lineTo(10, -25);
        graphics.closePath();
        graphics.fillPath();

        // Queue puissante
        graphics.beginPath();
        graphics.moveTo(30, 0);
        graphics.lineTo(50, -20);
        graphics.lineTo(55, 0);
        graphics.lineTo(50, 20);
        graphics.closePath();
        graphics.fillPath();

        // Tête avec chapeau de pirate
        graphics.fillStyle(0xFF4500, 1);
        graphics.fillCircle(-25, -5, 25);

        // Chapeau de capitaine noir
        graphics.fillStyle(0x000000, 1);
        graphics.fillRect(-40, -28, 30, 8);
        graphics.fillEllipse(-25, -32, 20, 8);

        // Crâne sur le chapeau
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-25, -30, 5);
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginPath();
        graphics.moveTo(-28, -26);
        graphics.lineTo(-22, -26);
        graphics.strokePath();

        // Œil unique (patch sur l'autre)
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(-20, -8, 8);

        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-20, -8, 4);

        // Patch de pirate
        graphics.fillStyle(0x000000, 1);
        graphics.fillCircle(-30, -8, 6);

        // Mâchoire avec dents acérées
        graphics.fillStyle(0xFFFFFF, 1);
        for (let i = -30; i < -10; i += 6) {
            graphics.beginPath();
            graphics.moveTo(i, 10);
            graphics.lineTo(i - 3, 18);
            graphics.lineTo(i + 3, 18);
            graphics.closePath();
            graphics.fillPath();
        }

        // Cicatrices
        graphics.lineStyle(3, 0x8B0000, 1);
        graphics.beginPath();
        graphics.moveTo(-15, 5);
        graphics.lineTo(-5, 8);
        graphics.strokePath();

        // Bulles d'eau autour
        graphics.fillStyle(0x87CEEB, 0.4);
        graphics.fillCircle(-40, -20, 8);
        graphics.fillCircle(30, -25, 10);
        graphics.fillCircle(35, 25, 7);

        const texture = graphics.generateTexture('boss_captain_piranha', 160, 160);
        graphics.destroy();
        return texture;
    }

    // BOSS 4 - Yéti Frost (Montagne Glacée)
    static createYetiFrost(scene) {
        const graphics = scene.add.graphics();

        // Corps de yéti massif blanc
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(0, 15, 75, 70);

        // Fourrure épaisse
        graphics.fillStyle(0xF0F8FF, 1);
        for (let i = -30; i <= 30; i += 15) {
            graphics.fillCircle(i, -10 + Math.random() * 40, 12);
        }

        // Tête large
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillCircle(0, -25, 35);

        // Yeux rouges menaçants
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-12, -28, 8);
        graphics.fillCircle(12, -28, 8);

        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillCircle(-12, -28, 4);
        graphics.fillCircle(12, -28, 4);

        // Sourcils épais et froncés
        graphics.lineStyle(5, 0xC0C0C0, 1);
        graphics.beginPath();
        graphics.moveTo(-20, -35);
        graphics.lineTo(-10, -32);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(20, -35);
        graphics.lineTo(10, -32);
        graphics.strokePath();

        // Nez bleu gelé
        graphics.fillStyle(0x87CEEB, 1);
        graphics.fillCircle(0, -20, 6);

        // Bouche rugissante avec dents
        graphics.fillStyle(0x000000, 1);
        graphics.beginPath();
        graphics.arc(0, -10, 15, 0.2, Math.PI - 0.2);
        graphics.fillPath();

        graphics.fillStyle(0xFFFFFF, 1);
        for (let i = -12; i <= 12; i += 6) {
            graphics.beginPath();
            graphics.moveTo(i, -8);
            graphics.lineTo(i - 2, -2);
            graphics.lineTo(i + 2, -2);
            graphics.closePath();
            graphics.fillPath();
        }

        // Bras massifs
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillEllipse(-45, 10, 28, 45);
        graphics.fillEllipse(45, 10, 28, 45);

        // Griffes de glace bleues
        graphics.fillStyle(0x87CEEB, 1);
        for (let i = -1; i <= 1; i++) {
            graphics.beginPath();
            graphics.moveTo(-45 + i * 10, 30);
            graphics.lineTo(-45 + i * 10 - 3, 45);
            graphics.lineTo(-45 + i * 10 + 3, 45);
            graphics.closePath();
            graphics.fillPath();

            graphics.beginPath();
            graphics.moveTo(45 + i * 10, 30);
            graphics.lineTo(45 + i * 10 - 3, 45);
            graphics.lineTo(45 + i * 10 + 3, 45);
            graphics.closePath();
            graphics.fillPath();
        }

        // Effet de blizzard autour
        graphics.fillStyle(0xFFFFFF, 0.6);
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 120 - 60;
            const y = Math.random() * 120 - 40;
            graphics.fillCircle(x, y, Math.random() * 3 + 1);
        }

        const texture = graphics.generateTexture('boss_yeti', 180, 180);
        graphics.destroy();
        return texture;
    }

    // BOSS 5 - RoboChef (Ville Urbaine)
    static createRoboChef(scene) {
        const graphics = scene.add.graphics();

        // Corps de robot cuisinier géant
        graphics.fillStyle(0x696969, 1);
        graphics.fillRect(-35, -10, 70, 50);

        // Tête/écran de robot
        graphics.fillStyle(0x2F4F4F, 1);
        graphics.fillRect(-30, -45, 60, 35);

        // Écran LCD avec yeux hostiles
        graphics.fillStyle(0x00FF00, 1);
        graphics.fillRect(-28, -42, 56, 30);

        // Yeux rouges en colère
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillRect(-20, -36, 12, 8);
        graphics.fillRect(8, -36, 12, 8);

        // Bouche mécanique grimaçante
        graphics.lineStyle(4, 0xFF0000, 1);
        graphics.beginPath();
        graphics.moveTo(-15, -22);
        graphics.lineTo(-10, -18);
        graphics.lineTo(-5, -22);
        graphics.lineTo(0, -18);
        graphics.lineTo(5, -22);
        graphics.lineTo(10, -18);
        graphics.lineTo(15, -22);
        graphics.strokePath();

        // Toque de chef mécanique
        graphics.fillStyle(0xFFFFFF, 1);
        graphics.fillRect(-32, -55, 64, 10);
        graphics.fillEllipse(0, -62, 35, 15);

        // Antennes
        graphics.lineStyle(3, 0x696969, 1);
        graphics.beginPath();
        graphics.moveTo(-20, -55);
        graphics.lineTo(-20, -65);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(20, -55);
        graphics.lineTo(20, -65);
        graphics.strokePath();

        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-20, -67, 4);
        graphics.fillCircle(20, -67, 4);

        // Bras avec ustensiles de cuisine
        graphics.fillStyle(0x696969, 1);
        graphics.fillRect(-50, -5, 15, 30);
        graphics.fillRect(35, -5, 15, 30);

        // Fouet géant (gauche)
        graphics.fillStyle(0xC0C0C0, 1);
        graphics.fillRect(-48, 25, 4, 20);

        graphics.lineStyle(2, 0xC0C0C0, 1);
        for (let i = 0; i < 5; i++) {
            graphics.beginPath();
            graphics.moveTo(-46, 45);
            graphics.lineTo(-50 + i * 3, 55);
            graphics.strokePath();
        }

        // Couteau de chef (droite)
        graphics.fillStyle(0xC0C0C0, 1);
        graphics.fillRect(38, 25, 8, 4);

        graphics.beginPath();
        graphics.moveTo(42, 25);
        graphics.lineTo(38, 10);
        graphics.lineTo(46, 10);
        graphics.closePath();
        graphics.fillPath();

        // Détails mécaniques sur le corps
        graphics.fillStyle(0xFFD700, 1);
        for (let i = -25; i <= 25; i += 12) {
            graphics.fillCircle(i, 0, 3);
            graphics.fillCircle(i, 15, 3);
        }

        // Voyants clignotants
        graphics.fillStyle(0x00FF00, 1);
        graphics.fillCircle(-28, -5, 3);
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(28, -5, 3);

        const texture = graphics.generateTexture('boss_robochef', 180, 180);
        graphics.destroy();
        return texture;
    }

    // BOSS 6 - Dr Chaos (Boss Final)
    static createDrChaos(scene) {
        const graphics = scene.add.graphics();

        // Cape flottante violette sombre
        graphics.fillStyle(0x4B0082, 0.8);
        graphics.beginPath();
        graphics.moveTo(-50, -20);
        graphics.quadraticCurveTo(-60, 0, -55, 30);
        graphics.lineTo(-45, 50);
        graphics.lineTo(-30, 20);
        graphics.closePath();
        graphics.fillPath();

        graphics.beginPath();
        graphics.moveTo(50, -20);
        graphics.quadraticCurveTo(60, 0, 55, 30);
        graphics.lineTo(45, 50);
        graphics.lineTo(30, 20);
        graphics.closePath();
        graphics.fillPath();

        // Corps humanoïde sombre
        graphics.fillStyle(0x1a1a1a, 1);
        graphics.fillRect(-25, -15, 50, 45);

        // Tête avec masque/casque
        graphics.fillStyle(0x2F4F4F, 1);
        graphics.fillCircle(0, -35, 28);

        // Casque/couronne du chaos
        graphics.fillStyle(0x8B008B, 1);
        for (let i = -3; i <= 3; i++) {
            graphics.beginPath();
            graphics.moveTo(i * 10, -50);
            graphics.lineTo(i * 10 - 4, -60);
            graphics.lineTo(i * 10, -65);
            graphics.lineTo(i * 10 + 4, -60);
            graphics.closePath();
            graphics.fillPath();
        }

        // Yeux lumineux maléfiques
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(-10, -35, 8);
        graphics.fillCircle(10, -35, 8);

        graphics.fillStyle(0xFFFF00, 1);
        graphics.fillCircle(-10, -35, 4);
        graphics.fillCircle(10, -35, 4);

        // Aura de chaos (lueur)
        graphics.lineStyle(3, 0xFF00FF, 0.8);
        graphics.strokeCircle(0, -10, 65);
        graphics.strokeCircle(0, -10, 75);

        // Symbole du chaos sur la poitrine
        graphics.fillStyle(0xFF0000, 1);
        graphics.fillCircle(0, 5, 15);

        graphics.lineStyle(4, 0xFFFF00, 1);
        graphics.beginPath();
        graphics.moveTo(-10, 5);
        graphics.lineTo(10, 5);
        graphics.strokePath();

        graphics.beginPath();
        graphics.moveTo(0, -5);
        graphics.lineTo(0, 15);
        graphics.strokePath();

        graphics.beginPath();
        graphics.arc(0, 5, 10, 0, Math.PI * 2);
        graphics.strokePath();

        // Bras avec énergie du chaos
        graphics.fillStyle(0x1a1a1a, 1);
        graphics.fillRect(-40, -10, 15, 35);
        graphics.fillRect(25, -10, 15, 35);

        // Mains avec orbes d'énergie
        graphics.fillStyle(0x8B008B, 0.7);
        graphics.fillCircle(-32, 28, 12);
        graphics.fillCircle(32, 28, 12);

        // Énergie crépitante
        graphics.fillStyle(0xFF00FF, 0.8);
        graphics.fillCircle(-32, 28, 8);
        graphics.fillCircle(32, 28, 8);

        graphics.fillStyle(0xFFFF00, 0.6);
        graphics.fillCircle(-32, 28, 4);
        graphics.fillCircle(32, 28, 4);

        // Éclairs d'énergie
        graphics.lineStyle(3, 0xFF00FF, 0.8);
        for (let i = 0; i < 8; i++) {
            const angle = (i * Math.PI * 2) / 8;
            graphics.beginPath();
            graphics.moveTo(0, 5);
            graphics.lineTo(
                Math.cos(angle) * 40,
                5 + Math.sin(angle) * 40
            );
            graphics.strokePath();
        }

        const texture = graphics.generateTexture('boss_dr_chaos', 200, 200);
        graphics.destroy();
        return texture;
    }

    // Générer tous les sprites de boss
    static generateAllBossSprites(scene) {
        const sprites = {
            grumf: this.createGrumf(scene),
            scaraboss: this.createScaraboss(scene),
            captain_piranha: this.createCaptainPiranha(scene),
            yeti: this.createYetiFrost(scene),
            robochef: this.createRoboChef(scene),
            dr_chaos: this.createDrChaos(scene)
        };

        console.log('✅ Tous les sprites de boss générés!');
        return sprites;
    }
}
