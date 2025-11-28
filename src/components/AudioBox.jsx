import AudioStatus from "./AudioStatus";
import shrinkedTitle from "./ShrinkedAudioTitle";
import { Link } from "react-router-dom";

function AudioBox({ audio, width, height }) {
    return (
        <Link 
            to={`/audios/${audio.id}`} 
            className="audio-card" 
            key={audio.id}
            style={{
                width: width,
                height: height,
            }}
        >
            <div className="card-upper">
                <div className="card-status">
                    <AudioStatus status={audio.status} padding={"8"} />
                </div>

                <div className="audio-title">
                    {shrinkedTitle(audio)}
                </div>
            </div>
        </Link>
    );
}

export default AudioBox;
