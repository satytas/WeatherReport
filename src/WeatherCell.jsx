import React from 'react';

const WeatherCell = ({ timepoint, temp, weatherImage }) => (
  <div className="wthrCel">
    <div>+{timepoint}h</div>
    <img src={weatherImage} alt="Weather" style={{ width: '50px', height: '50px' }} />
    <div style={{ fontSize: '200%' }}>{temp}°</div>
  </div>
);

export default WeatherCell;
