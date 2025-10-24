# Deploying BelliGame to Railway

This guide explains how to deploy your Phaser 3 game to Railway.

## Prerequisites

1. A Railway account (sign up at https://railway.app)
2. Git installed on your computer
3. Your game code pushed to a GitHub repository

## Deployment Steps

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   cd /path/to/BelliGame/game
   git init
   git add .
   git commit -m "Initial commit: BelliGame ready for deployment"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Railway**:
   - Go to https://railway.app
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your BelliGame repository
   - Railway will automatically detect the Node.js project and deploy it

3. **Configure the deployment**:
   - Railway will automatically use the `railway.json` configuration
   - It will run `npm install` and then `npm start`
   - A public URL will be generated automatically

4. **Access your game**:
   - Once deployed, Railway will provide a URL like: `https://belligame-production.up.railway.app`
   - Click on the URL to play your game!

### Option 2: Deploy with Railway CLI

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Initialize the project**:
   ```bash
   cd /path/to/BelliGame/game
   railway init
   ```

4. **Deploy**:
   ```bash
   railway up
   ```

5. **Get your deployment URL**:
   ```bash
   railway open
   ```

## Environment Configuration

The game doesn't require any environment variables for basic deployment. However, you can add custom configurations in the Railway dashboard if needed.

## Monitoring

- Check deployment logs in the Railway dashboard
- Monitor resource usage (RAM, CPU)
- Set up alerts for downtime (available in Railway Pro)

## Custom Domain (Optional)

1. Go to your project in Railway dashboard
2. Click on "Settings"
3. Scroll to "Domains"
4. Add your custom domain and follow DNS configuration instructions

## Troubleshooting

### Build fails
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility (requires >=18.0.0)

### Game doesn't load
- Check browser console for errors
- Verify all asset paths are correct
- Ensure Phaser CDN is accessible

### Performance issues
- Enable compression (already configured in server.js)
- Consider upgrading Railway plan for more resources
- Optimize game assets (compress images, minify code)

## Cost

- Railway offers a free tier with limited resources
- Upgrade to Pro plan if you need:
  - More uptime
  - Better performance
  - Custom domains
  - Priority support

## Updates

To deploy updates:

1. **If using GitHub**:
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push
   ```
   Railway will automatically redeploy.

2. **If using Railway CLI**:
   ```bash
   railway up
   ```

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Phaser Documentation: https://phaser.io/docs

---

Enjoy your deployed game! 🎮
