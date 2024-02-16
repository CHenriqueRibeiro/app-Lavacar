import React, { createContext, useContext, useState } from "react";
import * as Location from "expo-location";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [city, setCity] = useState(null);
  const [latAndLong, setLatAndLong] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleUseMyLocation = async () => {
    setLoadingLocation(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permissão para acessar a localização negada");
        setLoadingLocation(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      reverseGeocode(latitude, longitude);
    } catch (error) {
      console.error("Erro ao obter localização:", error);
      setErrorMsg("Erro ao obter a localização");
      setLoadingLocation(false);
    }
  };

  const reverseGeocode = async (latitude, longitude) => {
    try {
      const apiKey = "fbb87def325a48768cbc78cc3708bc9f";
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude}+${longitude}&pretty=1`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      const neighborhood = data.results[0].components.suburb;
      const city = data.results[0].components.city;
      const latAndLon = data.results[0].geometry;

      const locationString = `${neighborhood}, ${city}`;

      setUserLocation(locationString);
      setCity(city);
      setLatAndLong(latAndLon);
      setLoadingLocation(false);
      setErrorMsg(null);
    } catch (error) {
      console.error("Erro na geocodificação reversa:", error);
      setErrorMsg("Erro na geocodificação reversa");
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
        reverseGeocode,
        city,
        latAndLong,
        setUserLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation deve ser usado dentro de um LocationProvider");
  }
  return context;
};
