# Notification Flash Dashboard

A modern React-based frontend dashboard for the Notification Flash System.

## Features

- 🎨 Beautiful, responsive UI with Tailwind CSS
- 📱 Mobile-friendly design
- 🔐 JWT-based authentication
- 📊 Real-time dashboard with statistics
- 📨 Send SMS and Email notifications
- 📜 Notification history with filtering
- ⚙️ User preference management
- 📥 Export notification data to CSV
- 🎯 Intuitive navigation

## Setup

1. Install dependencies
```bash
cd frontend
npm install
```

2. Configure environment
```bash
cp .env.example .env
# Edit .env with your API URL
```

3. Start development server
```bash
npm start
```

4. Build for production
```bash
npm run build
```

## Project Structure

```
frontend/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # Zustand stores
│   ├── App.js           # Main app component
│   ├── index.js         # Entry point
│   └── index.css        # Global styles
└── package.json
```

## Technologies

- React 18
- React Router v6
- Tailwind CSS
- Zustand (State Management)
- Axios (API Client)
- React Icons
- Recharts (Charts)
- React Toastify (Notifications)

## API Integration

The dashboard connects to the backend API endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /notifications/send-sms` - Send SMS
- `POST /notifications/send-email` - Send Email
- `GET /notifications/history` - Get notification history
- `PATCH /notifications/preferences` - Update preferences

## Environment Variables

```
REACT_APP_API_URL=http://localhost:3000/api
```

## License

MIT
