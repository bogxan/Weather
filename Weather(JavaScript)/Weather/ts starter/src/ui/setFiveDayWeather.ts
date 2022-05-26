import { environment } from "../config/environment";
import { CurrWeather } from "../models/weatherCurrent";
import { FiveDaysWeather } from "../models/weatherFiveDays";

export function setFiveDayWeather(data: FiveDaysWeather){
    console.log(data);
    let firstDay = (data.list[0].dt_txt) as string;
    let secondDay = (firstDay.substring(0, 8) + (Number.parseInt(firstDay.substring(8, 10)) + 1) + firstDay.substring(10)) as string;
    let thirdDay = (firstDay.substring(0, 8) + (Number.parseInt(firstDay.substring(8, 10)) + 2) + firstDay.substring(10)) as string;
    let fourthDay = (firstDay.substring(0, 8) + (Number.parseInt(firstDay.substring(8, 10)) + 3) + firstDay.substring(10)) as string;
    let fifthDay = (firstDay.substring(0, 8) + (Number.parseInt(firstDay.substring(8, 10)) + 4) + firstDay.substring(10)) as string;
    let days: any = [firstDay, secondDay, thirdDay, fourthDay, fifthDay];
    let counter = 0;
    data.list.forEach((li: any) => {
        if(days.includes(li.dt_txt, 0)){
            let date = new Date(li.dt_txt);
            if(counter === 0){
                (<HTMLInputElement>$('[id=day]')[counter]).innerText = 'TONIGHT';
            }
            else{
                (<HTMLInputElement>$('[id=day]')[counter]).innerText = date.toString().substring(0, 3);
            }
            (<HTMLInputElement>$('[id=date]')[counter]).innerText = date.toString().substring(4, 11);
            (<HTMLInputElement>$('[id=ic]')[counter]).src = `${environment.IMAGE_URL}${li.weather[0].icon}.png`;
            (<HTMLInputElement>$('[id=temp-five]')[counter]).innerText = (Number.parseInt(li.main.temp) - 273) + String.fromCharCode(176) + 'C';
            (<HTMLInputElement>$('[id=forecast-five]')[counter]).innerText = li.weather[0].main;
            counter++;
        }
    });
    (<HTMLElement>document.querySelector('.five-day-block')).onclick = ((ev) => {
        let srchDate;
        let day = '';
        for(let i = 0; i < $('.five-day-content').length; i++){
            (<HTMLInputElement>$('.five-day-content')[i]).classList.remove('selected-five');
        }
        if((<HTMLElement>ev.target).children.length === 0){
            let srchDateElement = (<HTMLElement>ev.target).parentNode.children[1] as HTMLElement;
            srchDate = srchDateElement.innerText;
            let dayElement = (<HTMLElement>ev.target).parentNode.children[0] as HTMLElement;
            day = dayElement.innerText;
            let el = (<HTMLElement>ev.target).parentNode as HTMLElement;
            el.classList.add('selected-five');
        }
        else{
            let srchDateElement = (<HTMLElement>ev.target).children[1] as HTMLElement;
            srchDate = srchDateElement.innerText;
            let dayElement = (<HTMLElement>ev.target).children[0] as HTMLElement;
            day = dayElement.innerText;
            (<HTMLElement>ev.target).classList.add('selected-five');
        }
        srchDate = new Date(srchDate).toLocaleString();
        setThreeHourWeather(srchDate, data, day);
    });
}

export function setThreeHourWeather(srchDate: string, data: FiveDaysWeather, day: string){
    let counter = 0;
    data.list.forEach((li: any) => {
        let srchDay = srchDate.substring(0, 2);
        let srchMonth = srchDate.substring(3, 5);
        if(li.dt_txt.substring(5, 7) === srchMonth && li.dt_txt.substring(8, 10) === srchDay && counter < 5){
            (<HTMLInputElement>$('.hourly-day')[0]).innerText = day;
            (<HTMLInputElement>$('[class=time]')[counter]).innerText = li.dt_txt.substring(11, 16);
            (<HTMLInputElement>$('[class=icon]')[counter]).src = `${environment.IMAGE_URL}${li.weather[0].icon}.png`;
            (<HTMLInputElement>$('[id=fore-text]')[counter]).innerText = li.weather[0].main;
            (<HTMLInputElement>$('[id=temp-hourly]')[counter]).innerText = (Number.parseInt(li.main.temp) - 273) + String.fromCharCode(176) + 'C';
            (<HTMLInputElement>$('[class=temp-real-feel]')[counter]).innerText = (Number.parseInt(li.main.feels_like) - 273) + String.fromCharCode(176) + 'C';
            let deg = li.wind.deg;
            let direct = '';
            if(deg === 0) direct = 'N';
            else if(deg === 90) direct = 'E';
            else if(deg === 180) direct = 'S';
            else if(deg === 270) direct = 'W';
            else if(deg > 0 && deg < 90) direct = 'NE';
            else if(deg > 90 && deg < 180) direct = 'SE';
            else if(deg > 180 && deg < 270) direct = 'SW';
            else if(deg > 270 && deg < 360) direct = 'NW';
            (<HTMLInputElement>$('[class=wind]')[counter]).innerText = Math.round(li.wind.speed) + ' ' + direct; 
            counter++;
        }
    });
}