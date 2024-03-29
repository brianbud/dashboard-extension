const authorEl = document.querySelector('#author');
const tickerEl = document.querySelector('#ticker');

async function getBgImage() {
  try {
    const res = await fetch(
      'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=CqZg12U9DultJO-WEbv2bQ5lnAuuGmvUe4W16PXykvE'
    );
    const data = await res.json();

    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.innerHTML = `<h3>picture by: ${data.user.name}</h3>`;
  } catch (err) {
    console.log(err);
    document.body.style.backgroundImage = `url("https://source.unsplash.com/random?orientation=landscape&query=nature")`;
  }
}

getBgImage();

async function getStockPrice() {
  try {
    const res = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=SHOP.TRT&outputsize=full&apikey=1R886Z5JGWXHTFBY`
    );
    const data = await res.json();

    const date = new Date();

    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let currentDate = `${year}-${month}-${day}`;
    const stockTitle = document.querySelector('#stock');
    stockTitle.innerHTML = `
      <h2>${data['Meta Data']['2. Symbol'].slice(0, -4)}</h2>
      <p>High: ${data['Time Series (Daily)'][currentDate]['2. high'].slice(
        0,
        -2
      )}</p>
      <p>Low: ${data['Time Series (Daily)'][currentDate]['3. low'].slice(
        0,
        -2
      )}</p>`;
  } catch {
    console.log(err);
  }
}

function getTime() {
  const time = new Date().toLocaleTimeString('en-us', { timeStyle: 'medium' });
  document.querySelector('.time').innerHTML = `<h1>${time}</h1>`;
}

setInterval(getTime, 1000);

getStockPrice();

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error('Weather api data not available');
        }
        return res.json();
      })
      .then((data) => {
        const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.querySelector('#weather').innerHTML = `
          <div>
          <img src=${icon} />
          <p>${Math.round(data.main.temp)} °C</p>
          </div>
          <p>${data.name}</p>
        `;
      })
      .catch((err) => console.log(err));
  });
} else {
  console.log('geolocation is not available');
}
