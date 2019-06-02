window.addEventListener('load', () => {
	let longitude;
	let latitude;

	const temperatureDescription = document.querySelector('.temperature-description');
	const temperatureDegree = document.querySelector('.temperature-degree');
	const locationTimezone = document.querySelector('.location-timezone');
	const temperatureSection = document.querySelector('.temperature-section');
	const temperatureSpan = document.querySelector('.temperature-section span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			//console.log(position);
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/'; // Used to elimanate "Cors issue"
			//API
			const api = `${proxy}https://api.darksky.net/forecast/ca541ea2392307371d62b2641c58a1df/${latitude},${longitude}`;

			fetch(api)
				.then((data) => {
					return data.json();
				})
				.then((data) => {
					//console.log(data);
					const { temperature, summary, icon } = data.currently;

					//Set DOM elements from the API
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					//Set Icons
                    setIcons(icon, document.querySelector('.icon'));
                    
                    //Formula for Celsius
                    let celsius = (temperature - 32) * (5 / 9);

					//Change temperature to Celisus/Farenheit
					temperatureSection.addEventListener('click', () => {
						if (temperatureSpan.textContent === 'F') {
                            temperatureSpan.textContent = 'C';
                            temperatureDegree.textContent = Math.floor(celsius);
						} else {
                            temperatureSpan.textContent = 'F';
                            temperatureDegree.textContent = Math.floor(temperature);
						}
					});
				});
		});
	}
	function setIcons(icon, iconId) {
		const skycons = new Skycons({ color: 'white' });
		const currentIcon = icon.replace(/-/g, '_').toUpperCase();
		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);
	}
});
