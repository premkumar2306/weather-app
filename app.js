document.querySelector('#find-me').addEventListener('click', geoFindMe);

function weatherDetail(detail) {
    const description = document.querySelector('.temperature-description');
    const degree = document.querySelector('#degree');
    const timezone = document.querySelector('.timezone');
    const status = document.querySelector('#status');
    const icon = document.querySelector('#wicon');
    const iconcode = detail.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    icon.src = iconurl;
    description.innerHTML = `${detail.weather[0].description}`
    degree.innerHTML = `${detail.main.temp}`
    timezone.innerHTML = `${detail.name}`
    status.innerHTML = 'Success Loading Data'
}

function loadingError() {
    const status = document.querySelector('#status');
    status.innerHTML = 'Loading falied';
}
function geoFindMe() {
    console.log('geoFindMe clicked')
    let status = document.querySelector('#status');
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        requestapi(latitude, longitude);
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.innerHTML = 'Geolocation is not supported by your browser';
    } else {
        status.innerHTML = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

function requestapi(lat, long) {
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5d387b63ff2203e81ea37df787fad0ab`;
    fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(res => weatherDetail(res))
        .catch(loadingError)
}