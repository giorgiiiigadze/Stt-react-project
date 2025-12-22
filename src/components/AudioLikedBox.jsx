import AudioStatus from "./AudioStatus";
import shrinkedTitle from "./ShrinkedAudioTitle";
import { Link } from "react-router-dom";
import { useFavoriteAudio } from '../hooks/ToggleFavourite';
import '../css/AudioLikedBox.css'


function AudioLikedBox({ audio, width, height, borderRadius, favouriteButton=false }) {
    const { isFavorite, loading, toggleFavorite } = useFavoriteAudio(audio.favorite, audio.id);

    return (
        <div className="liked-audio"
            style={{
                width: width,
                height: height,
                minWidth: width,
            }}>
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
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-arrow-out-up-right-icon lucide-square-arrow-out-up-right"><path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"/><path d="m21 3-9 9"/><path d="M15 3h6v6"/></svg>
                    </button>
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
