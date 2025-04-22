import { useEffect, useState } from "react";

// Create a custom event bus for mobile controls
const createMobileControlEvents = () => {
  const events = {};
  
  return {
    dispatch: (action, value) => {
      if (events[action]) {
        events[action].forEach(callback => callback(value));
      }
    },
    subscribe: (action, callback) => {
      if (!events[action]) {
        events[action] = [];
      }
      events[action].push(callback);
      
      return () => {
        events[action] = events[action].filter(cb => cb !== callback);
      };
    }
  };
};

// Export the event bus to be used by mobile UI components
export const mobileControlEvents = createMobileControlEvents();

export const useControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({});

  // Handle keyboard controls
  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    };
  
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  // Handle mobile controls
  useEffect(() => {
    const handleAccelerate = () => {
      setControls(prev => ({ ...prev, w: true }));
    };
    
    const handleBrake = () => {
      setControls(prev => ({ ...prev, s: true }));
    };
    
    const handleSteerLeft = () => {
      setControls(prev => ({ ...prev, a: true }));
    };
    
    const handleSteerRight = () => {
      setControls(prev => ({ ...prev, d: true }));
    };
    
    const handleReset = () => {
      setControls(prev => ({ ...prev, r: true }));
    };
    
    const handleRelease = (control) => {
      setControls(prev => ({ ...prev, [control]: false }));
    };
    
    // Subscribe to mobile control events
    const unsubscribeAccelerate = mobileControlEvents.subscribe('accelerate', value => {
      setControls(prev => ({ ...prev, w: value }));
    });
    
    const unsubscribeBrake = mobileControlEvents.subscribe('brake', value => {
      setControls(prev => ({ ...prev, s: value }));
    });
    
    const unsubscribeSteerLeft = mobileControlEvents.subscribe('steerLeft', value => {
      setControls(prev => ({ ...prev, a: value }));
    });
    
    const unsubscribeSteerRight = mobileControlEvents.subscribe('steerRight', value => {
      setControls(prev => ({ ...prev, d: value }));
    });
    
    const unsubscribeReset = mobileControlEvents.subscribe('reset', value => {
      setControls(prev => ({ ...prev, r: value }));
    });
    
    return () => {
      unsubscribeAccelerate();
      unsubscribeBrake();
      unsubscribeSteerLeft();
      unsubscribeSteerRight();
      unsubscribeReset();
    };
  }, []);

  // Apply controls to vehicle
  useEffect(() => {
    if(!vehicleApi || !chassisApi) return;

    if (controls.w) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    if (controls.arrowdown)  chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    if (controls.arrowup)    chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    if (controls.arrowleft)  chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    if (controls.arrowright) chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
      
      // Reset the control after applying it
      setTimeout(() => {
        setControls(prev => ({ ...prev, r: false }));
      }, 100);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};