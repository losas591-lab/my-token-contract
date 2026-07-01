# Notification Flash System

A secure, enterprise-grade notification delivery system for sending SMS and Email alerts with sensitive banking information. Built with Node.js, Express, MongoDB, and integrated with Twilio and Nodemailer.

## 🔒 Security Features

- **Data Masking**: Automatically masks sensitive information (e.g., account numbers)
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against abuse and spam
- **Helmet.js**: HTTP headers security
- **CORS**: Cross-origin resource sharing protection
- **Password Hashing**: bcryptjs for secure password storage
- **Audit Logging**: Complete notification tracking and delivery logs
- **TLS/SMTP**: Encrypted email transmission
- **TTL Indexes**: Automatic notification log cleanup (90-day retention)

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- MongoDB
- Twilio Account (for SMS)
- SMTP Account (for Email)

### Installation

1. Clone the repository
```bash
git clone https://github.com/losas591-lab/my-token-contract.git
cd notification-system
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Start the server
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication

**Register**
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "secure_password",
  "phone": "+1234567890"
}
```

**Login**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "secure_password"
}
```

### Notifications

**Send SMS**
```
POST /api/notifications/send-sms
Authorization: Bearer {token}
Content-Type: application/json

{
  "to": "+1234567890",
  "message": "Alert: A transaction of $500 was made from your account ending in 1234.",
  "maskedData": "••••1234"
}
```

**Send Email**
```
POST /api/notifications/send-email
Authorization: Bearer {token}
Content-Type: application/json

{
  "to": "customer@example.com",
  "subject": "Transaction Alert",
  "htmlContent": "<h1>Alert</h1><p>Transaction detected on account ••••1234</p>",
  "maskedData": "••••1234"
}
```

**Get Notification History**
```
GET /api/notifications/history
Authorization: Bearer {token}
```

**Update Preferences**
```
PATCH /api/notifications/preferences
Authorization: Bearer {token}
Content-Type: application/json

{
  "smsNotifications": true,
  "emailNotifications": true,
  "pushNotifications": false
}
```

## 🏗️ Project Structure

```
notification-system/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB configuration
│   ├── models/
│   │   ├── User.js              # User schema with auth
│   │   └── Notification.js      # Notification tracking
│   ├── services/
│   │   ├── smsService.js        # Twilio SMS integration
│   │   └── emailService.js      # Nodemailer integration
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   └── notifications.js     # Notification routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   └── index.js                 # Main server file
├── .env.example                  # Environment template
├── package.json
└── README.md
```

## 🔐 Best Practices

### Data Handling
- ✅ **Never** send full account numbers via SMS/Email
- ✅ **Always** mask sensitive data (show only last 4 digits)
- ✅ **Encrypt** data in transit (TLS/HTTPS)
- ✅ **Log** all notification deliveries for audit trails

### Compliance
- ✅ GDPR compliant data retention (90-day TTL)
- ✅ PCI-DSS ready for banking data
- ✅ HIPAA compatible for healthcare alerts
- ✅ SOC 2 audit logging

### Performance
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Database indexing on timestamps
- ✅ Automatic notification cleanup

## 📊 Monitoring

### Health Check
```
GET /api/health
```

### Notification Status Tracking
- `pending` - Queued for delivery
- `sent` - Successfully delivered
- `failed` - Delivery failed
- `bounced` - Invalid recipient

## 🛠️ Development

### Run tests
```bash
npm test
```

### Linting
```bash
npm run lint
```

## 📝 Environment Variables

See `.env.example` for all available configuration options:
- **PORT**: Server port (default: 3000)
- **MONGODB_URI**: MongoDB connection string
- **JWT_SECRET**: Secret key for JWT tokens
- **TWILIO_***: Twilio credentials
- **EMAIL_***: SMTP configuration

## 🚨 Important Notes

⚠️ **Security Warning**: Never expose API keys or credentials in version control.
⚠️ **Compliance**: Ensure compliance with local banking and data protection regulations.
⚠️ **Testing**: Always test in a sandbox environment before production deployment.

## 📄 License

MIT

## 👨‍💻 Author

losas591-lab

---

**Built with security and compliance in mind** 🔒
