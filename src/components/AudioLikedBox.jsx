import AudioStatus from "./AudioStatus";
import shrinkedTitle from "./ShrinkedAudioTitle";
import { Link } from "react-router-dom";
import { useFavoriteAudio } from '../hooks/ToggleFavourite';
import '../css/AudioLikedBox.css'


function AudioLikedBox({ audio, width, height, borderRadius, favouriteButton=false }) {
    const { isFavorite, loading, toggleFavorite } = useFavoriteAudio(audio.favorite, audio.id);

    return (
        <div className="liked-audio" style={{ width: width, height: height, minWidth: width, }}>
            <Link 
                to={`/audio/${audio.id}`} 
                className="audio-card" 
                key={audio.id}
                style={{borderRadius: `${borderRadius}px`}}
            >
                <footer className="card-lower">
                    {favouriteButton && (
                    <button
                        onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleFavorite();
                        }}
                        disabled={loading}
                        style={{
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "22px",
                        color: isFavorite ? "#616161" : "gray",
                        }}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? "★" : "☆"}
                    </button>
                    )}
                </footer>
            </Link>
            <span>
                <AudioStatus status={audio.status} padding={"8"} />
                {shrinkedTitle(audio, 15)}
                <div className="audio-date">
                    {new Date(audio.created_at).toLocaleDateString()}
                </div>
            </span>
        </div>

    );
}

export default AudioLikedBox;
