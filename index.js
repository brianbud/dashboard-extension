const authorEl = document.querySelector('#author');

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
    console.log(data);
    console.log(data['Time Series (Daily)'][currentDate]);
    const stockTitle = document.querySelector('#stock');
    stockTitle.innerHTML = `<h2>${data['Meta Data']['2. Symbol'].slice(
      0,
      -4
    )}</h2>`;
  } catch {
    console.log(err);
  }
}

getStockPrice();
