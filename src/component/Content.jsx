import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Avatar, Box, CircularProgress  } from '@mui/material';
import fetchTrendingVideos from '../api/trendingService';
import { throttle } from 'lodash';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;

  // Find the last space within the maxLength
  const lastSpace = text.lastIndexOf(' ', maxLength);

  // If a space is found, truncate at that point; otherwise, truncate at maxLength
  const truncatedText = text.slice(0, lastSpace > 0 ? lastSpace : maxLength);

  // Remove any trailing punctuation
  const cleanedText = truncatedText.replace(/[.,;:!?]$/, '');

  return cleanedText + '...';
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

const Content = ({ open }) => {
  const [videoData, setVideoData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadingRef = useRef(false);

  // Fetch videos and handle pagination
  const loadVideos = useCallback(async (pageToken = '') => {
    if (loadingRef.current) return; // Prevent multiple simultaneous calls
    loadingRef.current = true;
    setLoading(true);
    try {
      const { videoItems, nextPageToken } = await fetchTrendingVideos(12, pageToken);
      setVideoData((prevVideos) => [...prevVideos, ...videoItems]); // Append new videos to existing list
      setNextPageToken(nextPageToken); // Set next page token for future requests
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  // Handle scrolling and trigger loading more videos when reaching the bottom
  const handleScroll = useCallback(
    throttle(() => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        !loadingRef.current &&
        nextPageToken
      ) {
        loadVideos(nextPageToken);
      }
    }, 300),
    [loadVideos, nextPageToken]
  );

  // Effect for initial load
  useEffect(() => {
    loadVideos();
  }, [loadVideos]);

  // Effect for scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Grid container spacing={2}>
      {videoData.map((video) => (
        <Grid item xs={12} sm={6} md={open ? 4 : 3} key={video.id}>
          <Card sx={{ maxWidth: open ? 400 : 345, boxShadow: 'none' }}>
            <CardMedia
              sx={{ borderRadius: 3 }}
              component="img"
              height={open ? "240" : "194"}
              image={video.thumbnail}
              alt={video.title}
            />
            <CardContent sx={{ display: 'flex', mr: 1, p: 1 }}>
              <Avatar
                src={video.avatar}
                alt={video.channel}
                sx={{ mr: 2 }}
              />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {truncateText(video.title, 55)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {truncateText(video.channel,35)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {formatViewCount(video.views)} views • {timeAgo(video.publishedAt)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
      {loading && <CircularProgress color="inherit" />}
    </Grid>
  );
};

export default Content;
