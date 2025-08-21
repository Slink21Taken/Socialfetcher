export async function fetchinstadata(handle, apikey) {
  if (!handle || !apikey) {
    throw new Error("You need to enter both an API key and a handle!");
  }

  const url = `https://instagram-social-api.p.rapidapi.com/v1/info?username_or_id_or_url=${handle}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': apikey,
      'x-rapidapi-host': 'instagram-social-api.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.data;

    const res = {
      fullname: data.full_name || 'N/A',
      category: data.category || 'N/A',
      followers: data.follower_count || 'N/A',
      following: data.following_count || 'N/A',
      bio: data.biography || 'N/A',
      urls: data.external_url || 'N/A'
    };

    const naCount = Object.values(res).filter(val => val === 'N/A').length;
    if (naCount >= 5) {
      throw new Error("Likely wrong handle: too many missing fields");
    }

    return res;
  } catch (err) {
    const status = err.response?.status;
    if (status === 404 || status === 400) {
      throw new Error("Wrong handle! Not found!");
    } else if (status === 401 || status === 403) {
      throw new Error("Invalid or missing API key!");
    } else {
      throw new Error("Error occurred: " + err.message);
    }
  }
}
