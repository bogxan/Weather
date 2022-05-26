import { environment } from "../config/environment";
import { Coord } from "../models/coord";
import { CurrWeather } from "../models/weatherCurrent";

export function setCurrWeather(data: CurrWeather) {
    console.log(data);
    let date: string = new Date().toISOString();
    let day: string = date.substring(8, 10);
    let month: string = date.substring(5, 7);
    let year: string = date.substring(0, 4);
    $('.date').text(day + '.' + month + '.' + year);
    $('#img-forecast').attr('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    $('.forecast').text(data.weather[0].main);
    $('.curr-temperature').text(Math.round((data.main.temp - 273)) + String.fromCharCode(176) + 'C');
    $('.curr-real-feel').text('Real feel ' + (Math.round(data.main.feels_like - 273)) + String.fromCharCode(176));
    let srDate = new Date(data.sys.sunrise);
    let srTime = srDate.toLocaleTimeString().substring(0, 5);
    $('#sunrise').text('Sunrise: ' + srTime);
    let snDate = new Date(data.sys.sunset);
    let snTime = snDate.toLocaleTimeString().substring(0, 5);
    $('#sunset').text('Sunset: ' + snTime);
    setDuration(srDate, snDate);
}

function setDuration(srDate: Date, snDate: Date){
    let hoursDiff = snDate.getHours() - srDate.getHours();
    let minDiff = hoursDiff / 60 / 1000;
    let hDiff = hoursDiff / 3600 / 1000;
    let duration: any = {};
    duration.hours = Math.floor(hDiff);
    duration.minutes = Math.round(minDiff - 60 * duration.hours);
    if(duration.hours < 10){
        if(duration.minutes < 10){
            $('#duration').text('Duration: 0' + duration.hours + ':0' + duration.minutes);
        }
        else{
            $('#duration').text('Duration: 0' + duration.hours + ':' + duration.minutes);
        }
    }
    else{
        if(duration.minutes < 10){
            $('#duration').text('Duration: ' + duration.hours + ':0' + duration.minutes);
        }
        else{
            $('#duration').text('Duration: ' + duration.hours + ':' + duration.minutes);
        }
    }
}

export function setHourlyWeather(data: CurrWeather){
    let date = new Date(data.dt).toISOString();
    let times = $('[id=time]');
    let hours = date.substring(11, 13);
    setHours(hours, times);
    fetch(`${environment.ONE_CALL_URL}?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=daily&appid=${environment.API_KEY}`)
    .then((response) => {
        return response.json();
    }) 
    .then((dataH) => {
        let icons: any = $('[id=icon]');
        for(let i = 0; i < icons.length; i++){
            icons[i].src = `${environment.IMAGE_URL}${dataH.hourly[i].weather[0].icon}.png`;
        }
        let texts = $('[class=fore-text]');
        for(let i = 0; i < texts.length; i++){
            texts[i].innerText = dataH.hourly[i].weather[0].main;
        }
        let temps = $('[class=temp-hourly]');
        for(let i = 0; i < temps.length; i++){
            temps[i].innerText = (Number.parseInt(dataH.hourly[i].temp) - 273) + String.fromCharCode(176);
        }
        let realFeels = $('[id=temp-real-feel]');
        for(let i = 0; i < realFeels.length; i++){
            realFeels[i].innerText = (Number.parseInt(dataH.hourly[i].feels_like) - 273) + String.fromCharCode(176);
        }
        let winds = $('[id=wind]');
        let direct = '';
        for(let i = 0; i < winds.length; i++){
            let deg = Number.parseInt(dataH.hourly[i].wind_deg);
            if(deg === 0) direct = 'N';
            else if(deg === 90) direct = 'E';
            else if(deg === 180) direct = 'S';
            else if(deg === 270) direct = 'W';
            else if(deg > 0 && deg < 90) direct = 'NE';
            else if(deg > 90 && deg < 180) direct = 'SE';
            else if(deg > 180 && deg < 270) direct = 'SW';
            else if(deg > 270 && deg < 360) direct = 'NW';
            winds[i].innerText = Math.round(dataH.hourly[i].wind_speed) + ' ' + direct;
        }
    });
}

function setHours(hours: string, times: JQuery<HTMLElement>){
    let hour: number = Number.parseInt(hours);
    if(hour <= 19){
        times[0].innerText = (hour + 1) + ':00';
        times[1].innerText = (hour + 2) + ':00';
        times[2].innerText = (hour + 3) + ':00';
        times[3].innerText = (hour + 4) + ':00';
        times[4].innerText = (hour + 5) + ':00';
    }
    else{
        if(hour === 20){
            times[0].innerText = (hour + 1) + ':00';
            times[1].innerText = (hour + 2) + ':00';
            times[2].innerText = (hour + 3) + ':00';
            times[3].innerText = (hour + 4) + ':00';
            times[4].innerText = '01:00';
        }
        else if(hour === 21){
            times[0].innerText = (hour + 1) + ':00';
            times[1].innerText = (hour + 2) + ':00';
            times[2].innerText = (hour + 3) + ':00';
            times[3].innerText = '01:00';
            times[4].innerText = '02:00';
        }
        else if(hour === 22){
            times[0].innerText = (hour + 1) + ':00';
            times[1].innerText = (hour + 2) + ':00';
            times[2].innerText = '01:00';
            times[3].innerText = '02:00';
            times[4].innerText = '03:00';
        }
        else if(hour === 23){
            times[0].innerText = (hour + 1) + ':00';
            times[1].innerText = '01:00';
            times[2].innerText = '02:00';
            times[3].innerText = '03:00';
            times[4].innerText = '04:00';
        }
        else if(hour === 24){
            times[0].innerText = '01:00';
            times[1].innerText = '02:00';
            times[2].innerText = '03:00';
            times[3].innerText = '04:00';
            times[4].innerText = '05:00';
        }
    }
}

export function setCurrentWeatherNearby(data: CurrWeather){
    let coords: Array<Coord> = [new Coord(data.coord.lon + 1, data.coord.lat), new Coord(data.coord.lon - 1, data.coord.lat), new Coord(data.coord.lon, data.coord.lat + 1), new Coord(data.coord.lon, data.coord.lat - 1)];
    for(let i = 0; i < 4; i++){
        fetch(`${environment.API_URL}weather?lat=${coords[i].lat}&lon=${coords[i].lon}&appid=${environment.API_KEY}`)
        .then((response) => {
            return response.json();
        }) 
        .then((dataNear: any) => {
            $('[id=city]')[i].innerText = dataNear.name;
            (<HTMLInputElement>$('[id=weath-img-near]')[i]).src = `${environment.IMAGE_URL}${dataNear.weather[0].icon}.png`;
            (<HTMLInputElement>$('[id=temp-near]')[i]).innerText = (Number.parseInt(dataNear.main.temp) - 273) + String.fromCharCode(176) + 'C';
        });
    }
}