import { createClient } from '../lib/http-client';
import { Weather } from '../models';

const http = createClient({
  baseURL: process.env.API_URL,
  withCredentials: false,
});

export const getWeatherByCity = async (city: string): Promise<Weather> => {
  try {
    return await http.get(`/forecast.json?q=${city}&days=1&key=${process.env.API_KEY}`);
  } catch (error) {
    console.error(`Error fetching the weather for the city ${city}:`, error);
    throw error;
  }
};
