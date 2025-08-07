# 🗄️ HobLink Supabase Setup Guide

This guide will help you set up Supabase for the HobLink ride-hailing app.

## 📋 Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Environment Variables**: You'll need your Supabase URL and anon key

## 🚀 Step-by-Step Setup

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `hoblink-app`
   - **Database Password**: Choose a secure password
   - **Region**: Choose closest to South Africa (e.g., `ap-southeast-1`)
5. Click "Create new project"

### 2. Get Your Project Credentials

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: `https://your-project.supabase.co`
   - **Project API Keys** → **anon** **public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 3. Set Up Environment Variables

1. In your `hoblink-app` folder, create/update `.env`:

```bash
# Firebase Configuration (existing)
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abcdef

# Supabase Configuration (new)
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Create Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire content from `supabase-schema.sql`
3. Paste it into the SQL Editor
4. Click **Run** to execute the schema

This will create:
- ✅ **users** table (extends Supabase auth)
- ✅ **drivers** table (driver profiles and vehicles)
- ✅ **rides** table (ride bookings and tracking)
- ✅ **ride_tracking** table (real-time location updates)
- ✅ **ride_ratings** table (user ratings for drivers)
- ✅ **payment_transactions** table (payment processing)
- ✅ **ride_types** table (ride type configurations)
- ✅ **Row Level Security (RLS)** policies
- ✅ **Indexes** for performance
- ✅ **Triggers** for automatic timestamps

### 5. Configure Authentication

1. Go to **Authentication** → **Settings**
2. Under **Site URL**, add: `http://localhost:3000`
3. Under **Redirect URLs**, add: `http://localhost:3000/**`

#### Enable Social Providers (Optional)

If you want to keep Firebase Auth for social logins:
1. Keep your existing Firebase setup
2. Use Firebase for authentication
3. Use Supabase for data storage only

Or switch to Supabase Auth:
1. Go to **Authentication** → **Providers**
2. Configure **Google** and **Facebook** providers
3. Update your auth service to use Supabase instead of Firebase

### 6. Test the Database

1. Go to **Table Editor**
2. You should see all the tables created
3. Try inserting a test user in the **users** table
4. Check that RLS policies are working

### 7. Set Up Real-time (Optional)

1. Go to **Database** → **Replication**
2. Enable real-time for these tables:
   - ✅ `rides` (for ride status updates)
   - ✅ `ride_tracking` (for driver location)
   - ✅ `drivers` (for driver availability)

## 🔧 Development Workflow

### Testing Database Functions

You can test the database service functions in your browser console:

```javascript
import { DatabaseService } from './src/services/database';

// Test creating a ride
const rideData = {
  user_id: 'user-uuid',
  pickup_address: 'Tzaneen CBD, Limpopo',
  dropoff_address: 'Polokwane Airport, Limpopo',
  ride_type: 'standard',
  fare: 180,
  status: 'pending',
  payment_status: 'pending'
};

DatabaseService.createRide(rideData)
  .then(ride => console.log('Ride created:', ride))
  .catch(error => console.error('Error:', error));
```

### Common Queries

```sql
-- Check all rides
SELECT * FROM rides ORDER BY created_at DESC;

-- Check user profiles
SELECT * FROM users;

-- Check ride with user info
SELECT 
  rides.*,
  users.email,
  users.full_name
FROM rides 
JOIN users ON rides.user_id = users.id
ORDER BY rides.created_at DESC;
```

## 🛡️ Security Notes

1. **Row Level Security**: All tables have RLS enabled
2. **API Keys**: Never commit your `.env` file
3. **Policies**: Users can only see their own data
4. **Validation**: All inputs are validated at the database level

## 🚨 Troubleshooting

### Common Issues

1. **"relation does not exist"**
   - Make sure you ran the schema SQL
   - Check table names are correct

2. **"permission denied"**
   - Check RLS policies
   - Make sure user is authenticated

3. **"column does not exist"**
   - Verify column names match schema
   - Check for typos in field names

4. **Connection errors**
   - Verify environment variables
   - Check Supabase project is active

### Debug Mode

Add to your `.env` for debugging:
```bash
REACT_APP_DEBUG_SUPABASE=true
```

## 📈 Next Steps

After setup:
1. ✅ **Test ride booking** - Create a test ride
2. ✅ **Test user profiles** - Sign up and check user creation
3. 🔄 **Add driver registration** - Create driver profiles
4. 🗺️ **Integrate maps** - Add Google Maps for locations
5. 💳 **Add payments** - Integrate South African payment methods
6. 📱 **Real-time updates** - Add live ride tracking

## 🆘 Need Help?

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **SQL Reference**: [supabase.com/docs/guides/database](https://supabase.com/docs/guides/database)
- **Authentication**: [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)

---

🎉 **You're all set!** Your HobLink app now has a powerful, scalable database backend with real-time capabilities.