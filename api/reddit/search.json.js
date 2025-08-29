// This is not used right now

export default async function handler(req, res) {
  console.log('Reddit search API route called');
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
    // Get Reddit API credentials from environment variables
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;
    const userAgent = process.env.REDDIT_USER_AGENT || 'MyRedditApp/1.0';
    
    if (!clientId || !clientSecret) {
      console.log('Reddit API credentials not found, using mock data');
      return getMockSearchData(res);
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
      return getMockSearchData(res);
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    console.log('Got access token, fetching Reddit search data');
    
    // Fetch data from Reddit API
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const redditUrl = `https://oauth.reddit.com/search.json${queryString}`;
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
    return getMockSearchData(res);
    
  } catch (error) {
    console.error('Reddit API proxy error:', error);
    return getMockSearchData(res);
  }
}

function getMockSearchData(res) {
  const mockData = {
    data: {
      children: [
        {
          data: {
            id: 'search_mock1',
            title: 'Search Demo - Reddit API Setup Required',
            author: 'demo_user',
            score: 1000,
            num_comments: 50,
            created_utc: Math.floor(Date.now() / 1000),
            url: 'https://www.reddit.com/',
            permalink: '/r/demo/',
            subreddit: 'demo',
            selftext: 'This is demo search data. Set up Reddit API credentials to see real search results!',
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        }
      ],
      after: null,
      before: null,
      modhash: 'demo_modhash'
    }
  };
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Return mock data
  res.status(200).json(mockData);
}
