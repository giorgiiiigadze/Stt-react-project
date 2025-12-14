import { useRef, useState, useEffect } from "react";
import { Howl } from "howler";
import '../../css/Player/AudioCustomPlayer.css';

import shrinkedTitle from '../../components/ShrinkedAudioTitle';
import Tooltip from '@mui/material/Tooltip';

import { useFavoriteAudio } from '../../hooks/ToggleFavourite';

import { useToast } from "../../contexts/MessageContext";

export default function AudioCustomPlayer({ audio }) {
  const soundRef = useRef(null);

  const { isFavorite, loading, toggleFavorite } = useFavoriteAudio(audio.favorite, audio.id);
  const { addToast } = useToast()

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    soundRef.current = new Howl({
      src: [audio.file],
      html5: true,
      volume: volume,
      onload: () => {
        setDuration(soundRef.current.duration());
      },
      onend: () => {
        setIsPlaying(false);
      }
    });

    return () => {
      if (soundRef.current) soundRef.current.unload();
    };
  }, [audio.file]);

  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        if (soundRef.current) {
          setCurrentTime(soundRef.current.seek());
        }
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.pause();
      setIsPlaying(false);
    } else {
      soundRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    soundRef.current.seek(time);
    setCurrentTime(time);
  };

  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    soundRef.current.volume(vol);
  };

  const formatTime = (time) => {
    if (!time && time !== 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="audio-player">

      <div className="audio-player-title">
        {shrinkedTitle(audio, 20)}

        <div className="like-unlike-buttons">
          <Tooltip title="Toggle like/unlike" placement="right" disableInteractive>
            <button onClick={(e) => { e.preventDefault(); toggleFavorite(); addToast("Audio liked successfully")}}>
              {isFavorite ? (
                <div className="liked-audio-svg">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                  </svg>
                </div>
              ) : (
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                  </svg>
                </span>
              )}
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="audio-player-controls">

        <button onClick={togglePlay} className="audio-play-button">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="14" height="14">
              <rect x="16" y="8" width="12" height="48" fill="currentColor"/>
              <rect x="36" y="8" width="12" height="48" fill="currentColor"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="14" height="14">
              <polygon points="16,8 56,32 16,56" fill="currentColor"/>
            </svg>
          )}
        </button>

        <div className="player-input">
          <span className="input-time">{formatTime(currentTime)}</span>

          <input
            className="audio-player-seek player"
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(to right, #fff 0%, #fff ${(currentTime / duration) * 100}%, #444 ${(currentTime / duration) * 100}%, #444 100%)`
            }}
          />

          <span className="input-time">{formatTime(duration)}</span>
        </div>

      </div>

      <div className="audio-player-volume">
        <input
          className="player"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <button className="toggle-audio-player-full-window">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m480-193 85-85 57 56L480-80 338-222l57-56 85 85ZM193-480l85 85-56 57L80-480l142-142 56 57-85 85Zm574 0-85-85 56-57 142 142-142 142-56-57 85-85ZM480-767l-85 85-57-56 142-142 142 142-57 56-85-85Z"/></svg>
          </span>
        </button>
      </div>
    </div>
  );
}
