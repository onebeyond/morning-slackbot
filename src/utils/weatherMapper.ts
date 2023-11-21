import { Weather } from '../models';

export const weatherMapper = (weather: any, cityCode: string) => {
  const mappedWeather: Weather = {
    code: cityCode,
    city: weather.location.name,
    country: weather.location.country,
    currentTemp: Math.round(weather.current.temp_c) + 'ºC',
    condition: weather.forecast.forecastday[0].day.condition.code,
    maxTemp: Math.round(weather.forecast.forecastday[0].day.maxtemp_c) + 'ºC',
    minTemp: Math.round(weather.forecast.forecastday[0].day.mintemp_c) + 'ºC',
    rain: weather.forecast.forecastday[0].day.daily_chance_of_rain + '%',
    sunrise: weather.forecast.forecastday[0].astro.sunrise,
    sunset: weather.forecast.forecastday[0].astro.sunset,
  };
  return mappedWeather;
};
