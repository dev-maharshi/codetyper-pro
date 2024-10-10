import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import axios from 'axios';

function Settings() {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const playerRef = useRef(null);


  const getPlaylistId = (url) => {
    const regex = /(?:list=)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handlePlaylistUrlChange = (e) => {
    setPlaylistUrl(e.target.value);
  };

  const fetchPlaylistVideos = (playlistId) => {
    axios.get('https://www.googleapis.com/youtube/v3/playlistItems', {
      params: {
        part: 'snippet',
        playlistId: playlistId,
        maxResults: 10,
        key: '',
      },
    })
      .then(response => setPlaylistVideos(response.data.items))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    const playlistId = getPlaylistId(playlistUrl);
    if (playlistId) {
      fetchPlaylistVideos(playlistId);
    }
  }, [playlistUrl]);

  const handleVideoSelect = (videoId) => {
    setVideoId(videoId);
    setIsPlaying(true);
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    if (isPlaying) {
      playerRef.current.playVideo();
    }
  };

  const playPause = () => {
    if (playerRef.current) {
      if (playerRef.current.getPlayerState() === 1) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    }
  };

  const previous = () => {

  };

  const next = () => {

  };

  const opts = {
    height: '0',
    width: '0',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <div>
        <label htmlFor="playlist-url">Enter Playlist URL: </label>
        <input
          id="playlist-url"
          type="text"
          value={playlistUrl}
          onChange={handlePlaylistUrlChange}
          placeholder="Enter YouTube playlist URL"
        />
      </div>
      {playlistVideos.length > 0 && (
        <div>
          <h3>Playlist Videos</h3>
          <ul>
            {playlistVideos.map(video => (
              <li key={video.id}>
                <button onClick={() => handleVideoSelect(video.snippet.resourceId.videoId)}>
                  {video.snippet.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {videoId && (
        <div>
          <YouTube
            videoId={videoId}
            opts={opts}
            onReady={onReady}
          />
          <div className="player-controls">
            <button onClick={previous}>Previous</button>
            <button onClick={playPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            <button onClick={next}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
