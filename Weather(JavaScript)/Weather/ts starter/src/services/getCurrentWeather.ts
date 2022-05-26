import { environment } from '../config/environment';
import { CurrWeather } from '../models/weatherCurrent';
import axios from 'axios';

export async function getCurrentWeatherByName(name: string): Promise<CurrWeather>{
    const response = await axios(`${environment.API_URL}weather?q=${name}&appid=${environment.API_KEY}`);
    return response.data;
}

export async function getCurrentWeatherByCoords(lat: number, lon: number): Promise<CurrWeather>{
    const response = await axios(`${environment.API_URL}weather?lat=${lat}&lon=${lon}&appid=${environment.API_KEY}`);
    return response.data;
}