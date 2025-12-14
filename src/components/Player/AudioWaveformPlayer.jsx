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
      progressColor: "#6366f1",
      cursorColor: "#6366f1",
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 90,
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
        ▶ Play / Pause
      </button>
    </div>
  );
}
