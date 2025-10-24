// Service Worker pour PWA
const CACHE_NAME = 'papa-elon-andy-game-v1';
const urlsToCache = [
    './',
    './index.html',
    './src/main.js',
    './src/config.js',
    './src/scenes/MenuScene.js',
    './src/scenes/CharacterSelectScene.js',
    './src/scenes/MapScene.js',
    './src/scenes/UIScene.js',
    './src/scenes/GameScene.js',
    './src/scenes/PauseScene.js',
    './src/scenes/GameOverScene.js',
    './src/scenes/VictoryScene.js',
    './src/scenes/ComicScene.js',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js'
];

// Installation
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activation
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - retourner la réponse
                if (response) {
                    return response;
                }

                // Cloner la requête
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest).then(response => {
                    // Vérifier si c'est une réponse valide
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Cloner la réponse
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});
