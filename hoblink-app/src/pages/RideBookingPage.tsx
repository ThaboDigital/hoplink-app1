import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface LocationData {
  address: string;
  lat?: number;
  lng?: number;
}

const RideBookingPage: React.FC = () => {
  const [pickup, setPickup] = useState<LocationData>({ address: '' });
  const [dropoff, setDropoff] = useState<LocationData>({ address: '' });
  const [rideType, setRideType] = useState('standard');
  const [fare, setFare] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const rideTypes = [
    {
      id: 'standard',
      name: 'HobLink Standard',
      description: 'Affordable rides for 1-4 passengers',
      price: 'R 12/km',
      icon: '🚗'
    },
    {
      id: 'comfort',
      name: 'HobLink Comfort',
      description: 'Premium vehicles with extra space',
      price: 'R 18/km',
      icon: '🚙'
    },
    {
      id: 'share',
      name: 'HobLink Share',
      description: 'Share with others, save money',
      price: 'R 8/km',
      icon: '👥'
    }
  ];

  const calculateFare = async () => {
    if (!pickup.address || !dropoff.address) return;
    
    setIsCalculating(true);
    // Simulate fare calculation
    setTimeout(() => {
      const baseRate = rideType === 'standard' ? 12 : rideType === 'comfort' ? 18 : 8;
      const estimatedDistance = Math.random() * 20 + 5; // Random distance 5-25km
      const calculatedFare = baseRate * estimatedDistance + 15; // Base fare + distance
      setFare(Math.round(calculatedFare));
      setIsCalculating(false);
    }, 2000);
  };

  useEffect(() => {
    if (pickup.address && dropoff.address) {
      calculateFare();
    }
  }, [pickup.address, dropoff.address, rideType]);

  const handleBookRide = () => {
    // TODO: Implement ride booking logic
    console.log('Booking ride:', { pickup, dropoff, rideType, fare });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i.postimg.cc/7GSdKBWs/Hob-Link-Light-Mode-Logo-Vertical.png" 
                alt="HobLink" 
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-700 hover:text-hoblink-accent">
                Login
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Book Your Ride</h1>

            {/* Location Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pickup Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={pickup.address}
                    onChange={(e) => setPickup({ address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-hoblink-accent focus:border-hoblink-accent"
                    placeholder="Enter pickup address"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <div className="w-3 h-3 bg-hoblink-accent rounded-full"></div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drop-off Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={dropoff.address}
                    onChange={(e) => setDropoff({ address: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-hoblink-accent focus:border-hoblink-accent"
                    placeholder="Enter destination address"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Location Buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">Quick Locations</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setPickup({ address: 'Tzaneen CBD, Limpopo' })}
                  className="text-left p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  📍 Tzaneen CBD
                </button>
                <button 
                  onClick={() => setDropoff({ address: 'Polokwane Airport, Limpopo' })}
                  className="text-left p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ✈️ Polokwane Airport
                </button>
                <button 
                  onClick={() => setPickup({ address: 'University of Limpopo' })}
                  className="text-left p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  🎓 University of Limpopo
                </button>
                <button 
                  onClick={() => setDropoff({ address: 'Tzaneen Hospital' })}
                  className="text-left p-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  🏥 Tzaneen Hospital
                </button>
              </div>
            </div>

            {/* Ride Type Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-3">Choose Ride Type</p>
              <div className="space-y-3">
                {rideTypes.map((type) => (
                  <label key={type.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rideType"
                      value={type.id}
                      checked={rideType === type.id}
                      onChange={(e) => setRideType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`flex-1 p-4 rounded-lg border-2 transition-colors ${
                      rideType === type.id 
                        ? 'border-hoblink-accent bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{type.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900">{type.name}</p>
                            <p className="text-sm text-gray-600">{type.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-hoblink-accent">{type.price}</p>
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Fare Estimate */}
            {(pickup.address && dropoff.address) && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Estimated Fare:</span>
                  <div className="text-right">
                    {isCalculating ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-hoblink-accent mr-2"></div>
                        <span className="text-gray-600">Calculating...</span>
                      </div>
                    ) : fare ? (
                      <span className="text-2xl font-bold text-hoblink-accent">R {fare}</span>
                    ) : null}
                  </div>
                </div>
              </div>
            )}

            {/* Book Ride Button */}
            <button
              onClick={handleBookRide}
              disabled={!pickup.address || !dropoff.address || isCalculating}
              className="w-full bg-hoblink-accent text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-600 focus:ring-4 focus:ring-green-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isCalculating ? 'Calculating Fare...' : 'Book Ride Now'}
            </button>

            {/* Payment Methods */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-700 mb-3">Payment Methods</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <span className="mr-2">💵</span>
                  <span className="text-sm">Cash</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <span className="mr-2">📱</span>
                  <span className="text-sm">SnapScan</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <span className="mr-2">💳</span>
                  <span className="text-sm">PayFast</span>
                </div>
                <div className="flex items-center p-2 bg-gray-50 rounded">
                  <span className="mr-2">🏦</span>
                  <span className="text-sm">Yoco</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Route Preview</h2>
              <button
                onClick={() => setShowMap(!showMap)}
                className="text-hoblink-accent hover:text-green-600 text-sm font-medium"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>

            {showMap ? (
              <div 
                ref={mapRef}
                className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p>Map will load here</p>
                  <p className="text-sm mt-1">Google Maps integration</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Route Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Route Information</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Estimated Distance:</span>
                      <span className="font-medium">~15.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Time:</span>
                      <span className="font-medium">~22 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Traffic Conditions:</span>
                      <span className="font-medium text-green-600">Light</span>
                    </div>
                  </div>
                </div>

                {/* Driver Info Preview */}
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ We'll find you a nearby driver</li>
                    <li>✓ You'll get driver details & vehicle info</li>
                    <li>✓ Track your ride in real-time</li>
                    <li>✓ Pay securely with your preferred method</li>
                  </ul>
                </div>

                {/* Safety Features */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Safety First</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>🛡️ All drivers are verified</li>
                    <li>📱 Share trip with family/friends</li>
                    <li>🚨 24/7 emergency support</li>
                    <li>⭐ Driver rating system</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideBookingPage;