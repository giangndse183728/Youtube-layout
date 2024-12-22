import axios from 'axios';

// Store the API key directly in the service
const API_KEY = 'AIzaSyBFFxM52jCyWWcGBvlrlXEqzR9rDB2L-hA'; // Replace with your actual API key

const fetchTrendingVideos = async (maxResults = 10, pageToken = '') => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos`, {
        params: {
          key: API_KEY,
          part: 'snippet,statistics',
          chart: 'mostPopular',  // This is the key to fetching trending videos
          maxResults,
          pageToken,  // Pagination
          regionCode: 'VN',  // Optional: Specify a region to get localized trending videos
        }
      }
    );

    const videoItems = response.data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      views: item.statistics.viewCount,
      publishedAt: item.snippet.publishedAt,
      avatar: item.snippet.thumbnails.default.url,
      thumbnail: item.snippet.thumbnails.high.url,
      description: item.snippet.description,
    }));

    return {
      videoItems,
      nextPageToken: response.data.nextPageToken || null,  // Return nextPageToken for pagination
    };
  } catch (error) {
    console.error('Error fetching trending YouTube videos:', error);
    throw error;
  }
};

export default fetchTrendingVideos;
