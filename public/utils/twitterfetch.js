
export async function fetchxdata(api_key, handle) {
  if (!api_key || !handle) {
    throw new Error("Missing API key or handle");
  }

  try {
    const response = await fetch(`https://api.scrapecreators.com/v1/twitter/profile?handle=${handle}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": api_key
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || typeof data !== 'object') {
      throw new Error("Invalid response structure");
    }

    const result = {
      name: data.name || 'N/A',
      username: data.username || 'N/A',
      bio: data.description || 'N/A',
      followers: data.followers_count || 'N/A',
      following: data.friends_count || 'N/A',
      likes: data.favourites_count || 'N/A',
      tweets: data.statuses_count || 'N/A',
      joined: data.created_at || 'N/A'
    };
    const naCount = Object.values(result).filter(val => val === 'N/A').length;

    if (naCount >= 8) {
      throw new Error("Likely wrong handle: too many missing fields");
    }

    return result;

  } catch (err) {
    if (err.response?.status === 404 || err.response?.status === 400) {
      throw new Error("Wrong handle! Not found!");
    } else if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Invalid or missing API key!");
    } else if (err.message.includes("Cannot read properties of undefined")) {
      throw new Error("Unexpected response format: missing data fields");
    } else {
      throw new Error("Error occurred: " + err.message);
    }
  }
}
