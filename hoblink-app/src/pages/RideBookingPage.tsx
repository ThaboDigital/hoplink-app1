import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import HobLinkLogo from '../components/HobLinkLogo';
import ThemeToggle from '../components/ThemeToggle';

import { DatabaseService, Ride } from '../services/database';

import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

interface LocationData {
  address: string;
  lat?: number;
  lng?: number;
}

const RideBookingPage: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<LocationData>({ address: '' });
  const [dropoff, setDropoff] = useState<LocationData>({ address: '' });
  const [rideType, setRideType] = useState('standard');
  const [fare, setFare] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: -26.2041, // Johannesburg coordinates
    lng: 28.0473
  };

  const directionsCallback = (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
    if (status === 'OK' && result) {
      setDirections(result);
    }
  };

  useEffect(() => {
    if (pickup.lat && pickup.lng && dropoff.lat && dropoff.lng && mapLoaded) {
      // Request directions when both locations are set
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: pickup.lat, lng: pickup.lng },
          destination: { lat: dropoff.lat, lng: dropoff.lng },
          travelMode: google.maps.TravelMode.DRIVING,
        },
        directionsCallback
      );
    }
  }, [pickup.lat, pickup.lng, dropoff.lat, dropoff.lng, mapLoaded]);

  const renderMap = () => (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''}
      onLoad={() => setMapLoaded(true)}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
      >
        {pickup.lat && pickup.lng && (
          <Marker
            position={{ lat: pickup.lat, lng: pickup.lng }}
            label="P"
          />
        )}
        {dropoff.lat && dropoff.lng && (
          <Marker
            position={{ lat: dropoff.lat, lng: dropoff.lng }}
            label="D"
          />
        )}
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
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Rest of your component JSX */}
      {showMap ? (
        <div ref={mapRef} className="w-full h-96 rounded-lg overflow-hidden">
          {renderMap()}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Route Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-200">
            {/* Existing route info content */}
          </div>
        </div>
      )}
    </div>
  );
};

export default RideBookingPage;