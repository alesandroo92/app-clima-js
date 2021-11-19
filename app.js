window.addEventListener("load", () => {
    let lon
    let lat

    let temperaturaValor = document.querySelector("#temperatura-valor");
    let temperaturaDescripcion = document.querySelector("#temperatura-descripcion");
    let ubicacion = document.querySelector("#ubicacion");
    let iconoAnimado = document.querySelector("#icono-animado");
    let vientoVelocidad = document.querySelector("#viento-velocidad");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            
            // Tu localizacion
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=81aa000149806fbb037fcf8cd6e5daeb`
            
            // Localizacion por ciudad
            //const url = `https://api.openweathermap.org/data/2.5/weather?q=Salta&lang=es&units=metric&appid=81aa000149806fbb037fcf8cd6e5daeb`
            
            //console.log(url);
            fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                //console.log(data);
                let temp = Math.round(data.main.temp);
                temperaturaValor.textContent = `${temp} °C`;
                
                let desc = data.weather[0].description;
                temperaturaDescripcion.textContent = desc.toUpperCase();

                ubicacion.textContent = data.name;

                vientoVelocidad.textContent = `${data.wind.speed} m/s`;

                //Icono estatico
                //console.log(data.weather[0].icon);
                //let iconCode = data.weather[0].icon;
                //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`;
                //console.log(urlIcon);

                // Icono animado
                switch(data.weather[0].main) {
                    case "Clear":
                    iconoAnimado.src = "animated/day.svg";
                    console.log("LIMPIO");
                      break;    
                    case "Clouds":
                    iconoAnimado.src = "animated/cloudy-day-1.svg";
                    console.log("NUBES");
                      break; 
                    case "Thunderstorm":
                    iconoAnimado.src = "animated/thunder.svg";
                    console.log("TORMENTA");
                      break;  
                    case "Drizzle":
                    iconoAnimado.src = "animated/rainy-2.svg";
                    console.log("LLOVIZNA");
                      break;  
                    case "Rain":
                    iconoAnimado.src = "animated/rainy-7.svg";
                    console.log("LLUVIA");
                      break;  
                    case "Snow":
                    iconoAnimado.src = "animated/snowy-6.svg";
                    console.log("NIEVE");
                      break; 
                    case "Atmosphere":
                    iconoAnimado.src = "animated/weather.svg";
                    console.log("ATMOSFERA");
                      break;  
                }
            })
            .catch( error => {
                console.log(error);
            });
        });
    }
});