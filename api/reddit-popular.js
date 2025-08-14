export default async function handler(req, res) {
  console.log('Reddit popular API route called');
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
    // Construct the Reddit API URL for popular
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const redditUrl = `https://www.reddit.com/r/popular.json${queryString}`;
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
      details: error.message,
      url: req.url
    });
  }
} 