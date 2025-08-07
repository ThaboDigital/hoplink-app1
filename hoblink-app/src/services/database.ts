import { supabase } from './supabase';

// Types for our database tables
export interface User {
  id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: 'rider' | 'driver' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Driver {
  id: string;
  user_id: string;
  license_number: string;
  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: number;
  vehicle_color: string;
  vehicle_plate: string;
  is_verified: boolean;
  is_active: boolean;
  rating: number;
  total_rides: number;
  created_at: string;
  updated_at: string;
}

export interface Ride {
  id: string;
  user_id: string;
  driver_id?: string;
  pickup_address: string;
  pickup_lat?: number;
  pickup_lng?: number;
  dropoff_address: string;
  dropoff_lat?: number;
  dropoff_lng?: number;
  ride_type: 'standard' | 'comfort' | 'share';
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  fare: number;
  distance?: number;
  duration?: number;
  payment_method?: 'cash' | 'snapscan' | 'payfast' | 'yoco';
  payment_status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface RideTracking {
  id: string;
  ride_id: string;
  driver_lat: number;
  driver_lng: number;
  timestamp: string;
}

// Database service functions
export class DatabaseService {
  // User management
  static async getUserById(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }


  // Ride Management
  static async createRide(rideData: Omit<Ride, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('rides')
      .insert([{
        ...rideData,
        status: 'pending',
        payment_status: 'pending'
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getRideById(id: string) {
    const { data, error } = await supabase
      .from('rides')
      .select(`
        *,
        user:users(*),
        driver:drivers(*, user:users(*))
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getRidesByUser(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('rides')
      .select(`
        *,
        driver:drivers(*, user:users(*))
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  static async updateRideStatus(id: string, status: Ride['status']) {
    const { data, error } = await supabase
      .from('rides')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async assignDriverToRide(rideId: string, driverId: string) {
    const { data, error } = await supabase
      .from('rides')
      .update({ 
        driver_id: driverId,
        status: 'accepted',
        updated_at: new Date().toISOString()
      })
      .eq('id', rideId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Driver Management
  static async createDriver(driverData: Omit<Driver, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('drivers')
      .insert([{
        ...driverData,
        is_verified: false,
        is_active: true,
        rating: 5.0,
        total_rides: 0
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getDriverById(id: string) {
    const { data, error } = await supabase
      .from('drivers')
      .select(`
        *,
        user:users(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getAvailableDrivers(limit = 10) {
    const { data, error } = await supabase
      .from('drivers')
      .select(`
        *,
        user:users(*)
      `)
      .eq('is_active', true)
      .eq('is_verified', true)
      .order('rating', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }

  static async updateDriverLocation(driverId: string, lat: number, lng: number) {
    // This would typically go to a real-time location table
    // For now, we'll just update the driver's last known location
    const { data, error } = await supabase
      .from('drivers')
      .update({ 
        updated_at: new Date().toISOString()
      })
      .eq('id', driverId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Ride Tracking
  static async addRideTrackingPoint(rideId: string, lat: number, lng: number) {
    const { data, error } = await supabase
      .from('ride_tracking')
      .insert([{
        ride_id: rideId,
        driver_lat: lat,
        driver_lng: lng,
        timestamp: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  static async getRideTrackingPoints(rideId: string) {
    const { data, error } = await supabase
      .from('ride_tracking')
      .select('*')
      .eq('ride_id', rideId)
      .order('timestamp', { ascending: true });
    
    if (error) throw error;
    return data;
  }

  // Admin Functions
  static async getAllRides(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('rides')
      .select(`
        *,
        user:users(*),
        driver:drivers(*, user:users(*))
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  }

  static async getAllUsers(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  }

  static async getAllDrivers(limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('drivers')
      .select(`
        *,
        user:users(*)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (error) throw error;
    return data;
  }

  // Ride Management
  static async getRide(rideId: string): Promise<Ride> {
    const { data, error } = await supabase
      .from('rides')
      .select('*')
      .eq('id', rideId)
      .single();

    if (error) throw error;
    return data;
  }

  static subscribeToDriverLocation(driverId: string, callback: (location: { lat: number; lng: number }) => void) {
    return supabase
      .channel(`driver-location-${driverId}`)
      .on(
        'broadcast',
        { event: 'driver_location_update' },
        (payload) => callback(payload.location)
      )
      .subscribe();
  }
}