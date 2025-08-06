import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DriverDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);

  const driverStats = {
    todayEarnings: 450,
    weeklyEarnings: 2340,
    totalRides: 127,
    rating: 4.8,
    completionRate: 98
  };

  const recentRides = [
    { id: '1', from: 'Tzaneen CBD', to: 'University of Limpopo', fare: 85, time: '09:30' },
    { id: '2', from: 'Polokwane Airport', to: 'Tzaneen Mall', fare: 195, time: '11:45' },
    { id: '3', from: 'Tzaneen Hospital', to: 'Lenyenye', fare: 65, time: '14:20' }
  ];

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
            <h1 className="text-lg font-semibold text-gray-900">Driver Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">Status:</span>
                <button
                  onClick={() => setIsOnline(!isOnline)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isOnline 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {isOnline ? 'Online' : 'Offline'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Card */}
        <div className={`rounded-lg p-6 mb-6 ${
          isOnline ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                {isOnline ? 'You\'re Online!' : 'You\'re Offline'}
              </h2>
              <p className="text-green-100 mt-1">
                {isOnline 
                  ? 'Ready to accept ride requests' 
                  : 'Go online to start receiving rides'
                }
              </p>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                isOnline 
                  ? 'bg-white text-green-600 hover:bg-gray-100' 
                  : 'bg-hoblink-accent text-white hover:bg-green-600'
              }`}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Earnings Stats */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Overview</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-hoblink-accent">R {driverStats.todayEarnings}</div>
                  <div className="text-sm text-gray-600">Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hoblink-accent">R {driverStats.weeklyEarnings}</div>
                  <div className="text-sm text-gray-600">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{driverStats.totalRides}</div>
                  <div className="text-sm text-gray-600">Total Rides</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{driverStats.rating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            {/* Recent Rides */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rides</h3>
              
              <div className="space-y-4">
                {recentRides.map((ride) => (
                  <div key={ride.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-hoblink-accent rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="font-medium text-gray-900">{ride.from} → {ride.to}</p>
                        <p className="text-sm text-gray-600">{ride.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-hoblink-accent">R {ride.fare}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span>View Earnings Report</span>
                </button>
                
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Update Profile</span>
                </button>
                
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <svg className="w-5 h-5 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Help & Support</span>
                </button>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion Rate</span>
                    <span>{driverStats.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-hoblink-accent h-2 rounded-full" 
                      style={{ width: `${driverStats.completionRate}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Customer Rating</span>
                    <span>{driverStats.rating}/5.0</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full" 
                      style={{ width: `${(driverStats.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Driver Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">💡 Driver Tips</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Keep your vehicle clean and comfortable</li>
                <li>• Arrive on time for pickups</li>
                <li>• Be polite and professional</li>
                <li>• Know local routes well</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;