# Deploy Backend to Render via CLI (Command Line)

This guide shows you how to deploy your backend to Render using the command line interface.

## Prerequisites

- Node.js installed (for npm)
- Git installed
- Render account (sign up at https://render.com/)

---

## Step 1: Install Render CLI

### Option A: Using npm (Recommended)
```bash
npm install -g render-cli
```

### Option B: Using Homebrew (macOS)
```bash
brew install render
```

### Option C: Using Scoop (Windows)
```bash
scoop install render
```

### Option D: Using Chocolatey (Windows)
```bash
choco install render
```

### Verify Installation
```bash
render --version
```

---

## Step 2: Login to Render

```bash
render login
```

This will open your browser to authenticate. After logging in, you'll be authenticated in the CLI.

---

## Step 3: Create a Blueprint (render.yaml)

Make sure you have `render.yaml` at the root of your repository (we already created this).

The file should look like:
```yaml
services:
  - type: web
    name: zoundly-backend
    env: node
    rootDir: backend
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

---

## Step 4: Deploy Using Blueprint

### From the root of your repository:

```bash
render blueprint launch
```

This will:
1. Read `render.yaml`
2. Create the service on Render
3. Connect it to your GitHub repository
4. Start the deployment

**Note:** You'll need to add environment variables manually after the service is created.

---

## Step 5: Add Environment Variables via CLI

After the service is created, add environment variables:

```bash
# Set MongoDB URI
render env:set MONGODB_URI="mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority" --service zoundly-backend

# Set JWT Secret
render env:set JWT_SECRET="your-random-64-character-secret-here" --service zoundly-backend

# Set JWT Refresh Secret
render env:set JWT_REFRESH_SECRET="another-random-64-character-secret-here" --service zoundly-backend

# Set JWT Expiry
render env:set JWT_EXPIRES_IN="15m" --service zoundly-backend
render env:set JWT_REFRESH_EXPIRES_IN="7d" --service zoundly-backend

# Set Frontend URL
render env:set FRONTEND_URL="https://your-frontend.vercel.app" --service zoundly-backend

# Set Razorpay Keys
render env:set RAZORPAY_KEY_ID="rzp_test_xxxxxxxxxxxxx" --service zoundly-backend
render env:set RAZORPAY_KEY_SECRET="your_razorpay_secret_key" --service zoundly-backend
render env:set RAZORPAY_WEBHOOK_SECRET="your_webhook_secret" --service zoundly-backend
```

---

## Alternative: Create Service Manually via CLI

If you prefer to create the service step by step:

### 1. Create a new web service
```bash
render services:create web \
  --name zoundly-backend \
  --repo https://github.com/Indhu248/Zoundly \
  --branch master \
  --root-dir backend \
  --build-command "cd backend && npm install" \
  --start-command "cd backend && npm start" \
  --env NODE_ENV=production \
  --env PORT=10000
```

### 2. Add environment variables (same as Step 5 above)

---

## Step 6: View Deployment Status

```bash
# List all services
render services:list

# View service details
render services:show zoundly-backend

# View logs
render logs zoundly-backend

# View deployment logs
render deployments:list --service zoundly-backend
```

---

## Step 7: Update Environment Variables

To update environment variables later:

```bash
# Update a variable
render env:set VARIABLE_NAME="new-value" --service zoundly-backend

# View all environment variables
render env:list --service zoundly-backend

# Delete an environment variable
render env:unset VARIABLE_NAME --service zoundly-backend
```

---

## Step 8: Trigger Manual Deploy

```bash
# Deploy latest commit
render deployments:create --service zoundly-backend

# Deploy specific commit
render deployments:create --service zoundly-backend --commit <commit-hash>
```

---

## Common CLI Commands

```bash
# Login
render login

# Logout
render logout

# List all services
render services:list

# Show service details
render services:show <service-name>

# View logs (real-time)
render logs <service-name>

# View logs (last 100 lines)
render logs <service-name> --tail 100

# List deployments
render deployments:list --service <service-name>

# Show deployment details
render deployments:show <deployment-id> --service <service-name>

# Set environment variable
render env:set KEY="value" --service <service-name>

# List environment variables
render env:list --service <service-name>

# Unset environment variable
render env:unset KEY --service <service-name>

# Get service URL
render services:show <service-name> | grep "URL"
```

---

## Quick Deploy Script

Create a file `deploy.sh` (or `deploy.bat` for Windows):

```bash
#!/bin/bash

# Deploy to Render
echo "🚀 Deploying to Render..."

# Login (if not already)
render login

# Deploy using blueprint
render blueprint launch

# Add environment variables
echo "📝 Adding environment variables..."
read -p "Enter MongoDB URI: " MONGODB_URI
read -p "Enter JWT Secret: " JWT_SECRET
read -p "Enter JWT Refresh Secret: " JWT_REFRESH_SECRET
read -p "Enter Frontend URL: " FRONTEND_URL
read -p "Enter Razorpay Key ID: " RAZORPAY_KEY_ID
read -p "Enter Razorpay Key Secret: " RAZORPAY_KEY_SECRET

render env:set MONGODB_URI="$MONGODB_URI" --service zoundly-backend
render env:set JWT_SECRET="$JWT_SECRET" --service zoundly-backend
render env:set JWT_REFRESH_SECRET="$JWT_REFRESH_SECRET" --service zoundly-backend
render env:set FRONTEND_URL="$FRONTEND_URL" --service zoundly-backend
render env:set RAZORPAY_KEY_ID="$RAZORPAY_KEY_ID" --service zoundly-backend
render env:set RAZORPAY_KEY_SECRET="$RAZORPAY_KEY_SECRET" --service zoundly-backend

echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run it:
```bash
./deploy.sh
```

---

## Troubleshooting

### CLI not found
```bash
# Make sure npm global bin is in your PATH
npm config get prefix
# Add that path to your PATH environment variable
```

### Authentication failed
```bash
# Logout and login again
render logout
render login
```

### Service not found
```bash
# List all services to see exact name
render services:list
```

### View detailed logs
```bash
# Follow logs in real-time
render logs zoundly-backend --follow

# View last 500 lines
render logs zoundly-backend --tail 500
```

---

## Advantages of CLI Deployment

✅ **Automation:** Can be scripted and automated  
✅ **CI/CD:** Easy to integrate with GitHub Actions, etc.  
✅ **Version Control:** Deployment commands can be tracked  
✅ **Faster:** No need to use web interface  
✅ **Batch Operations:** Can manage multiple services at once  

---

## Next Steps

After deployment:
1. ✅ Test your backend: `https://your-backend.onrender.com/api/health`
2. ✅ Update frontend `VITE_API_URL` environment variable
3. ✅ Set up Razorpay webhooks
4. ✅ Test full application flow

---

## Resources

- **Render CLI Docs:** https://render.com/docs/cli
- **Render CLI GitHub:** https://github.com/renderinc/cli
- **Render Dashboard:** https://dashboard.render.com/


