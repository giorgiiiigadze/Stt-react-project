import '../css/AudioDetails.css';
import { useParams } from "react-router-dom";
import Header from "../components/Header";

import useFetchAudios from "../hooks/FetchHook";
import AudioStatus from '../components/AudioStatus';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


export default function AudioDetails() {
  const { id } = useParams();
  const { audios, loading, error, isLoggedIn } = useFetchAudios();

  const audio = audios?.find(a => String(a.id) === String(id));

  return (
    <>
    <Header audio={audio} loading={loading} />

    <div className="audio-details-container">

      {!isLoggedIn ? (
        <p>Not logged in</p>
      ) : loading ? (
        <main className='audio-details-main'>
            <div className="audio-title">
              <Skeleton 
                  width={16} 
                  height={16}
                  style={{ borderRadius: '12px' }}
                  baseColor="#292929"
                  highlightColor="#515151ff"
              />
              <Skeleton 
                  width={500} 
                  height={16}
                  style={{ borderRadius: '12px' }}
                  baseColor="#292929"
                  highlightColor="#515151ff"
              />
            </div>     
        </main>

      ) : error ? (
        <p>{error}</p>
      ) : !audio ? (
        <p>Audio not found</p>
      ) : (
        <>

          <main className='audio-details-main'>
            <div className="audio-title">
              <AudioStatus status={audio.status} padding={"12"} />
              <div role='h1' className='title'>{audio.file_title}</div>
            </div>

            <div className="audio-details"></div>
            <div className="audio-transcription"></div>
            <div className="audio-comment-list"></div>
            <div className="add-comment"></div>
          </main>
        </>
      )}

    </div>
    </>
  );
}
