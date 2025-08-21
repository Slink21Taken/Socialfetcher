export async function fetchytdata(handle, api_key) {
  if (!handle || !api_key) throw new Error("Input handle and API key");

  try {
  const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${handle}&key=${api_key}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    throw new Error("Channel not found");
  }

  const channel = data.items[0];
  return {
    name: channel.snippet.title,
    subscribers: channel.statistics.subscriberCount,
    bio: channel.snippet.description,
    videos: channel.statistics.videoCount,
    views: channel.statistics.viewCount,
    creationDate: channel.snippet.publishedAt
  };
  } catch (err) {
    if (err.response?.status === 404 || err.response?.status === 400) {
      throw new Error("Wrong handle! Not found!");
    } else if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Invalid or missing API key!");
    } else {
      throw new Error("Error occurred: " + err.message);
    }
  }
}

export async function fetchchannelid(handle, api_key) {
  if (!handle || !api_key) {
    throw new Error("Not all fields entered");
  }

  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handle)}&maxResults=10&key=${api_key}`
    );
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      return [];
    }

    const channels = data.items.map(item => ({
      channelId: item.id.channelId,                
      title: item.snippet.title,                  
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.default?.url || "None available",
    }));

    return channels;
  } catch (err) {
    if (err.response?.status === 404 || err.response?.status === 400) {
      throw new Error("Wrong handle! Not found!");
    } else if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Invalid or missing API key!");
    } else {
      throw new Error("Error occurred: " + err.message);
    }
  }
}



