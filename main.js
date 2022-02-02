const api = {
	key: "90fa50c2301225bf2f0b66cf8aea3959",
	base:"http://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
	if (evt.keyCode == 13) {
		getResults(searchbox.value);
		console.log(searchbox.value);
	}
}

function getResults(query){
	fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
	.then(weather => {
		return weather.json();
	}).then(displayResults);
}
function displayResults(weather){
	console.log(weather);
	let city = document.querySelector('.location .city');
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector('.location .date');
	date.innerText = dateBuilder(now);

	let temp = document.querySelector('.current .temp');
	temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`;

	let weather_el = document.querySelector('.current  .weather');
	weather_el.innerText = weather.weather[0].main;

	let hiLow = document.querySelector('.hi-low');
	hiLow.innerText  = `${Math.round( weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d){
	let monthes = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = monthes[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
