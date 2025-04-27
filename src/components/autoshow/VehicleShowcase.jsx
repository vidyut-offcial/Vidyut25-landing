import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';

const vehicles = [
  {
    id: 1,
    name: 'Luxury Sedan',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1280',
    price: '$75,000',
    type: 'Sedan',
  },
  {
    id: 2,
    name: 'Performance SUV',
    image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1280',
    price: '$89,900',
    type: 'SUV',
  },
  {
    id: 3,
    name: 'Compact Electric',
    image: 'https://images.pexels.com/photos/12718968/pexels-photo-12718968.jpeg?auto=compress&cs=tinysrgb&w=1280',
    price: '$42,500',
    type: 'Compact',
  },
  {
    id: 4,
    name: 'Sport Coupe',
    image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1280',
    price: '$112,000',
    type: 'Coupe',
  }
];

const VehicleShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextVehicle = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
  };

  const prevVehicle = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
  };

  return (
    <div className="w-full bg-neutral-100 py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-2">Vehicle Gallery</h2>
            <div className="h-1 w-20 bg-blue-500"></div>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button 
              onClick={prevVehicle}
              className="p-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
            >
              <ChevronLeft size={24} className="text-neutral-700" />
            </button>
            <button 
              onClick={nextVehicle}
              className="p-3 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors"
            >
              <ChevronRight size={24} className="text-neutral-700" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard 
              key={vehicle.id}
              vehicle={vehicle}
              isActive={index === activeIndex}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-md text-lg font-medium transition-all duration-300">
            View All Vehicles
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleShowcase;