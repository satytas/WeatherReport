import React from 'react';
import WeatherCell from './WeatherCell';

const WeatherTable = ({ weatherData }) => (
  <div className="wthrTbl">
    {weatherData.map((data, index) => {
      let weatherImage = 'cloudySunny.png';
      if (data.prec_type === "rain") {
        if (data.cloudcover >= 7 && data.rh2m >= 10)
            weatherImage = 'cloudyRainy.png';
        else
            weatherImage = 'cloudySunnyRainy.png';

    } else if (data.prec_type === "snow") {
        if (data.cloudcover >= 7 && data.rh2m >= 10)
            weatherImage = 'cloudySnowy.png';
        else
            weatherImage = 'cloudySunnySnowy.png';

    } else {
        if (data.cloudcover <= 5 && data.transparency >= 5)
            weatherImage = 'sunny.png';
        else if (data.cloudcover >= 7 && data.rh2m >= 10)
            weatherImage = 'cloudy.png';
    }
      return (
        <WeatherCell
          key={index}
          timepoint={data.timepoint}
          temp={data.temp2m}
          weatherImage={weatherImage}
        />
      );
    })}
  </div>
);

export default WeatherTable;
