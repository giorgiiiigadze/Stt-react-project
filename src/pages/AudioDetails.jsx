import '../css/AudioDetails.css';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";

import { getAudios } from "../services/api";
import AudioStatus from '../components/AudioStatus';
import AudioTable from '../components/Table/AudioTables';

export default function AudioDetails() {
  const { id } = useParams();
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        const audiosData = await getAudios();

        const selected = audiosData.find(a => String(a.id) === String(id));

        if (!selected) {
          setError("Audio not found");
        } else {
          setAudio(selected);
        }

      } catch (err) {
        if (err.status === 403) {
          setError("Not authorized");
        } else {
          setError("Failed to load audio");
        }
      } finally {
        setLoading(false);
      }
    };

    loadAudio();  
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!audio) return <p>Audio not found</p>;

  return (
    <div className="audio-details-container">
      <Header></Header>
        <main className='audio-details-main'>

            <div className="audio_title">
              <AudioStatus status={audio.status} padding={"20"} />
              <h1>{audio.file_title}</h1>
            </div>
            <div className="audio-details">
              {/* <AudioTable></AudioTable> */}
            </div>
            <div className="audio-transcription"></div>
            <div className="audio-comment-list">
            </div>
            <div className="add-comment">
            </div>
        </main>
    </div>
  );
}
