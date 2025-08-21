

export async function fetchfbdata(handle, api_key) {
    handle = handle.trim()
    if (!handle || !api_key){
        throw new Error("You need to enter a url and api key!")
    }
    if (typeof handle !== 'string') {
    throw new Error("Wrong handle format!");
        }
    try {
        const response = await fetch(`https://api.scrapecreators.com/v1/facebook/profile?url=https://www.facebook.com/${handle}/`, {
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
        if (!data.name){
            return "Wrong handle!"
        }
        if (data.account_status === 'private') {
            return "Account is private: " + data.name;
        }

        let name = data.name || 'N/A';
        let gender = data.gender || 'N/A';
        let likes = data.likeCount || 'N/A';
        let followers = data.followerCount || 'N/A';
        let creationdate = data.creationDate || 'N/A';

        return { name, gender, likes, followers, creationdate };
    } catch (err) {
        if (err.response?.status === 404 || err.response?.status === 400) {
      throw new Error("Wrong handle! Not found!");
    } else if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Invalid or missing API key!");
    } else {
      throw new Error("Error occurred: " + err.message);
    }
}}
