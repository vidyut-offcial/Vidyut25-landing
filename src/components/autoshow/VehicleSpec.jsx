import React from 'react';

const VehicleSpec = ({ label, value }) => {
  return (
    <div className="bg-neutral-800/50 p-4 rounded-lg">
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-white font-semibold text-lg">{value}</p>
    </div>
  );
};

export default VehicleSpec;