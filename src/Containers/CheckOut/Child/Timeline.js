export const GenerateTimes = () => {
    let hours, minutes, ampm,arr = [];
    for(let i = 360; i <= 1200; i += 30){
        hours = Math.floor(i / 60);
        minutes = i % 60;
        if (minutes < 10) minutes = '0' + minutes; // adding leading zero
        //ampm = hours % 24 < 12 ? 'AM' : 'PM';
        //hours = hours % 12;
        //if (hours === 0) hours = 12;
        arr = [...arr,{
          "name" : `${i}`,
          "time" : hours + ':' + minutes,
          "divided_time" : {
              "h" : hours,
              "m" : minutes==="00" ? 0 : minutes,
            },
          "selected" : false,
          "disabled" : false
        }];
    }
    return arr;
}

export const ConvertToValidDate = (d,h=null,m=null) => {
    let date = new Date(d);
    let hours = h || date.getHours();
    let minutes = m || date.getMinutes();
    if(minutes===0) minutes = 0
    else if(minutes>0 && minutes<=30) minutes = 30;
    else if(minutes>30) {minutes = 0;hours += 1;}
    return new Date(date.setHours(hours,minutes,0))
}