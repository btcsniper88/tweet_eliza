Skip to content
Navigation Menu
elizaOS
agent-twitter-client

Type / to search
Code
Issues
19
Pull requests
1
Actions
Projects
Security
Insights
Owner avatar
agent-twitter-client
Public
elizaOS/agent-twitter-client
Go to file
t
Add file
Folders and files
Name
Latest commit
hashirpm
hashirpm
docs: update README with home timeline fetching example (#52)
be09d19
·
17 hours ago
History
.github/workflows
Fix cookie caching, add fetchHomeTimeline
4 months ago
src
improvements: adding more spaces related exports (#51)
20 hours ago
test-assets
feat: grok functionality (#45)
last week
.DS_Store
feat: grok functionality (#45)
last week
.env.example
[1/2] Added Poll Creation via V2 API with examples
2 months ago
.eslintrc.js
feat: add docs workflow
3 years ago
.gitattributes
chore: add gitattributes
3 years ago
.gitignore
Fix cookie caching, add fetchHomeTimeline
4 months ago
.prettierignore
fix: bundle types
3 years ago
.prettierrc
chore: scaffold project
3 years ago
LICENSE
remove junk and run prettier
6 months ago
README.md
docs: update README with home timeline fetching example (#52)
17 hours ago
SampleAgent.js
[3/3] Get Poll Results and Standardize Return Type to Tweet
2 months ago
jest.config.js
feat: implement TLS cipher shuffling for Node to reduce 404s (#97)
6 months ago
package-lock.json
Merge branch 'main' into fix-preview
2 weeks ago
package.json
feat: grok functionality (#45)
last week
rollup.config.mjs
chore: set up rollup for multiplatform builds (#96)
6 months ago
test-setup.js
feat: implement TLS cipher shuffling for Node to reduce 404s (#97)
6 months ago
tsconfig.json
Remove yarn and add sendTweet
6 months ago
typedoc.json
fix build, fix ts, fix typedoc
last month
Repository files navigation
README
MIT license
agent-twitter-client
This is a modified version of @the-convocation/twitter-scraper with added functionality for sending tweets and retweets. This package does not require the Twitter API to use and will run in both the browser and server.

Installation
npm install agent-twitter-client
Setup
Configure environment variables for authentication.

TWITTER_USERNAME= # Account username
TWITTER_PASSWORD= # Account password
TWITTER_EMAIL= # Account email
PROXY_URL= # HTTP(s) proxy for requests (necessary for browsers)

# Twitter API v2 credentials for tweet and poll functionality

TWITTER_API_KEY= # Twitter API Key
TWITTER_API_SECRET_KEY= # Twitter API Secret Key
TWITTER_ACCESS_TOKEN= # Access Token for Twitter API v2
TWITTER_ACCESS_TOKEN_SECRET= # Access Token Secret for Twitter API v2
Getting Twitter Cookies
It is important to use Twitter cookies to avoid sending a new login request to Twitter every time you want to perform an action.

In your application, you will likely want to check for existing cookies. If cookies are not available, log in with user authentication credentials and cache the cookies for future use.

const scraper = await getScraper({ authMethod: 'password' });

scraper.getCookies().then((cookies) => {
console.log(cookies);
// Remove 'Cookies' and save the cookies as a JSON array
});
Getting Started
const scraper = new Scraper();
await scraper.login('username', 'password');

// If using v2 functionality (currently required to support polls)
await scraper.login(
'username',
'password',
'email',
'appKey',
'appSecret',
'accessToken',
'accessSecret',
);

const tweets = await scraper.getTweets('elonmusk', 10);
const tweetsAndReplies = scraper.getTweetsAndReplies('elonmusk');
const latestTweet = await scraper.getLatestTweet('elonmusk');
const tweet = await scraper.getTweet('1234567890123456789');
await scraper.sendTweet('Hello world!');

// Create a poll
await scraper.sendTweetV2(
`What's got you most hyped? Let us know! 🤖💸`,
undefined,
{
poll: {
options: [
{ label: 'AI Innovations 🤖' },
{ label: 'Crypto Craze 💸' },
{ label: 'Both! 🌌' },
{ label: 'Neither for Me 😅' },
],
durationMinutes: 120, // Duration of the poll in minutes
},
},
);
Fetching Specific Tweet Data (V2)
// Fetch a single tweet with poll details
const tweet = await scraper.getTweetV2('1856441982811529619', {
expansions: ['attachments.poll_ids'],
pollFields: ['options', 'end_datetime'],
});
console.log('tweet', tweet);

// Fetch multiple tweets with poll and media details
const tweets = await scraper.getTweetsV2(
['1856441982811529619', '1856429655215260130'],
{
expansions: ['attachments.poll_ids', 'attachments.media_keys'],
pollFields: ['options', 'end_datetime'],
mediaFields: ['url', 'preview_image_url'],
},
);
console.log('tweets', tweets);
API
Authentication
// Log in
await scraper.login('username', 'password');

// Log out
await scraper.logout();

// Check if logged in
const isLoggedIn = await scraper.isLoggedIn();

// Get current session cookies
const cookies = await scraper.getCookies();

// Set current session cookies
await scraper.setCookies(cookies);

// Clear current cookies
await scraper.clearCookies();
Profile
// Get a user's profile
const profile = await scraper.getProfile('TwitterDev');

// Get a user ID from their screen name
const userId = await scraper.getUserIdByScreenName('TwitterDev');

// Get logged-in user's profile
const me = await scraper.me();
Search
import { SearchMode } from 'agent-twitter-client';

// Search for recent tweets
const tweets = scraper.searchTweets('#nodejs', 20, SearchMode.Latest);

// Search for profiles
const profiles = scraper.searchProfiles('John', 10);

// Fetch a page of tweet results
const results = await scraper.fetchSearchTweets('#nodejs', 20, SearchMode.Top);

// Fetch a page of profile results
const profileResults = await scraper.fetchSearchProfiles('John', 10);
Relationships
// Get a user's followers
const followers = scraper.getFollowers('12345', 100);

// Get who a user is following
const following = scraper.getFollowing('12345', 100);

// Fetch a page of a user's followers
const followerResults = await scraper.fetchProfileFollowers('12345', 100);

// Fetch a page of who a user is following
const followingResults = await scraper.fetchProfileFollowing('12345', 100);

// Follow a user
const followUserResults = await scraper.followUser('elonmusk');
Trends
// Get current trends
const trends = await scraper.getTrends();

// Fetch tweets from a list
const listTweets = await scraper.fetchListTweets('1234567890', 50);
Tweets
// Get a user's tweets
const tweets = scraper.getTweets('TwitterDev');

// Fetch the home timeline
const homeTimeline = await scraper.fetchHomeTimeline(10, ['seenTweetId1','seenTweetId2']);

// Get a user's liked tweets
const likedTweets = scraper.getLikedTweets('TwitterDev');

// Get a user's tweets and replies
const tweetsAndReplies = scraper.getTweetsAndReplies('TwitterDev');

// Get tweets matching specific criteria
const timeline = scraper.getTweets('TwitterDev', 100);
const retweets = await scraper.getTweetsWhere(
timeline,
(tweet) => tweet.isRetweet,
);

// Get a user's latest tweet
const latestTweet = await scraper.getLatestTweet('TwitterDev');

// Get a specific tweet by ID
const tweet = await scraper.getTweet('1234567890123456789');

// Send a tweet
const sendTweetResults = await scraper.sendTweet('Hello world!');

// Send a quote tweet - Media files are optional
const sendQuoteTweetResults = await scraper.sendQuoteTweet(
'Hello world!',
'1234567890123456789',
['mediaFile1', 'mediaFile2'],
);

// Retweet a tweet
const retweetResults = await scraper.retweet('1234567890123456789');

// Like a tweet
const likeTweetResults = await scraper.likeTweet('1234567890123456789');
Sending Tweets with Media
Media Handling
The scraper requires media files to be processed into a specific format before sending:

Media must be converted to Buffer format
Each media file needs its MIME type specified
This helps the scraper distinguish between image and video processing models
Basic Tweet with Media
// Example: Sending a tweet with media attachments
const mediaData = [
{
data: fs.readFileSync('path/to/image.jpg'),
mediaType: 'image/jpeg',
},
{
data: fs.readFileSync('path/to/video.mp4'),
mediaType: 'video/mp4',
},
];

await scraper.sendTweet('Hello world!', undefined, mediaData);
Supported Media Types
// Image formats and their MIME types
const imageTypes = {
'.jpg': 'image/jpeg',
'.jpeg': 'image/jpeg',
'.png': 'image/png',
'.gif': 'image/gif',
};

// Video format
const videoTypes = {
'.mp4': 'video/mp4',
};
Media Upload Limitations
Maximum 4 images per tweet
Only 1 video per tweet
Maximum video file size: 512MB
Supported image formats: JPG, PNG, GIF
Supported video format: MP4
Grok Integration
This client provides programmatic access to Grok through Twitter's interface, offering a unique capability that even Grok's official API cannot match - access to real-time Twitter data. While Grok has a standalone API, only by interacting with Grok through Twitter can you leverage its ability to analyze and respond to live Twitter content. This makes it the only way to programmatically access an LLM with direct insight into Twitter's real-time information. @grokkyAi

Basic Usage
const scraper = new Scraper();
await scraper.login('username', 'password');

// Start a new conversation
const response = await scraper.grokChat({
messages: [{ role: 'user', content: 'What are your thoughts on AI?' }],
});

console.log(response.message); // Grok's response
console.log(response.messages); // Full conversation history
If no conversationId is provided, the client will automatically create a new conversation.

Handling Rate Limits
Grok has rate limits of 25 messages every 2 hours for non-premium accounts. The client provides rate limit information in the response:

const response = await scraper.grokChat({
messages: [{ role: 'user', content: 'Hello!' }],
});

if (response.rateLimit?.isRateLimited) {
console.log(response.rateLimit.message);
console.log(response.rateLimit.upsellInfo); // Premium upgrade information
}
Response Types
The Grok integration includes TypeScript types for better development experience:

interface GrokChatOptions {
messages: GrokMessage[];
conversationId?: string;
returnSearchResults?: boolean;
returnCitations?: boolean;
}

interface GrokChatResponse {
conversationId: string;
message: string;
messages: GrokMessage[];
webResults?: any[];
metadata?: any;
rateLimit?: GrokRateLimit;
}
Advanced Usage
const response = await scraper.grokChat({
messages: [{ role: 'user', content: 'Research quantum computing' }],
returnSearchResults: true, // Include web search results
returnCitations: true, // Include citations for information
});

// Access web results if available
if (response.webResults) {
console.log('Sources:', response.webResults);
}

// Full conversation with history
console.log('Conversation:', response.messages);
Limitations
Message history prefilling is currently limited due to unofficial API usage
Rate limits are enforced (25 messages/2 hours for non-premium)
About
A Twitter client for agents-- no API key necessary

Resources
Readme
License
MIT license
Activity
Custom properties
Stars
739 stars
Watchers
12 watching
Forks
221 forks
Report repository
Releases 8
0.0.18
Latest
3 weeks ago

- 7 releases
  Packages
  No packages published
  Contributors
  29
  @karashiiro
  @lalalune
  @slkzgm
  @Owen3H
  @catdevnull
  @louisgrasset
  @y-pakorn
  @kingbootoshi
  @monilpat
  @wtfsayo
  @0x3N3jVhPUV
  @MicrowaveDev
  @gabearro
  @samarth30
- 15 contributors
  Languages
  TypeScript
  99.1%

JavaScript
0.9%
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact
Manage cookies
Do not share my personal information
elizaOS/agent-twitter-client: A Twitter client for agents-- no API key necessary
