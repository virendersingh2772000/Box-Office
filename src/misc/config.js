const API_BASE_URL = 'https://api.tvmaze.com';

export async function getApi(searchQuery) {
  const responce = await fetch(`${API_BASE_URL}${searchQuery}`).then(r =>
    r.json()
  );
  return responce;
}
