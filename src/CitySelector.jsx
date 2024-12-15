import React from 'react';

const CitySelector = ({ cities, onChange, currentCity }) => (
  <div>
    <label htmlFor="ctySlct">Cities:</label>
    
    <select id="ctySlct" onChange={onChange} value={currentCity}>
      {cities.map(city => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>
);

export default CitySelector;
