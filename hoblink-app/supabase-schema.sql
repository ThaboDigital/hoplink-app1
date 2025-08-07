-- HobLink Database Schema for Supabase
-- Run this in your Supabase SQL editor to create the required tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'driver', 'admin')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Drivers table
CREATE TABLE public.drivers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    license_number TEXT UNIQUE NOT NULL,
    vehicle_make TEXT NOT NULL,
    vehicle_model TEXT NOT NULL,
    vehicle_year INTEGER NOT NULL,
    vehicle_color TEXT NOT NULL,
    vehicle_plate TEXT UNIQUE NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) DEFAULT 5.00,
    total_rides INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Rides table
CREATE TABLE public.rides (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
    pickup_address TEXT NOT NULL,
    pickup_lat DECIMAL(10, 8),
    pickup_lng DECIMAL(11, 8),
    dropoff_address TEXT NOT NULL,
    dropoff_lat DECIMAL(10, 8),
    dropoff_lng DECIMAL(11, 8),
    ride_type TEXT DEFAULT 'standard' CHECK (ride_type IN ('standard', 'comfort', 'share')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'cancelled')),
    fare DECIMAL(10, 2) NOT NULL,
    distance DECIMAL(10, 2), -- in kilometers
    duration INTEGER, -- in minutes
    payment_method TEXT CHECK (payment_method IN ('cash', 'snapscan', 'payfast', 'yoco')),
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ride tracking table for real-time location updates
CREATE TABLE public.ride_tracking (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
    driver_lat DECIMAL(10, 8) NOT NULL,
    driver_lng DECIMAL(11, 8) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Driver ratings table
CREATE TABLE public.ride_ratings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    driver_id UUID REFERENCES public.drivers(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Payment transactions table
CREATE TABLE public.payment_transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ride_id UUID REFERENCES public.rides(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'ZAR',
    payment_method TEXT NOT NULL,
    transaction_id TEXT UNIQUE,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_rides_user_id ON public.rides(user_id);
CREATE INDEX idx_rides_driver_id ON public.rides(driver_id);
CREATE INDEX idx_rides_status ON public.rides(status);
CREATE INDEX idx_rides_created_at ON public.rides(created_at DESC);
CREATE INDEX idx_drivers_user_id ON public.drivers(user_id);
CREATE INDEX idx_drivers_active_verified ON public.drivers(is_active, is_verified);
CREATE INDEX idx_ride_tracking_ride_id ON public.ride_tracking(ride_id);
CREATE INDEX idx_ride_tracking_timestamp ON public.ride_tracking(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ride_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can only see/edit their own profile
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);
    
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Users can see all drivers (for booking rides)
CREATE POLICY "Anyone can view verified drivers" ON public.drivers
    FOR SELECT USING (is_verified = true AND is_active = true);
    
-- Drivers can update their own profile
CREATE POLICY "Drivers can update own profile" ON public.drivers
    FOR UPDATE USING (auth.uid() = user_id);

-- Users can see their own rides and assigned drivers can see rides assigned to them
CREATE POLICY "Users can view own rides" ON public.rides
    FOR SELECT USING (
        auth.uid() = user_id 
        OR auth.uid() IN (
            SELECT user_id FROM public.drivers WHERE id = rides.driver_id
        )
    );
    
-- Users can create rides
CREATE POLICY "Users can create rides" ON public.rides
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
-- Users and assigned drivers can update rides
CREATE POLICY "Users and drivers can update rides" ON public.rides
    FOR UPDATE USING (
        auth.uid() = user_id 
        OR auth.uid() IN (
            SELECT user_id FROM public.drivers WHERE id = rides.driver_id
        )
    );

-- Ride tracking policies
CREATE POLICY "Users and drivers can view ride tracking" ON public.ride_tracking
    FOR SELECT USING (
        ride_id IN (
            SELECT id FROM public.rides 
            WHERE user_id = auth.uid() 
            OR driver_id IN (
                SELECT id FROM public.drivers WHERE user_id = auth.uid()
            )
        )
    );
    
CREATE POLICY "Drivers can insert tracking points" ON public.ride_tracking
    FOR INSERT WITH CHECK (
        ride_id IN (
            SELECT id FROM public.rides 
            WHERE driver_id IN (
                SELECT id FROM public.drivers WHERE user_id = auth.uid()
            )
        )
    );

-- Functions to automatically update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_drivers_updated_at BEFORE UPDATE ON public.drivers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_rides_updated_at BEFORE UPDATE ON public.rides
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    
CREATE TRIGGER update_payment_transactions_updated_at BEFORE UPDATE ON public.payment_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile when someone signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ language plpgsql security definer;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert some sample data (optional)
-- You can run this after setting up authentication

-- Sample ride types configuration (you might want this in a separate config table)
CREATE TABLE public.ride_types (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    base_rate DECIMAL(10, 2) NOT NULL, -- Rate per km in ZAR
    icon TEXT,
    is_active BOOLEAN DEFAULT true
);

INSERT INTO public.ride_types (id, name, description, base_rate, icon) VALUES
('standard', 'HobLink Standard', 'Affordable rides for 1-4 passengers', 12.00, '🚗'),
('comfort', 'HobLink Comfort', 'Premium vehicles with extra space', 18.00, '🚙'),
('share', 'HobLink Share', 'Share with others, save money', 8.00, '👥');

-- Enable RLS for ride_types
ALTER TABLE public.ride_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view ride types" ON public.ride_types
    FOR SELECT USING (is_active = true);