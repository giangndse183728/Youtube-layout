import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // To access passed state
import { Grid2, Card, CardMedia, CardContent, Typography, Avatar, Box, CircularProgress } from '@mui/material';
import fetchVideos from '../api/youtubeService';
import { useSelector } from 'react-redux';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }

  const trimmedText = text.slice(0, maxLength);
  const lastSpaceIndex = trimmedText.lastIndexOf(' ');

  return lastSpaceIndex > 0 
    ? trimmedText.slice(0, lastSpaceIndex) + '...' 
    : trimmedText + '...'; // Fallback if no space is found
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return `${interval} days ago`;
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return `${interval} hours ago`;
  interval = Math.floor(seconds / 60);
  if (interval > 1) return `${interval} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
};

const formatViewCount = (views) => {
  if (views >= 1000000000) {
    return (views / 1000000000).toFixed(1) + 'B';
  } else if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
};

export default function VideoResults() {
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [videoData, setVideoData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const prevQueryRef = useRef('');

  const loadVideos = useCallback(async (pageToken = '') => {
    setLoading(true);
    try {
      const { videoItems, nextPageToken } = await fetchVideos(query, 10, pageToken);
      setVideoData((prevVideos) => pageToken ? [...prevVideos, ...videoItems] : videoItems);
      setNextPageToken(nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const newQuery = location.state?.query || '';
    if (newQuery !== prevQueryRef.current) {
      setQuery(newQuery);
      setVideoData([]);
      setNextPageToken(null);
      prevQueryRef.current = newQuery;
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  useEffect(() => {
    if (query) {
      loadVideos();
    }
  }, [query, loadVideos]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && nextPageToken) {
      loadVideos(nextPageToken);
    }
  }, [loading, nextPageToken, loadVideos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Grid2 container spacing={2}>
      {videoData.map((video) => (
        <Grid2 item xs={12} key={video.id}>
          <Card sx={{ display: 'flex', boxShadow: 'none', ml: 6 }}>
            <CardMedia
              sx={{ height: 280, width: 500, borderRadius: 3 }}
              component="img"
              image={video.thumbnail}
              alt={video.title}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', py: 0, px: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {truncateText(video.title, 60)}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {video.views} views • {timeAgo(video.publishedAt)}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={video.avatar}
                  alt={video.channel}
                  sx={{ mr: 2, width: 24, height: 24 }}
                />
                <Typography variant="body2" color="text.secondary">
                  {video.channel}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {truncateText(video.description, 90)}
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      ))}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', my: 2 }}>
          <CircularProgress />
        </Box>
      )}
    </Grid2>
  );
}
