import { createContext, useContext } from "react";

export const SpaceshipContext = createContext(null);

export function useSpaceship() {
  return useContext(SpaceshipContext);
}
