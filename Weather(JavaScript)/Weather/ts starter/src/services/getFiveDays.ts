import { environment } from "../config/environment";
import { FiveDaysWeather } from "../models/weatherFiveDays";
import axios from 'axios';
import { CurrWeather } from "../models/weatherCurrent";

export async function getFiveDayWeather(data: CurrWeather): Promise<FiveDaysWeather>{
    const response = await axios(`${environment.API_URL}forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${environment.API_KEY}`);
    return response.data;
}

export async function getFiveDayWeatherByName(data: CurrWeather): Promise<FiveDaysWeather>{
    const response = await axios(`${environment.API_URL}forecast?q=${data.name}&appid=${environment.API_KEY}`);
    return response.data;
}