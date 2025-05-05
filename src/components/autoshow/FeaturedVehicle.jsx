'use client';
import React, { useState } from 'react';
import VehicleSpec from './VehicleSpec';

const FeaturedVehicle = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full bg-gradient-to-r from-neutral-900 to-neutral-800 py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Featured Vehicle</h2>
        <div className="h-1 w-20 bg-blue-500 mb-12"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div 
            className="overflow-hidden rounded-lg relative transition-all duration-700 ease-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className={`transition-transform duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}>
              <img 
                src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1280" 
                alt="Featured Electric SUV" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"></div>
          </div>
          
          <div className="text-white space-y-6">
            <h3 className="text-4xl font-bold">2025 Electric Concept SUV</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Experience the pinnacle of automotive innovation with our latest electric concept SUV. 
              Combining sustainable performance with luxurious design, this vehicle represents the 
              future of transportation.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              <VehicleSpec label="Range" value="400+ miles" />
              <VehicleSpec label="0-60 mph" value="3.2 seconds" />
              <VehicleSpec label="Top Speed" value="155 mph" />
              <VehicleSpec label="Power" value="670 hp" />
              <VehicleSpec label="Battery" value="110 kWh" />
              <VehicleSpec label="Charging" value="20 min (10-80%)" />
            </div>
            
            <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedVehicle;