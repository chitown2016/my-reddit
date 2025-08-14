export default async function handler(req, res) {
  console.log('Popular subreddit API route called');
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
      return getMockData(res);
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
      return getMockData(res);
    }
    
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    
    console.log('Got access token, fetching Reddit data');
    
    // Fetch data from Reddit API
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const redditUrl = `https://oauth.reddit.com/r/popular.json${queryString}`;
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
    return getMockData(res);
    
  } catch (error) {
    console.error('Reddit API proxy error:', error);
    return getMockData(res);
  }
}

function getMockData(res) {
  const mockData = {
    data: {
      children: [
        {
          data: {
            id: 'mock1',
            title: 'Welcome to Reddit Popular Posts! 🎉',
            author: 'reddit_user',
            score: 15420,
            num_comments: 892,
            created_utc: Math.floor(Date.now() / 1000) - 3600,
            url: 'https://www.reddit.com/r/popular/',
            permalink: '/r/popular/',
            subreddit: 'popular',
            selftext: 'This is a demo of the Reddit Popular Posts app. Set up Reddit API credentials to see real data!',
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        },
        {
          data: {
            id: 'mock2',
            title: 'Amazing sunset from my balcony tonight 🌅',
            author: 'photographer123',
            score: 8920,
            num_comments: 234,
            created_utc: Math.floor(Date.now() / 1000) - 7200,
            url: 'https://i.redd.it/example.jpg',
            permalink: '/r/pics/comments/example/',
            subreddit: 'pics',
            selftext: '',
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        },
        {
          data: {
            id: 'mock3',
            title: 'What\'s your favorite programming language and why? 💻',
            author: 'dev_enthusiast',
            score: 5670,
            num_comments: 456,
            created_utc: Math.floor(Date.now() / 1000) - 10800,
            url: 'https://www.reddit.com/r/programming/comments/example/',
            permalink: '/r/programming/comments/example/',
            subreddit: 'programming',
            selftext: 'I\'ve been coding for years and I\'m curious what languages other developers prefer and why. What\'s your go-to language?',
            is_video: false,
            media: null,
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        },
        {
          data: {
            id: 'mock4',
            title: 'My cat finally learned to high-five! 🐱✋',
            author: 'cat_lover',
            score: 12340,
            num_comments: 678,
            created_utc: Math.floor(Date.now() / 1000) - 14400,
            url: 'https://v.redd.it/example.mp4',
            permalink: '/r/aww/comments/example/',
            subreddit: 'aww',
            selftext: '',
            is_video: true,
            media: {
              reddit_video: {
                fallback_url: 'https://v.redd.it/example.mp4'
              }
            },
            thumbnail: 'https://b.thumbs.redditmedia.com/example.jpg'
          }
        },
        {
          data: {
            id: 'mock5',
            title: 'Just finished building my first gaming PC! 🎮',
            author: 'pc_builder',
            score: 7890,
            num_comments: 345,
            created_utc: Math.floor(Date.now() / 1000) - 18000,
            url: 'https://www.reddit.com/r/buildapc/comments/example/',
            permalink: '/r/buildapc/comments/example/',
            subreddit: 'buildapc',
            selftext: 'After months of research and saving, I finally built my first gaming PC. Here are the specs and some photos!',
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
