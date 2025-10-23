#!/bin/bash

echo "🎮 Démarrage du serveur de jeu..."
echo "📂 Dossier: $(pwd)"
echo ""

# Vérifier si Python 3 est disponible
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 détecté"
    echo "🌐 Serveur lancé sur http://localhost:8000"
    echo "📱 Pour tester sur mobile, utilisez votre IP locale"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ Python détecté"
    echo "🌐 Serveur lancé sur http://localhost:8000"
    echo ""
    python -m SimpleHTTPServer 8000
else
    echo "❌ Python n'est pas installé"
    echo "💡 Installez Python ou utilisez un autre serveur HTTP"
    exit 1
fi
