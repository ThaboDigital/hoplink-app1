# HobLink - Rural Ride-Hailing App

*"Hob in. Link up. Let's go."*  
*"Safe, Simple Rides — Wherever You Are."*

HobLink is a responsive, mobile-first ride-hailing web application designed specifically for rural and semi-rural users in South Africa (e.g., Limpopo, Tzaneen). Built with performance and accessibility in mind for users with slower devices and limited data.

## Features

### Core Functionality
- ✅ **User & Driver Registration/Login** - Firebase Auth with Google/Facebook integration
- ✅ **Ride Booking** - Pickup and drop-off via map or address input
- ✅ **Ride Type Selection** - Standard, Comfort, and Share options
- ✅ **Fare Estimation** - Real-time fare calculation
- ✅ **Real-time Ride Status** - Live tracking and updates
- ✅ **Payment Processing** - Cash, SnapScan, PayFast, Yoco, and mobile wallets
- ✅ **Admin Dashboard** - User, driver, pricing, and booking management
- ✅ **Driver Dashboard** - Earnings, rides, and status management

### Design Features
- 📱 **Mobile-first responsive design**
- ⚡ **Optimized for slow devices and limited data**
- 🎨 **Modern UI with Inter/Poppins fonts**
- 🌙 **Dark/Light mode support**
- 🖼️ **HobLink branding integration**

## Tech Stack

- **Frontend**: React.js 18 with TypeScript
- **Styling**: TailwindCSS
- **Authentication**: Firebase Auth
- **Database**: Supabase (PostgreSQL)
- **Maps**: Google Maps API / Mapbox
- **Payments**: PayFast, Yoco, SnapScan integration
- **Real-time**: Supabase Realtime

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Firebase project
- Supabase project
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd hoblink-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your actual API keys:
   ```env
   # Firebase Configuration
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef123456

   # Supabase Configuration
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Google Maps Configuration
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Payment Gateway Configuration
   REACT_APP_PAYFAST_MERCHANT_ID=your_payfast_merchant_id
   REACT_APP_PAYFAST_MERCHANT_KEY=your_payfast_merchant_key
   REACT_APP_YOCO_PUBLIC_KEY=your_yoco_public_key
   ```

4. **Database Setup (Supabase)**
   
   Run the following SQL in your Supabase SQL editor:
   
   ```sql
   -- Users table
   CREATE TABLE users (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     full_name TEXT NOT NULL,
     phone TEXT,
     user_type TEXT CHECK (user_type IN ('rider', 'driver', 'admin')) NOT NULL,
     profile_image_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Vehicles table
   CREATE TABLE vehicles (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     driver_id UUID REFERENCES users(id),
     make TEXT NOT NULL,
     model TEXT NOT NULL,
     year INTEGER NOT NULL,
     license_plate TEXT UNIQUE NOT NULL,
     color TEXT NOT NULL,
     seats INTEGER NOT NULL DEFAULT 4,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Drivers table
   CREATE TABLE drivers (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES users(id) UNIQUE,
     license_number TEXT UNIQUE NOT NULL,
     vehicle_id UUID REFERENCES vehicles(id),
     is_verified BOOLEAN DEFAULT FALSE,
     is_online BOOLEAN DEFAULT FALSE,
     current_location JSONB,
     rating DECIMAL(3,2) DEFAULT 5.0,
     total_rides INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Rides table
   CREATE TABLE rides (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     rider_id UUID REFERENCES users(id),
     driver_id UUID REFERENCES drivers(id),
     pickup_location JSONB NOT NULL,
     dropoff_location JSONB NOT NULL,
     ride_type TEXT CHECK (ride_type IN ('standard', 'comfort', 'share')) NOT NULL,
     status TEXT CHECK (status IN ('requested', 'driver_assigned', 'driver_arriving', 'in_progress', 'completed', 'cancelled')) DEFAULT 'requested',
     fare DECIMAL(10,2),
     distance DECIMAL(10,2),
     duration INTEGER,
     payment_method TEXT CHECK (payment_method IN ('cash', 'snapscan', 'payfast', 'yoco', 'other')),
     payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')) DEFAULT 'pending',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Payments table
   CREATE TABLE payments (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     ride_id UUID REFERENCES rides(id),
     amount DECIMAL(10,2) NOT NULL,
     currency TEXT DEFAULT 'ZAR',
     payment_method TEXT NOT NULL,
     payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
     transaction_id TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;
   ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE rides ENABLE ROW LEVEL SECURITY;
   ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

   -- Create policies (basic examples - adjust as needed)
   CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid()::text = id::text);
   CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid()::text = id::text);
   ```

5. **Firebase Setup**
   - Create a Firebase project at https://console.firebase.google.com/
   - Enable Authentication with Email/Password, Google, and Facebook
   - Copy your config to the environment variables

6. **Start the development server**
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`

## Project Structure

```
hoblink-app/
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── LoadingSpinner.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── RideBookingPage.tsx
│   │   ├── RideTrackingPage.tsx
│   │   ├── DriverDashboard.tsx
│   │   └── AdminDashboard.tsx
│   ├── services/         # API and external services
│   │   ├── auth.ts
│   │   ├── firebase.ts
│   │   └── supabase.ts
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx
│   └── index.tsx
├── tailwind.config.js
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
Set the following environment variables in your hosting platform:
- All `REACT_APP_*` variables from your `.env.local`

### Recommended Hosting
- **Vercel** - Automatic deployments from Git
- **Netlify** - Easy static site hosting
- **Firebase Hosting** - Integrates well with Firebase Auth

## API Integration

### Payment Gateways

#### PayFast
- Merchant ID and Key required
- Supports ZAR payments
- ITN (Instant Transaction Notification) webhook needed

#### Yoco
- Public key for frontend integration
- Webhook URL for payment confirmations

#### SnapScan
- QR code generation for payments
- Webhook integration for status updates

### Google Maps
- Places API for address autocomplete
- Directions API for route calculation
- Maps JavaScript API for map display

## Performance Optimizations

- **Code Splitting** - Lazy loading of routes
- **Image Optimization** - WebP format with fallbacks
- **Bundle Size** - Tree shaking and minification
- **Caching** - Service worker for offline functionality
- **Data Usage** - Compressed API responses

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@thabodigital.co.za or create an issue in this repository.

---

**Built by Thabo Digital** - Empowering rural communities through technology.