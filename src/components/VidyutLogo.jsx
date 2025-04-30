import React from 'react';
import { Zap } from 'lucide-react';
import Image from 'next/image';

export const VidyutLogo = () => {
  return (
    <div className="flex items-center justify-center lg:justify-start">
      <div className="flex items-center">
        <Image
          src="/images/logo.svg"
          alt="Vidyut Logo"
          width={100}
          height={100}
          priority
        />
        <div className="ml-3">
          {/* <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-white">
            VIDYUT
          </h2>
          <p className="text-gray-400 text-sm">National Multi Fest</p> */}
        </div>
      </div>
    </div>
  );
};