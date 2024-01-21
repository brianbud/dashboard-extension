const authorEl = document.querySelector('#author');

async function getBgImage() {
  try {
    const res = await fetch(
      'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=CqZg12U9DultJO-WEbv2bQ5lnAuuGmvUe4W16PXykvE'
    );
    const data = await res.json();

    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    authorEl.innerHTML = `<h3>by: ${data.user.name}</h3>`;
  } catch (err) {
    console.log(err);
    document.body.style.backgroundImage = `url("https://source.unsplash.com/random?orientation=landscape&query=nature")`;
  }
}

getBgImage();
// fetch(
//   'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&clientt_id=CqZg12U9DultJO-WEbv2bQ5lnAuuGmvUe4W16PXykvE'
// )
//   .then((res) => res.json())
//   .then((data) => {
//     document.body.style.backgroundImage = `url(${data.urls.regular})`;
//     authorEl.innerHTML = `<h3>by: ${data.user.name}</h3>`;
//   })
//   .catch((err) => {
//     console.log(err);
//     document.body.style.backgroundImage = `url("https://source.unsplash.com/random?orientation=landscape&query=nature")`;
//   });
