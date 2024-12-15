import React, { useState, useEffect } from 'react';
import CountrySelector from './CountrySelector';
import CitySelector from './CitySelector';
import WeatherTable from './WeatherTable';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('');
  const [currentCity, setCurrentCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const response = await fetch('https://countriesnow.space/api/v0.1/countries/info?returns=flag');
      const data = await response.json();
      const countryNames = data.data.map(country => country.name).sort();

      setCountries(countryNames);
      setCurrentCountry(countryNames[0]);
      getCities(countryNames[0]);

    } catch (error) {
      console.error(error);
      setStatus('countries fetch fail');
    }
  };

  const getCities = async (country) => {
    setCities([]);
    setStatus('Loading cities...');
  
    try {
      const response = await fetch(`https://countriesnow.space/api/v0.1/countries/cities/q?country=${encodeURIComponent(country)}`);
      const data = await response.json();
      const sortedCities = data.data.sort();

      setCities(sortedCities);
      setCurrentCity(sortedCities[0]);
      getWthrCast(country, sortedCities[0]);

    } catch (error) {
      console.error(error);
      setStatus(`fail cities fetch for ${country}`);
    }
  };
  

  const getWthrCast = async (country, city) => {
    setStatus('Loading weather...');
    try {
      const cordsResponse = await fetch(`https://nominatim.openstreetmap.org/search.php?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&format=jsonv2`);
      const cords = await cordsResponse.json();

      if (cords.length === 0) {
        setStatus(`cords fetch fail for ${city}, ${country}`);
        return;
      }

      const weatherResponse = await fetch(`https://www.7timer.info/bin/astro.php?lon=${cords[0].lon}&lat=${cords[0].lat}&ac=0&unit=metric&output=json&tzshift=0`);
      const weatherData = await weatherResponse.json();

      setWeatherData(weatherData.dataseries);
      setStatus(`${country} - ${city}`);

    } catch (error) {
      console.error(error);
      setStatus(`weather data fetch fail for ${city}, ${country}`);
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;

    setCurrentCountry(selectedCountry);

    getCities(selectedCountry);
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;

    setCurrentCity(selectedCity);

    getWthrCast(currentCountry, selectedCity);
  };

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <div className="selector">
        <CountrySelector countries={countries} onChange={handleCountryChange} currentCountry={currentCountry} />
        <span style={{ width: '5%', display: 'inline-block' }}></span>
        <CitySelector cities={cities} onChange={handleCityChange} currentCity={currentCity} />
      </div>

      <br />

      <p id="stat">{status}</p>

      <WeatherTable weatherData={weatherData} />
    </div>
  );
}

export default App;
