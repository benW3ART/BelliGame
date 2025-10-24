import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Set CSP headers to allow Phaser to work
app.use((req, res, next) => {
    // Phaser needs unsafe-eval for its internal workings
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-eval' https://cdn.jsdelivr.net; " +
        "style-src 'self' 'unsafe-inline'; " +
        "img-src 'self' data: blob:; " +
        "font-src 'self' data:; " +
        "connect-src 'self'; " +
        "worker-src 'self' blob:;"
    );
    next();
});

// Serve static files from current directory
app.use(express.static(__dirname, {
    maxAge: '1d',
    etag: true
}));

// Set proper MIME types for JavaScript modules
app.use((req, res, next) => {
    if (req.url.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    }
    next();
});

// Fallback to index.html for any route (SPA support)
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🎮 BelliGame server running on port ${PORT}`);
    console.log(`🌐 Access the game at http://localhost:${PORT}`);
});
