import { chromium, errors } from 'playwright';

export async function fetchtiktokdata(handle) {
  if (!handle || typeof handle !== 'string' || handle.trim().length > 24) {
    throw new Error('Invalid TikTok handle provided');
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const trimmedHandle = handle.trim();
  const url = `https://www.tiktok.com/@${trimmedHandle}`;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    await page.waitForSelector('[data-e2e="user-title"]', { timeout: 10000 });

    const data = await page.evaluate(() => {
      const getText = selector => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : 'N/A';
      };

      return {
        nickname: getText('[data-e2e="user-title"]') || 'N/A',
        bio: getText('[data-e2e="user-bio"]') || 'N/A',
        followers: getText('[data-e2e="followers-count"]') || 'N/A',
        following: getText('[data-e2e="following-count"]') || 'N/A',
        likes: getText('[data-e2e="likes-count"]') || 'N/A',
      };
    });

    return data;

  } catch (err) {
    if (err instanceof errors.TimeoutError) {
      throw new Error("Timeout: TikTok profile may not exist or page took too long to load.");
    } else if (err.message.includes("net::ERR_NAME_NOT_RESOLVED")) {
      throw new Error("Network error: TikTok may be unreachable.");
    } else {
      throw new Error("Fetch error: " + err.message);
    }
  } finally {
    await browser.close();
  }
}
