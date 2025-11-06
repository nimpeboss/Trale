# GitHub Pages Deployment Guide

This project is configured for automatic deployment to GitHub Pages with CI/CD testing.

## 🚀 Automatic Deployment

Every push to the `main` branch automatically:

1. ✅ Runs ESLint checks
2. ✅ Runs all tests with Vitest
3. ✅ Builds the production bundle
4. ✅ Deploys to GitHub Pages

## 📋 Prerequisites

Before deploying, you need to configure GitHub Pages in your repository settings:

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/nimpeboss/Trale`
2. Click on **Settings** (top navigation)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Source**: GitHub Actions
5. Save the changes

### Step 2: Update Base Path (if needed)

If your repository name is **not** "Trale", update the `base` in `vite.config.js`:

```javascript
export default defineConfig({
  base: "/YOUR-REPO-NAME/", // Change this to match your repo name
  // ... rest of config
});
```

## 🔧 Manual Deployment

If you want to deploy manually:

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build for production
npm run build

# Preview the build locally
npm run preview
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

### Test Files

- Test files should be named: `*.test.jsx` or `*.spec.jsx`
- Tests are located in the `src/` directory
- Example: `src/App.test.jsx`

## 📊 Coverage Reports

After running tests with coverage, view the report:

```bash
npm run test:coverage
# Then open: coverage/index.html in your browser
```

## 🔍 Workflow Status

Check your deployment status:

1. Go to the **Actions** tab in your GitHub repository
2. View the latest workflow run
3. Each run shows:
   - ✅ Test results
   - ✅ Build status
   - ✅ Deployment status

## 🌐 Your Live Site

Once deployed, your site will be available at:

```
https://nimpeboss.github.io/Trale/
```

## 📝 Workflow Triggers

The deployment workflow runs on:

- ✅ Push to `main` branch (deploys)
- ✅ Pull requests to `main` (tests only, no deploy)
- ✅ Manual trigger (via Actions tab)

## 🛠️ Troubleshooting

### Deployment Failed?

1. Check the Actions tab for error messages
2. Ensure GitHub Pages is enabled (Settings → Pages)
3. Verify the `base` path in `vite.config.js` matches your repo name
4. Make sure all tests pass: `npm test`

### Tests Failing?

```bash
# Run tests locally to debug
npm run test:watch

# Check specific test file
npx vitest run src/App.test.jsx
```

### Build Errors?

```bash
# Clean install dependencies
rm -rf node_modules package-lock.json
npm install

# Try building locally
npm run build
```

## 🔄 Updating Your Site

Simply push to the `main` branch:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

The site will automatically update in 2-3 minutes!

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vitest Documentation](https://vitest.dev/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
