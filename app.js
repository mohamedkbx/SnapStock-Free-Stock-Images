const auth = "ZtgWwvbqcBHQzJawHDJ3gRszvsLXg3k3smARsiicN9J61pcJod5q5Ejf";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");
let searchValue;

async function curatedPhotos() {
  const dataFetch = await fetch("https://api.pexels.com/v1/curated?per_page=15&page=1", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `<img src=${photo.src.large}></img>
    <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}
curatedPhotos();
