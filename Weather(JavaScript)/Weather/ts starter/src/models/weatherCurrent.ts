interface MainCurrWeather{
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}
interface SysCurrWeather{
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
}
interface WeatherCurrWeather{
    description: string;
    icon: string;
    id: number;
    main: string;
}
export interface CurrWeather{
    base: string;
    clouds: {
        all: number;
    };
    cod: number;
    coord: {
        lat: number;
        lon: number;
    }
    dt: number;
    id: number;
    main: MainCurrWeather;
    name: string;
    rain:{
        '1h': number;
    }
    sys: SysCurrWeather;
    timezone: number;
    visibility: number;
    weather: WeatherCurrWeather[];
    wind:{
        speed: number;
        deg: number;
    }
}