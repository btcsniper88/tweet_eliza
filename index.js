require("dotenv").config();
const { Scraper } = require("agent-twitter-client");
const fs = require("fs").promises;

async function fetchUserTimeline() {
  try {
    const scraper = new Scraper();

    await scraper.login(
      process.env.TWITTER_USERNAME,
      process.env.TWITTER_PASSWORD,
      process.env.TWITTER_EMAIL
    );

    const username = "liguagua";
    // Get tweets generator
    const tweetsGenerator = await scraper.getTweets("liguagua", 100);
    const tweets = [];

    // Iterate over the AsyncGenerator
    for await (const tweet of tweetsGenerator) {
      tweets.push(tweet);
    }

    // Check if we got any tweets
    if (tweets.length === 0) {
      console.log("No tweets found");
      return;
    }

    // Format tweets as markdown
    const markdown = tweets
      .map((tweet) => {
        return `## Tweet from ${new Date(tweet.date).toLocaleString()}
  
  ${tweet.text}
  
  ---
  `;
      })
      .join("\n");

    // Save to file
    await fs.writeFile(`${username}.md`, markdown);
    console.log(`Tweets saved to ${username}.md`);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchUserTimeline();
