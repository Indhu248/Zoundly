# Zoundly Backend Deployment Helper Script
# This script prepares everything you need to deploy to Render

Write-Host "🚀 Zoundly Backend Deployment Helper" -ForegroundColor Cyan
Write-Host "====================================`n" -ForegroundColor Cyan

# Generate JWT Secrets
Write-Host "📝 Generating JWT Secrets..." -ForegroundColor Yellow
$jwtSecretOutput = node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" 2>&1
$jwtSecret = $jwtSecretOutput | Where-Object { $_ -notmatch '^npm' } | Select-Object -First 1
$jwtRefreshSecretOutput = node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" 2>&1
$jwtRefreshSecret = $jwtRefreshSecretOutput | Where-Object { $_ -notmatch '^npm' } | Select-Object -First 1

Write-Host "`n✅ Generated Secrets:`n" -ForegroundColor Green
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor White
Write-Host "JWT_REFRESH_SECRET=$jwtRefreshSecret" -ForegroundColor White

Write-Host "`n📋 Deployment Checklist:`n" -ForegroundColor Yellow
Write-Host "Before deploying, make sure you have:" -ForegroundColor White
Write-Host "  [ ] MongoDB Atlas account created" -ForegroundColor Gray
Write-Host "  [ ] MongoDB connection string ready" -ForegroundColor Gray
Write-Host "  [ ] Razorpay account and API keys" -ForegroundColor Gray
Write-Host "  [ ] Frontend URL (if frontend is deployed)" -ForegroundColor Gray

Write-Host "`n🌐 Next Steps:`n" -ForegroundColor Yellow
Write-Host "1. Open Render Dashboard: https://dashboard.render.com/" -ForegroundColor White
Write-Host "2. Click 'New +' → 'Web Service'" -ForegroundColor White
Write-Host "3. Connect GitHub repository: Indhu248/Zoundly" -ForegroundColor White
Write-Host "4. Configure settings:" -ForegroundColor White
Write-Host "   - Name: zoundly-backend" -ForegroundColor Gray
Write-Host "   - Root Directory: backend" -ForegroundColor Gray
Write-Host "   - Build Command: npm install" -ForegroundColor Gray
Write-Host "   - Start Command: npm start" -ForegroundColor Gray
Write-Host "   - Instance Type: Free" -ForegroundColor Gray

Write-Host "`n5. Add Environment Variables:`n" -ForegroundColor Yellow
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "PORT=10000" -ForegroundColor White
Write-Host "FRONTEND_URL=https://your-frontend.vercel.app" -ForegroundColor White
Write-Host "MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/zoundly?retryWrites=true&w=majority" -ForegroundColor White
Write-Host "JWT_SECRET=$jwtSecret" -ForegroundColor Green
Write-Host "JWT_REFRESH_SECRET=$jwtRefreshSecret" -ForegroundColor Green
Write-Host "JWT_EXPIRES_IN=15m" -ForegroundColor White
Write-Host "JWT_REFRESH_EXPIRES_IN=7d" -ForegroundColor White
Write-Host "RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx" -ForegroundColor White
Write-Host "RAZORPAY_KEY_SECRET=your_razorpay_secret_key" -ForegroundColor White
Write-Host "RAZORPAY_WEBHOOK_SECRET=your_webhook_secret" -ForegroundColor White

Write-Host "`n6. Click 'Create Web Service' and wait 2-5 minutes`n" -ForegroundColor Yellow

Write-Host "✨ Your backend will be live at: https://zoundly-backend.onrender.com`n" -ForegroundColor Cyan

# Save secrets to file for reference
$secretsFile = "deployment-secrets.txt"
@"
JWT_SECRET=$jwtSecret
JWT_REFRESH_SECRET=$jwtRefreshSecret
"@ | Out-File -FilePath $secretsFile -Encoding utf8

Write-Host "💾 Secrets saved to: $secretsFile (keep this safe!)`n" -ForegroundColor Yellow

Write-Host "Press any key to open Render Dashboard..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Process "https://dashboard.render.com/"

