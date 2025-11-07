import { createContext, useContext, useState } from "react";

const cityContext = createContext();

export function CityProvider({children}) {
    const [city , setCity] = useState();
    return (
        <cityContext.Provider value={{city , setCity}}>
            {children}
        </cityContext.Provider>
    );
}

export function useCity() {
    return useContext(cityContext);
}