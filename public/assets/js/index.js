const inputGroup = document.querySelector('.cycle');
const cycleSwitch = document.querySelector('#cycle-switch');
const dateField = document.querySelector('#currentDate');
const tempOutField = document.querySelector('#temp');
const timeField = document.querySelector('#time');
const loc = document.querySelector('#location');

function formEndCycle() {
    if (cycleSwitch.value === 'end') {
       let div = document.createElement('DIV');
       div.classList.add('form-group');
       
       let lable = document.createElement('LABEL');
       lable.setAttribute('for', 'restWater');
       lable.textContent = 'Rest of water'

       let input = document.createElement('INPUT');
       input.setAttribute('type', 'number');
       input.setAttribute('id', 'restWater');
       input.setAttribute('placeholder', 'The rest of water in pallet in L');
        
       div.appendChild(lable);
       div.appendChild(input);
        
       inputGroup.insertBefore(div, inputGroup.lastElementChild);
    } else {
        document.querySelector('#restWater').parentNode.remove();
    }
}

function getLocation() {
    return new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition( success => {
                resolve(success);
            }, error => {
                alert('couldn\'t get location');
                reject(console.log(error));
            });
            
        } else {
            alert('your browser doesn\'t support geolocation');
        }
    });
}

async function getWeather() {
    //
    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    //http://openweathermap.org/img/wn/10d@2x.png
    let locationObj = await getLocation();

    let lat = locationObj.coords.latitude;
    let lon = locationObj.coords.longitude;
    let apiKey = '729178923b1566e76a259e4bb46acd1f';
    
    const url = new URL('http://api.openweathermap.org/data/2.5/weather');
    url.searchParams.set('lat', lat);
    url.searchParams.set('lon', lon);
    url.searchParams.set('appid', apiKey);
    url.searchParams.set('units', 'metric');
    
    let data = await fetch(url)
        .then(response => response.json());
    let temp = Math.round(data.main.temp);
    let icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    let humidity = data.main.humidity;
    

    let img = document.createElement('IMG');
    img.src = `${icon}`;
    img.width = 30;
    img.height = 30;
    img.style.background = 'hsl(0, 0%, 90%)';
    img.alt = data.weather[0].description;

    let p1 = document.createElement('P');
    p1.textContent = temp + ' °C';
    let p2 = document.createElement('P');
    p2.textContent = humidity + ' %';

    let div = document.createElement('DIV');
    div.appendChild(p1);
    div.appendChild(img);
    div.appendChild(p2);

    tempOutField.textContent = '';
    tempOutField.appendChild(div);
  
}

function getDate() {
    const timeOption = {
        hour: '2-digit',
        minute: '2-digit',
    }
    const dateOption = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }

    let time = new Date().toLocaleString('ru', timeOption);
    let date = new Date().toLocaleString('ru', dateOption);

    timeField.textContent = time;
    dateField.textContent = date;
    
}

document.body.onload = function() {
    getWeather();
    getDate();
    setInterval(() => {
        getDate();
    }, 60000);
}


cycleSwitch.addEventListener('change', (event)=> {
    formEndCycle();
});