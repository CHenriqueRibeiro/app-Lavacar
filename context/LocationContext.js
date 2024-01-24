// LocationContext.js
import React, { createContext, useContext, useState } from 'react';
import * as Location from 'expo-location';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleUseMyLocation = async () => {
    setLoadingLocation(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização negada');
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

    console.log( location);

      setUserLocation({ latitude, longitude });
      setLoadingLocation(false);
      setErrorMsg(null);
    } catch (error) {
      console.error('Erro ao obter localização:', error);
      setErrorMsg('Erro ao obter a localização');
      setLoadingLocation(false);
    }
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        loadingLocation,
        errorMsg,
        handleUseMyLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation deve ser usado dentro de um LocationProvider');
  }
  return context;
};
