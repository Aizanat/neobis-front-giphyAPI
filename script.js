const MY_API_KEY = 'WFjFZdIxDTDVnWK857jE4gdsb2opv0NA'
const limit = 28

const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
const giphyContainer = document.getElementById('giphy-container')
const errorText = document.getElementById('error-text')
const defaultSearchTerm = 'Galaxy'

searchButton.addEventListener('click', function () {
  const input = searchInput.value.trim()
  fetchGiphy(input)
})

searchInput.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim()
    fetchGiphy(searchTerm)
  }
})

function fetchGiphy(input) {
  if (input.trim() === '') {
    displayError('Empty search string, please write something')
    return Promise.reject('Empty search string')
  }
  const API_URL = `https://api.giphy.com/v1/stickers/search?api_key=${MY_API_KEY}&q=${input}&limit=${limit}`

  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject('Network error or invalid response status')
      }
      return response.json()
    })
    .then((data) => {
      const stickers = data.data
      if (stickers.length === 0) {
        displayError('No suitable GIFs found, please enter something else')
        displayStickers('')
      } else {
        displayStickers(stickers)
      }
    })
    .catch((error) => {
      displayError('No suitable GIFs found, please enter something else')
      console.log(error)
    })
}
fetchGiphy(defaultSearchTerm)

function displayStickers(stickers) {
  giphyContainer.innerText = ''
  errorText.style.display = 'none'

  stickers.forEach((sticker) => {
    const imgElement = document.createElement('img')
    imgElement.classList.add('sticker-img')
    imgElement.style.backgroundColor = '#F5F5DC'
    imgElement.style.width = '340px'
    imgElement.style.height = '300px'
    imgElement.style.margin = '7px'
    imgElement.src = sticker.images.fixed_width.url
    giphyContainer.appendChild(imgElement)
  })
}

function displayError(errorMessage) {
  giphyContainer.innerHTML = ''
  errorText.textContent = errorMessage
  errorText.style.display = 'block'
}
