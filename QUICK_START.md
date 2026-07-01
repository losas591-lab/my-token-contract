# 🚀 Quick Reference - Your Credentials

**Print or Save This Page Securely!**

---

## Step-by-Step Credential Generation

### 1️⃣ MongoDB Atlas

**Time**: 5 minutes

1. Go to: https://www.mongodb.com/atlas/database
2. Click "Try Free"
3. Sign up with your email
4. Create free cluster (M0)
5. Add database user:
   - Username: `notificationuser`
   - Password: `NotifPass@2024#Secure` (save this!)
6. Allow network access: `0.0.0.0/0` (for development)
7. Get connection string

**Your MongoDB URI:**
```
MONGODB_URI = mongodb+srv://notificationuser:NotifPass@2024#Secure@cluster0.xxxxx.mongodb.net/notification-system?retryWrites=true&w=majority
```

---

### 2️⃣ Twilio SMS

**Time**: 10 minutes

1. Go to: https://www.twilio.com/try-twilio
2. Sign up with email + phone verification
3. Get your Account SID and Auth Token from dashboard
4. Get an SMS phone number from "Phone Numbers" → "Manage"

**Your Twilio Credentials:**
```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = your-auth-token-here
TWILIO_PHONE_NUMBER = +1234567890
```

---

### 3️⃣ Gmail App Password

**Time**: 5 minutes

1. Go to: https://myaccount.google.com/security
2. Enable 2-Factor Authentication
3. Scroll to "App passwords"
4. Generate app password for Mail
5. Copy the 16-character password

**Your Gmail Credentials:**
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = xxxx xxxx xxxx xxxx
```

---

## Backend Environment (.env)

**Location**: `notification-system/.env`

Copy and paste this, filling in your credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=YOUR_MONGODB_URI_HERE

# JWT
JWT_SECRET=your_super_secret_jwt_key_12345
JWT_EXPIRE=7d

# Twilio
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_PHONE_NUMBER=YOUR_TWILIO_PHONE_NUMBER

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=YOUR_EMAIL@gmail.com
EMAIL_PASSWORD=YOUR_APP_PASSWORD
EMAIL_FROM_NAME=Flash Notifications
EMAIL_FROM_ADDRESS=YOUR_EMAIL@gmail.com

# Security
ENCRYPTION_KEY=your-encryption-key-32-chars-long!
API_RATE_LIMIT=100

# Logging
LOG_LEVEL=debug
```

---

## Frontend Environment (.env)

**Location**: `frontend/.env`

```env
REACT_APP_API_URL=http://localhost:3000/api
```

---

## 🚀 Local Commands

**Terminal 1 - Backend:**
```bash
cd notification-system
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm start
```

**Terminal 3 - Test API:**
```bash
curl http://localhost:3000/api/health
```

---

## 📱 Test Account

Use these credentials to test:

```
Username: testuser
Email: test@example.com
Password: TestPassword123!
Phone: +1234567890
```

---

## 🌐 Production Deployment

### Deploy Frontend to Vercel
1. https://vercel.com/signup (use GitHub)
2. New Project → Select repository
3. Root Directory: `frontend`
4. Deploy

**Live URL**: https://notification-flash-{username}.vercel.app

### Deploy Backend to Render
1. https://render.com (use GitHub)
2. New Web Service
3. Build Command: `cd notification-system && npm install`
4. Start Command: `cd notification-system && npm start`
5. Add environment variables
6. Deploy

**Live URL**: https://notification-flash-api.onrender.com

---

## 🔐 Security Checklist

- [ ] `.env` files are in `.gitignore` (NEVER commit credentials)
- [ ] MongoDB IP whitelist configured
- [ ] Twilio credentials saved securely
- [ ] Gmail app password used (not main password)
- [ ] Production API URL updated in frontend
- [ ] HTTPS only in production
- [ ] Regular backups enabled

---

**Need help?** Check `COMPLETE_SETUP_GUIDE.md` for detailed instructions!
