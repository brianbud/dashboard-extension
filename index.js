const authorEl = document.querySelector('#author');

fetch(
  'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=CqZg12U9DultJO-WEbv2bQ5lnAuuGmvUe4W16PXykvE'
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.innerHTML = `<h3>by: ${data.user.name}</h3>`;
  });
