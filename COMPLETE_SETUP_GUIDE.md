# 🚀 Complete Setup Guide - Notification Flash System

**Estimated Time: 30-45 minutes**

This guide will walk you through setting up your own **Notification Flash System** with real credentials and live deployment.

---

## 📋 Table of Contents

1. [MongoDB Atlas Setup](#1-mongodb-atlas-setup) (5 min)
2. [Twilio Account Setup](#2-twilio-account-setup) (10 min)
3. [Gmail App Password](#3-gmail-app-password) (5 min)
4. [Backend Configuration](#4-backend-configuration) (5 min)
5. [Frontend Configuration](#5-frontend-configuration) (3 min)
6. [Local Testing](#6-local-testing) (5 min)
7. [Docker Deployment](#7-docker-deployment) (5 min)
8. [Production Deployment](#8-production-deployment) (15 min)

---

## 1. MongoDB Atlas Setup

### Step 1.1: Create MongoDB Account
1. Go to: https://www.mongodb.com/atlas/database
2. Click **"Try Free"**
3. Sign up with:
   - Email: Your personal email
   - Password: Create a strong password
   - Or use Google/GitHub login

### Step 1.2: Create Your First Cluster
1. Click **"Build a Database"**
2. Select **FREE** option (M0 Sandbox)
3. Choose cloud provider:
   - ✅ **AWS** (most common)
   - Region: Pick closest to you
4. Click **"Create"**
5. Wait 2-3 minutes for cluster creation

### Step 1.3: Create Database User
1. Click **"Database Access"** in left menu
2. Click **"Add New Database User"**
3. **Authentication Method**: Password
4. **Username**: `notificationuser`
5. **Password**: Generate a strong one or use:
   ```
   NotifPass@2024#Secure
   ```
   ⚠️ **SAVE THIS PASSWORD!**
6. **Built-in Roles**: Select "Atlas admin"
7. Click **"Add User"**

### Step 1.4: Allow Network Access
1. Click **"Network Access"** in left menu
2. Click **"Add IP Address"**
3. Choose:
   - ✅ **For Development**: "Allow access from anywhere" (0.0.0.0/0)
   - ✅ **For Production**: Add your specific IP
4. Click **"Confirm"**

### Step 1.5: Get Connection String
1. Click **"Databases"** → **"Connect"**
2. Choose **"Drivers"**
3. Select **Node.js** driver
4. Copy the connection string:
   ```
   mongodb+srv://notificationuser:NotifPass@2024#Secure@cluster0.xxxxx.mongodb.net/notification-system?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

**✅ SAVE YOUR MONGODB_URI:**
```
MongoDB URI = mongodb+srv://notificationuser:NotifPass@2024#Secure@cluster0.xxxxx.mongodb.net/notification-system?retryWrites=true&w=majority
```

---

## 2. Twilio Account Setup

### Step 2.1: Create Twilio Account
1. Go to: https://www.twilio.com/try-twilio
2. Sign up with:
   - Email: Your personal email
   - Phone: Your actual phone number (for verification)
   - Password: Create strong password
3. Verify your email
4. Verify your phone (SMS code will be sent)

### Step 2.2: Get Twilio Credentials
1. You'll see your **Twilio Console Dashboard**
2. Look for **"Account SID"** and **"Auth Token"**
3. Copy these values:

**✅ SAVE YOUR TWILIO CREDENTIALS:**
```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = your-auth-token-here
```

### Step 2.3: Get SMS Phone Number
1. In left menu, go **"Develop"** → **"Phone Numbers"** → **"Manage"**
2. Click **"Get a number"**
3. Select your country
4. Choose a number you like
5. Click **"Search"** then **"Select"**

**✅ SAVE YOUR TWILIO PHONE:**
```
TWILIO_PHONE_NUMBER = +1234567890  (your assigned number)
```

### Step 2.4: Add Credit (Optional for Testing)
1. **Free Account Includes**: $15 credit
2. To send more than test messages, add payment method:
   - Go to **"Billing"** → **"Add Payment Method"**
   - Add credit/debit card

---

## 3. Gmail App Password

### Step 3.1: Enable 2-Factor Authentication
1. Go to: https://myaccount.google.com
2. Left menu → **"Security"**
3. Scroll to **"2-Step Verification"**
4. Click **"Get started"**
5. Follow Google's prompts

### Step 3.2: Create App Password
1. Go back to: https://myaccount.google.com/security
2. Scroll to **"App passwords"** (only appears if 2FA is enabled)
3. Select:
   - **App**: "Mail"
   - **Device**: "Windows Computer" (or your device)
4. Click **"Generate"**
5. Google shows 16-character password

**✅ SAVE YOUR GMAIL CREDENTIALS:**
```
EMAIL_USER = your-email@gmail.com
EMAIL_PASSWORD = xxxx xxxx xxxx xxxx  (16-char app password)
```

---

## 4. Backend Configuration

### Step 4.1: Create .env File

1. Navigate to your project:
   ```bash
   cd my-token-contract/notification-system
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` in your editor and fill in your credentials:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database - PASTE YOUR MONGODB_URI HERE
MONGODB_URI=mongodb+srv://notificationuser:NotifPass@2024#Secure@cluster0.xxxxx.mongodb.net/notification-system?retryWrites=true&w=majority

# JWT - Generate random strings
JWT_SECRET=your_super_secret_jwt_key_change_this_12345
JWT_EXPIRE=7d

# Twilio SMS Configuration - PASTE YOUR TWILIO CREDENTIALS
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your-twilio-auth-token-here
TWILIO_PHONE_NUMBER=+1234567890

# Email Configuration - PASTE YOUR GMAIL CREDENTIALS
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM_NAME=Flash Notifications
EMAIL_FROM_ADDRESS=your-email@gmail.com

# Security
ENCRYPTION_KEY=your-encryption-key-32-chars-long!
API_RATE_LIMIT=100

# Logging
LOG_LEVEL=debug
```

### Step 4.2: Install Backend Dependencies

```bash
cd notification-system
npm install
```

---

## 5. Frontend Configuration

### Step 5.1: Create Frontend .env File

1. Navigate to frontend:
   ```bash
   cd ../frontend
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env`:
   ```env
   REACT_APP_API_URL=http://localhost:3000/api
   ```

### Step 5.2: Install Frontend Dependencies

```bash
npm install
```

---

## 6. Local Testing

### Step 6.1: Start Backend Server

**Terminal 1:**
```bash
cd notification-system
npm run dev
```

You should see:
```
🚀 Notification Flash System running on port 3000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

### Step 6.2: Test Backend Health

**Terminal 2:**
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Notification Flash System is running",
  "timestamp": "2024-07-01T12:34:56.789Z"
}
```

### Step 6.3: Start Frontend Server

**Terminal 3:**
```bash
cd frontend
npm start
```

Your browser should open automatically to: `http://localhost:3000`

### Step 6.4: Test the System

1. **Register a new account:**
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `TestPassword123!`
   - Phone: `+1234567890`
   - Click **"Create Account"**

2. **Go to Dashboard:**
   - You should see statistics (all 0 initially)

3. **Send Test SMS:**
   - Go to **"Send Notification"** → **SMS** tab
   - Recipient: Your actual phone number
   - Message: `Test notification from Flash System`
   - Masked Data: `••••1234`
   - Click **"Send Notification"**

4. **Check Notification History:**
   - Go to **"History"**
   - You should see your test SMS
   - Status should show "sent" or "pending"

✅ **If you received the SMS and see it in history, everything works!**

---

## 7. Docker Deployment

### Step 7.1: Create Backend Dockerfile

Create `notification-system/Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
```

### Step 7.2: Create Docker Compose

Create `docker-compose.yml` in root:

```yaml
version: '3.8'

services:
  backend:
    build: ./notification-system
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
      - TWILIO_PHONE_NUMBER=${TWILIO_PHONE_NUMBER}
      - EMAIL_USER=${EMAIL_USER}
      - EMAIL_PASSWORD=${EMAIL_PASSWORD}
    depends_on:
      - mongo

  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  frontend:
    build: ./frontend
    ports:
      - "3001:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:3000/api
    depends_on:
      - backend

volumes:
  mongo_data:
```

### Step 7.3: Build and Run Docker

```bash
# Build images
docker-compose build

# Start services
docker-compose up
```

Your services will be available at:
- Frontend: `http://localhost:3001`
- Backend: `http://localhost:3000/api`

---

## 8. Production Deployment

### Option A: Deploy Frontend to Vercel (Free)

#### Step 8A.1: Create Vercel Account
1. Go to: https://vercel.com/signup
2. Sign up with GitHub account
3. Grant permissions

#### Step 8A.2: Deploy Frontend
1. Click **"New Project"**
2. Select your GitHub repository
3. Configure:
   - **Framework**: React
   - **Root Directory**: `frontend`
   - **Environment Variables**:
     ```
     REACT_APP_API_URL=https://your-backend-url.com/api
     ```
4. Click **"Deploy"**

**✅ Your frontend is now live!**
Example: `https://notification-flash-losas591lab.vercel.app`

---

### Option B: Deploy Backend to Render (Free)

#### Step 8B.1: Create Render Account
1. Go to: https://render.com
2. Sign up with GitHub
3. Grant permissions

#### Step 8B.2: Create Web Service
1. Click **"New+"** → **"Web Service"**
2. Select your GitHub repository
3. Configure:
   - **Name**: `notification-flash-api`
   - **Environment**: `Node`
   - **Build Command**: `cd notification-system && npm install`
   - **Start Command**: `cd notification-system && npm start`
   - **Plan**: Free

#### Step 8B.3: Add Environment Variables
In **"Environment"** section, add all your `.env` variables:
- `MONGODB_URI`
- `JWT_SECRET`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE_NUMBER`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- etc.

#### Step 8B.4: Deploy
Click **"Create Web Service"**

**✅ Your backend is now live!**
Example: `https://notification-flash-api.onrender.com`

---

### Option C: Deploy Backend to Railway (Free Tier)

#### Step 8C.1: Create Railway Account
1. Go to: https://railway.app
2. Sign up with GitHub

#### Step 8C.2: Create New Project
1. Click **"New Project"** → **"Deploy from GitHub repo"**
2. Select your repository

#### Step 8C.3: Add MongoDB Plugin
1. Click **"+"** button
2. Search for **"MongoDB"**
3. Add it (Railway provides free MongoDB!)

#### Step 8C.4: Configure Backend Service
1. Click **"notification-system"** service
2. Add variables from your `.env`
3. Set **"Start Command"**: `npm run dev` (in notification-system directory)

**✅ Backend deployed to Railway!**

---

## 📊 Your Credentials Summary

**Save this information securely:**

```
========================================
📱 NOTIFICATION FLASH SYSTEM CREDENTIALS
========================================

🗄️ DATABASE
URL: mongodb+srv://notificationuser:NotifPass@2024#Secure@cluster0.xxxxx.mongodb.net
Username: notificationuser
Password: NotifPass@2024#Secure

📱 TWILIO (SMS)
Account SID: ACxxxxxxxxxxxxxxxxxxxxxxxx
Auth Token: your-auth-token-here
Phone Number: +1234567890

📧 GMAIL (Email)
Email: your-email@gmail.com
App Password: xxxx xxxx xxxx xxxx

🔑 JWT
Secret: your_super_secret_jwt_key_change_this_12345

🌐 LIVE URLS (After Deployment)
Frontend: https://notification-flash-losas591lab.vercel.app
Backend: https://notification-flash-api.onrender.com

========================================
```

---

## 🧪 Testing Checklist

- [ ] MongoDB Atlas account created and tested
- [ ] Twilio account created with SMS capability
- [ ] Gmail app password generated
- [ ] Backend `.env` file configured
- [ ] Frontend `.env` file configured
- [ ] Local backend runs without errors
- [ ] Local frontend loads at localhost:3000
- [ ] Can register a new user
- [ ] Can send test SMS
- [ ] Can send test email
- [ ] Notification history shows entries
- [ ] User preferences can be toggled
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render/Railway
- [ ] Live URLs are accessible

---

## 🆘 Troubleshooting

### MongoDB Connection Error
**Error**: `MongoError: connect ECONNREFUSED`
- ✅ Check internet connection
- ✅ Verify MongoDB_URI in `.env`
- ✅ Check IP whitelist in MongoDB Atlas (Network Access)
- ✅ Verify username/password

### Twilio SMS Not Sending
**Error**: `Invalid To Number`
- ✅ Use E.164 format: `+1234567890`
- ✅ Verify account has credits
- ✅ Check TWILIO_ACCOUNT_SID and AUTH_TOKEN

### Email Not Sending
**Error**: `Invalid login credentials`
- ✅ Use app-specific password (not regular Gmail password)
- ✅ Verify 2FA is enabled on Gmail
- ✅ Check EMAIL_USER is correct

### Frontend Can't Connect to Backend
**Error**: `CORS error` or `Failed to fetch`
- ✅ Backend must be running
- ✅ Verify REACT_APP_API_URL in frontend `.env`
- ✅ Check backend CORS settings

---

## 📚 Additional Resources

- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas/)
- [Twilio SMS Docs](https://www.twilio.com/docs/sms)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)
- [Vercel Deployment](https://vercel.com/docs)
- [Render Deployment](https://render.com/docs)
- [Railway Deployment](https://railway.app/docs)

---

**🎉 Congratulations! Your notification system is now live and running!**

For questions or issues, check the troubleshooting section above.
