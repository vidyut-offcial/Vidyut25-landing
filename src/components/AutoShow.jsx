import React from "react";

const Autoshow = () => {
    return (
        <div className="relative w-screen h-screen overflow-hidden transition-all duration-500 ease-in-out">

            {/* Flipped background */}
            <div
                className="absolute inset-0 transform scale-x-[-1] z-0"
                style={{
                    backgroundImage: "url('/images/autoshowbg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Gradient overlays inside flipped background */}
                <div className="w-full h-full bg-black opacity-50 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-transparent opacity-100" />
            </div>

            {/* Text on top */}
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 z-10 text-white font-bold text-6xl">
                Autoshow
            </div>

        </div>
    );
};

export default Autoshow;
