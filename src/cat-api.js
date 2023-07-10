const URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_ZvsstgvMRBwaghUvxmLjCXxkobzkYM3JWhOR6ZKV5AU77WEqEA44fleRgeTIspzF';

export async function fetchBreeds() {
  const response = await fetch(`${URL}/breeds?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

export async function fetchCatByBreed(breedId) {
  const response = await fetch(
    `${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
