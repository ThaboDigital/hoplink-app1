import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RideTrackingPage: React.FC = () => {
  const { rideId } = useParams<{ rideId: string }>();
  const [rideStatus, setRideStatus] = useState('driver_assigned');
  const [estimatedArrival, setEstimatedArrival] = useState(8);

  // Mock ride data
  const rideData = {
    id: rideId,
    pickup: 'Tzaneen CBD, Limpopo',
    dropoff: 'Polokwane Airport, Limpopo',
    fare: 245,
    driver: {
      name: 'Sipho Maluleke',
      rating: 4.8,
      vehicle: 'Toyota Corolla',
      licensePlate: 'LP 123 GP',
      phone: '+27 82 123 4567'
    }
  };

  const statusSteps = [
    { key: 'booked', label: 'Ride Booked', completed: true },
    { key: 'driver_assigned', label: 'Driver Assigned', completed: true },
    { key: 'driver_arriving', label: 'Driver Arriving', completed: rideStatus !== 'driver_assigned' },
    { key: 'in_progress', label: 'Ride in Progress', completed: ['in_progress', 'completed'].includes(rideStatus) },
    { key: 'completed', label: 'Ride Completed', completed: rideStatus === 'completed' }
  ];

  useEffect(() => {
    // Simulate ride progress
    const interval = setInterval(() => {
      setEstimatedArrival(prev => Math.max(0, prev - 1));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const cancelRide = () => {
    // TODO: Implement ride cancellation
    console.log('Cancelling ride:', rideId);
  };

  const callDriver = () => {
    window.location.href = `tel:${rideData.driver.phone}`;
  };

  const shareLocation = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My HobLink Ride',
        text: `I'm taking a HobLink ride. Track me here:`,
        url: window.location.href
      });
    }
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
            <h1 className="text-lg font-semibold text-gray-900">Track Ride</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        <div className="bg-hoblink-accent text-white rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Your driver is on the way!</h2>
              <p className="text-green-100 mt-1">
                Estimated arrival: {estimatedArrival} minutes
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{estimatedArrival}</div>
              <div className="text-sm text-green-100">minutes</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Ride Progress */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ride Progress</h3>
            
            <div className="space-y-4">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed ? 'bg-hoblink-accent text-white' : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div className="ml-4">
                    <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trip Details */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Trip Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">From:</span>
                  <span className="font-medium">{rideData.pickup}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">To:</span>
                  <span className="font-medium">{rideData.dropoff}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fare:</span>
                  <span className="font-medium text-hoblink-accent">R {rideData.fare}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Driver</h3>
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xl font-semibold text-gray-600">
                  {rideData.driver.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">{rideData.driver.name}</h4>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm text-gray-600">{rideData.driver.rating}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Vehicle:</span>
                <span className="font-medium">{rideData.driver.vehicle}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">License Plate:</span>
                <span className="font-medium">{rideData.driver.licensePlate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={callDriver}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </button>
              <button
                onClick={shareLocation}
                className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Tracking</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p>Real-time map tracking</p>
              <p className="text-sm mt-1">Google Maps integration</p>
            </div>
          </div>
        </div>

        {/* Emergency Actions */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-red-800">Need Help?</h4>
              <p className="text-sm text-red-700">Emergency support available 24/7</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
                Emergency
              </button>
              <button 
                onClick={cancelRide}
                className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Cancel Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideTrackingPage;