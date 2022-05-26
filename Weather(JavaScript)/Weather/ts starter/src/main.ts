import { environment } from './config/environment';
import { CurrWeather } from './models/weatherCurrent';
import { FiveDaysWeather } from './models/weatherFiveDays';
import { getCurrentWeatherByCoords, getCurrentWeatherByName } from './services/getCurrentWeather';
import { getFiveDayWeather, getFiveDayWeatherByName } from './services/getFiveDays';
import { setCurrWeather, setCurrentWeatherNearby, setHourlyWeather } from './ui/setCurrentWeather'
import { setThreeHourWeather, setFiveDayWeather } from "./ui/setFiveDayWeather";
(function(){
    let selCity = '';
    let data: any;
    let position;
    navigator.geolocation.getCurrentPosition(async (pos) => {
        data = await getCurrentWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
        position = data.coord;
        selCity = data.name;
        (<HTMLInputElement>document.getElementById('inp-text')).value = selCity;
        setCurrWeather(data);
        setHourlyWeather(data);
        setCurrentWeatherNearby(data);
        data = await getFiveDayWeather(data);
        setFiveDayWeather(data);
    }, async () => {
        position = data.coord;
        selCity = data.name;
        (<HTMLInputElement>document.getElementById('inp-text')).value = selCity;
        setCurrWeather(data);
        setHourlyWeather(data);
        setCurrentWeatherNearby(data);
        data = await getFiveDayWeather(data);
        setFiveDayWeather(data);
    });
    (<HTMLElement>document.getElementById('menu')).onclick = ((ev) => {
        if((<HTMLElement>ev.target).innerText === 'Today'){
            (<HTMLElement>$('.five-day-main')[0]).classList.add('hidden');
            (<HTMLElement>$('.5-day')[0]).classList.remove('selected');
            (<HTMLElement>$('.today-main')[0]).classList.remove('hidden');
            (<HTMLElement>$('.today')[0]).classList.add('selected');
        }
        else{
            (<HTMLElement>$('.today-main')[0]).classList.add('hidden');
            (<HTMLElement>$('.today')[0]).classList.remove('selected');
            (<HTMLElement>$('.five-day-main')[0]).classList.remove('hidden');
            (<HTMLElement>$('.5-day')[0]).classList.add('selected');
            for(let i = 0; i < $('.five-day-content').length; i++){
                (<HTMLElement>$('.five-day-content')[i]).classList.remove('selected-five');
            }
            (<HTMLElement>$('.five-day-content')[0]).classList.add('selected-five');
            let day: string = (<HTMLElement>$('.five-day-content')[0].children[0]).innerText;
            let date: string = new Date((<HTMLElement>$('.five-day-content')[0].children[1]).innerText).toLocaleString();
            setThreeHourWeather(date, data, day);
        }
    });
    (<HTMLElement>document.getElementById('inp-submit')).onclick = (async (ev) => {
        let city = (<HTMLInputElement>document.getElementById('inp-text')).value;
        data = await getCurrentWeatherByName(city);
        if(data.cod != '404'){
            selCity = city;
            $('.five-day-main')[0].classList.add('hidden');
            $('.5-day')[0].classList.remove('selected');
            $('.today-main')[0].classList.remove('hidden');
            $('.today')[0].classList.add('selected');
            $('.error')[0].classList.add('hidden');
            setCurrWeather(data);       
            setHourlyWeather(data);
            setCurrentWeatherNearby(data);
            data = await getFiveDayWeatherByName(data);
            setFiveDayWeather(data);        
        }
        else{
            $('.today-main')[0].classList.add('hidden');
            $('.error')[0].classList.remove('hidden');
            $('#img-error').attr('src', environment.IMG_ERROR_URL);
            $('[id=text-error]')[0].innerText = city + ' could not be found.';
            $('[id=text-error]')[1].innerText ='Please, enter a different location.';
        }
        (<HTMLInputElement>document.getElementById('inp-text')).value = city;
    });
}())