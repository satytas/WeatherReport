import React from 'react';

const CountrySelector = ({ countries, onChange, currentCountry }) => (
  <div>
    <label htmlFor="cntSlct">Countries:</label>
    
    <select id="cntSlct" onChange={onChange} value={currentCountry}>
      {countries.map(country => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  </div>
);

export default CountrySelector;
