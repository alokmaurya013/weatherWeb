const apikey="12468a5c516219cd5d0e9c3f192bc54d";
const cnt=4;
window.addEventListener("load",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            let lon= position.coords.longitude;
            let lat= position.coords.latitude;
            const url= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` + `lon=${lon}&appid=${apikey}`;
            fetch(url).then((res)=>{
                return res.json();
            }).then((data)=>{
                weatherReport(data);
            })
        })
    }
})
function searchByCity(){
    var place= document.getElementById('input').value;
    var urlsearch= `http://api.openweathermap.org/data/2.5/weather?q=${place}&` +`appid=${apikey}`;

    fetch(urlsearch).then((res)=>{
        return res.json();
    }).then((data)=>{
      //  console.log(data);
        weatherReport(data);
    })
   document.getElementById('input').value='';
}
function weatherReport(data){
    var urlcast= `http://api.openweathermap.org/data/2.5/forecast?q=${data.name}&`+`appid=${apikey}`;
    fetch(urlcast).then((res)=>{
        return res.json();
    }).then((forecast)=>{
       // console.log(forecast.city);
       dayForecast(forecast)
       // console.log(data);
        document.getElementById('city').innerText= data.name + ', '+data.sys.country;
       // console.log(data.name,data.sys.country);
    
       // console.log(Math.floor(data.main.temp-273));
        document.getElementById('temperature').innerText= Math.floor(data.main.temp-273)+ ' °C   ';
        
       // console.log(Math.floor(data.main.humidity));
        document.getElementById('humidity').innerText= data.main.humidity+ '% ';
        //console.log(Math.floor(data.main.windSpeed));
        document.getElementById('wind').innerText=data.wind.speed+ 'km/h';
    
        document.getElementById('clouds').innerText= data.weather[0].description;
       // console.log(data.weather[0].description)
        let icon1= data.weather[0].icon;
        let iconurl= "http://api.openweathermap.org/img/w/"+ icon1 +".png";
        document.getElementById('img').src=iconurl
    })
}
function dayForecast(forecast){
    document.querySelector('.weekF').innerHTML=''
    for (let i = 8; i < forecast.list.length; i+=8) {
      //  console.log(forecast.list[i]);
        let div= document.createElement('div');
        div.setAttribute('class','dayF');
        let day= document.createElement('p');
        day.setAttribute('class','date')
        day.innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Delhi');
        div.appendChild(day);

        let temp= document.createElement('p');
        temp.setAttribute('class','temp');
        temp.innerText= Math.floor((forecast.list[i].main.temp- 273))+ ' °C';
        div.appendChild(temp)

        let humidity=document.createElement('p');
        humidity.setAttribute('class','humidity')
        humidity.innerText= (forecast.list[i].main.humidity)+'%';
        div.appendChild(humidity);
               /* document.getElementsByClassName('date').innertext=new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Delhi').slice(4,15);
        document.getElementsByClassName('temp').innertext=Math.floor((forecast.list[i].main.temp- 273))+ ' °C';
        document.getElementsByClassName('humidity').innertext=(forecast.list[i].main.humidity)+'%';
        document.getElementsByClassName('wind').innertext= (forecast.list[i].wind.speed)+'km/h';
        document.getElementsByClassName('desc').innertext=forecast.list[i].weather[0].description;*/
       
        let wind=document.createElement('p');
        wind.setAttribute('class','wind')
        wind.innerText= (forecast.list[i].wind.speed)+'km/h';
        div.appendChild(wind);
        let description= document.createElement('p');
        description.setAttribute('class','desc')
        description.innerText= forecast.list[i].weather[0].description;
        div.appendChild(description);
        document.querySelector('.weekF').appendChild(div)
    }
} 