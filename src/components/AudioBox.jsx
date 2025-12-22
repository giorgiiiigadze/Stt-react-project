import AudioStatus from "./AudioStatus";
import shrinkedTitle from "./ShrinkedAudioTitle";
import { Link } from "react-router-dom";
import { useFavoriteAudio } from '../hooks/ToggleFavourite';
import '../css/AudioBox.css'


function AudioBox({ audio, width, height, borderRadius, favouriteButton=false }) {
    const { isFavorite, loading, toggleFavorite } = useFavoriteAudio(audio.favorite, audio.id);

    return (
        <Link 
            to={`/audio/${audio.id}`} 
            className="audio-card" 
            key={audio.id}
            style={{
                width: width,
                height: height,
                minWidth: width,
                borderRadius: `${borderRadius}px`
            }}
        >
            <section className="card-upper">
                <div className="card-status">
                    <AudioStatus status={audio.status} padding={"8"} />
                </div>

                <div className="audio-title">
                    {shrinkedTitle(audio, 15)}
                </div>
            </section>
            <footer className="card-lower">
                <div className="audio-date">
                    {new Date(audio.created_at).toLocaleDateString()}
                </div>
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
                    fontSize: "20px",
                    color: isFavorite ? "#616161" : "gray",
                    }}
                    title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? "★" : "☆"}
                </button>
                )}
            </footer>
        </Link>
    );
}

export default AudioBox;
