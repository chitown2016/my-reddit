export default async function handler(req, res) {
  console.log('Reddit API route called:', req.url);
  
  try {
    // Parse the URL to get the path
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace('/api/reddit', '');
    
    console.log('Parsed path:', path);
    
    // Construct the Reddit API URL
    const redditUrl = `https://www.reddit.com${path}.json${url.search}`;
    console.log('Reddit URL:', redditUrl);
    
    // Make the request to Reddit
    const response = await fetch(redditUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    console.log('Reddit response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Reddit data received, children count:', data?.data?.children?.length || 0);
    
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Return the data
    res.status(200).json(data);
  } catch (error) {
    console.error('Reddit API proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch data from Reddit',
      details: error.message 
    });
  }
} 