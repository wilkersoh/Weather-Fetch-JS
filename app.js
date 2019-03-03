
window.addEventListener('load', () => {
    let long;
    let lat;

    const location = document.getElementById('location-timezone');
    const c = document.getElementById('ctry');
    const d = document.getElementById('degree');
    const w = document.getElementById('temperature-description');
    const degree = document.getElementById('temperature-degree');
    const i = document.getElementById('icon');
    const p = document.getElementById('section');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/"
            const key = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=cff412bce3185877fec77330c5214824`;

            fetch(key)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);

                // Formula Cel
                let celsius = Math.round(data.main.temp - 273.15);

                let fahrenheit = Math.round(data.main.temp * 9 / 5 - 459.67);
                
                location.textContent = data.name;
                c.textContent = data.sys.country;
                w.textContent = data.weather[0].main;
                degree.textContent = celsius;
                const img = data.weather[0].icon;
                i.src = `http://openweathermap.org/img/w/${img}.png`


                d.addEventListener('click', () => {
                    if(p.textContent == "F"){
                        p.textContent = "C";
                        degree.textContent = celsius;
                    } else {
                        p.textContent = "F";
                        degree.textContent = fahrenheit;
                    }
                })
                
            })
        });
    }

})