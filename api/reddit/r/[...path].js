export default async function handler(req, res) {
  console.log('Catch-all subreddit API route called');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Query:', req.query);
  
  // Handle OPTIONS requests for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.status(200).end();
    return;
  }
  
  try {
    // Extract subreddit from the path parameter
    const { path } = req.query;
    const pathArray = Array.isArray(path) ? path : [path];
    const subreddit = pathArray[0]?.replace('.json', '') || 'popular';
    
    console.log('Extracted subreddit:', subreddit);
    console.log('Path array:', pathArray);
    
    // Get Reddit API credentials from environment variables
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;
    const userAgent = process.env.REDDIT_USER_AGENT || 'MyRedditApp/1.0';
    
    if (!clientId || !clientSecret) {
      console.log('Reddit API credentials not found, using mock data');
      return getMockData(res, subreddit);
    }
    
    // Get access token using client credentials flow
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': userAgent
      },
      body: 'grant_type=client_credentials'
    });
    
    if (!tokenResponse.ok) {
      console.error('Failed to get access token:', tokenResponse.status);
      return getMockData(res, subreddit);
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    console.log('Got access token, fetching Reddit data for:', subreddit);
    
    // Fetch data from Reddit API
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const redditUrl = `https://oauth.reddit.com/r/${subreddit}.json${queryString}`;
    console.log('Reddit API URL:', redditUrl);
    
    const response = await fetch(redditUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': userAgent
      },
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });
    
    console.log('Reddit API response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Reddit data received, children count:', data?.data?.children?.length || 0);
      
      // Set CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      
      // Return the real data
      res.status(200).json(data);
      return;
    }
    
    console.log('Reddit API request failed, using mock data');
    return getMockData(res, subreddit);
    
  } catch (error) {
    console.error('Reddit API proxy error:', error);
    return getMockData(res, 'popular');
  }
}

function getMockData(res, subreddit) {
  const mockData = {
    data: {
      children: [
        {
          data: {
            id: 'mock1',
            title: `Welcome to r/${subreddit}! 🎉`,
            author: 'reddit_user',
            score: 15420,
            num_comments: 892,
            created_utc: Math.floor(Date.now() / 1000) - 3600,
            url: `https://www.reddit.com/r/${subreddit}/`,
            permalink: `/r/${subreddit}/`,
            subreddit: subreddit,
            selftext: `This is a demo of the Reddit ${subreddit} posts. Set up Reddit API credentials to see real data!`,
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        },
        {
          data: {
            id: 'mock2',
            title: `Sample post from r/${subreddit} 📝`,
            author: 'demo_user',
            score: 8920,
            num_comments: 234,
            created_utc: Math.floor(Date.now() / 1000) - 7200,
            url: `https://www.reddit.com/r/${subreddit}/comments/example/`,
            permalink: `/r/${subreddit}/comments/example/`,
            subreddit: subreddit,
            selftext: 'This is sample data while Reddit API credentials are being set up.',
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        },
        {
          data: {
            id: 'mock3',
            title: `Another interesting post in r/${subreddit} 🔍`,
            author: 'content_creator',
            score: 5670,
            num_comments: 456,
            created_utc: Math.floor(Date.now() / 1000) - 10800,
            url: `https://www.reddit.com/r/${subreddit}/comments/example2/`,
            permalink: `/r/${subreddit}/comments/example2/`,
            subreddit: subreddit,
            selftext: 'More sample content to demonstrate the app functionality.',
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        }
      ],
      after: null,
      before: null,
      modhash: 'mock_modhash'
    }
  };
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Return mock data
  res.status(200).json(mockData);
}
