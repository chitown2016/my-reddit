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
    // Construct the Reddit API URL for search using old.reddit.com
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const redditUrl = `https://old.reddit.com/search.json${queryString}`;
    console.log('Reddit URL (old):', redditUrl);
    
    // Make the request to Reddit with minimal headers
    const response = await fetch(redditUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });
    
    console.log('Reddit response status:', response.status);
    console.log('Reddit response headers:', Object.fromEntries(response.headers.entries()));
    
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
