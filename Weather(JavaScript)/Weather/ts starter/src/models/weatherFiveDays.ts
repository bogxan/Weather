interface City{
    coord: {
        lat: number; 
        lon: number;
    };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
}
interface Main{
    feels_like: number  
    grnd_level: number
    humidity: number
    pressure: number
    sea_level: number
    temp: number
    temp_kf: number
    temp_max: number
    temp_min: number    
}
interface Weather{
    description: string;
    icon: string;
    id: number;
    main: string;
}
interface List{
    clouds: {
        all: number;
    }
    dt: number
    dt_txt: string
    main: Main;
    pop: number
    sys: {
        pod: string;
    }
    visibility: number
    weather: Weather[]
    wind: {
        speed: number, 
        deg: number, 
        gust: number
    }    
}
export interface FiveDaysWeather{
    city: City;
    cnt: number;
    cod: string;
    list: List[];
    message: number;
}