import express from 'express';
import path from 'path';

const app = express();
const port = 3001;

app.use(express.static('public'));
app.use(express.json());

import { fetchinstadata } from "./public/utils/instafetch.js";
import { fetchxdata } from "./public/utils/twitterfetch.js";
import { fetchfbdata } from "./public/utils/fbfetch.js";
import { fetchytdata, fetchchannelid } from "./public/utils/ytfetch.js";

const apikey ="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
const rapidapikey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const googleapikey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";


app.get('/', async (req, res) => {
  res.json("Here...");
});

app.post('/facebook', async (req, res) => {
  try {
    const handle = req.body.handle; 
    const data = await fetchfbdata(handle, apikey);
    res.json(data);
  } catch (err) {
    console.error("Facebook fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch Facebook data' });
  }
});

app.post('/insta',  async (req, res) => {
  try {
    const handle = req.body.handle; 
    const data = await fetchinstadata(handle, rapidapikey);
    res.json(data);
  } catch (err) {
    console.error("Instagram fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch Instagram data' });
  }
});

app.post('/twitter',  async (req, res) => {
  try {
    const handle = req.body.handle; 
    const data = await fetchxdata(handle, apikey);
    res.json(data);
  } catch (err) {
    console.error("X fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch X data' });
  }
});

app.post('/youtubeoptions', async (req, res) => {
  const handle = req.body.handle; 
  console.log(`Fetching YouTube data from: https://www.youtube.com/@${handle}`);
  try {
    const data = await fetchchannelid(handle, googleapikey);
    res.json(data);
  } catch (err) {
    console.error("YT options fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch YT channel options' });
  }
});

app.post('/youtube', async (req, res) => {
  const channelId = req.body.channelId; 
  console.log(`Fetching YouTube stats for channel ID: ${channelId}`);
  try {
    const data = await fetchytdata(channelId, googleapikey);
    res.json(data);
  } catch (err) {
    console.error("YT fetch error:", err);
    res.status(500).json({ error: 'Failed to fetch YT channel' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
