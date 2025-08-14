# Reddit API Setup Guide

This guide will help you set up Reddit API credentials to enable real data fetching in your app.

## Step 1: Create a Reddit App

1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Fill in the details:
   - **Name**: `My Reddit App` (or any name you prefer)
   - **Type**: Select "script"
   - **Description**: `A React app to browse Reddit posts`
   - **About URL**: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
   - **Redirect URI**: Leave blank for script apps

4. After creating, you'll see:
   - **Client ID**: The string under your app name (looks like `abc123def456`)
   - **Client Secret**: Click "secret" to reveal it (looks like `ghi789jkl012`)

## Step 2: Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add the following variables:

```
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here
REDDIT_USER_AGENT=MyRedditApp/1.0 (by /u/your_reddit_username)
```

Replace:
- `your_client_id_here` with your actual Client ID
- `your_client_secret_here` with your actual Client Secret
- `your_reddit_username` with your Reddit username

## Step 3: Deploy and Test

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add Reddit OAuth API support"
   git push
   ```

2. Vercel will automatically redeploy with the new environment variables

3. Test your app - it should now fetch real Reddit data!

## How It Works

- The app first tries to get an access token using your credentials
- If successful, it fetches real data from `https://oauth.reddit.com/`
- If credentials are missing or invalid, it falls back to demo data
- This ensures your app always works, even during setup

## Troubleshooting

- **Still seeing demo data?** Check that your environment variables are set correctly in Vercel
- **Getting errors?** Check the Vercel function logs for detailed error messages
- **Rate limited?** The official API has much higher limits than scraping

## Benefits of Official API

- ✅ Works reliably on Vercel
- ✅ Higher rate limits
- ✅ Better data quality
- ✅ Future-proof solution
- ✅ Follows Reddit's terms of service
