require("dotenv").config();
const { Scraper } = require("agent-twitter-client");
const fs = require("fs").promises;

async function postTweet() {
  try {
    const scraper = new Scraper();

    // Login with credentials
    await scraper.login(
      process.env.TWITTER_USERNAME,
      process.env.TWITTER_PASSWORD,
      process.env.TWITTER_EMAIL
    );

    // Example tweet text
    const tweetText =
      "市场对于日本下周是否降息，还没有共识\
    应该如何操作";

    // Verify tweet length
    if (tweetText.length > 280) {
      throw new Error(
        `Tweet is too long (${tweetText.length} characters). Maximum allowed is 280 characters.`
      );
    }

    // Optional: Add media (uncomment and modify if you want to include media)
    /*
    const mediaData = [{
      data: await fs.readFile('path/to/image.jpg'),
      mediaType: 'image/jpeg'
    }];
    
    const result = await scraper.sendTweet(tweetText, undefined, mediaData);
    */

    // Send tweet without media
    const result = await scraper.sendTweet(tweetText);

    console.log("Tweet posted successfully!");
    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

postTweet();
