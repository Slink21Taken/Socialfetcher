import { fetchinstadata } from "./utils/instafetch.js";
import { fetchtiktokdata } from "./utils/tikfetch.js";
import { fetchxdata } from "./utils/twitterfetch.js";
import { fetchfbdata } from "./utils/fbfetch.js";
import { fetchytdata } from "./utils/ytfetch.js";

const apikey = "DayOi7QwYXSDMLxM1tSMGOvK19k1";

(async () => {
  try {
    //const ytData = await fetchytdata("MaskedArab", apikey);
    //console.log("YouTube Data:", ytData);

    //const instaData = await fetchinstadata("mrbeast",apikey);
    //console.log("Instagram Data:", instaData);

    //const tiktokData = await fetchtiktokdata("the_real_dancer99");
    //console.log("TikTok Data:", tiktokData);

    //const data = await fetchxdata(apikey, "techgirl1908");
    //console.log("Twitter Data:", data);

    //const fbData = await fetchfbdata("https://www.facebook.com/mrbeast/",apikey);
    //console.log("Facebook Data:", fbData);

  } catch (err) {
    console.error("Error fetching data:", err);
  }
})();
