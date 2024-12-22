import axios from 'axios';

// Store the API key directly in the service
const API_KEY = 'AIzaSyBFFxM52jCyWWcGBvlrlXEqzR9rDB2L-hA'; // Replace with your actual API key

const fetchVideos = async (searchQuery = "", maxResults = 10, pageToken = '') => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`, {
          params: {
            key: API_KEY,
            part: 'snippet',
            q: searchQuery,
            maxResults,
            pageToken, // This is used for pagination
          },
          

          
        }
      );
  
      const videoIds = response.data.items.map(item => item.id.videoId).join(',');
  
      const videoDetailsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos`, {
          params: {
            key: API_KEY,
            id: videoIds,
            part: 'snippet,statistics',
          }
        }
      );
  
      const videoItems = videoDetailsResponse.data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        channel: item.snippet.channelTitle,
        views: item.statistics.viewCount,
        publishedAt: item.snippet.publishedAt,
        avatar: item.snippet.thumbnails.default.url,
        thumbnail: item.snippet.thumbnails.high.url,
        description: item.snippet.description, // Add the description
      }));
  
      return {
        videoItems,
        nextPageToken: response.data.nextPageToken || null, // Return nextPageToken for pagination
      };
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      throw error;
    }
  };
  
  export default fetchVideos;