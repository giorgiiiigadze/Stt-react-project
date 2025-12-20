import '../../css/AudioWaveformPlayer.css'

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

export default function AudioWaveformPlayer({ audioUrl }) {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (!audioUrl) return;

    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#3f3f3f",
      progressColor: "#b2b2b2",
      cursorColor: "#b2b2b2",
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 40,
      responsive: true,
      normalize: true,
      url: audioUrl,
    });

    return () => {
      wavesurferRef.current?.destroy();
    };
  }, [audioUrl]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  return (
    <div className="waveform-player">
      <div ref={waveformRef} className="waveform" />

      <button onClick={togglePlay} className="waveform-play-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>
      </button>
    </div>
  );
}
