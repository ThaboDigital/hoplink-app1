import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { DatabaseService, Ride } from '../services/database';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';

const RideTrackingPage: React.FC = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const { currentUser } = useAuth();
  const [ride, setRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [driverLocation, setDriverLocation] = useState<{ lat: number; lng: number } | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -26.2041, // Johannesburg coordinates
    lng: 28.0473
  };

  useEffect(() => {
    const fetchRide = async () => {
      if (!rideId || !currentUser) return;

      try {
        const rideData = await DatabaseService.getRide(rideId);
        setRide(rideData);

        // Subscribe to driver location updates
        if (rideData.driver_id) {
          const subscription = DatabaseService.subscribeToDriverLocation(rideData.driver_id, (location: { lat: number; lng: number }) => {
            setDriverLocation(location);
          });

          return () => subscription.unsubscribe();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ride details');
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [rideId, currentUser]);

  useEffect(() => {
    if (ride?.pickup_lat && ride?.pickup_lng && ride?.dropoff_lat && ride?.dropoff_lng && mapLoaded) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: ride.pickup_lat, lng: ride.pickup_lng },
          destination: { lat: ride.dropoff_lat, lng: ride.dropoff_lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
          }
        }
      );
    }
  }, [ride?.pickup_lat, ride?.pickup_lng, ride?.dropoff_lat, ride?.dropoff_lng, mapLoaded]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hoblink-accent"></div>
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Error</h2>
          <p className="text-gray-600 dark:text-gray-300">{error || 'Ride not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <h1 className="text-lg font-semibold text-gray-900">Track Your Ride</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/* Map */}
          <div className="p-4">
            <LoadScript
              googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
              onLoad={() => setMapLoaded(true)}
            >
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
              >
                {/* Pickup Marker */}
                {ride.pickup_lat && ride.pickup_lng && (
                  <Marker
                    position={{ lat: ride.pickup_lat, lng: ride.pickup_lng }}
                    label="P"
                  />
                )}

                {/* Dropoff Marker */}
                {ride.dropoff_lat && ride.dropoff_lng && (
                  <Marker
                    position={{ lat: ride.dropoff_lat, lng: ride.dropoff_lng }}
                    label="D"
                  />
                )}

                {/* Driver Marker */}
                {driverLocation && (
                  <Marker
                    position={driverLocation}
                    icon={{
                      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                      scale: 6,
                      fillColor: '#22C55E',
                      fillOpacity: 1,
                      strokeWeight: 2,
                      strokeColor: '#ffffff',
                      rotation: 0
                    }}
                  />
                )}

                {/* Route */}
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                    options={{
                      suppressMarkers: true,
                      polylineOptions: {
                        strokeColor: '#22C55E',
                        strokeWeight: 5
                      }
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>

          {/* Ride Details */}
          <div className="border-t border-gray-200 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Pickup</h3>
                <p className="mt-1 text-sm text-gray-900">{ride.pickup_address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Dropoff</h3>
                <p className="mt-1 text-sm text-gray-900">{ride.dropoff_address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1 text-sm text-gray-900">{ride.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fare</h3>
                <p className="mt-1 text-sm text-gray-900">R {ride.fare}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideTrackingPage;