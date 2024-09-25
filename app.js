const auth = "ZtgWwvbqcBHQzJawHDJ3gRszvsLXg3k3smARsiicN9J61pcJod5q5Ejf";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
// const searchBtn = document.querySelector(".search-btn");
const form = document.querySelector(".search-form");
let searchValue;

//event listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!searchValue) return;
  searchPhoto(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}></img>`;

    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  const data = await fetchApi("https://api.pexels.com/v1/curated?per_page=15&page=1");
  //   data.photos.forEach((photo) => {
  //     const galleryImg = document.createElement("div");
  //     galleryImg.classList.add("gallery-img");
  //     galleryImg.innerHTML = `<img src=${photo.src.large}></img>
  //     <p>${photo.photographer}</p>`;
  //     gallery.appendChild(galleryImg);
  //   });

  generatePictures(data);
}

async function searchPhoto(query) {
  clear();
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

curatedPhotos();
