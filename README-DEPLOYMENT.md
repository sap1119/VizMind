# VizMind Analytics - Vercel Deployment Guide

## Prerequisites

1. **Supabase Project**: Ensure your Supabase project is set up and running
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Repository**: Push your code to a GitHub repository

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository containing your VizMind Analytics code

### 3. Configure Environment Variables

In the Vercel dashboard, add these environment variables:

**Required Variables:**
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**How to get Supabase credentials:**
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Go to Settings > API
4. Copy the Project URL and anon public key

### 4. Deploy

1. Click "Deploy" in Vercel
2. Wait for the build to complete
3. Your app will be available at `https://your-project-name.vercel.app`

## Build Configuration

The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

## Environment Variables Setup

### Development (.env.local)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Production (Vercel Dashboard)
Add the same variables in the Vercel project settings under "Environment Variables".

## Post-Deployment Checklist

1. ✅ Verify the site loads correctly
2. ✅ Test user authentication (sign up/sign in)
3. ✅ Test data upload functionality
4. ✅ Verify dashboard generation works
5. ✅ Check all workflow steps function properly
6. ✅ Test responsive design on mobile devices

## Troubleshooting

### Common Issues:

**Build Fails:**
- Check that all dependencies are in `package.json`
- Verify environment variables are set correctly
- Check build logs in Vercel dashboard

**Authentication Not Working:**
- Verify Supabase URL and keys are correct
- Check Supabase project is active
- Ensure RLS policies are properly configured

**404 Errors on Refresh:**
- The `vercel.json` file includes SPA routing configuration
- All routes should redirect to `index.html`

**CORS Issues:**
- Headers are configured in `vercel.json`
- Check Supabase CORS settings if needed

## Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Optimization

The deployment includes:
- ✅ Static asset optimization
- ✅ Gzip compression
- ✅ CDN distribution
- ✅ Automatic HTTPS
- ✅ Edge caching

## Support

For deployment issues:
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Verify Supabase configuration

---

**Live Demo**: Once deployed, your VizMind Analytics platform will be available at your Vercel URL with full functionality including:
- Complete 6-step analytics workflow
- Real-time data processing
- Interactive dashboards
- KPI tracking
- Portfolio analysis
- Trend predictions
- Comprehensive reporting