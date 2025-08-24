#SocialFetcher
This program has a major bug. The values sent to the endpoint via POST request end up somehow being labelled as undefined typeerrors. I have tried reverse engineering and isolating the bug and plugging into GPT 5. However, nothing has worked. 

The frontend sends a  handle (e.g. MrBeast) to an endpoint (e.g /facebook) to get the information using scrapecreators. The first request to /endpoint is failing with a 400 Bad Request. The backend logs show that the handle value is undefined, even though I’m sending it in the request headers.ive Confirmed the frontend is calling fetch("http://localhost:3001/endpoint", { method: "POST", headers: { "handle": val } }) . ive Logged val before the fetch — it’s a valid string like "MrBeast" handle logs as undefined, and the route returns a 400 error. the error stems from public/index.html from lines 71 onwards. all the request for the dedicated endpoints are failing. In backend.js, i error handle the error(line 29 for e.g facebook) and it shows as failed to fetch:undefined. even if ive confirmed the value being sent.

#Update:
The majority of the code is now somehow functional however the twitter endpoint returns an error 401
